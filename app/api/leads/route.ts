import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { saveLead } from "@/lib/db";

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, source } = body;

    // 1. Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid Gmail / Email address." },
        { status: 400 }
      );
    }

    const cleanPhone = (phone || "").toString().replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    const newLead = {
      id: "lead_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      source: source || "FTT Blog",
      createdAt: new Date().toISOString(),
    };

    // 2. Persist locally to data/leads.json as a bulletproof backup
    try {
      let existingLeads = [];
      if (fs.existsSync(LEADS_FILE)) {
        const fileData = fs.readFileSync(LEADS_FILE, "utf-8");
        existingLeads = JSON.parse(fileData || "[]");
      }
      existingLeads.unshift(newLead);
      fs.writeFileSync(LEADS_FILE, JSON.stringify(existingLeads, null, 2), "utf-8");
    } catch (fsErr) {
      console.warn("Failed to save lead to local file backup:", fsErr);
    }

    // 3. Save to Supabase PostgreSQL 'leads' table
    try {
      await saveLead({
        name: newLead.name,
        email: newLead.email,
        phone: newLead.phone,
        source: newLead.source,
      });
    } catch (dbErr) {
      console.warn("Supabase lead insertion error:", dbErr);
    }

    // 4. Forward to Google Sheets Web App if configured
    const googleSheetUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;
    if (googleSheetUrl && googleSheetUrl.trim().startsWith("http")) {
      try {
        await fetch(googleSheetUrl.trim(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            name: newLead.name,
            email: newLead.email,
            phone: newLead.phone,
            source: newLead.source,
          }),
        });
      } catch (sheetErr) {
        console.warn("Failed to send lead to Google Sheet:", sheetErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Access granted! Welcome to FTT Blog.",
      lead: { name: newLead.name, email: newLead.email },
    });
  } catch (error) {
    console.error("Error processing blog access lead:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

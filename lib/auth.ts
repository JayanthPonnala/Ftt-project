export const ADMIN_COOKIE_NAME = "ftt_admin_session";

const DEFAULT_ADMIN_EMAIL = "admin@forextradertelugu.com";
const DEFAULT_ADMIN_PASSWORD = "fttadmin2026";
const DEFAULT_SECRET = "super_secret_ftt_crypto_token_key_998877665544332211";

export function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD,
    secret: process.env.ADMIN_SESSION_SECRET || DEFAULT_SECRET,
  };
}

// Convert string to Uint8Array
function stringToBytes(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

// Convert bytes to hex string
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Create HMAC-SHA256 signature
async function sign(data: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return bytesToHex(new Uint8Array(signature));
}

// Generate secure admin token: payload.signature (valid for 7 days)
export async function createAdminToken(email: string): Promise<string> {
  const { secret } = getAdminCredentials();
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload = JSON.stringify({ email, expiresAt });
  const base64Payload = Buffer.from(payload).toString("base64url");
  const signature = await sign(base64Payload, secret);
  return `${base64Payload}.${signature}`;
}

// Verify admin token
export async function verifyAdminToken(
  token: string | undefined | null
): Promise<boolean> {
  if (!token) return false;

  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;

    const [base64Payload, signature] = parts;
    const { secret, email: validEmail } = getAdminCredentials();

    const expectedSig = await sign(base64Payload, secret);
    if (expectedSig !== signature) return false;

    const rawPayload = Buffer.from(base64Payload, "base64url").toString("utf-8");
    const parsed = JSON.parse(rawPayload);

    if (parsed.expiresAt < Date.now()) {
      return false;
    }

    if (parsed.email !== validEmail) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

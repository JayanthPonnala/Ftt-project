"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, Copy } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  // Split into blocks by double newlines or code block fences
  const blocks = parseMarkdownBlocks(content);

  return (
    <article className="prose-ftt text-[#D1D5DB] leading-[1.85] text-[16px] sm:text-[17px] space-y-6">
      {blocks.map((block, idx) => (
        <RenderBlock key={idx} block={block} />
      ))}
    </article>
  );
};

interface Block {
  type:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "p"
    | "blockquote"
    | "ul"
    | "ol"
    | "code"
    | "hr"
    | "image"
    | "table";
  content: string;
  lang?: string;
  items?: string[];
  rows?: string[][];
  headers?: string[];
  src?: string;
  alt?: string;
}

function parseMarkdownBlocks(text: string): Block[] {
  const blocks: Block[] = [];
  const lines = text.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced Code Block
    if (line.trim().startsWith("```")) {
      const lang = line.trim().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push({
        type: "code",
        content: codeLines.join("\n"),
        lang: lang || "text",
      });
      i++;
      continue;
    }

    // Horizontal Rule
    if (/^(---|___|\*\*\*)$/.test(line.trim())) {
      blocks.push({ type: "hr", content: "" });
      i++;
      continue;
    }

    // Headings
    if (line.startsWith("# ")) {
      blocks.push({ type: "h1", content: line.slice(2).trim() });
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", content: line.slice(3).trim() });
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", content: line.slice(4).trim() });
      i++;
      continue;
    }
    if (line.startsWith("#### ")) {
      blocks.push({ type: "h4", content: line.slice(5).trim() });
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [line.slice(2).trim()];
      i++;
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2).trim());
        i++;
      }
      blocks.push({
        type: "blockquote",
        content: quoteLines.join(" "),
      });
      continue;
    }

    // Image: ![alt](url)
    const imgMatch = line.trim().match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      blocks.push({
        type: "image",
        content: "",
        alt: imgMatch[1],
        src: imgMatch[2],
      });
      i++;
      continue;
    }

    // Markdown Table: | Col 1 | Col 2 |
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const tableLines: string[] = [line.trim()];
      i++;
      while (
        i < lines.length &&
        lines[i].trim().startsWith("|") &&
        lines[i].trim().endsWith("|")
      ) {
        tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        const parseRow = (r: string) =>
          r
            .split("|")
            .slice(1, -1)
            .map((c) => c.trim());
        const headers = parseRow(tableLines[0]);
        const dataRows = tableLines
          .slice(2)
          .filter((r) => !/^\|[-:| ]+\|$/.test(r))
          .map(parseRow);
        blocks.push({
          type: "table",
          content: "",
          headers,
          rows: dataRows,
        });
        continue;
      }
    }

    // Unordered List
    if (/^[-*+]\s+/.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^[-*+]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*+]\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", content: "", items });
      continue;
    }

    // Ordered List
    if (/^\d+\.\s+/.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", content: "", items });
      continue;
    }

    // Paragraph
    if (line.trim()) {
      const pLines: string[] = [line.trim()];
      i++;
      while (
        i < lines.length &&
        lines[i].trim() &&
        !lines[i].trim().startsWith("#") &&
        !lines[i].trim().startsWith(">") &&
        !lines[i].trim().startsWith("```") &&
        !/^[-*+]\s+/.test(lines[i].trim()) &&
        !/^\d+\.\s+/.test(lines[i].trim()) &&
        !/^(---|___|\*\*\*)$/.test(lines[i].trim()) &&
        !lines[i].trim().startsWith("|")
      ) {
        pLines.push(lines[i].trim());
        i++;
      }
      blocks.push({ type: "p", content: pLines.join(" ") });
      continue;
    }

    i++;
  }

  return blocks;
}

// Inline formatting: **bold**, *italic*, `code`, [link](url)
function renderInline(text: string): React.ReactNode {
  if (!text) return null;

  // Split tokens for bold, italic, code, link
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  while (remaining.length > 0) {
    // Code: `code`
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      parts.push(
        <code
          key={keyIndex++}
          className="font-mono text-[13px] sm:text-[14px] bg-white/10 text-[#38BDF8] px-1.5 py-0.5 rounded border border-white/10"
        >
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // Bold: **text**
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      parts.push(
        <strong key={keyIndex++} className="font-semibold text-white">
          {renderInline(boldMatch[1])}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Italic: *text*
    const italicMatch = remaining.match(/^\*([^*]+)\*/);
    if (italicMatch) {
      parts.push(
        <em key={keyIndex++} className="italic text-[#E2E8F0]">
          {renderInline(italicMatch[1])}
        </em>
      );
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Link: [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      parts.push(
        <a
          key={keyIndex++}
          href={linkMatch[2]}
          target={linkMatch[2].startsWith("http") ? "_blank" : undefined}
          rel={linkMatch[2].startsWith("http") ? "noopener noreferrer" : undefined}
          className="text-[#38BDF8] hover:text-[#7DD3FC] underline underline-offset-4 transition-colors"
        >
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // Checklist token: [x] or [ ]
    if (remaining.startsWith("[x] ")) {
      parts.push(
        <span
          key={keyIndex++}
          className="inline-flex items-center justify-center w-4 h-4 rounded bg-[#38BDF8]/20 text-[#38BDF8] text-xs font-bold mr-2"
        >
          ✓
        </span>
      );
      remaining = remaining.slice(4);
      continue;
    }
    if (remaining.startsWith("[ ] ")) {
      parts.push(
        <span
          key={keyIndex++}
          className="inline-block w-4 h-4 rounded border border-white/30 mr-2 align-middle"
        />
      );
      remaining = remaining.slice(4);
      continue;
    }

    // Regular character accumulation
    const nextSpecial = remaining.search(/[`*\[]/);
    if (nextSpecial === -1) {
      parts.push(remaining);
      break;
    } else if (nextSpecial === 0) {
      // Unmatched marker, output single char and advance
      parts.push(remaining[0]);
      remaining = remaining.slice(1);
    } else {
      parts.push(remaining.slice(0, nextSpecial));
      remaining = remaining.slice(nextSpecial);
    }
  }

  return <>{parts}</>;
}

const RenderBlock: React.FC<{ block: Block }> = ({ block }) => {
  const [copied, setCopied] = useState(false);

  switch (block.type) {
    case "h1":
      return (
        <h1 className="font-space text-[28px] sm:text-[34px] font-bold text-white tracking-tight pt-6 pb-2 border-b border-white/10">
          {renderInline(block.content)}
        </h1>
      );

    case "h2":
      return (
        <h2 className="font-space text-[22px] sm:text-[26px] font-semibold text-white tracking-tight pt-5 pb-1">
          {renderInline(block.content)}
        </h2>
      );

    case "h3":
      return (
        <h3 className="font-space text-[18px] sm:text-[21px] font-semibold text-[#F1F5F9] pt-4">
          {renderInline(block.content)}
        </h3>
      );

    case "h4":
      return (
        <h4 className="font-space text-[16px] sm:text-[18px] font-medium text-[#E2E8F0] pt-2">
          {renderInline(block.content)}
        </h4>
      );

    case "p":
      return <p className="leading-[1.85]">{renderInline(block.content)}</p>;

    case "blockquote":
      return (
        <blockquote className="relative my-6 pl-5 py-3 border-l-4 border-[#38BDF8] bg-white/[0.03] backdrop-blur-sm rounded-r-xl shadow-[inset_0_0_24px_rgba(56,189,248,0.06)] text-[#E2E8F0] italic">
          <p className="leading-relaxed text-[16px] sm:text-[17px]">
            {renderInline(block.content)}
          </p>
        </blockquote>
      );

    case "ul":
      return (
        <ul className="my-4 space-y-2.5 pl-2 list-none">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shadow-[0_0_6px_rgba(56,189,248,0.8)] mt-2.5 shrink-0" />
              <span className="flex-1">{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol className="my-4 space-y-2.5 pl-2 list-none counter-reset-item">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#38BDF8]/15 border border-[#38BDF8]/40 text-[#38BDF8] font-mono text-xs font-semibold shrink-0 mt-1">
                {i + 1}
              </span>
              <span className="flex-1">{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );

    case "code":
      return (
        <div className="my-6 rounded-xl border border-white/10 bg-[#060A14] overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
            <span className="font-mono text-xs uppercase tracking-wider text-[#94A3B8]">
              {block.lang || "code"}
            </span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(block.content);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10"
              aria-label="Copy code to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-green-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-[#CBD5E1]">
            <code>{block.content}</code>
          </pre>
        </div>
      );

    case "hr":
      return (
        <div className="my-8 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      );

    case "image":
      return (
        <figure className="my-6">
          <div className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {block.src && (
              <Image
                src={block.src}
                alt={block.alt || "Blog image"}
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover"
              />
            )}
          </div>
          {block.alt && (
            <figcaption className="text-center text-xs text-[#94A3B8] mt-2 italic">
              {block.alt}
            </figcaption>
          )}
        </figure>
      );

    case "table":
      return (
        <div className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02]">
          <table className="w-full text-left text-sm">
            {block.headers && (
              <thead className="bg-white/5 border-b border-white/10 text-white font-medium">
                <tr>
                  {block.headers.map((h, i) => (
                    <th key={i} className="px-4 py-3 font-semibold">
                      {renderInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {block.rows?.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 text-[#CBD5E1]">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
};

export default MarkdownRenderer;

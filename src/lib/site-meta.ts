import fs from "fs";
import path from "path";

export interface FaqItem {
  q: string;
  a: string;
}

export interface SiteMeta {
  faq: FaqItem[];
  organization: { name: string; url: string; description?: string };
}

const FILE = path.join(process.cwd(), "content", "site-meta.json");

export function getSiteMeta(): SiteMeta | null {
  try {
    const raw = fs.readFileSync(FILE, "utf8");
    return JSON.parse(raw) as SiteMeta;
  } catch {
    return null;
  }
}

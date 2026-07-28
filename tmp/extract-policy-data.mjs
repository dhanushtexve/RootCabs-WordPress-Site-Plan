import fs from "node:fs";
import path from "node:path";

const [inputPath, outputPath] = process.argv.slice(2);

if (!inputPath || !outputPath) {
  console.error("Usage: node extract-policy-data.mjs <policy-data.php> <output.ts>");
  process.exit(1);
}

const source = fs.readFileSync(inputPath, "utf8");
const returnIndex = source.indexOf("return array(");

if (returnIndex === -1) {
  throw new Error("Could not find return array(...).");
}

let i = returnIndex + "return ".length;

function skipWhitespace() {
  while (/\s/.test(source[i] || "")) i += 1;
}

function parseString() {
  if (source[i] !== "'") {
    throw new Error(`Expected string at ${i}`);
  }

  i += 1;
  let value = "";

  while (i < source.length) {
    const char = source[i];

    if (char === "\\") {
      const next = source[i + 1];
      if (next === "'" || next === "\\") {
        value += next;
        i += 2;
        continue;
      }
    }

    if (char === "'") {
      i += 1;
      return value;
    }

    value += char;
    i += 1;
  }

  throw new Error("Unterminated string.");
}

function parseValue() {
  skipWhitespace();

  if (source.startsWith("array", i)) {
    return parseArray();
  }

  return parseString();
}

function parseArray() {
  if (!source.startsWith("array", i)) {
    throw new Error(`Expected array at ${i}`);
  }

  i += "array".length;
  skipWhitespace();

  if (source[i] !== "(") {
    throw new Error(`Expected ( at ${i}`);
  }

  i += 1;
  skipWhitespace();

  const entries = [];
  let keyed = false;

  while (i < source.length && source[i] !== ")") {
    const first = parseValue();
    skipWhitespace();

    if (source.startsWith("=>", i)) {
      keyed = true;
      i += 2;
      const value = parseValue();
      entries.push([first, value]);
    } else {
      entries.push(first);
    }

    skipWhitespace();

    if (source[i] === ",") {
      i += 1;
      skipWhitespace();
    }
  }

  if (source[i] !== ")") {
    throw new Error(`Expected ) at ${i}`);
  }

  i += 1;

  if (!keyed) {
    return entries;
  }

  return Object.fromEntries(entries);
}

const data = parseArray();

function cleanPublicContent(value) {
  if (typeof value === "string") {
    return value.replace(/<div class="rc-policy-note">[\s\S]*?<\/div>/g, "");
  }

  if (Array.isArray(value)) {
    return value.map(cleanPublicContent);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, cleanPublicContent(entry)]),
    );
  }

  return value;
}

const publicData = cleanPublicContent(data);
const output = `export type PolicySection = {
  id: string;
  title: string;
  content: string;
};

export type PolicyDocument = {
  key: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  effective: string;
  jurisdiction: string;
  contact: string;
  footer_contact: string;
  nav: Array<{ label: string; slug: string }>;
  intro: string[];
  sections: PolicySection[];
  footer: string;
};

export const policyDocuments = ${JSON.stringify(publicData, null, 2)} as Record<string, PolicyDocument>;

export function getPolicyDocument(key: string): PolicyDocument | null {
  return policyDocuments[key] ?? null;
}
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, output);

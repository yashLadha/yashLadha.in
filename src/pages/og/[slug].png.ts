import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import type { APIRoute, GetStaticPaths } from "astro";
import { loadPosts, ogImage, type PostSummary } from "../../lib/posts";

// Social cards for posts, since X and LinkedIn cannot render SVG heroes.
export const getStaticPaths = (async () =>
  (await loadPosts())
    .filter((post) => ogImage(post).startsWith("/og/"))
    .map((post) => ({ params: { slug: post.url.split("/").pop() }, props: { post } }))) satisfies GetStaticPaths;

const fontFiles = [
  "Geist-Regular.ttf",
  "Geist-SemiBold.ttf",
  "Geist-Bold.ttf",
  "Geist-Black.ttf",
  "SourceCodePro-Regular.ttf",
  "SourceCodePro-Bold.ttf",
].map((file) => join(process.cwd(), "src/assets/og-fonts", file));

const escape = (text: string) =>
  text.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

function wrap(text: string, width: number, max: number) {
  const lines = [""];
  for (const word of text.split(" ")) {
    const line = lines[lines.length - 1];
    if (line && line.length + word.length >= width) lines.push(word);
    else lines[lines.length - 1] = line ? `${line} ${word}` : word;
  }
  if (lines.length > max) lines.splice(max - 1, Infinity, `${lines[max - 1]}…`);
  return lines;
}

const titleCard = (post: PostSummary) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#faf9f6"/>
  <text x="80" y="120" font-family="Source Code Pro" font-size="24" fill="#8a847a">yashladha.in/blog</text>
  ${wrap(post.title, 28, 4)
    .map((line, i) => `<text x="78" y="${250 + i * 80}" font-family="Geist" font-size="68" font-weight="700" fill="#1c1a17">${escape(line)}</text>`)
    .join("")}
  <text x="80" y="550" font-family="Source Code Pro" font-size="24" fill="#8a847a">${escape(post.date)} · ${post.minutes} min read</text>
</svg>`;

export const GET: APIRoute<{ post: PostSummary }> = async ({ props: { post } }) => {
  const svg = post.heroImage
    ? await readFile(join(process.cwd(), "public", post.heroImage), "utf8")
    : titleCard(post);
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
    font: { loadSystemFonts: false, fontFiles, defaultFontFamily: "Geist" },
  })
    .render()
    .asPng();
  return new Response(new Uint8Array(png));
};

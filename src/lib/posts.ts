import type { MarkdownInstance } from "astro";
import type { Post } from "../types/Post";
import { normalizePath } from "./utils";

export type PostSummary = {
    title: string;
    description: string;
    url: string;
    /** Display date, e.g. "Jan 12, 2025". */
    date: string;
    /** ISO date for `<time datetime>` and sorting, e.g. "2025-01-12". */
    isoDate: string;
    minutes: number;
    heroImage?: string;
};

const WORDS_PER_MINUTE = 225;

// Frontmatter dates like "Jan 12 2025" carry no timezone. Parse and format them in UTC so the
// build machine's timezone cannot shift them by a day.
function parsePubDate(post: MarkdownInstance<Post>): Date {
    const { pubDate } = post.frontmatter;
    if (!pubDate) throw new Error(`Missing pubDate in ${post.file}`);
    return new Date(`${pubDate} UTC`);
}

function postUrl(post: MarkdownInstance<Post>): string {
    if (!post.url)
        throw new Error(`Post outside src/pages has no URL: ${post.file}`);
    return normalizePath(post.url);
}

/** All blog posts, newest first. */
export async function loadPosts(): Promise<PostSummary[]> {
    const modules = Object.values(
        import.meta.glob<MarkdownInstance<Post>>("../pages/blog/*.{md,mdx}", {
            eager: true,
        }),
    );

    const posts = await Promise.all(
        modules.map(async (post) => {
            const published = parsePubDate(post);
            const words = (await post.rawContent())
                .split(/\s+/)
                .filter(Boolean).length;
            return {
                title: post.frontmatter.title,
                description: post.frontmatter.description,
                url: postUrl(post),
                date: published.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "UTC",
                }),
                isoDate: published.toISOString().slice(0, 10),
                minutes: Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)),
                heroImage: post.frontmatter.heroImage,
            };
        }),
    );

    return posts.sort((a, b) => b.isoDate.localeCompare(a.isoDate));
}

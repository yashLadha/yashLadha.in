export type Post = {
  title: string;
  description: string;
  pubDate?: string;
  updatedDate?: string;
  heroImage?: string;
  disableNextBlogLinks?: boolean;
};

export type PostIndex = {
  title: string;
  pubDate: string;
  updatedDate?: string;
  heroImage: string;
  url: string;
};
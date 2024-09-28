import { PostIndex } from "../types/Post";

export function getNextAndPrevBlogs(posts: Array<PostIndex>, title: String) {
  let prevPost: PostIndex;
  let nextPost: PostIndex;
  for (let idx = 0; idx < posts.length; ++idx) {
    prevPost = posts[idx + 1];
    if (posts[idx].title === title) {
      break;
    }
    nextPost = posts[idx];
  }
  return { nextPost, prevPost };
}

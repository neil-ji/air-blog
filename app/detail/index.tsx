import { analyze } from "blog-analyzer";
import React from "react";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
const PostList: any = async ({ id }: any) => {
  const { articleCollector } = await analyze("posts");
  const article = articleCollector.articles.find((item) => {
    return item.id === id;
  });
  const category: string[] = [];
  let p = article?.category;
  while (p) {
    category.push(p.name);
    p = p.parent;
  }

  const md = await marked.parse(article?.content || "-");

  const content = sanitizeHtml(md);

  return (
    <article>
      <h1>{article?.title}</h1>
      <div>Tag: {article?.tags.map(({ name }) => name).join(", ")}</div>
      <div>Category: {category.join(" > ")}</div>
      <hr />
      <section dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default PostList;

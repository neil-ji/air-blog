import { analyze } from "blog-analyzer";
import React from "react";

const PostList: any = async () => {
  const { articleCollector } = await analyze("posts");
  return (
    <ol>
      {articleCollector.articles?.map((article: any) => (
        <li key={article.id}>
          <a href={`/detail/${article.id}`}>{article.title}</a>
        </li>
      ))}
    </ol>
  );
};

export default PostList;

import PostList from "../app/list";
import ReactDomServer from "react-dom/server";
import React from "react";
import { mkdir, rm } from "fs/promises";
import { createWriteStream } from "fs";
import path from "path";

const DEPLOY_PATH = ".deploy";

const { pipe } = ReactDomServer.renderToPipeableStream(<PostList />, {
  async onAllReady() {
    try {
      await rm(DEPLOY_PATH, { recursive: true });
    } catch {
      // Silence
    }
    await mkdir(DEPLOY_PATH);
    const writableStream = createWriteStream(
      path.resolve(DEPLOY_PATH, "list.html"),
    );
    pipe(writableStream);
  },
});

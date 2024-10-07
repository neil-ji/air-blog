import express from "express";
import PostDetail from "../app/detail";
import PostList from "../app/list";
import path from "path";
import { renderToPipeableStream } from "react-dom/server";
import React from "react";

const app = express();
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, ".public")));

app.get("/", async (req, res) => {
  res.set("Content-Type", "text/html");
  res.set("Location", "/list");
  res.sendStatus(302);
});

app.get("/list", async (req, res) => {
  res.set("Content-Type", "text/html");
  renderToPipeableStream(<PostList />).pipe(res);
});

app.get("/detail/:id", async (req, res) => {
  res.set("Content-Type", "text/html");
  renderToPipeableStream(<PostDetail id={req.params.id} />).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

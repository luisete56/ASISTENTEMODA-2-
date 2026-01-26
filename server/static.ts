import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // When compiled, __dirname points to dist/, so we need dist/public
  // Try both relative paths to handle different build scenarios
  const distPath = path.resolve(__dirname, "public");
  const altDistPath = path.resolve(process.cwd(), "dist", "public");
  
  const staticPath = fs.existsSync(distPath) ? distPath : altDistPath;
  
  if (!fs.existsSync(staticPath)) {
    console.error(`Could not find the build directory. Tried: ${distPath} and ${altDistPath}`);
    throw new Error(
      `Could not find the build directory: ${staticPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(staticPath));

  // fall through to index.html if the file doesn't exist
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(staticPath, "index.html"));
  });
}

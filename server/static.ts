import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // When compiled, __dirname points to dist/, so we need dist/public
  // Try both relative paths to handle different build scenarios
  const distPath = path.resolve(__dirname, "public");
  const altDistPath = path.resolve(process.cwd(), "dist", "public");
  
  console.log("Looking for static files...");
  console.log("  - distPath:", distPath, "exists:", fs.existsSync(distPath));
  console.log("  - altDistPath:", altDistPath, "exists:", fs.existsSync(altDistPath));
  
  const staticPath = fs.existsSync(distPath) ? distPath : altDistPath;
  
  if (!fs.existsSync(staticPath)) {
    console.error(`Could not find the build directory. Tried: ${distPath} and ${altDistPath}`);
    console.error("Current working directory:", process.cwd());
    console.error("__dirname:", __dirname);
    // Don't throw, just log and continue - the server should still start
    console.warn("WARNING: Static files not found, but continuing server startup");
    return;
  }

  console.log("Using static path:", staticPath);
  app.use(express.static(staticPath));

  // fall through to index.html if the file doesn't exist
  app.get("*", (_req, res) => {
    const indexPath = path.resolve(staticPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      console.error("index.html not found at:", indexPath);
      res.status(404).send("Not Found");
    }
  });
}

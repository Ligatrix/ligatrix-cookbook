#!/usr/bin/env node
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const dir = "recipes";
const files = (await readdir(dir)).filter((file) => file.endsWith(".md"));
if (files.length < 4) throw new Error("Expected at least four recipes.");

for (const file of files) {
  const text = await readFile(join(dir, file), "utf8");
  for (const required of ["# ", "## Use When", "## Evidence"]) {
    if (!text.includes(required)) throw new Error(`${file} missing ${required}`);
  }
}

console.log(`Checked ${files.length} cookbook recipes.`);


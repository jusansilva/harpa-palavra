import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const distDir = process.env.NEXT_BUILD_DIR || ".next";
mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, "sw-version.js"), `self.__HARPA_PALAVRA_RELEASE=${JSON.stringify(Date.now().toString())};\n`);

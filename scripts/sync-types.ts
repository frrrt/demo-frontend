import * as fs from "fs";
import * as path from "path";

const sourcePath: string = path.join("..", "demo-cms", "src", "payload-types.ts");
const targetPath: string = path.join("src", "payload-types.ts");

/**
 * Type Syncing Utility
 *
 * This script synchronizes the payload-types.ts file from the demo-cms repository
 * to the demo-frontend repository while making necessary modifications.
 *
 * What it does:
 * 1. Copies the payload-types.ts file from ../demo-cms/src/ to ./src/
 * 2. Removes the "declare module" section that's not needed in the frontend
 * 3. Formats the file using Prettier according to the project's configuration
 *
 * Why it's needed:
 * - Keeps type definitions in sync between backend and frontend
 * - Avoids duplicate module declarations that could cause TypeScript errors
 * - Works cross-platform (Windows, macOS, Linux) using Node.js APIs
 * - Uses the Prettier API directly to ensure only the target file is formatted
 * - Carefully loads the project's Prettier configuration to maintain consistent formatting
 *
 * Usage:
 * Run with tsx: `tsx sync-types.ts`
 * Or add it to your package.json scripts: "sync-types": "tsx sync-types.ts"
 */
try {
  fs.copyFileSync(sourcePath, targetPath);
  console.log(`Successfully copied ${sourcePath} to ${targetPath}`);

  let content = fs.readFileSync(targetPath, "utf8");

  const removePattern = `declare module "payload" {
  export interface GeneratedTypes extends Config {}
}`;

  content = content.replace(removePattern, "");

  fs.writeFileSync(targetPath, content);
  console.log("Removed payload module declaration");

  import("prettier")
    .then(async (prettier) => {
      try {
        const options =
          (await prettier.resolveConfig(process.cwd(), {
            config: path.resolve(process.cwd(), ".prettierrc.json"),
            editorconfig: true,
          })) || {};

        const formattedContent = await prettier.format(content, {
          ...options,
          filepath: targetPath,
        });

        fs.writeFileSync(targetPath, formattedContent);
        console.log(`Successfully formatted ${targetPath} with Prettier`);
      } catch (prettierError) {
        console.error(
          "Prettier error:",
          prettierError instanceof Error ? prettierError.message : String(prettierError),
        );
      }
    })
    .catch((importError) => {
      console.error(
        "Error importing Prettier:",
        importError instanceof Error ? importError.message : String(importError),
      );
      console.log("You may need to install prettier as a dependency: npm install prettier");
    });
} catch (error) {
  console.error("Error:", error instanceof Error ? error.message : String(error));
  process.exit(1);
}

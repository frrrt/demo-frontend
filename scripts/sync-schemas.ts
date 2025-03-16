import * as fs from "node:fs";
import * as path from "node:path";

const sourceDir: string = path.join("..", "demo-cms", "src", "schemas");
const targetDir: string = path.join("src", "schemas");

/**
 * Schema Syncing Utility
 *
 * This script synchronizes the schemas directory from another repository
 * to the current repository.
 *
 * What it does:
 * 1. Removes the existing schemas directory in the current project if it exists
 * 2. Creates a fresh schemas directory
 * 3. Copies all schema files from the source repository to the target directory
 * 4. Formats the files using Prettier according to the project's configuration
 *
 * Why it's needed:
 * - Keeps schema definitions in sync between repositories
 * - Works cross-platform (Windows, macOS, Linux) using Node.js APIs
 * - Uses the Prettier API directly to ensure consistent formatting
 *
 * Usage:
 * Run with tsx: `tsx sync-schemas.ts`
 * Or add it to your package.json scripts: "sync:schemas": "tsx sync-schemas.ts"
 */

// Helper function to copy a directory recursively
function copyDirectoryRecursively(source: string, target: string): void {
  // Remove the schemas directory if it exists, then create it fresh
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
  fs.mkdirSync(target, { recursive: true });

  // Read all items in the source directory
  const items = fs.readdirSync(source);

  // Process each item
  for (const item of items) {
    const sourcePath = path.join(source, item);
    const targetPath = path.join(target, item);

    // Check if the item is a directory or file
    const stats = fs.statSync(sourcePath);

    if (stats.isDirectory()) {
      // Recursively copy subdirectories
      copyDirectoryRecursively(sourcePath, targetPath);
    } else {
      // Copy files
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied: ${sourcePath} → ${targetPath}`);
    }
  }
}

// Main function
async function syncSchemas() {
  try {
    // Check if source directory exists
    if (!fs.existsSync(sourceDir)) {
      throw new Error(`Source directory not found: ${sourceDir}`);
    }

    // Remove target directory if it exists
    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true });
      console.log(`Removed existing directory: ${targetDir}`);
    }

    // Create fresh target directory
    fs.mkdirSync(targetDir, { recursive: true });
    console.log(`Created fresh directory: ${targetDir}`);

    // Copy all schemas recursively
    copyDirectoryRecursively(sourceDir, targetDir);
    console.log("All schemas copied successfully");

    // Format all files with Prettier
    try {
      const prettier = await import("prettier");
      const prettierConfig =
        (await prettier.resolveConfig(process.cwd(), {
          config: path.resolve(process.cwd(), ".prettierrc.json"),
          editorconfig: true,
        })) || {};

      // Function to format files recursively
      async function formatFilesRecursively(directory: string): Promise<void> {
        const items = fs.readdirSync(directory);

        for (const item of items) {
          const itemPath = path.join(directory, item);
          const stats = fs.statSync(itemPath);

          if (stats.isDirectory()) {
            await formatFilesRecursively(itemPath);
          } else if (
            itemPath.endsWith(".ts") ||
            itemPath.endsWith(".js") ||
            itemPath.endsWith(".json")
          ) {
            const content = fs.readFileSync(itemPath, "utf8");
            const formattedContent = await prettier.format(content, {
              ...prettierConfig,
              filepath: itemPath,
            });

            fs.writeFileSync(itemPath, formattedContent);
            console.log(`Formatted: ${itemPath}`);
          }
        }
      }

      await formatFilesRecursively(targetDir);
      console.log("All schema files formatted with Prettier");
    } catch (prettierError) {
      console.error(
        "Prettier error:",
        prettierError instanceof Error ? prettierError.message : String(prettierError),
      );
      console.log(
        "Continuing without formatting. You may need to install prettier: npm install prettier",
      );
    }

    console.log("Schema synchronization completed successfully");
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// Execute the sync function
syncSchemas();

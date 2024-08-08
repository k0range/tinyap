import fs from 'fs';
import path from 'path';

const MODULES_DIR = './modules';

function copyModuleMigrations(modulePath: string) {
  try {
    const migrations = fs.readdirSync(path.join(modulePath, "db", "migrations"), { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => path.join(modulePath, "db", "migrations", dirent.name));
    
    migrations.forEach((migration) => {
      console.log(migration)
      fs.cpSync(migration, path.join("prisma", "migrations", path.basename(migration)), { recursive: true })
    })
  } catch (error) {
    console.error(`Failed to copy migrations from ${modulePath}:`, error);
  }
}

copyModuleMigrations("src/")
const schema = fs.readFileSync(path.join("src", "db", "schema.prisma"), { encoding: "utf-8" })
let mergedSchema = schema

const modules = fs.readdirSync(MODULES_DIR, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => path.join(MODULES_DIR, dirent.name));

console.log(`Found modules: ${modules.join(", ")}`);

modules.forEach(module => {
  console.log(`Processing module: ${module}`);
  copyModuleMigrations(module);

  // Merge schema file
  const schema = fs.readFileSync(path.join(module, "db", "schema.prisma"), { encoding: "utf-8" })
  const filteredSchema = schema.replace(/generator\s*client\s*\{[^}]*\}/g, "").replace(/datasource\s*db\s*\{[^}]*\}/g, "")

  mergedSchema = mergedSchema + "\n" + filteredSchema
});

fs.writeFileSync(path.join("prisma", "schema.prisma"), mergedSchema, { encoding: 'utf-8' })
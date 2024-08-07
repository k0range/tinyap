import fs from 'fs';
import path from 'path';

const MODULES_DIR = './modules';

function copyModuleMigrations(modulePath: string) {
  const migrations = fs.readdirSync(path.join(modulePath, "db", "migrations"), { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => path.join(modulePath, "db", "migrations", dirent.name));
  
    migrations.forEach((migration) => {
      console.log(migration)
      fs.cpSync(migration, path.join("prisma", "migrations", path.basename(migration)), { recursive: true })
    })
}

copyModuleMigrations("src/")

const modules = fs.readdirSync(MODULES_DIR, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => path.join(MODULES_DIR, dirent.name));

modules.forEach(copyModuleMigrations);
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { spawnSync } from 'child_process';

const MODULES_DIR = './modules';

function installModuleDependencies(modulePath: string) {
  if (existsSync(join(modulePath, 'package.json'))) {
    console.log(`Installing dependencies for ${modulePath}`);
    spawnSync('bun', ['install'], { cwd: modulePath, stdio: 'inherit' });
  }
}

function installAllModules() {
  const modules = readdirSync(MODULES_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => join(MODULES_DIR, dirent.name));

  modules.forEach(installModuleDependencies);
}

installAllModules();
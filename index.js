const fs = require('fs');
const path = require('path');
const pkgUp = require('pkg-up');
const prettier = require('prettier');

const CANOPIC_SETTING = process.env.CANOPIC_SETTING || 'default';

let settingPaths;

try {
  settingPaths = fs.readdirSync(`./jars/${CANOPIC_SETTING}`);
} catch (err) {
  console.error(`Cannot find the "${CANOPIC_SETTING}" jar.`);
  throw err;
}

const pkgPath = pkgUp.sync({
  cwd: path.resolve(process.cwd(), '..'),
});

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const overrided = settingPaths
  .map(settingPath => `./jars/${CANOPIC_SETTING}/${settingPath}`)
  .map(settingPath => require(settingPath))
  .map(override => override(pkg, pkgPath))
  .some(overrided => overrided);

if (overrided) {
  const prettiedPkg = prettier.format(JSON.stringify(pkg, null, 2), {
    parser: 'json', ...pkg.prettier
  });

  fs.writeFileSync(pkgPath, prettiedPkg, 'utf8');
}

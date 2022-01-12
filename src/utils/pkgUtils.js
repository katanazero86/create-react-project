import fs from 'fs';
import path from 'path';

function getPackageJson(projectPath) {
    const packagePath = path.join(projectPath, 'package.json');

    let packageJson;
    try {
        packageJson = fs.readFileSync(packagePath, 'utf-8');
    } catch (err) {
        throw new Error(`The package.json file at '${packagePath}' does not exist`);
    }

    try {
        packageJson = JSON.parse(packageJson);
    } catch (err) {
        throw new Error('The package.json is malformed');
    }

    return packageJson;
}

function setPackageJson(projectPath, changedProjectPackageJson) {
    const packagePath = path.join(projectPath, 'package.json');

    const pkgIsExist = fs.existsSync(packagePath);
    if (pkgIsExist) {
        fs.writeFileSync(packagePath, JSON.stringify(changedProjectPackageJson, null, 2), 'utf8');
    } else {
        console.err('Unable to write package.json');
    }
}

export function getPkg(targetPath) {
    const pkg = getPackageJson(targetPath);
    return pkg;
}

export function setPkg(targetPath, targetPkg) {
    setPackageJson(targetPath, targetPkg);
}
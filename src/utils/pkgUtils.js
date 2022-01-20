import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import {ERROR005} from './errors.js';

function getPackageJson(projectPath) {
    const packagePath = path.join(projectPath, 'package.json');

    let packageJson;
    try {
        packageJson = fs.readFileSync(packagePath, 'utf-8');
    } catch (err) {
        console.error(`%s The package.json file at '${packagePath}`, chalk.red.bold('ERROR'));
        throw new Error(ERROR005);
    }

    try {
        packageJson = JSON.parse(packageJson);
    } catch (err) {
        console.error('%s The package.json is malformed', chalk.red.bold('ERROR'));
        throw new Error(ERROR005);
    }

    return packageJson;
}

function setPackageJson(projectPath, changedProjectPackageJson) {
    const packagePath = path.join(projectPath, 'package.json');

    const pkgIsExist = fs.existsSync(packagePath);
    if (pkgIsExist) {
        fs.writeFileSync(packagePath, JSON.stringify(changedProjectPackageJson, null, 2), 'utf8');
    } else {
        console.error('%s Unable to write package.json', chalk.red.bold('ERROR'));
        throw new Error(ERROR005);
    }
}

export function getPkg(targetPath) {
    const pkg = getPackageJson(targetPath);
    return pkg;
}

export function setPkg(targetPath, targetPkg) {
    setPackageJson(targetPath, targetPkg);
}
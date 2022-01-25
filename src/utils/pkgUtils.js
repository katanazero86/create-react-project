import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import {ERROR006} from './errors.js';

const getPackage = (projectPath) => {
    const packagePath = path.join(projectPath, 'package.json');

    let packageJson;
    try {
        packageJson = fs.readFileSync(packagePath, 'utf-8');
    } catch (err) {
        console.error(`%s The package.json file at '${packagePath}`, chalk.red.bold('ERROR'));
        throw new Error(ERROR006);
    }

    try {
        packageJson = JSON.parse(packageJson);
    } catch (err) {
        console.error('%s The package.json is malformed', chalk.red.bold('ERROR'));
        throw new Error(ERROR006);
    }

    return packageJson;
};

const setPackage = (projectPath, changedProjectPackageJson) => {
    const packagePath = path.join(projectPath, 'package.json');

    const pkgIsExist = fs.existsSync(packagePath);
    if (pkgIsExist) {
        fs.writeFileSync(packagePath, JSON.stringify(changedProjectPackageJson, null, 2), 'utf8');
    } else {
        console.error('%s Unable to write package.json', chalk.red.bold('ERROR'));
        throw new Error(ERROR006);
    }
};

export function getPkg(targetPath) {
    const pkg = getPackage(targetPath);
    return pkg;
}

export function setPkg(targetPath, targetPkg) {
    setPackage(targetPath, targetPkg);
}
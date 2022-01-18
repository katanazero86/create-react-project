import {fileURLToPath} from 'url'
import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import {promisify} from 'util';
import {execa} from 'execa';
import Listr from 'listr';
import {getPkg, setPkg} from './utils/pkgUtils.js';

const access = promisify(fs.access);
const copy = promisify(ncp);

function makeDirectory(options) {
    if (!fs.existsSync(`./${options.path}`)) {
        fs.mkdirSync(`./${options.path}`);
    } else {
        console.error('%s That directory already exists', chalk.red.bold('ERROR'));
        process.exit(1);
    }
}

async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
        clobber: false,
    });
}

async function copyTemplateFilesByTailwindCSS(options) {
    return copy(options.tailwindTemplateDirectory, options.targetDirectory, {
        clobber: true,
        filter: (source) => {
            if (fs.lstatSync(source).isDirectory()) {
                return true;
            } else {
                const regExp =  /package.json/g;
                return source.search(regExp) === -1;
            }
        },
    });
}

async function initGit(options) {
    const result = await execa('git', ['init'], {
        cwd: options.targetDirectory,
    });
    if (result.failed) {
        return Promise.reject(new Error('Failed to initialize git'));
    }
    return;
}

function addDependencyAndInitName(options) {
    const pkg = getPkg(options.targetDirectory);
    if (!pkg) {
        console.error('%s package.json file not defined', chalk.red.bold('ERROR'));
    } else {
        pkg.name = options.path;

        if (options.scss) {
            pkg.devDependencies['sass'] = '^1.47.0';
        }
        if (options.tailwind) {
            pkg.devDependencies['autoprefixer'] = '^10.4.2';
            pkg.devDependencies['postcss'] = '^8.4.5';
            pkg.devDependencies['tailwindcss'] = '^3.0.15';
        }
        setPkg(options.targetDirectory, pkg);
    }
}

export async function createReactProject(options) {
    options = {
        ...options,
        targetDirectory: path.resolve(process.cwd(), options.path)
    };

    const pathName = fileURLToPath(new URL('.', import.meta.url))
    const templateDir = path.resolve(
        pathName,
        '../templates',
        options.template
    );
    if (options.tailwind) {
        const templateDir = path.resolve(
            pathName,
            '../templates/tailwind',
        );
        options.tailwindTemplateDirectory = templateDir;
    }

    options.templateDirectory = templateDir;

    try {
        await access(templateDir, fs.constants.R_OK);
    } catch (err) {
        console.error(err);
        console.error('%s Invalid template name', chalk.red.bold('ERROR'));
        process.exit(1);
    }

    const tasks = new Listr([
        {
            title: 'Create project directory',
            task: () => makeDirectory(options),
        },
        {
            title: 'Copy project files',
            task: () => copyTemplateFiles(options),
        },
        {
            title: 'Copy TailwindCSS files',
            task: () => copyTemplateFilesByTailwindCSS(options),
        },
        {
            title: 'Add dependency to project',
            task: () => addDependencyAndInitName(options),
        },
        {
            title: 'Initialize git',
            task: () => initGit(options),
            enabled: () => options.git,
        },
    ]);

    await tasks.run();
    console.log('%s Project ready', chalk.green.bold('DONE'));
    console.log(`%s cd ${options.targetDirectory} npm i && npm run dev`, chalk.cyan.bold('INFO'));
    return true;
}
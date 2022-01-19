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
                const regExp = /package.json/g;
                return source.search(regExp) === -1;
            }
        },
    });
}

async function copyTemplateFilesByEslintAndPrettier(options) {
    return copy(options.eslintAndPrettierTemplateDirectory, options.targetDirectory, {
        clobber: true
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

async function installDependencies(options) {
    const result = await execa('npm', ['i'], {
        cwd: options.targetDirectory,
    });
    if (result.failed) {
        return Promise.reject(new Error('Failed to install dependencies'));
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

        if (options.eslintAndPrettier) {
            pkg.devDependencies['eslint'] = '^8.7.0';
            pkg.devDependencies['eslint-plugin-react'] = '^7.28.0';
            pkg.devDependencies['eslint-config-prettier'] = '^8.3.0';
            pkg.devDependencies['eslint-plugin-prettier'] = '^4.0.0';
            pkg.devDependencies['eslint-webpack-plugin'] = '^3.1.1';
            pkg.devDependencies['prettier'] = '^2.5.1';

            if (options.template === 'typescript') {
                pkg.devDependencies['@typescript-eslint/eslint-plugin'] = '^5.10.0';
                pkg.devDependencies['@typescript-eslint/parser'] = '^5.10.0';
            }

            pkg.scripts['lint'] = "eslint './src/**/*.{ts,tsx,js,jsx}'";
            pkg.scripts['lint:fix'] = "eslint --fix './src/**/*.{ts,tsx,js,jsx}'";
            pkg.scripts['prettier:fix'] = "prettier --write 'src/**/*.{ts,tsx,js,jsx}'";

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
    options.templateDirectory = templateDir;

    if (options.tailwind) {
        const templateDir = path.resolve(
            pathName,
            '../templates/tailwind',
        );
        options.tailwindTemplateDirectory = templateDir;
    }

    if (options.eslintAndPrettier) {
        const templateDir = path.resolve(
            pathName,
            `../templates/eslintAndPrettier`,
            options.template
        );
        options.eslintAndPrettierTemplateDirectory = templateDir;
    }

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
            enabled: () => {
                if (!options.tailwindTemplateDirectory) return false;
                return true;
            },
            task: () => copyTemplateFilesByTailwindCSS(options),
        },
        {
            title: 'Copy ESLint + Prettier files',
            enabled: () => options.eslintAndPrettier,
            task: () => copyTemplateFilesByEslintAndPrettier(options),
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
        {
            title: 'Install dependencies',
            task: () => installDependencies(options),
        }
    ]);

    await tasks.run();
    console.log(`%s! Created by ${options.path} at ${options.targetDirectory}`, chalk.green.bold('SUCCESS'));
    console.log('%s', chalk.cyan.bold(`cd ${options.path}`));
    console.log('%s', chalk.cyan.bold(`npm run dev`));
    console.log('%s', chalk.white.bold.underline(`Happy hacking! :)`));
    return true;
}
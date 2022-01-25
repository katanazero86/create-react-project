import {fileURLToPath} from 'url'
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import {promisify} from 'util';
import Listr from 'listr';
import MainJavascript from './core/MainJavascript.js';
import MainTypescript from './core/MainTypescript.js';
import handleError from './utils/errors.js'

const access = promisify(fs.access);

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

    if(options.jest) {
        const templateDir = path.resolve(
            pathName,
            `../templates/jest`,
            options.template
        );
        options.jestTemplateDirectory = templateDir;
    }

    try {
        await access(templateDir, fs.constants.R_OK);
    } catch (err) {
        console.error(err);
        console.error('%s Invalid template name', chalk.red.bold('ERROR'));
        process.exit(1);
    }

    const targetMainObj = options.template === 'javascript' ? new MainJavascript({...options}) : new MainTypescript({...options});

    const tasks = new Listr([
        {
            title: 'Create project directory',
            task: () => targetMainObj.makeProjectDirectory(),
        },
        {
            title: 'Copy project template',
            task: () => targetMainObj.copyProjectTemplate(),
        },
        {
            title: 'Copy TailwindCSS template',
            enabled: () => options.tailwind,
            task: () => targetMainObj.copyTailwindTemplate(),
        },
        {
            title: 'Copy ESLint + Prettier template',
            enabled: () => options.eslintAndPrettier,
            task: () => targetMainObj.copyEslintAndPrettierTemplate(),
        },
        {
            title: 'Copy Jest template',
            enabled: () => options.jest,
            task: () => targetMainObj.copyJestTemplate(),
        },
        {
            title: 'Add dependency to project',
            task: () => targetMainObj.addDependency(),
        },
        {
            title: 'Initialize git',
            enabled: () => options.git,
            task: () => targetMainObj.initGit(),
        },
        {
            title: 'Install dependencies',
            task: () => targetMainObj.installDependencies(),
        }
    ]);

    try {
        await tasks.run();
        console.log(`%s! Created by ${options.path} at ${options.targetDirectory}`, chalk.green.bold('SUCCESS'));
        console.log('%s', chalk.cyan.bold(`cd ${options.path}`));
        console.log('%s', chalk.cyan.bold(`npm run dev`));
        console.log('%s', chalk.white.bold.underline(`Happy hacking! :)`));
    } catch (err) {
        console.error('%s An error occurred while creating the project.', chalk.red.bold('ERROR'));
        const targetKey = err.message;
        handleError[targetKey]();
        process.exit(1);
    }

    return true;
}
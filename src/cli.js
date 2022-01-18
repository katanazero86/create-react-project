import arg from 'arg';
import inquirer from 'inquirer';
import chalk from 'chalk';
import {createReactProject} from './main.js';

function parseArgumentsIntoOptions(rawArgs) {

    try {
        const args = arg(
            {
                '--git': Boolean,
                '--yes': Boolean,
                '--javascript': Boolean,
                '--typescript': Boolean,
                '-y': '--yes',
            },
            {
                argv: rawArgs.slice(2),
            }
        );

        if (args['--javascript'] && args['--typescript']) {
            throw new Error();
        }

        let argvTemplate = null;
        if (args['--javascript']) argvTemplate = 'JavaScript';
        if (args['--typescript']) argvTemplate = 'TypeScript';

        return {
            skipPrompts: args['--yes'] || false,
            git: args['--git'] || false,
            template: argvTemplate,
            path: args['_'][0] || 'react-project-template',
        };
    } catch {
        console.error('%s Only one template allowed', chalk.red.bold('ERROR'));
        process.exit(1);
    }
}

async function promptForMissingOptions(options) {
    const defaultTemplate = 'JavaScript';
    if (options.skipPrompts) {
        return {
            ...options,
            template: options.template || defaultTemplate,
            git: true,
            scss: true,
        };
    }

    const questions = [];
    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Please choose which project template to use',
            choices: ['JavaScript', 'TypeScript'],
            default: defaultTemplate,
        });
    }

    if (!options.git) {
        questions.push({
            type: 'confirm',
            name: 'git',
            message: 'Initialize a git repository?',
            default: false,
        });
    }

    if (!options.scss) {
        questions.push({
            type: 'confirm',
            name: 'scss',
            message: 'Do you need CSS Pre-processors? (Sass/SCSS)',
            default: false,
        });
    }

    if (!options.tailwind) {
        questions.push({
            type: 'confirm',
            name: 'tailwind',
            message: 'Add tailwind CSS?(v3)',
            default: false,
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        template: options.template || answers.template,
        git: options.git || answers.git,
        scss: options.scss || answers.scss,
        tailwind: options.tailwind || answers.tailwind,
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    await createReactProject(options);
}
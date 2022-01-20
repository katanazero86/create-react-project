import chalk from 'chalk';

export const ERROR001 = 'ERROR001';
export const ERROR002 = 'ERROR002';
export const ERROR003 = 'ERROR003';
export const ERROR004 = 'ERROR004';
export const ERROR005 = 'ERROR005';
export const ERROR006 = 'ERROR006';
export const ERROR007 = 'ERROR007';


export default {
    [ERROR001]: function () {
        console.error('%s That directory already exists.', chalk.red.bold.underline('ERROR'));
    },
    [ERROR002]: function () {
        console.error('%s Failed to copy project template step.', chalk.red.bold.underline('ERROR'));
    },
    [ERROR003]: function () {
        console.error('%s Failed to copy TailwindCSS template step.', chalk.red.bold.underline('ERROR'));
    },
    [ERROR004]: function () {
        console.error('%s Failed to copy ESLint + Prettier template step.', chalk.red.bold.underline('ERROR'));
    },
    [ERROR005]: function () {
        console.error('%s Failed to Add dependency to project step.', chalk.red.bold.underline('ERROR'));
    },
    [ERROR006]: function () {
        console.error('%s Failed to initialize git step.', chalk.red.bold.underline('ERROR'));
    },
    [ERROR007]: function () {
        console.error('%s Failed to install dependencies step.', chalk.red.bold.underline('ERROR'));
    }
}
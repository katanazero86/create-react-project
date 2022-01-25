import fs from "fs";
import ncp from 'ncp';
import {execa} from 'execa';
import {ERROR001, ERROR002, ERROR003, ERROR004, ERROR005, ERROR007, ERROR008} from '../utils/errors.js';

export default class Main {

    constructor(options) {
        this.options = options;
    }

    makeProjectDirectory() {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(`./${this.options.path}`)) {
                fs.mkdirSync(`./${this.options.path}`);
                resolve('');
            } else {
                reject(new Error(ERROR001));
            }

        });
    }

    copyProjectTemplate() {
        return new Promise((resolve, reject) => {
            ncp(this.options.templateDirectory, this.options.targetDirectory, {
                clobber: false,
            }, function (err) {
                if (err) reject(new Error(ERROR002));
                resolve('');
            })

        });
    }

    copyTailwindTemplate() {
        return new Promise((resolve, reject) => {
            ncp(this.options.tailwindTemplateDirectory, this.options.targetDirectory, {
                clobber: true,
                filter: (source) => {
                    if (fs.lstatSync(source).isDirectory()) {
                        return true;
                    } else {
                        const regExp = /package.json/g;
                        return source.search(regExp) === -1;
                    }
                },
            }, function (err) {
                if (err) reject(new Error(ERROR003));
                resolve('');
            });
        });
    }

    copyEslintAndPrettierTemplate() {
        return new Promise((resolve, reject) => {
            ncp(this.options.eslintAndPrettierTemplateDirectory, this.options.targetDirectory, {
                clobber: true,
            }, function (err) {
                if (err) reject(new Error(ERROR004));
                resolve('');
            });
        });
    }

    copyJestTemplate() {
        return new Promise((resolve, reject) => {
            ncp(this.options.jestTemplateDirectory, this.options.targetDirectory, {
                clobber: true,
            }, function (err) {
                if (err) reject(new Error(ERROR005));
                resolve('');
            });
        });
    }

    addDependency() {

    }

    async initGit() {
        const result = await execa('git', ['init'], {
            cwd: this.options.targetDirectory,
        });
        if (result.failed) {
            return Promise.reject(new Error(ERROR007));
        }
        return true;
    }

    async installDependencies() {
        const result = await execa('npm', ['i'], {
            cwd: this.options.targetDirectory,
        });
        if (result.failed) {
            return Promise.reject(new Error(ERROR008));
        }
        return true;
    }


}
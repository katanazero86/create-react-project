import Main from './Main.js';
import {getPkg, setPkg} from '../utils/pkgUtils.js';
import chalk from 'chalk';
import {ERROR006} from '../utils/errors.js';

export default class MainTypescript extends Main {

    addDependency() {
        const pkg = getPkg(this.options.targetDirectory);
        if (!pkg) {
            console.error('%s package.json file not defined', chalk.red.bold('ERROR'));
            throw new Error(ERROR006);
        } else {
            pkg.name = this.options.path;

            if (this.options.scss) {
                pkg.devDependencies['sass'] = '^1.47.0';
            }

            if (this.options.tailwind) {
                pkg.devDependencies['autoprefixer'] = '^10.4.2';
                pkg.devDependencies['postcss'] = '^8.4.5';
                pkg.devDependencies['tailwindcss'] = '^3.0.15';
            }

            if (this.options.eslintAndPrettier) {
                pkg.devDependencies['eslint'] = '^8.7.0';
                pkg.devDependencies['eslint-plugin-react'] = '^7.28.0';
                pkg.devDependencies['eslint-config-prettier'] = '^8.3.0';
                pkg.devDependencies['eslint-plugin-prettier'] = '^4.0.0';
                pkg.devDependencies['eslint-webpack-plugin'] = '^3.1.1';
                pkg.devDependencies['prettier'] = '^2.5.1';
                pkg.devDependencies['@typescript-eslint/eslint-plugin'] = '^5.10.0';
                pkg.devDependencies['@typescript-eslint/parser'] = '^5.10.0';
                pkg.devDependencies['fork-ts-checker-webpack-plugin'] = '^7.0.0';
                pkg.scripts['lint'] = "eslint './src/**/*.{ts,tsx,js,jsx}'";
                pkg.scripts['lint:fix'] = "eslint --fix './src/**/*.{ts,tsx,js,jsx}'";
                pkg.scripts['prettier:fix'] = "prettier --write 'src/**/*.{ts,tsx,js,jsx}'";
            }

            if (this.options.jest) {
                pkg.devDependencies['@testing-library/jest-dom'] = '^5.16.1';
                pkg.devDependencies['@testing-library/react'] = '^12.1.2';
                pkg.devDependencies['babel-jest'] = '^27.4.6';
                pkg.devDependencies['jest'] = '^27.4.7';
                pkg.devDependencies['jest-svg-transformer'] = '^1.0.0';
                pkg.devDependencies['identity-obj-proxy'] = '^3.0.0';
                pkg.devDependencies['@types/jest'] = '^27.4.0';
                pkg.scripts['test'] = "jest --verbose";
            }

            setPkg(this.options.targetDirectory, pkg);
        }
    }

}
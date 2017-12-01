import path from 'path';
import { minify } from 'uglify-es';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

const babelConfig = {
    babelrc: false,
    presets: [
        ['env', { modules: false }],
    ],
    plugins: [
        [
            'wildcard',
            {
                exts: [
                    'js',
                    'es6',
                    'es',
                    'jsx',
                    'javascript',
                    'json',
                ],
                noCamelCase: true,
            },
        ],
        'external-helpers',
    ],
    exclude: ['node_modules/**'],
};

export default [
    // browser-friendly UMD build
    {
        input: 'src/default.js',
        output: {
            file: path.resolve('dist', pkg.browser),
            format: 'umd',
            exports: 'default',
        },
        name: 'transmute',
        plugins: [
            resolve(), // so Rollup can find `ms`
            commonjs({
                namedExports: {
                    'dot-prop': ['get', 'has', 'set', 'delete'],
                },
            }), // so Rollup can convert `ms` to an ES module
            babel(babelConfig),
            uglify({}, minify),
            filesize(),
        ],
    },

    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // the `targets` option which can specify `dest` and `format`)
    {
        input: 'src/index.js',
        external: Object.keys(pkg.dependencies),
        output: [
            { file: path.resolve('dist', pkg.main), format: 'cjs', exports: 'named' },
            { file: path.resolve('dist', pkg.module), format: 'es', exports: 'named' },
        ],
        plugins: [
            babel(babelConfig),
            uglify({}, minify),
            filesize(),
        ],
    },
];

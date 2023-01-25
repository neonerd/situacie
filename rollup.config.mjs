import copy from 'rollup-plugin-copy'

import html from '@rollup/plugin-html'
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import scss from 'rollup-plugin-scss'

import typescript from "rollup-plugin-typescript2"
import typescriptM from 'typescript'

import serve from 'rollup-plugin-serve'

export default {
    input: './src/index.ts',
    output: {
        dir: 'dist',
        format: 'cjs',
    },
    plugins: [
        resolve({
            mainFields: ["module"], // Default: ["module", "main"]
        }),

        commonjs({
            include: "node_modules/**"
        }),

        typescript({
            typescript: typescriptM,
            tsconfig: "./tsconfig.json"
        }),

        scss(),

        html({
            title: 'ťahať a púšťať'
        }),

        copy({
            targets: [
                { src: 'vendor/fonts', dest: 'dist' }
            ]
        }),

        serve('dist')
    ]
  }

import html from '@rollup/plugin-html'
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import typescript from '@rollup/plugin-typescript'

import copy from 'rollup-plugin-copy'
import scss from 'rollup-plugin-scss'
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

        typescript(),

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
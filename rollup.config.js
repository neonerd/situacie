import copy from 'rollup-plugin-copy'
import html from '@rollup/plugin-html'
import styles from "rollup-plugin-styles";

import typescript from "rollup-plugin-typescript2"
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

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
            typescript: require("typescript"),
            tsconfig: "./tsconfig.json"
        }),

        styles(),

        html({}),

        copy({
            targets: [
                { src: 'vendor/fonts', dest: 'dist' }
            ]
        })
    ]
  }
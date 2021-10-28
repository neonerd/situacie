import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy'
import html from '@rollup/plugin-html'
import styles from "rollup-plugin-styles";

export default {
    input: './src/index.ts',
    output: {
        dir: 'dist',
        format: 'cjs',
    },
    plugins: [
        typescript(),
        styles(),
        html({}),
        copy({
            targets: [
                { src: 'vendor/fonts', dest: 'dist' }
            ]
        })
    ]
  }
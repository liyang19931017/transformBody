import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';
const path = require('path');

export default {
    input: path.resolve(__dirname, './src/main.ts'),
    output: {
        file: './dist/index.js',
        format: 'esm',
        sourcemap: true
    },
    plugins: [
        typescript(),
        babel({
            exclude: 'node_modules/**' // 只编译我们的源代码
        })
    ]
}
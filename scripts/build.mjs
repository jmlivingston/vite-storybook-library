import commonjs from '@rollup/plugin-commonjs'
import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { rollup } from 'rollup'
import react from '@vitejs/plugin-react'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'

const distDirectory = path.join(path.resolve(), './dist')
const packagesDirectory = path.join(path.resolve(), './src/packages')
const buildFormats = ['cjs', 'es']

rimraf.sync(distDirectory)
fs.mkdirSync(distDirectory)

function createReadMePackageJson({ sourceDir, targetDir }) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  if (fs.existsSync(path.join(sourceDir, 'README.md'))) {
    fs.copyFileSync(
      path.join(sourceDir, 'README.md'),
      path.join(targetDir, 'README.md')
    )
  }
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(sourceDir, 'package.json')).toString()
  )
  fs.writeFileSync(
    path.join(targetDir, 'package.json'),
    JSON.stringify(
      {
        name: packageJson.name,
        description: packageJson.description,
        version: packageJson.version,
        author: packageJson.author,
        license: packageJson.license,
        repository: packageJson.repository,
        keywords: packageJson.keywords,
        dependencies: packageJson.dependencies,
        peerDependencies: packageJson.peerDependencies,
      },
      null,
      2
    )
  )
}

fs.readdirSync(packagesDirectory)
  .forEach(async (packageDirectory) => {
    const parentDirectory = path.join(packagesDirectory, packageDirectory)
    const packageDistDirectory = path.join(distDirectory, packageDirectory)
    createReadMePackageJson({
      sourceDir: parentDirectory,
      targetDir: packageDistDirectory,
    })
    let inputFile = path.join(parentDirectory, 'index.js')
    if (!fs.existsSync(inputFile)) {
      inputFile = path.join(parentDirectory, `${packageDirectory}.jsx`)
    }

    const output = buildFormats.map((format) => ({
      file: path.join(packageDistDirectory, format, 'index.js'),
      format,
      exports: 'named',
      globals: {
        react: 'React',
      },
    }))

    const config = {
      input: inputFile,
      output,
      plugins: [
        babel({
          babelHelpers: 'bundled',
          exclude: '/node_modules/**',
          presets: ['@babel/preset-env', '@babel/preset-react'],
        }),
        commonjs(),
        nodeResolve({
          extensions: ['.jsx'],
        }),
        postcss(),
        react(),
        terser(),
      ],
      external: ['prop-types', 'react'],
    }
    const bundle = await rollup(config)
    output.forEach(async (outputItem, index) => {
      await bundle.generate(outputItem)
      await bundle.write(outputItem)
      if (index === output.length) {
        await bundle.close()
      }
    })
  })

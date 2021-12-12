import metablock from "rollup-plugin-userscript-metablock"
import { terser } from "rollup-plugin-terser"
import glob from "glob"
import path from "path"
import fs from "fs"
import pkg from "./package.json"

const repoRootUrl = pkg.repository.url.slice(4, -4)
const scriptSources = glob.sync(path.resolve("src/!(utils)"))

function getScriptUrl(name) {
  return `${repoRootUrl}/raw/main/dist/${name}.user.js`
}

function getBetaScriptUrl(name) {
  return `${repoRootUrl}/raw/develop/dist/${name}.user.js`
}

/**
 * Generates an array of rollup configs with a shallow iterationthrough src/
 *
 * - config.input is always src\/*\/index.js
 * - config.output.file is always dist/<src_dir_name>[-<build_type>].user.js
 * - override to meta block is derived from src\/*\/meta.json
 */

export default scriptSources.reduce((configs, sourcePath) => {
  const pathParts = sourcePath.split("/")
  const name = pathParts[pathParts.length - 1]
  const mainFile = path.resolve(`dist/${name}.user.js`)
  const betaFile = path.resolve(`dist/${name}-beta.user.js`)
  const input = `${sourcePath}/index.js`

  const metaPath = `${sourcePath}/meta.json`
  const metaOverride = fs.existsSync(metaPath)
    ? JSON.parse(fs.readFileSync(metaPath, "utf8"))
    : undefined

  const scriptUrl = getScriptUrl(name)
  const betaScriptUrl = getBetaScriptUrl(name)

  return [
    ...configs,
    {
      input,
      output: [
        {
          file: mainFile,
          format: "iife",
          plugins: [
            metablock({
              file: path.resolve("./meta.json"),
              override: {
                ...metaOverride,
                downloadURL: scriptUrl,
                updateURL: scriptUrl,
              },
            }),
          ],
        },
      ],
      plugins: [
        terser({
          mangle: true,
          format: {
            comments: function (_, comment) {
              var text = comment.value
              var type = comment.type
              if (type == "comment1") {
                return /@[a-zA-Z]|UserScript/i.test(text)
              }
            },
          },
        }),
      ],
    },
    {
      input,
      output: [
        {
          file: betaFile,
          format: "iife",
          generatedCode: { compact: false },
          plugins: [
            metablock({
              file: path.resolve("./meta.json"),
              override: {
                ...metaOverride,
                downloadURL: betaScriptUrl,
                updateURL: betaScriptUrl,
              },
            }),
          ],
        },
      ],
    },
  ]
}, [])

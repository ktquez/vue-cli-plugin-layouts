module.exports = (api, options) => {
  const vel = 'https://github.com/ktquez/vue-extend-layout'

  api.extendPackage({
    dependencies: {
      'vue-extend-layout': '^2.0.6'
    }
  })

  if (options.addLayoutsTemplate) {
    api.render('./template')
    const fs = require('fs')
    const appPath = api.resolve('src/App.vue')
    return api.onCreateComplete(() => {
      try {
        const tplAppPath = api.resolve('src/layouts/App.vue')
        fs.copyFileSync(appPath, 'src/layouts/default.vue')
        fs.copyFileSync(tplAppPath, 'src/App.vue')
        fs.unlink(tplAppPath)

        const layoutDefault = api.resolve('src/layouts/default.vue')
        if (fs.existsSync(layoutDefault)) {
          let content = fs.readFileSync(layoutDefault, { encoding: 'utf8' })
          content = content.replace(' id="app"', '')
          fs.writeFileSync(layoutDefault, content, { encoding: 'utf8' })
        }

        api.exitLog(`Successfully installed, to learn more: ${vel}`, 'info')
      } catch (e) {
        api.exitLog(`Your main file couldn't be modified. Please, visit our repository to learn more about how to manually generate layouts: ${vel}#create-and-using-layouts`, 'warn')
      }
    })
  }

  api.exitLog(`Visit the vue-extend-layout repository to learn more about how to manually generate layouts: ${vel}#create-and-using-layouts`, 'info')
}

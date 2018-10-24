module.exports = (api, options) => {
  api.extendPackage({
    dependencies: {
      'vue-extend-layout': '^2.0.5'
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

        api.exitLog('Successfully installed, to learn more: https://github.com/ktquez/vue-extend-layout', 'info')
      } catch (e) {
        api.exitLog('Your main file couldn\'t be modified. Please, visit our repository to learn more about how to manually generate layouts: https://github.com/ktquez/vue-extend-layout#create-and-using-layouts', 'warn')
      }
    })
  }

  api.exitLog('Visit the vue-extend-layout repository to learn more about how to manually generate layouts: https://github.com/ktquez/vue-extend-layout#create-and-using-layouts', 'info')
}

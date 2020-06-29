import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa'
  },
  theme: {
    themes: {
      light: {
        primary: colors.lightBlue.darken2,
        secondary: colors.grey.darken3,
        accent: colors.blue.accent1,
        error: colors.red.accent2,
        info: colors.blue,
        success: colors.green,
        warning: colors.amber
      }
    }
  }
})

// Initialise Apps framework client. See also:
// https://developer.zendesk.com/apps/docs/developer-guide/getting_started
var client = ZAFClient.init()

// Vuetify settings
const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#0288D1',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
})

// Initialise Vue instance
const vm = new Vue({
  el: '#app',
  vuetify: vuetify,

  /////////////////////////////////////////////////////////////////////////////
  // Data
  /////////////////////////////////////////////////////////////////////////////

  data: {
    // Loader status
    loading: false,

    // Ticket info
    ticket: {},

    // Default avatar URL
    defaultAvatar: 'https://i2.wp.com/assets.zendesk.com/images/2016/default-avatar-80.png',

    // Selected item
    item: 0,

    // Items (built with ...)
    items: [
      { text: 'Vue.js', url: 'https://vuejs.org/' },
      { text: 'Vuetify', url: 'https://vuetifyjs.com/en/' },
      { text: 'ZAF Client API', url: 'https://developer.zendesk.com/apps/docs/core-api/client_api' },
      { text: 'Marcelo De Bortoli 😉' }
    ]
  },

  /////////////////////////////////////////////////////////////////////////////
  // Computed
  /////////////////////////////////////////////////////////////////////////////

  computed: {},

  /////////////////////////////////////////////////////////////////////////////
  // Methods
  /////////////////////////////////////////////////////////////////////////////

  methods: {
    // Load initial data
    loadInitialData: async function () {
      try {
        this.loading = true

        await this.fetchTicketInfo()
      }

      catch (err) {
        console.error(err)
      }

      finally {
        this.loading = false
      }
    },

    // Get current ticket info
    fetchTicketInfo: async function () {
      try {
        const ticket = (await client.get('ticket')).ticket

        this.ticket = ticket
      }

      catch (err) {
        this.handleError(err, 'An error has occurred while fetching ticket information.')
      }
    },

    // Handle error messages
    handleError: function (err, message) {
      if (message) {
        client.invoke('notify', message, 'error', {
          sticky: true
        })
      }

      throw err
    }
  },

  /////////////////////////////////////////////////////////////////////////////
  // Created
  /////////////////////////////////////////////////////////////////////////////

  // Execute when the app is created
  created: function () {
    this.loadInitialData()
  }

})

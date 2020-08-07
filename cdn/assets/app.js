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
      }
    }
  }
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
    selectedItem: 0,

    // Items (built with ...)
    items: [
      {
        name: 'Vue.js',
        url: 'https://vuejs.org/'
      },
      {
        name: 'Vuetify',
        url: 'https://vuetifyjs.com/en/'
      },
      {
        name: 'ZAF Client API',
        url: 'https://developer.zendesk.com/apps/docs/core-api/client_api'
      },
      {
        name: 'Marcelo De Bortoli 😉',
        email: 'marcelodebortoli@gmail.com',
        avatarUrl: 'https://secure.gravatar.com/avatar/08076417b258015b9e12af346358edeb?s=200'
      }
    ]
  },

  /////////////////////////////////////////////////////////////////////////////
  // Computed
  /////////////////////////////////////////////////////////////////////////////

  computed: {
    // Return ticket requester information
    ticketRequester: function () {
      let user = {
        name: null,
        email: null,
        avatarUrl: this.defaultAvatar
      }

      const currentItem = this.items[this.selectedItem]

      // Easter Egg (if the current selected item is a user)
      if (currentItem && currentItem.name && currentItem.email) {
        user = {
          name: currentItem.name,
          email: currentItem.email,
          avatarUrl: currentItem.avatarUrl || this.defaultAvatar
        }
      }
      else if (this.ticket && this.ticket.requester) {
        user = {
          name: this.ticket.requester.name || user.name,
          email: this.ticket.requester.email || user.email,
          avatarUrl: this.ticket.requester.avatarUrl || this.defaultAvatar
        }
      }

      return user
    }
  },

  /////////////////////////////////////////////////////////////////////////////
  // Methods
  /////////////////////////////////////////////////////////////////////////////

  methods: {
    // Load initial data
    loadInitialData: async function () {
      try {
        this.loading = true
        this.ticket = await this.fetchTicketInfo()
      }

      catch (err) {
        client.invoke('notify', err, 'error', {
          sticky: true
        })
      }

      finally {
        this.loading = false
      }
    },

    // Fetch current ticket info
    fetchTicketInfo: async function () {
      try {
        const ticket = (await client.get('ticket')).ticket

        return ticket
      }

      catch (err) {
        console.error(err)

        throw 'An error has occurred while fetching ticket information.'
      }
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

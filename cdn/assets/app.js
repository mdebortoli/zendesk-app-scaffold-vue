// Initialise Apps framework client. See also:
// https://developer.zendesk.com/apps/docs/developer-guide/getting_started
const client = ZAFClient.init()

// Vuetify settings
const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#337fbd',
        secondary: '#616161',
        accent: '#82b1ff',
        error: '#ff5252',
        info: '#2196f3',
        success: '#4caf50',
        warning: '#ffc107'
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
        email: '&#109;&#097;&#114;&#099;&#101;&#108;&#111;&#100;&#101;&#098;&#111;&#114;&#116;&#111;&#108;&#105;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;',
        avatarUrl: 'https://secure.gravatar.com/avatar/08076417b258015b9e12af346358edeb'
      }
    ]
  },

  /////////////////////////////////////////////////////////////////////////////
  // Computed
  /////////////////////////////////////////////////////////////////////////////

  computed: {
    // Return ticket requester details
    // Easter Egg if current selected item is a person (if it has an email set)
    ticketRequester: function () {
      const requester = this.ticket && this.ticket.requester
      const currentItem = parseInt(this.selectedItem) && this.items[this.selectedItem]

      const user = {
        name: currentItem.email ? currentItem.name : requester.name || null,
        email: currentItem.email || requester.email || null,
        avatarUrl: currentItem.email && currentItem.avatarUrl || requester.avatarUrl || this.defaultAvatar
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
    },

    // Resize app based on the main app container height
    resizeApp: function () {
      if (this.$refs.main) {
        const appHeight = this.$refs.main.offsetHeight + 'px'

        client.invoke('resize', {
          width: '100%',
          height: appHeight
        })
      }
    }
  },

  /////////////////////////////////////////////////////////////////////////////
  // Created
  /////////////////////////////////////////////////////////////////////////////

  // Execute when the app is created
  created: function () {
    this.loadInitialData()
  },

  /////////////////////////////////////////////////////////////////////////////
  // Updated
  /////////////////////////////////////////////////////////////////////////////

  // Execute when the app is updated
  updated: function () {
    this.resizeApp()
  }
})

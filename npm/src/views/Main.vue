<template>
  <div class="main">

    <!-- Requester info -->
    <app-user-info
      :name="requester.name"
      :email="requester.email"
      :avatar="requester.avatar"
    />

    <v-divider class="my-3" />

    <p class="text-center">
      This is a sample app built with <v-icon color="red darken-3" size="20">fa-heart</v-icon> and:
    </p>

    <!-- "built with" list -->
    <app-list
      v-model="selectedIndex"
      :items="items"
    />

    <v-divider class="my-3" />

    <p class="text-center">
      <v-btn
        v-if="items[selectedIndex] && items[selectedIndex].url"
        class="text-none text-normal-spacing white--text"
        color="primary"
        block
        depressed
        :href="items[selectedIndex].url"
        target="_blank"
      >
        Find out more about {{ items[selectedIndex].text }}
      </v-btn>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ZAFClient from 'zendesk_app_framework_sdk'

import AppList from '@/components/List.vue'
import AppUserInfo from '@/components/UserInfo.vue'

const client = ZAFClient.init()

export default {

  /////////////////////////////////////////////////////////////////////////////
  // Components
  /////////////////////////////////////////////////////////////////////////////

  components: {
    AppUserInfo,
    AppList
  },

  /////////////////////////////////////////////////////////////////////////////
  // Data
  /////////////////////////////////////////////////////////////////////////////

  data: () => ({
    selectedIndex: 0,
    items: [
      { text: 'Vue.js', url: 'https://vuejs.org/' },
      { text: 'Vuetify', url: 'https://vuetifyjs.com/en/' },
      { text: 'ZAF Client API', url: 'https://developer.zendesk.com/apps/docs/core-api/client_api' },
      { text: 'Marcelo De Bortoli 😉' }
    ]
  }),

  /////////////////////////////////////////////////////////////////////////////
  // Computed
  /////////////////////////////////////////////////////////////////////////////

  computed: {
    ...mapState({
      requester: state => state.requester
    })
  },

  /////////////////////////////////////////////////////////////////////////////
  // Methods
  /////////////////////////////////////////////////////////////////////////////

  methods: {
    // Get current ticket requester info
    async getRequesterInfo() {
      try {
        const ticket = (await client.get('ticket')).ticket

        this.$store.commit('SET_REQUESTER', {
          id: ticket.requester.id,
          name: ticket.requester.name,
          email: ticket.requester.email,
          avatar: ticket.requester.avatarUrl
        })
      }

      catch(err) {
        this.handleError(err, 'An error has occurred while fetching requester information.')
      }
    },

    // Handle error messages
    handleError(err, message) {
      console.error(err)

      client.invoke('notify', message, 'error', {
        sticky: true
      })
    }
  },

  /////////////////////////////////////////////////////////////////////////////
  // Created
  /////////////////////////////////////////////////////////////////////////////

  // Execute when the app is created
  async created() {
    await this.getRequesterInfo()
  }

}
</script>

<style>
#app .text-normal-spacing {
  letter-spacing: normal;
}
</style>

<template>
  <div class="main">
    <user-info :name="requester.name" :email="requester.email" :avatar="requester.avatar"/>
    <v-divider class="my-3"></v-divider>
    <p class="text-center">
      This is a sample app built with <v-icon color="red darken-3" size="20">fa-heart</v-icon> and:
    </p>
    <v-list dense>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-icon>
            <v-icon size="15">fa-chevron-right</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-divider class="my-3"></v-divider>
    <p class="text-center">
      <v-btn
        v-if="items[item] && items[item].url"
        class="text-none text-normal-spacing white--text"
        color="primary"
        block
        depressed
        :href="items[item].url"
        target="_blank"
      >
        Find out more about {{ items[item].text }}
      </v-btn>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ZAFClient from 'zendesk_app_framework_sdk'
import UserInfo from '@/components/UserInfo.vue'

const client = ZAFClient.init()

export default {

  /////////////////////////////////////////////////////////////////////////////
  // Components
  /////////////////////////////////////////////////////////////////////////////

  components: {
    UserInfo
  },

  /////////////////////////////////////////////////////////////////////////////
  // Data
  /////////////////////////////////////////////////////////////////////////////

  data: () => ({
    item: 0,
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

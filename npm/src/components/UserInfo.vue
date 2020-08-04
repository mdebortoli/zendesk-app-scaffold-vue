<template>
  <div class="app-user-info">
    <v-avatar>
      <v-img :src="avatar ? avatar : defaultAvatar" />
    </v-avatar>
    <h1>{{ name }}</h1>
    <p>{{ email }}</p>
  </div>
</template>

<script>
export default {

  /////////////////////////////////////////////////////////////////////////////
  // Props
  /////////////////////////////////////////////////////////////////////////////

  props: {
    name: String,
    email: String,
    avatar: String
  },

  /////////////////////////////////////////////////////////////////////////////
  // Data
  /////////////////////////////////////////////////////////////////////////////

  data() {
    return {
      defaultAvatar: 'https://i2.wp.com/assets.zendesk.com/images/2016/default-avatar-80.png'
    }
  }

}
</script>

<style scoped>
.app-user-info,
.app-user-info * {
  text-align: center;
}

h1 {
  font-size: 22px;
}
</style>

<template>
  <div class="user-info text-center">
    <v-avatar>
      <img :src="avatar ? avatar : defaultAvatar" :alt="name" >
    </v-avatar>
    <h1 class="text-center">{{ name }}</h1>
    <p class="text-center">{{ email }}</p>
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

  data: () => ({
    defaultAvatar: 'https://i2.wp.com/assets.zendesk.com/images/2016/default-avatar-80.png'
  })

}
</script>

<style scoped>
h1 {
  font-size: 22px;
}
</style>

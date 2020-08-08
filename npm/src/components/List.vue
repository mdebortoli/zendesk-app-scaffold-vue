<template>
  <div class="app-list">
    <v-list dense>
      <v-list-item-group v-model="selected" color="primary">
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-icon>
            <v-icon size="18">mdi-chevron-right</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {

  /////////////////////////////////////////////////////////////////////////////
  // Data
  /////////////////////////////////////////////////////////////////////////////

  data() {
    return {
      selected: this.value
    }
  },

  /////////////////////////////////////////////////////////////////////////////
  // Props
  /////////////////////////////////////////////////////////////////////////////

  props: {
    value: Number,
    items: Array
  },

  /////////////////////////////////////////////////////////////////////////////
  // Watch
  /////////////////////////////////////////////////////////////////////////////

  watch: {
    value(value) {
      this.selected = value
    },

    selected() {
      this.$emit('input', this.selected)
    }
  }

}
</script>

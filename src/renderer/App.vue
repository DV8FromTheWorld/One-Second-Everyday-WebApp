<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-toolbar-title>One Second Everyday</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>

<!--    <v-footer-->
<!--      color="indigo"-->
<!--      app-->
<!--    >-->
<!--      <span class="white&#45;&#45;text">&copy; Austin Keener & Jessica Keener {{new Date().getFullYear()}}</span>-->
<!--    </v-footer>-->
  </v-app>
</template>

<script>
  export default {
    name: 'one-second-everyday',
    data() {
      return {
        drawer: null
      }
    }
  }
</script>

<style>
  /* CSS */
</style>

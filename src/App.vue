<template>
  <div id="app">
    <nav class="navbar has-shadow is-info" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">

        <a href="/" class="navbar-item">Time Record</a>
        
        <!--<span class="navbar-burger burger" data-target="navMenu">-->
          <!--<span></span>-->
          <!--<span></span>-->
          <!--<span></span>-->
        <!--</span>-->
        
      </div>

      <!--<div class="navbar-menu" id="navMenu">-->
        <!--<div class="navbar-start">-->
          <!--<div class="navbar-item has-dropdown is-hoverable">-->
            <!--&lt;!&ndash;<a class="navbar-item" v-for="(type, i) in types" v-text="type" @click="changeType(i)"></a>&ndash;&gt;-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </nav>

    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    deleteType(index) {
      this.$store.commit('deleteType', index);
    },
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

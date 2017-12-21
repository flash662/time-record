<template>
  <div id="app">
    <nav class="navbar has-shadow is-info" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">

        <a href="/" class="navbar-item">
          Time Record
        </a>
        
        <!--<span class="navbar-burger burger" data-target="navMenu">-->
          <!--<span></span>-->
          <!--<span></span>-->
          <!--<span></span>-->
        <!--</span>-->
        
      </div>
      
    </nav>

    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

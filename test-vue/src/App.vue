<script setup>
</script>

<template>
  <div>
    <router-link to="/home" class="link">Home</router-link>
    <router-link to="/config" class="link">Config</router-link>
    <router-link to="/dashboard" class="link">Dashboard</router-link>
    <router-link to="/file" class="link">File</router-link>
    <router-link to="/viz" class="link">Visualization</router-link>
  </div>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.link {
  margin: 0 10px;
}
</style>

<template>
  <div id="app">
    <v-container>
      <header>
        <h1>Squad Servers Fast</h1>
        <img alt="Vue logo" src="./assets/squad-logo.png">
        <h5>Renting a custom (unlicensed) Squad server is easy with our 5 minute setup. No account registration necessary.</h5>
      </header>

      <Configuration />
    </v-container>
  </div>
</template>

<script>


import Configuration from './components/Configuration/Configuration';


export default {
  name: 'app',
  components: {
    Configuration
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

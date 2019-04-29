<template>
  <div id="app">
    <v-container>
      <header>
        <h1 class="fancyheader">Squad Servers Fast</h1>
        <img class="mt-3" alt="Vue logo" src="./assets/squad-logo.png">
        <div class="mt-3">
          <h5>Renting a custom (unlicensed) Squad server is easy with our 5 minute setup. No account registration necessary.</h5>
        </div>
      </header>

      <Configuration />
      <Footer />
    </v-container>

  </div>
</template>

<script>


import Configuration from './components/Configuration/Configuration';
import Footer from './components/Footer';
import 'typeface-gugi/index.css';


export default {
  name: 'app',
  components: {
    Configuration,
    Footer
  }
}
</script>

<style>


.fancyheader {
    font-family: 'Gugi', cursive;
    font-size: 52px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

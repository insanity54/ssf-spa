<template>
    <v-app class="ma-0">
      <v-container>
        <header>
          <h1 class="fancyheader">Squad Servers Fast</h1>
        </header>

        <router-view></router-view>
        <Footy />
      </v-container>
    </v-app>
</template>

<script>


import Configuration from './components/Configuration/Configuration';
import Footy from './components/Footy';
import 'typeface-gugi/index.css';


export default {
  name: 'app',
  components: {
    Configuration,
    Footy
  },
  mounted() {
    var scriptTag = document.createElement("script");
    scriptTag.src = "https://js.squareup.com/v2/paymentform";
    document.getElementsByTagName('head')[0].appendChild(scriptTag);
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

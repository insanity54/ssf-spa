<template>
<div class="server_configuration">

  <div class="">
    <img class="mb-1" alt="OWI Squad logo" src="../../assets/squad-logo.png">
    <h5>Renting a custom (unlicensed) Squad server is easy with our 5 minute setup. No account registration necessary.</h5>
  </div>

  <ServerInformation :serverName="this.serverName" />
  <AdministratorsList :serverName="this.serverName" :steamLookupInProgress="this.steamLookupInProgress" />
  <ModsList :serverName="this.serverName":steamLookupInProgress="this.steamLookupInProgress" />
  <MapRotation :serverName="this.serverName" />
  <ServerMessages :serverName="this.serverName" />
  <Motd :serverName="this.serverName" />
  <Payment />

</div>


</template>

<script>
import Payment from './Payment';
import Motd from './Motd';
import ServerMessages from './ServerMessages';
import MapRotation from './MapRotation';
import ServerInformation from './ServerInformation';
import AdministratorsList from './AdministratorsList';
import ModsList from './ModsList';


export default {
  components: {
    Payment,
    Motd,
    ServerMessages,
    MapRotation,
    ServerInformation,
    AdministratorsList,
    ModsList,
  },
  name: 'Configuration',
  data: () => ({
    steamLookupInProgress: false,
    serverName: ''
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

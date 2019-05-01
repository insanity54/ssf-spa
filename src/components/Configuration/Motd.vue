<template>
  <!-- MOTD -->
  <v-card class="mt-5">
    <v-toolbar color="red" dark>
      <v-toolbar-title>{{ serverName }} Message of the Day</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card-title>
      <span class="headline">Set the message players will see when joining your server. Optional.</span>
    </v-card-title>

    <v-card-text>
      <v-form>
          <v-text-field
            label="Example: Welcome to our server! Check us out at SquadServersFast.com."
            solo
            clearable
          >
          </v-text-field>

      </v-form>
    </v-card-text>
  </v-card>
</template>


<script>


  export default {
    name: 'Motd',
    data: () => ({
      motd: '',
    }),
    props: {
      serverName: {
        type: String,
        required: true
      }
    },
  }
</script>

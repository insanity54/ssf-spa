<template>
<!-- Server Messages -->
<v-card class="mt-5">
  <v-toolbar color="purple" dark>
    <v-toolbar-title>{{ serverName }} Server Messages</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="createMessage(serverMessages.length)">
      <v-icon>add</v-icon>
    </v-btn>
  </v-toolbar>

  <v-card-title>
    <span class="headline">Define messages your server will display to players. Optional.</span>
  </v-card-title>

  <v-subheader v-if="serverMessages.length === 0">
    No messages are defined. Click the <v-icon>add</v-icon> at the top right of this card to add one.
  </v-subheader>

  <v-card-text>
    <v-form>
        <v-text-field
          v-for="(item, idx) in serverMessages"
          :key="idx"
          :label="serverMessages[idx]"
          solo
        >
          <template v-slot:append>
            <v-btn icon @click="deleteMessage(idx)">
              <v-icon>delete</v-icon>
            </v-btn>
          </template>
        </v-text-field>

    </v-form>
  </v-card-text>
</v-card>
</template>

<script>

export default {
  name: 'ServerMessages',
  props: {
    serverName: {
      type: String,
      required: true
    }
  },
  data: () => ({
    serverMessages: [
      'Example: Welcome to our server!',
      'Example: Please apologize for Team Kills in ALL chat.',
      'Example: Visit us on the web at SquadServersFast.com'
    ],
    defaultServerMessages: [
      'Example: Welcome to our server!',
      'Example: Please apologize for Team Kills in ALL chat.',
      'Example: Visit us on the web at SquadServersFast.com'
    ]
  }),
  methods: {
    createMessage(idx) {
      this.serverMessages.push(this.defaultServerMessages[idx]);
    },
    deleteMessage(idx) {
      this.serverMessages.splice(idx, 1);
    }
  }
}
</script>

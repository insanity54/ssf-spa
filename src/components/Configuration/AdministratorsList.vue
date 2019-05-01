<template>
  <div class="admin_list_wrapper">

    <div class="admin_list">
      <v-card class="mt-5">
        <v-toolbar color="cyan" dark>
          <v-toolbar-title>{{ serverName }} Administrators List</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click.stop="new_admin_dialog = true">
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-title>
          <span class="headline">Select the Steam users who may administer your server. Optional.</span>
        </v-card-title>
        <v-list three-line>
          <v-subheader v-if="administrators.length === 0">
            No administrators selected. Click the <v-icon>add</v-icon> at the top right of this card to add one.
          </v-subheader>
          <template v-for="(item, index) in administrators">

            <v-subheader v-if="item.header" :key="item.header">
              {{ item.header }}
            </v-subheader>

            <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>
            <v-list-tile v-else :key="item.title" avatar @click="">
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon @click="deleteUser(index)"><v-icon>close</v-icon></v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </div>


    <div class="administrators_dialog">
        <v-dialog v-model="new_admin_dialog" persistent max-width="600px">
          <v-card>
            <v-toolbar dark color="cyan">
              <v-btn icon dark @click="new_admin_dialog = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-title>
              <span class="headline">Add a Server Administrator</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap row>
                  <v-flex xs12 sm8 md8>
                    <v-text-field v-model="steamNickname" label="Steam name" required hint="The username of the steam user" persistent-hint></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-btn @click="findUser()">
                      <v-icon>search</v-icon> Search
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-layout column class="mt-5">
                  <v-flex>

                    <v-progress-circular
                      v-if="this.steamLookupInProgress"
                      indeterminate
                      color="primary"
                    ></v-progress-circular>

                    <v-list three-line>
                      <template v-for="(item, index) in steamResults">

                        <v-list-tile :key="item.steamid" avatar @click="">
                          <v-list-tile-avatar>
                            <img :src="item.avatarmedium">
                          </v-list-tile-avatar>

                          <v-list-tile-content>
                            <v-list-tile-title v-html="item.personaname"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="item.profileurl"></v-list-tile-sub-title>
                          </v-list-tile-content>

                          <v-list-tile-action>
                            <v-btn @click="selectUser(index)">Select</v-btn>
                          </v-list-tile-action>
                        </v-list-tile>
                      </template>
                    </v-list>


                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdministratorsList',
  data: () => ({
    administrators: [],
    new_admin_dialog: false,
    // use ./util/genMapList.js to create mapItems array.
    steamNickname: '',
    steamResults: ''
  }),
  props: {
    steamLookupInProgress: {
      type: Boolean,
      required: true
    },
    serverName: {
      type: String,
      required: true
    }
  },
  methods: {
    findUser() {
      const user = this.steamNickname;
      // Make a request for a user with a given ID
      this.steamLookupInProgress = true;
      this.$http.get(`https://hook.io/insanity54/ssf-steamid/api/${this.steamNickname}`)
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.body.response.success === 1) {
            const steamId = response.body.response.steamid
            return this.$http.get(`https://hook.io/insanity54/ssf-profile/api/${steamId}`).then((res) => {
              this.steamResults = res.body.response.players;
            })
            .catch((err) => {
              // console.log(err);
            })
            .then(() => {
              // console.log('sub request finished');
            })
          }
        })
        .catch(function (error) {
          // handle error
          // console.log(error);
        })
        .then(function () {
          // always executed
          // console.log('request finished');
          this.steamLookupInProgress = false;
        });
    },
    selectUser(idx) {
      const user = this.steamResults[idx];
      console.log(`selected user ${user}`);
      console.log(user);
      this.administrators.splice(idx, 0, {
        avatar: user.avatarmedium,
        title: user.personaname,
        subtitle: user.profileurl
      });
      this.new_admin_dialog = false;
    },
    deleteUser(idx) {
      const user = this.administrators[idx];
      this.administrators.splice(idx, 1);
    }
  }
}
</script>

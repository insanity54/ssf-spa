<template>
  <div class="ModsListWrapper">

    <div class="ModsList">
    <!-- Section mods -->
    <v-card class="mt-5">
      <v-toolbar color="pink" dark>
        <v-toolbar-title>{{ serverName }} Mods List</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="modDialog = true">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title>
        <span class="headline">Select the mods your server will run. Optional.</span>
      </v-card-title>
      <v-list three-line>
        <v-subheader class="mb-3">
          <v-layout column justify-start align-start>
            <v-flex class="noModsSection" v-if="mods.length === 0">
              No mods selected. Click the <v-icon>add</v-icon> at the top right of this card to add one.
            </v-flex>
            <v-flex class="pt-2">
              To browse the complete list of mods, see <a target="_blank" href="https://steamcommunity.com/workshop/browse/?appid=393380">Steam Workshop</a>
            </v-flex>
          </v-layout>
        </v-subheader>
        <template v-for="(item, index) in mods">
          <v-subheader v-if="item.header" :key="item.header">
            {{ item.header }}
          </v-subheader>
          <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>
          <v-list-tile v-else :key="item.title" avatar @click="">
            <v-list-tile-avatar>
              <img :src="item.preview_url">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.short_description"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click="deleteMod(index)"><v-icon>close</v-icon></v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
    </v-card>
  </div>

  <div class="ModsListDialog">

      <v-dialog v-model="modDialog" persistent max-width="600px">
        <v-card>
          <v-toolbar dark color="pink">
            <v-btn icon dark @click="modDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-title>
            <span class="headline">Add a Mod</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap row>
                <v-flex xs12 sm8 md8>
                  <v-text-field v-model="steamModName" label="Squad mod" required hint="The mod to search for in the Steam Workshop" persistent-hint></v-text-field>
                </v-flex>
                <v-flex xs12 sm4 md4>
                  <v-btn @click="findMod()">
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
                    <template v-for="(item, index) in modResults.publishedfiledetails">

                      <v-list-tile :key="item.publishedfileid" avatar @click="">
                        <v-list-tile-avatar>
                          <img :src="item.preview_url">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                          <v-list-tile-title v-html="item.title"></v-list-tile-title>
                          <v-list-tile-sub-title v-html="item.short_description"></v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                          <v-btn @click="selectMod(index)">Select</v-btn>
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
    name: 'ModsList',
    methods: {
      findMod() {
        // POST https://partner.steam-api.com/ISteamRemoteStorage/EnumerateUserSubscribedFiles/v1/
        const mod = this.steamModName;
        // Make a request for a user with a given ID
        this.steamLookupInProgress = true;
        this.$http.get(`https://hook.io/insanity54/ssf-mod/api/${mod}`)
          .then(function (res) {
            // handle success
            this.modResults = res.body.response;

            if (res.body.response.publishedfiledetails) {
              // there are matches

            } else {
              // no matches

            }

            // if there are more results, look them up
            if (res.body.response.total > 0) {

            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
            console.log('request finished');
            this.steamLookupInProgress = false;
          });
      },
      selectMod(idx) {
        this.mods.splice(idx, 0, this.modResults.publishedfiledetails[idx]);
        this.modDialog = false;
      }
    },
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
    data: () => ({
      mods: [],
      modDialog: false,
      modResults: '',
      modResultsPage: 0,
      steamModName: '',
    })
  }
</script>

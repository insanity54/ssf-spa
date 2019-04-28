<template>
<div class="server_configuration">


  <v-card class="mt-5">
    <v-toolbar color="green" dark>
      <v-toolbar-title>{{ name }} Server Information</v-toolbar-title>
    </v-toolbar>

      <v-layout class="pa-3">

        <v-form ref="configuration" v-model="valid" lazy-validation>
          <v-text-field v-model="name" :counter="128" :rules="nameRules" label="Server Name" hint="The name your server will show up as in the Squad server browser" required persistent-hint></v-text-field>


          <v-select v-model="region_select" :items="regions" :rules="[v => !!v || 'Region is required']" label="Region"
            hint="The location on planet earth where your Squad server will exist. Recommended to select a location near the majority of your players." required persistent-hint></v-select>

          <v-text-field v-model="email" :rules="emailRules" label="Administrator E-mail" hint="The e-mail address where you will receive your server's administrator log-in info." required persistent-hint></v-text-field>

          <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox>

          <v-btn :disabled="!valid" color="success" @click="validate">
            Validate
          </v-btn>

          <v-btn color="error" @click="reset">
            Reset Form
          </v-btn>

          <v-btn color="warning" @click="resetValidation">
            Reset Validation
          </v-btn>
        </v-form>
      </v-layout>
  </v-card>


  <v-card class="mt-5">

    <v-toolbar color="red" dark>

      <v-toolbar-title>{{ name }} Administrators List</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click.stop="new_admin_dialog = true">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-title>
      <span class="headline">Select the Steam users who can administer your server.</span>
    </v-card-title>


    <v-list three-line>
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
        </v-list-tile>
      </template>
    </v-list>
  </v-card>


  <!-- Map Rotation -->
  <v-card class="mt-5">
    <v-toolbar color="blue" dark>
      <v-toolbar-title>{{ name }} Map Rotation</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card-title>
      <span class="headline">Drag &amp; Drop your map selections to the Active Maps list <v-icon>arrow_right_alt</v-icon></span>
    </v-card-title>

    <v-card-text>
      <v-container class="pa-0 ma-0">
        <v-layout row>
          <v-flex>
            <h3>Available Maps</h3>
            <draggable
              :list="availableMaps"
              group="maps"
            >
              <div class="list-group-item"
                v-for="(el, idx) in availableMaps"
                :key="el.text"
              >
                <v-icon>drag_handle</v-icon> {{ el.text }} <v-btn icon @click="addMap(idx)"><v-icon>arrow_right</v-icon></v-btn>
              </div>
            </draggable>
          </v-flex>

          <v-flex>
            <h3>Active Maps</h3>
            <draggable
              :list="activeMaps"
              group="maps"
            >
              <div class="list-group-item"
                v-for="(el, idx) in activeMaps"
                :key="el.text"
              >
                <v-icon>drag_handle</v-icon> {{ el.text }} <v-btn icon @click="removeMap(idx)"><v-icon>close</v-icon></v-btn>
              </div>
            </draggable>
          </v-flex>

        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>

  <v-dialog v-model="new_admin_dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Add a Server Administrator</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap row>
            <v-flex xs12 sm8 md8>
              <v-text-field label="Steam name" required hint="The username of the steam user" persistent-hint></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-btn>
                <v-icon>search</v-icon> Search
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout column class="mt-5">
            <v-flex>
              RESULTS HERE
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="new_admin_dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="new_admin_dialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  name: 'Configuration',
  data: () => ({
    new_admin_dialog: false,
    valid: true,
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 128) || 'Name must be less than 128 characters'
    ],
    name: '',
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    regions: [{
        text: 'Dallas, US',
        value: 2
      },
      {
        text: 'Los Angeles, US',
        value: 5
      },
      {
        text: 'New Jersey, US',
        value: 1
      },
      {
        text: 'Paris, FR',
        value: 24
      },
      {
        text: 'Sydney, AU',
        value: 19
      },
      {
        text: 'Tokyo, JP',
        value: 25
      }
    ],
    region_select: 2,
    checkbox: false,
    administrators: [{
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: '[KG] Crispy',
        subtitle: "Administrator"
      },
      {
        divider: true,
        inset: true
      },
    ],
    // use ./util/genMapList.js to create mapItems array.
    availableMaps: [{
      "id": 0,
      "text": "Al Basrah"
    }, {
      "id": 1,
      "text": "Al Basrah RAAS v1"
    }, {
      "id": 2,
      "text": "Al Basrah Invasion v1"
    }, {
      "id": 3,
      "text": "Al Basrah Invasion v2"
    }, {
      "id": 4,
      "text": "Al Basrah Insurgency v1"
    }, {
      "id": 5,
      "text": "Belaya"
    }, {
      "id": 6,
      "text": "Belaya AAS v1"
    }, {
      "id": 7,
      "text": "Belaya AAS v2"
    }, {
      "id": 8,
      "text": "Belaya AAS v3"
    }, {
      "id": 9,
      "text": "Belaya RAAS v1"
    }, {
      "id": 10,
      "text": "Belaya Invasion v1"
    }, {
      "id": 11,
      "text": "Belaya Invasion v2"
    }, {
      "id": 12,
      "text": "Belaya Invasion v3"
    }, {
      "id": 13,
      "text": "Chora"
    }, {
      "id": 14,
      "text": "Chora AAS v1"
    }, {
      "id": 15,
      "text": "Chora AAS v2"
    }, {
      "id": 16,
      "text": "Chora RAAS v1"
    }, {
      "id": 17,
      "text": "Chora Invasion v1 Night"
    }, {
      "id": 18,
      "text": "Chora Insurgency v1"
    }, {
      "id": 19,
      "text": "Chora Skirmish v1 Night"
    }, {
      "id": 20,
      "text": "Fool's Road"
    }, {
      "id": 21,
      "text": "Fool's Road AAS v1"
    }, {
      "id": 22,
      "text": "Fool's Road AAS v2"
    }, {
      "id": 23,
      "text": "Fool's Road AAS v3"
    }, {
      "id": 24,
      "text": "Fool's Road AAS v4"
    }, {
      "id": 25,
      "text": "Fool's Road RAAS v1"
    }, {
      "id": 26,
      "text": "Fool's Road Skirmish v1"
    }, {
      "id": 27,
      "text": "Fool's Road Skirmish v2"
    }, {
      "id": 28,
      "text": "Gorodok"
    }, {
      "id": 29,
      "text": "Gorodok AAS v1"
    }, {
      "id": 30,
      "text": "Gorodok AAS v2"
    }, {
      "id": 31,
      "text": "Gorodok AAS v3"
    }, {
      "id": 32,
      "text": "Gorodok AAS v4"
    }, {
      "id": 33,
      "text": "Gorodok RAAS v1"
    }, {
      "id": 34,
      "text": "Gorodok RAAS v2"
    }, {
      "id": 35,
      "text": "Gorodok Invasion v1"
    }, {
      "id": 36,
      "text": "Gorodok Invasion v2"
    }, {
      "id": 37,
      "text": "Gorodok Skirmish v1"
    }, {
      "id": 39,
      "text": "Kamdesh AAS v1"
    }, {
      "id": 40,
      "text": "Kamdesh RAAS v1"
    }, {
      "id": 41,
      "text": "Kamdesh RAAS v2"
    }, {
      "id": 42,
      "text": "Kamdesh RAAS v3"
    }, {
      "id": 43,
      "text": "Kamdesh Invasion v1"
    }, {
      "id": 44,
      "text": "Kamdesh Invasion v2"
    }, {
      "id": 45,
      "text": "Kamdesh Invasion v3"
    }, {
      "id": 46,
      "text": "Kamdesh Insurgency v1"
    }, {
      "id": 47,
      "text": "Kamdesh Insurgency v2"
    }, {
      "id": 48,
      "text": "Kamdesh Skirmish v1"
    }, {
      "id": 49,
      "text": "Kohat"
    }, {
      "id": 50,
      "text": "Kohat AAS v1"
    }, {
      "id": 51,
      "text": "Kohat AAS v2"
    }, {
      "id": 52,
      "text": "Kohat RAAS v1"
    }, {
      "id": 53,
      "text": "Kohat Invasion v1"
    }, {
      "id": 54,
      "text": "Kohat Insurgency v1"
    }, {
      "id": 55,
      "text": "Kohat Skirmish v1"
    }, {
      "id": 56,
      "text": "Kokan"
    }, {
      "id": 57,
      "text": "Kokan AAS v1"
    }, {
      "id": 58,
      "text": "Kokan AAS v2"
    }, {
      "id": 59,
      "text": "Kokan RAAS v1"
    }, {
      "id": 60,
      "text": "Kokan Invasion v1"
    }, {
      "id": 61,
      "text": "Kokan Insurgency v1"
    }, {
      "id": 62,
      "text": "Kokan Skirmish v1"
    }, {
      "id": 63,
      "text": "Logar Valley"
    }, {
      "id": 64,
      "text": "Logar Valley AAS v1"
    }, {
      "id": 65,
      "text": "Logar Valley AAS INF v1"
    }, {
      "id": 66,
      "text": "Logar Valley RAAS v1"
    }, {
      "id": 67,
      "text": "Logar Valley Insurgency v1"
    }, {
      "id": 68,
      "text": "Logar Valley Insurgency v1 Night"
    }, {
      "id": 69,
      "text": "Mestia"
    }, {
      "id": 70,
      "text": "Mestia AAS v1"
    }, {
      "id": 71,
      "text": "Mestia AAS v2"
    }, {
      "id": 72,
      "text": "Mestia RAAS v1"
    }, {
      "id": 73,
      "text": "Mestia Invasion v1"
    }, {
      "id": 74,
      "text": "Mestia Invasion v2"
    }, {
      "id": 76,
      "text": "Narva AAS v1"
    }, {
      "id": 77,
      "text": "Narva AAS v2"
    }, {
      "id": 78,
      "text": "Narva AAS v3"
    }, {
      "id": 79,
      "text": "Narva RAAS v1"
    }, {
      "id": 80,
      "text": "Narva Invasion v1"
    }, {
      "id": 81,
      "text": "Narva Invasion v2"
    }, {
      "id": 82,
      "text": "Narva Skirmish v1"
    }, {
      "id": 83,
      "text": "Sumari"
    }, {
      "id": 84,
      "text": "Sumari AAS v3"
    }, {
      "id": 85,
      "text": "Sumari RAAS v1"
    }, {
      "id": 86,
      "text": "Sumari Insurgency v1"
    }, {
      "id": 87,
      "text": "Sumari Skirmish v1"
    }, {
      "id": 88,
      "text": "Tallil Outskirts"
    }, {
      "id": 89,
      "text": "Tallil Outskirts AAS v1"
    }, {
      "id": 90,
      "text": "Tallil Outskirts RAAS v1"
    }, {
      "id": 91,
      "text": "Tallil Outskirts RAAS v2"
    }, {
      "id": 92,
      "text": "Tallil Outskirts Invasion v1"
    }, {
      "id": 93,
      "text": "Tallil Outskirts Skirmish v1"
    }, {
      "id": 94,
      "text": "Tallil Outskirts Skirmish v2"
    }, {
      "id": 95,
      "text": "Yehorivka"
    }, {
      "id": 96,
      "text": "Yehorivka AAS v1"
    }, {
      "id": 97,
      "text": "Yehorivka AAS v2"
    }, {
      "id": 98,
      "text": "Yehorivka AAS v3"
    }, {
      "id": 99,
      "text": "Yehorivka AAS v5"
    }, {
      "id": 100,
      "text": "Yehorivka RAAS v1"
    }, {
      "id": 101,
      "text": "Yehorivka RAAS v2"
    }, {
      "id": 102,
      "text": "Yehorivka Invasion v1"
    }, {
      "id": 103,
      "text": "Yehorivka Invasion v2"
    }, {
      "id": 104,
      "text": "Yehorivka Skirmish v1"
    }],
    activeMaps: [
      {
        "id": 75,
        "text": "Narva"
      }, {
        "id": 38,
        "text": "Kamdesh"
      }
    ]
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
    },
    addMap(idx) {
      const selectedMap = this.availableMaps[idx];
      this.activeMaps.push(selectedMap);
      this.availableMaps.splice(idx, 1);
    },
    removeMap(idx) {
      const selectedMap = this.activeMaps[idx];
      this.availableMaps.push(selectedMap);
      this.activeMaps.splice(idx, 1);
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

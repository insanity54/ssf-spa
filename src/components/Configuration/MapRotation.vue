<template>
  <!-- Map Rotation -->
  <v-card class="mt-5">
    <v-toolbar color="blue" dark>
      <v-toolbar-title>{{ serverName }} Map Rotation</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card-title>
      <span class="headline">Choose the maps your server will run. Drag &amp; Drop to reorder.</span>
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
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'MapRotation',
  components: {
    draggable
  },
  props: {
    serverName: {
      type: String,
      required: true
    }
  },
  methods: {
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
  },
  data: () => ({
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
    activeMaps: [{
      "id": 75,
      "text": "Narva"
    }, {
      "id": 38,
      "text": "Kamdesh"
    }]
  })
}
</script>

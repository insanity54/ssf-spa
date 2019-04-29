<template>
  <div id="footy">
    <v-footer class="mt-5" dark height="150px" color="blue">

      <v-layout justify-center row wrap>

          <v-flex
            primary
            lighten-2
            py-3
            text-xs-center
            white--text
            xs12
          >
            <p>SquadServersFast is brought to you by <a target="_blank" href="https://grimtech.net/about">Grimtech.net</a> and is not affilliated with <a target="_blank" href="https://joinsquad.com/">OWI Squad</a>.</p>
            <p><img class="footLicenseLogo" :src="unlicenseLogo" /> 2019 — <strong>SquadServersFast</strong></p>
          </v-flex>
      </v-layout>
    </v-footer>
  </div>
</template>

<script>
import 'typeface-gugi/index.css';
import ul from '../assets/PD-icon-black.svg';

export default {
  name: 'footy',
  computed: {
    unlicenseLogo: () => ul,
  },
  data: () => ({
    icons: [
      'face',
      'favorite',
    ]
  })
}
</script>

<style>
.footLicenseLogo {
  height: 1em;
}

.footyText {
  min-width: 100%;
}
</style>

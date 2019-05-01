<template>

  <v-card class="mt-5">
    <v-toolbar color="green" dark>
      <v-toolbar-title>{{ serverName }} Server Information</v-toolbar-title>
    </v-toolbar>

    <v-card-title>
      <span class="headline">Customize your server.</span>
    </v-card-title>

      <v-layout class="pa-3">

        <v-form ref="configuration" v-model="valid" lazy-validation>
          <v-text-field v-model="name" :counter="128" :rules="nameRules" label="Server Name" hint="The name your server will show up as in the Squad server browser" required persistent-hint></v-text-field>


          <v-select class="mt-4" attach v-model="region_select" :items="regions" :rules="[v => !!v || 'Region is required']" label="Region"
            hint="The location on planet earth where your Squad server will exist. Recommended to select a location near the majority of your players." required persistent-hint></v-select>

          <div class="mt-5">
            <v-dialog
                  v-model="privacyPolicyDialog"
                  width="500"
                >
                  <template v-slot:activator="{ on }">
                    <v-btn
                      color="brown lighten-2"
                      dark
                      v-on="on"
                    >
                      SquadServersFast privacy policy
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title
                      class="headline grey lighten-2"
                      primary-title
                    >
                      Privacy Policy
                    </v-card-title>

                    <v-card-text>
                        <p>SquadServersFast.com stores the Steam usernames of your server administrators for the purpose of setting up your Squad server.</p>
                        <p>SquadServersFast.com stores your server message list, map rotation list, and mod list for the purpose of setting up your Squad server.</p>
                        <p>SquadServersFast.com does not collect a username or password from you.</p>
                        <p>SquadServersFast.com uses your E-Mail address to contact you with details about your service.</p>
                        <p>SquadServersFast.com does not process payments and does not store payment information. Stripe handles all payment data.</p>
                        <p>SquadServersFast.com deletes all of your data when you delete your Squad server.</p>
                        <p>SquadServersFast.com does not share your e-mail address, steam usernames, or server configurations with third parties.</p>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        flat
                        @click="privacyPolicyDialog = false"
                      >
                        Close
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
          </div>
          <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="I agree to SquadServersFast privacy policy." required></v-checkbox>

        </v-form>
      </v-layout>
  </v-card>
</template>


<script>
export default {
  name: 'ServerInformation',
  props: {
    serverName: {
      type: String,
      required: true
    }
  },
  data: () => ({
    valid: true,
    privacyPolicyDialog: false,
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
  })
}
</script>

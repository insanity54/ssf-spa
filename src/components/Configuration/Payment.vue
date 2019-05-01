<template>
  <!-- Section Payment -->
  <v-card class="mt-5">
    <v-toolbar color="green" dark>
      <v-toolbar-title>Payment</v-toolbar-title>

      <v-spacer></v-spacer>

    </v-toolbar>



    <v-card-text>
      <v-form>
          <v-text-field
            v-model="paymentCoupon"
            label="Coupon code (optional)"
            clearable
          >
          </v-text-field>


      </v-form>

      <vue-stripe-checkout
        ref="checkoutRef"
        :image="image"
        :name="name"
        :description="description"
        :currency="currency"
        :amount="amount"
        :allow-remember-me="false"
        @done="done"
        @opened="opened"
        @closed="closed"
        @canceled="canceled"
      ></vue-stripe-checkout>
      <v-btn color="primary" @click="checkout"><v-icon left>payment</v-icon>Checkout</v-btn>



    </v-card-text>
</v-card>
</template>


<script>
  import bananaImage from '../../assets/banana.jpeg';

  export default {
    name: 'Payment',
    // data: () => ({
    //   paymentCoupon: '',
    //   name: 'some cool product or am I supposed to put my name Chris here?',
    //   description: 'some cool product',
    //   amount: 5,
    //   currency: "USD",
    //   image: banana
    // }),
    data() {
      return {
        paymentCoupon: '',
        image: 'https://i.imgur.com/HhqxVCW.jpg',
        name: 'SquadServersFast.com',
        description: 'Squad Server Rental',
        currency: 'USD',
        amount: 1030
      }
    },
    computed: {
      banana: () => bananaImage,
    },
    methods: {
      async checkout () {
        // token - is the token object
        // args - is an object containing the billing and shipping address if enabled
        const { token, args } = await this.$refs.checkoutRef.open();
      },
      done ({token, args}) {
        // token - is the token object
        // args - is an object containing the billing and shipping address if enabled
        // do stuff...
        this.$router.push('/provision');
      },
      opened () {
        // do stuff
      },
      closed () {
        // do stuff
      },
      canceled () {
        // do stuff

      }
    }
  }
</script>

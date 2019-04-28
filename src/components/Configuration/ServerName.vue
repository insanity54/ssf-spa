<template>
  <div class="text_input">

  </div>


  <!-- Server Name -->
  <div class="control-group column-group vertical-space">
    <label for="first-name" class="all-20">Server Name</label>
    <div class="control all-80">
      <input type="text" name="server_name" id="server_name">
      <p class="tip">The name your server will show up as in the Squad server browser</p>
    </div>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
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

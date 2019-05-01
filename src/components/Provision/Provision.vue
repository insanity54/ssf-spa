<template>
<div class="mt-5">
  <h3>Server Provision in progress...</h3>
  <h5 class="mt-2">ETA 15 minutes</h5>
  <v-progress-linear class="mt-4" v-model="progress"></v-progress-linear>
</div>
</template>

<script>

export default {
  name: 'Provision',
  data: () => ({
    progress: 5
  })
}

</script>

<template>
  Hello, {{ username }}
</template>

<script lang="ts">
import api from '@/api';

export default {
  data(){
    return {
      username: ""
    }
  },
  mounted(){
    api.get("/who_am_i")
      .then((response) => {
        this.username = response.data.username
      })
  }
}
</script>
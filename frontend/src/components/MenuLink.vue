<template>
  <router-link :to="to">
    <div class="flex mb-2 py-2 text-[#2c2c2c] hover:text-[#449926] duration-200" :class="{'text-[#449926]': isThisPage}">
      <font-awesome-icon :icon="icon" class="w-8 h-8" />
      <div class="ml-3.5 mt-px flex flex-col justify-center font-bold text-lg">{{ text }}</div>
    </div>
  </router-link>
</template>

<script lang="ts">
export default {
  props: {
    to: String,
    text: String,
    icon: String
  },
  data(){
    return {
      isThisPage: false
    };
  },
  mounted(){
    if (this.to) {
      if (window.location.pathname.includes(this.to)) {
        this.isThisPage = true
      }
    }
  }
}
</script>
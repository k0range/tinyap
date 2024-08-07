<template>
  <div class="flex flex-col sm:justify-center h-screen sm:screen before:fixed before:top-0 before:left-0 before:w-screen before:h-screen before:bg-[#449926] before:-z-10 before:opacity-5">
    <div class="flex justify-center">
      <div class="overflow-hidden w-[25rem] min-h-[37rem] bg-white sm:rounded-2xl text-center py-8 px-6" style="box-shadow: 0px 0px 8px #00000020;">
          <img src="@/assets/lemon.png" alt="" class="w-16 h-16 rounded-full inline">
          <div class="mt-4 mb-2 text-2xl font-bold text-[#2C2C2C]">{{ title }}</div>
          <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: String
  }
}
</script>
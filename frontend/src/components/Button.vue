<template>
  <button v-if="!href" class="bg-[#449926] text-white disabled:bg-[#c1c1c1] duration-200" :class="{'py-3 px-5 w-full': wFull, 'py-2 px-6': !wFull, 'rounded-full': rounded, 'rounded-2xl': !rounded}" :disabled="disabled" @click="$emit('click', $event)">
    <img v-if="loading" src="@/assets/spinner.svg" alt="Loading..." class="w-5 h-5 inline animate-spin">
    <slot v-else></slot>
  </button>
  <router-link v-else class="bg-[#449926] text-white disabled:bg-[#c1c1c1] duration-200" :class="{'py-3 px-5 w-full': wFull, 'py-2 px-6': !wFull, 'rounded-full': rounded, 'rounded-2xl': !rounded}" :disabled="disabled" :to="href">
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
export default {
  props: {
    wFull: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    href: String,
    loading: Boolean
  },
  emits: [
    'click'
  ]
}
</script>
<template>
  <div class="border-b border-[#D7D7D7] py-4 px-5">
    <div class="flex w-full max-w-full">
      <img src="https://korange.work/_astro/icon.BNifbQ6A_52HNF.webp" class="w-12 h-12 mr-4 rounded-full">
      <div class="mt-0.5 text-[1.05em] flex-grow">
        <div class="flex justify-between">
          <div class="flex">
            <div class="text-[#2C2C2C] font-medium">{{ displayName }}</div>
            <div class="text-[#A7A7A7] ml-2 text-sm flex flex-col justify-center">{{ acct }}</div>
          </div>
          <router-link :to="link" class="text-[#494949] text-sm">{{ date }}</router-link>
        </div>
        <div class="text-[#494949] mt-px break-all">{{ content }}</div>
        <!--
        <div class="w-full flex mt-1.5 overflow-x-scroll whitespace-nowrap max-w-full">
          <div class="flex flex-nowrap w-full max-w-full">
            <span class="bg-[#E8E8E8] text-[#838383] rounded-full px-2.5 py-0.5 text-[12.7px] font-medium mr-1.5">#introduction</span>
          </div>
        </div>
        -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { formatDistance } from 'date-fns'
import { ja } from 'date-fns/locale'

export default {
  props: {
    displayName: String,
    acct: String,
    content: String,
    link: {
      type: String,
      default: "#"
    },
    createdAt: {
      type: String,
      default: ""
    }
  },
  data(){
    return {
      date: ""
    }
  },
  mounted(){
    this.date = formatDistance(new Date(this.createdAt), new Date, { locale: ja, addSuffix: true })
  }
}
</script>
<template>
  <div class="w-full border border-[#D7D7D7] bg-white rounded-2xl text-[#2C2C2C] font-medium text-[15px] disabled:bg-[#F9F9F9] outtline outline-3 outline-[#facc1550]">
    <div class="flex">
      <img src="https://korange.work/_astro/icon.BNifbQ6A_52HNF.webp" class="w-8 h-8 rounded-full ml-4 mt-3.5">
      <textarea name="" id="" class="flex-grow h-40 pt-5 pb-3.5 px-3.5 rounded-2xl outline-none" placeholder="何をお考えですか？？？？" v-model="postFormContent"></textarea>
    </div>
    <div class="flex justify-end">
      <Button class="right-0 bottom-1 mb-3 mx-3 mt-1.5" @click="post">投稿する</Button>
    </div>
  </div>
</template>

<script lang="ts">
import api from '@/api';

import Button from '@/components/Button.vue';
  
export default {
  components: {
    Button
  },
  data(){
    return {
      postFormContent: ""
    }
  },
  methods: {
    post(){
      api.post("/post/create", {
        "content": this.postFormContent
      })
        .then(() => {
          // TODO: 投稿されたことを表示
        })
        .catch((error) => {
          console.error(error)
          alert("投稿に失敗しました: " + error)
        })
    }
  }
}
</script>
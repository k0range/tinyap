<template>
  <MainLayout title="ユーザー">
    <div>
      <div class="w-full h-16 bg-[#22acda] py-6 px-5 flex">
        <img src="https://korange.work/_astro/icon.BNifbQ6A_52HNF.webp" class="border-4 border-white w-24 h-24 rounded-full">
      </div>
      <div class="flex justify-end">
        <div class="absolute mt-3 mr-5">
          <Button>フォロー</Button>
        </div>
      </div>
      <div class="mt-16 pt-2 px-5">
        <div class="flex">
          <div class="flex-grow">
            <h2 class="text-[#2C2C2C] font-medium text-xl">{{ user.displayName }}</h2>
            <div class="text-[#A7A7A7] mt-0.5 text-[0.9em] flex flex-col justify-center">{{ user.acct }}</div>
          </div>
        </div>

        <div class="text-[#494949] mt-4 break-all">
          {{ user.bio }}
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import api from '@/api';

import Button from '@/components/Button.vue';
import Checkbox from '@/components/Checkbox.vue';
import WelcomePost from '@/components/WelcomePost.vue';
import Input from '@/components/Input.vue';
import MainLayout from '@/components/MainLayout.vue';
import Post from '@/components/Post.vue';

export default {
  components: {
    WelcomePost,
    Button,
    Checkbox,
    Input,
    MainLayout,
    Post
  },
  data(){
    return {
      user: {} as { id: String, acct: String, displayName: String, bio: String, createdAt: String }
    }
  },
  async mounted(){
    this.user = (await api.get("/profile", {params: {acct: "@" + this.$route.params.acct }})).data
  }
}
</script>
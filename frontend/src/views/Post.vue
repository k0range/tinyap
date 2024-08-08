<template>
  <MainLayout title="投稿">
    <Post v-for="i in posts" :display-name="i.author.displayName" :acct="i.author.acct" :content="i.content" :created-at="i.createdAt" />
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
      posts: [] as { id: String, user: string, content: String, createdAt: String }[]
    }
  },
  async mounted(){
    this.posts = (await api.get("/timeline/local")).data
  }
}
</script>
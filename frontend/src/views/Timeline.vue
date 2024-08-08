<template>
  <MainLayout title="ホーム">
    <PostSkeleton v-if="loading" v-for="i in 6" />
    <Post v-if="!loading" v-for="i in posts" :display-name="i.author.displayName" :acct="i.author.acct" :content="i.content" :created-at="i.createdAt" :link="`/${i.author.acct}/post/${i.id}/`" />
    <div v-if="!loading" class="text-sm text-[#a7a7a7] text-center mt-4">End of feed</div>
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
import PostSkeleton from '@/components/PostSkeleton.vue';

export default {
  components: {
    WelcomePost,
    Button,
    Checkbox,
    Input,
    MainLayout,
    Post,
    PostSkeleton
},
  data(){
    return {
      posts: [] as { id: String, user: string, content: String, createdAt: String }[],
      loading: true
    }
  },
  mounted(){
    api.get("/timeline/local")
      .then((response) => {
        this.posts = response.data
        this.loading = false
      })
  }
}
</script>
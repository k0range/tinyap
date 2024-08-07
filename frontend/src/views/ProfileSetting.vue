<template>
  <MainLayout title="プロフィール設定">
    <div class="py-4 px-5">
      <Input text="名前" placeholder="korange" :initalValue="me.displayName" v-if="me.displayName" :saving="displayNameSaving" saveButton @save="saveDisplayName" /> <!-- placeholderはusernameにする -->
      <ToggleButton>test</ToggleButton>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import api from '@/api';

import Button from '@/components/Button.vue';
import Checkbox from '@/components/Checkbox.vue';
import ToggleButton from '@/components/ToggleButton.vue';
import WelcomePost from '@/components/WelcomePost.vue';
import Input from '@/components/Input.vue';
import ModalLayout from '@/components/ModalLayout.vue';
import MainLayout from '@/components/MainLayout.vue';

export default {
  components: {
    WelcomePost,
    Button,
    Checkbox,
    ToggleButton,
    Input,
    ModalLayout,
    MainLayout
  },
  data(){
    return {
      posts: [] as { id: String, user: string, content: String, createdAt: String }[],
      me: {} as { displayName: String },
      displayNameSaving: false
    }
  },
  mounted(){
    this.me = JSON.parse(localStorage.getItem("me") || "{}")
  },
  methods: {
    saveDisplayName(value: String){
      this.me.displayName = value
      this.displayNameSaving = true
      api.post("/profile-setting", this.me)
        .then((response) => {
          this.displayNameSaving = false
        })
    }
  }
}
</script>

<style>
body{
  background-color: #fdfdfd;
}
</style>
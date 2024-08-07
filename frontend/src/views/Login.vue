<template>
  <ModalLayout title="ログイン">
    <div v-if="isHttp" class="bg-yellow-100 rounded-2xl mb-4 py-3.5 px-4 text-yellow-600 text-left flex">
      <font-awesome-icon icon="triangle-exclamation" class="text-lg mr-2" />
      <div class="text-[15px]">
        <div>このサイトの通信は<strong>暗号化されていません</strong></div>
        <div>これが開発環境でない場合は、ログイン情報を送信しないでください。</div>
      </div>
    </div>
    <div v-if="$route.query.to" class="bg-blue-50 rounded-2xl mb-4 py-3.5 px-4 text-blue-700 text-left flex">
      <font-awesome-icon icon="triangle-exclamation" class="text-lg mr-2" />
      <div class="text-[15px]">
        <div>ログイン後、あなたがアクセスしようとしたページに転移します</div>
      </div>
    </div>
    <div class="mt-6">
      <div :class="{'opacity-60': startedLogin}">
        <Input text="ユーザー名" icon="fa-solid fa-at" placeholder="username" suffix="@tinyap.instance" :disabled="startedLogin" v-model="username" />
        <Input type="password" text="パスワード" icon="fa-solid fa-lock" placeholder="********" :disabled="startedLogin" v-model="password" />
      </div>

      <Button w-full rounded :loading="startedLogin" @click="login" :disabled="!username || !password">ログイン</Button>
    </div>
  </ModalLayout>
</template>

<script lang="ts">
import axios from 'axios'
import api from '@/api';

import Button from '@/components/Button.vue';
import Checkbox from '@/components/Checkbox.vue';
import WelcomePost from '@/components/WelcomePost.vue';
import Input from '@/components/Input.vue';
import ModalLayout from '@/components/ModalLayout.vue';
  
export default {
  components: {
    WelcomePost,
    Button,
    Checkbox,
    Input,
    ModalLayout
  },
  data(){
    return {
      startedLogin: false,
      isHttp: false,

      // Form data,
      username: '',
      password: ''
    }
  },
  mounted(){
    this.isHttp = window.location.protocol === 'http:';
  },
  methods: {
    login(){
      this.startedLogin = true;
      
      axios.post("/api/login", {
        "username": this.username,
        "password": this.password
      })
        .then(async (response) => {
          const userdata = await api.get("/me")
          await localStorage.setItem("me", JSON.stringify(userdata.data))

          if (typeof this.$route.query.to === 'string') {
            this.$router.push(this.$route.query.to)
          } else {
            this.$router.push("/")
          }
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
}
</script>
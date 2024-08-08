<template>
  <ModalLayout title="新規登録">
    <div v-if="isHttp" class="bg-yellow-100 rounded-2xl mb-4 py-3.5 px-4 text-yellow-600 text-left flex">
      <font-awesome-icon icon="triangle-exclamation" class="text-lg mr-2" />
      <div class="text-[15px]">
        <div>このサイトの通信は<strong>暗号化されていません</strong></div>
        <div>これが開発環境でない場合は、ログイン情報を送信しないでください。</div>
      </div>
    </div>
    <Transition>
      <div v-if="form == 'legal'">
        <p class="text-[#515151]">TinyAP Demo に登録するには、以下の内容を確認し同意する必要があります。</p>
        <div class="text-left mt-3 mb-6">
          <Checkbox name="guideline" v-model="agreeRule">サーバールールに同意します</Checkbox>
          <Checkbox name="terms" v-model="agreeTerms">利用規約に同意します</Checkbox>
          <Checkbox name="privacy" v-model="agreePrivacy">プライバシーポリシーに同意します</Checkbox>
        </div>
        <Button w-full rounded :disabled="!agreeRule || !agreeTerms || !agreePrivacy" @click="form = 'info'">続ける</Button>
      </div>
      <div v-else-if="form == 'info'" class="mt-6">
        <div :class="{'opacity-60': startedSignup}">
          <Input text="ユーザー名" icon="fa-solid fa-at" placeholder="username" suffix="@tinyap.instance" :disabled="startedSignup" v-model="username" />
          <Input text="メールアドレス" icon="fa-solid fa-envelope" placeholder="info@example.com" :disabled="startedSignup" v-model="email" />
          <Input type="password" text="パスワード" icon="fa-solid fa-lock" placeholder="********" :disabled="startedSignup" v-model="password" />
          <Input type="password" text="パスワード（確認）" icon="fa-solid fa-lock" placeholder="********" :disabled="startedSignup" v-model="repeatPassword" />
        </div>

        <Button w-full rounded :loading="startedSignup" @click="signup" :disabled="password != repeatPassword || !username || !email">新規登録</Button>
      </div>
    </Transition>
  </ModalLayout>
</template>
  
<script lang="ts">
import axios from 'axios'

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
      form: 'legal',
      agreeRule: false,
      agreeTerms: false,
      agreePrivacy: false,
      startedSignup: false,
      isHttp: false,

      // Form data,
      username: '',
      email: '',
      password: '',
      repeatPassword: ''
    }
  },
  mounted(){
    this.isHttp = window.location.protocol === 'http:';
  },
  methods: {
    signup(){
      this.startedSignup = true;
      
      axios.post("/api/signup", {
        "username": this.username,
        "email": this.email,
        "password": this.password
      })
        .then(() => {
          location.href = "/"
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
}
</script>
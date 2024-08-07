
<template>
  <div class="w-[64rem] mx-auto mt-8">
    <div class="flex mb-6">
      <img src="@/assets/lemon.png" alt="" class="w-20 h-20 rounded-full mr-5">
      <div class="flex flex-col justify-center flex-grow">
        <div class="text-[#2C2C2C] font-bold text-2xl">れもね～ど</div>
        <div class="text-[#515151] font-semibold text-md mt-0.5">Powered by TinyAP</div>
      </div>
      <div class="flex flex-col justify-center">
        <div class="flex">
          <a href="/login/"><div class="bg-[#E8E8E8] text-[#2c2c2c] py-2 px-6 rounded-2xl mr-3">ログイン</div></a>
          <Button href="/signup/">新規登録</Button>
        </div>
      </div>
    </div>

    <h2 class="text-2xl text-[#2C2C2C] font-bold mb-2">れもね～ど について</h2>
    <div class="text-[#515151] text-[1.06rem]">
      <p>TinyAP 実験場</p>
      <p>名前はてきとうです</p>
    </div>

    <h2 class="text-2xl text-[#2C2C2C] font-bold mt-6">タイムラインを見てみる</h2>
  </div>

  <div class="">
    <div class="mt-4 flex posts">
      <WelcomePost v-for="i in 100" class="mr-3" />
    </div>
  </div>

  <div class="w-[64rem] mx-auto mt-8">
    <div class="border border-[#1b0f3c] rounded-2xl text-center py-8" style="background-image: url('/src/assets/space.jpg'); background-repeat: no-repeat; background-size: cover;">
      <h2 class="text-2xl text-[#fff] font-bold">れもね～ど に参加して、<br>楽しいFediverseライフを過ごそう！</h2>
      <p class="text-white mt-1 underline">れもね～ど はActivityPubに対応しており、Mastodonなど他のSNSのユーザーと交流できます。</p>
      <button class="bg-white text-[#2C2C2C] rounded-2xl py-2 px-8 font-bold mt-4">登録する</button>
    </div>
  </div>

  <!--<div class="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center bg-white">
    <div class="flex justify-center">
      <div class="text-center">
        <img src="@/assets/lemon.png" alt="" class="w-20 h-20 rounded-full mb-6">
        <img src="@/assets/spinner.svg" alt="Loading..." class="inline w-10 h-10 animate-spin">
      </div>
    </div>
  </div>-->
</template>

<script lang="ts">
import WelcomePost from '@/components/WelcomePost.vue';
import Button from '@/components/Button.vue';

export default {
  components: {
    WelcomePost,
    Button
  }
}
</script>

<style>
@keyframes infinity-scroll-right {
  0%{
    transform: translateX(-400%);
  }
  75%{
    transform: translateX(0%);
  }
  80%{
    transform: translateX(-0%);
  }
  95%{
    transform: translateX(-100%);
  }
  100%{
    transform: translateX(-100%);
  }
}

.posts{
  animation: infinity-scroll-right 22s infinite linear 0.5s both;
}
</style>
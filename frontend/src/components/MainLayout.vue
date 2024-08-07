
<template>
  <div class="flex w-screen max-w-[86rem] sm:px-8 mx-auto">
    <div class="w-[22rem] min-w-[22rem] px-6 py-8 hidden sm:flex flex-col justify-between h-screen sticky top-0">
      <div>
        <img src="@/assets/lemon.png" alt="" class="w-20 h-20 rounded-full mr-5">
        <div class="mt-4">
          <MenuLink to="/timeline/" icon="fa-solid fa-house" text="ホーム" />
          <router-link to="/notifications/">
            <div class="flex mb-2 py-2 text-[#2c2c2c] hover:text-[#449926] duration-200">
              <font-awesome-icon icon="fa-solid fa-bell" class="w-8 h-8" />
              <div class="ml-3.5 mt-px flex flex-col justify-center font-bold text-lg">通知</div>
            </div>
          </router-link>
          <router-link to="/favorites/">
            <div class="flex mb-2 py-2 text-[#2c2c2c] hover:text-[#449926] duration-200">
              <font-awesome-icon icon="fa-solid fa-star" class="w-8 h-8" />
              <div class="ml-3.5 mt-px flex flex-col justify-center font-bold text-lg">お気に入り</div>
            </div>
          </router-link>
          <MenuLink to="/profile-setting/" icon="fa-solid fa-user" text="プロフィール設定" />
        </div>
      </div>
      <div class="text-sm text-[#a7a7a7] mt-8">TinyAP はオープンベータ版です。バグがある可能性があります。気になる点を見つけたら @korange までご連絡ください。</div>
    </div>

    <div class="flex-grow bg-white min-h-screen flex flex-col">
      <div class="z-10 bg-white sm:pt-8 sticky top-0">
        <div class="text-[#2C2C2C] text-xl py-3.5 px-5 font-bold border-b border-b-[#D7D7D7] bg-transparent sm:border sm:rounded-t-2xl border-[#D7D7D7] bg-white">{{ title }}</div>
      </div>
      <div class="sm:border-x border-[#D7D7D7] pb-[25%] flex-grow">
        <slot></slot>
      </div>
    </div>

    <div class="w-[22rem] min-w-[22rem] px-6 py-8 hidden sm:block h-screen sticky top-0">
      <Input icon="fa-solid fa-magnifying-glass" placeholder="検索..." />
      <PostForm />
    </div>
  </div>
</template>

<script lang="ts">
import PostForm from './PostForm.vue';
import Input from './Input.vue';
import MenuLink from './MenuLink.vue';

export default {
  components: {
    PostForm,
    Input,
    MenuLink
  },
  props: {
    title: String
  }
}
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 14px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #a7a7a7;
  border: 4px solid #fff;
  border-radius: 8px;
}
</style>
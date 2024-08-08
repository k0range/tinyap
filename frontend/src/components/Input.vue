<template>
  <div class="flex-grow text-left mb-5">
    <div class="text-sm font-medium text-[#494949] my-1.5" v-if="text">{{ text }}</div>
    <div class="flex">
      <div class="flex-grow relative">
        <div class="absolute flex items-center text-[#2c2c2c]" v-if="icon">
          <font-awesome-icon class="py-3 px-3.5" :icon="icon" />
        </div>
        <div class="absolute right-0 py-2 text-[15px] text-[#2C2C2C] pl-1 pr-3.5" v-if="suffix" ref="suffix">{{ suffix }}</div>
        <input :type="type" class="w-full py-2 border border-[#D7D7D7] rounded-2xl text-[#2C2C2C] text-[15px] disabled:bg-[#F9F9F9]" :style="suffix ? `padding-right: ${suffixWidth}px;`: ''" :placeholder="placeholder" :class="{'pl-[2.325rem] pr-4': icon, 'px-4': !icon}" :disabled="disabled || saving" @input="update" v-model="inputValue">
      </div>
      <Button class="ml-2" v-if="( saveButton && edited ) || saving" @click='save'>
        <img v-if="saving" src="@/assets/spinner.svg" alt="Loading..." class="w-4 h-4 inline animate-spin">
        <span v-else>保存</span>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import Button from './Button.vue';

export default {
  props: {
    text: String,
    icon: String,
    placeholder: String,
    suffix: String,
    type: {
      type: String,
      default: "text"
    },
    disabled: Boolean,
    saveButton: Boolean,
    saving: Boolean,
    initalValue: {
      type: String,
      default: ""
    }
  },
  components: {
    Button
  },
  data() {
    return {
      suffixWidth: 0,
      edited: false,
      inputValue: ""
    };
  },
  emits: [
    'save',
    'update:modelValue'
  ],
  mounted() {
    if (this.initalValue.length !== 0) {
      this.inputValue = this.initalValue
    }

    if (this.suffix) {
      this.updateSuffixWidth();
      window.addEventListener('resize', this.updateSuffixWidth);
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateSuffixWidth);
  },
  methods: {
    update(arg: any){
      this.edited = true;
      this.$emit("update:modelValue", arg.target.value)
    },
    updateSuffixWidth(){
      this.suffixWidth = this.$refs.suffix.getBoundingClientRect().width;
    },
    save(){
      if (!this.saving) {
        this.$emit("save", this.inputValue);
        this.edited = false;
      }
    }
  }
}
</script>
<template>
  <div class="flex justify-between">
    <div class="text-[#2C2C2C] flex flex-col justify-center">
      <slot></slot>
    </div>
    <div class="flex text-[#a7a7a7] text-sm disabled:bg-[#F9F9F9] font-medium">
      <button @click="onOrOff = true" class="rounded-l-2xl py-2 px-3.5 border border-[#D7D7D7] border-r-0" :class="{'bg-[#449926] text-white': onOrOff === true}">
        ON
      </button>
      <button @click="onOrOff = false" class="rounded-r-2xl py-2 px-3.5 border border-[#D7D7D7]" :class="{'bg-red-500 text-white': onOrOff === false}">
        OFF
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    name: String,
    checked: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      onOrOff: false
    }
  },
  emits: [
    'click',
    'update:modelValue'
  ],
  methods: {
    update(arg: any){
      this.$emit("update:modelValue", arg.target.checked)
    }
  }
}
</script>

<style scoped>
.checkbox {
  appearance: none;
  width: 30px;
  min-width: 30px;
  height: 30px;
  margin: 4px 0px;
  border: 1px solid #D7D7D7;
  border-radius: 0.75rem;
  transition-duration: 150ms;
}

.checkbox:checked {
  background-color: #449926;
  border: 1px solid #449926;
}

.checkbox::before {
  content: "";
  display: block;
  position: relative;
  left: 10px;
  top: 6px;
  width: 8px;
  height: 13px;
  border: solid #D7D7D7;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

.checkbox:checked::before {
  border: solid #fff;
  border-width: 0 3px 3px 0;
}
</style>
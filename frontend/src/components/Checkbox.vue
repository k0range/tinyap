<template>
  <div class="flex">
    <input type="checkbox" :name="name" :id="name" class="checkbox" :checked="checked" @input="update"><label :for="name" class="ml-3 flex flex-col justify-center text-[#2C2C2C]"><slot></slot></label>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    name: String,
    checked: Boolean,
    wFull: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
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
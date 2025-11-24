<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-label">{{ label }}</label>

    <input
      v-bind="$attrs"
      :value="modelValue"
      @input="onInput"
      class="input"
    />

    <p v-if="error" class="input-error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['update:modelValue'])

defineOptions({ inheritAttrs: false })

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  error: { type: String, default: '' }
});

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement | null
  if (!target) return
  emit('update:modelValue', target.value)
};
</script>

<style scoped>
.input-label {
  display: flex;
  margin-bottom:6px;
  font-size:13px;
  color:#444;
}
.input {
  width: calc(100% - 24px);
  padding: 10px 12px;
  border-radius: 12px;
  border: 1.5px solid lightgrey;
  outline: none;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  box-shadow: 0px 0px 20px -18px;
}
.input:hover {
  border: 2px solid lightgrey;
  box-shadow: 0px 0px 20px -17px;
}
.input:focus {
  border: 2px solid grey;
}
.input:active {
  transform: scale(0.95);
}
</style>

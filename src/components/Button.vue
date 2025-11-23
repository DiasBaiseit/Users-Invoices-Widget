<template>
  <button class="btn" @click.stop="$emit('click')">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  border: 1px solid #13aa52;
  border-radius: 4px;
  background: #13aa52;
  padding: 6px 10px;
  color: #fff;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  background: #0e9345;
}
</style>

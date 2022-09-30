<template>
  <div class="welcome-name">
    <span v-if="!!name">Welcome, {{ name }}</span>&nbsp;
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMsal } from '../composition-api/useMsal';
const { accounts } = useMsal();

const name = computed(() => {
  if (accounts.value.length > 0) {
    const name = accounts.value[0].name;
    if (name) {
      return name.split(" ")[0];
    }
  }
  return "";
});

</script>

<style scoped>
.welcome-name {
  padding-top: 8px;
}
</style>

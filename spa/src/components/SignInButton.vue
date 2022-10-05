<template>
  <button @click="loginRedirect">
    Sign In
  </button>
</template>

<script setup lang="ts">
import { useMsal } from "../composition-api/useMsal"
import { loginRequest } from "../authConfig"

const { instance } = useMsal()

const loginRedirect = () => {
  instance.loginRedirect(loginRequest)
}
</script>

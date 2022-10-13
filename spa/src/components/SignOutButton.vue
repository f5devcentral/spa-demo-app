<template>
  <div>
    <WelcomeNameComponent />
    <ShowJWTComponent />
    <span class="h-margin"
      ><button id="profile" @click="$router.push('/profile')">Profile</button></span
    >
    <span class="h-margin"><button id="logout" @click="logoutRedirect">Logout</button></span>
  </div>
</template>

<script setup lang="ts">
import { useMsal } from "../composition-api/useMsal"
import WelcomeNameComponent from "./WelcomeNameComponent.vue"
import ShowJWTComponent from "./ShowJWTComponent.vue"

const { instance } = useMsal()

const logoutRedirect = () => {
  instance.logoutRedirect()
}
</script>

<style scoped>
.jwt-dialog-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 20px;
}

#jwt {
  font-size: 8px;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
}

.copy-button {
  margin-right: 20px;
}

.profile-link {
  text-decoration: none;
}

span.h-margin {
  margin-left: 6px;
  margin-right: 6px;
}
</style>

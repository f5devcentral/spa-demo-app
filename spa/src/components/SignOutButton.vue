<template>
  <div>
    <el-dropdown class="pointer">
      <WelcomeName />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-on:click="$router.push('/profile');">Profile</el-dropdown-item>
          <el-dropdown-item v-on:click="logoutRedirect">Logout</el-dropdown-item>
          <!-- <el-dropdown-item v-on:click="logoutPopup">Logout Popup</el-dropdown-item> -->
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span id="jwt" @click="showJWT">(JWT)</span>
  </div>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue';
import { useMsal } from '../composition-api/useMsal';
import WelcomeName from './WelcomeName.vue';
import { InteractionRequiredAuthError, InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";
import { ElMessageBox } from 'element-plus'

const { instance, inProgress } = useMsal();

// const logoutPopup = () => {
//   instance.logoutPopup({
//     mainWindowRedirectUri: "/"
//   });
// }

const logoutRedirect = () => {
  instance.logoutRedirect();
}

const showJWT = (async () => {
  const response = await instance.acquireTokenSilent({
    ...loginRequest
  }).catch(async (e) => {
    if (e instanceof InteractionRequiredAuthError) {
      await instance.acquireTokenRedirect(loginRequest);
    }
    throw e;
  });
  if (inProgress.value === InteractionStatus.None) {
    ElMessageBox.alert(response.accessToken, 'JSON Web Token', {
      customStyle: { "max-width": "90% !important", "height": "50%", "overflow-wrap": "anywhere" } as CSSProperties,
      confirmButtonText: 'OK'
    })
  }
})
</script>

<style scoped>
#jwt {
  font-size: 8px;
  cursor: pointer;
}

.profile-link {
  text-decoration: none;
}

.pointer {
  cursor: pointer;
}
</style>
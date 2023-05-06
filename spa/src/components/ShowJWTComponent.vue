<template>
  <span id="jwt" @click="getJwt">(JWT)</span>
  <el-dialog v-model="dialogOpen">
    <template #header="{ titleId, titleClass }">
      <div class="jwt-dialog-header">
        <h4 :id="titleId" :class="titleClass">Brewz API JSON Web Token</h4>
        <el-button id="copyButton" @click="copyContent(jwtToken)" class="copy-button">
          <el-icon class="el-icon--left"> <CopyDocument /> </el-icon>Copy to clipboard
        </el-button>
      </div>
    </template>
    <div id="jwtText">{{ jwtToken }}</div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useMsal } from "../composition-api/useMsal"
import { InteractionRequiredAuthError, InteractionStatus } from "@azure/msal-browser"
import { tokenRequest } from "../authConfig"
import { ElButton, ElDialog, ElMessage, ElIcon } from "element-plus"
import clipboardCopy from "clipboard-copy"
import { CopyDocument } from "@element-plus/icons-vue"

const { instance, inProgress } = useMsal()

let dialogOpen = ref(false)
let jwtToken = ref("")

const getJwt = async () => {
  const tokenResponse = await instance
    .acquireTokenSilent({
      ...tokenRequest,
    })
    .catch(async e => {
      if (e instanceof InteractionRequiredAuthError) {
        await instance.acquireTokenRedirect(tokenRequest)
      }
      throw e
    })
  if (inProgress.value === InteractionStatus.None) {
    jwtToken.value = tokenResponse.accessToken
    dialogOpen.value = true
  }
}

const copyContent = async (content: string) => {
  try {
    await clipboardCopy(content)
    ElMessage({
      showClose: true,
      message: "Copied",
      type: "success",
    })
  } catch {
    ElMessage({
      showClose: true,
      message: "Failed",
      type: "error",
    })
  }
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

#jwtText {
  word-wrap: break-word;
}

.copy-button {
  margin-right: 20px;
}
</style>

<template>
  <div>
    <el-dropdown class="pointer">
      <WelcomeName />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="$router.push('/profile');">
            Profile
          </el-dropdown-item>
          <el-dropdown-item @click="logoutRedirect">
            Logout
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span
      id="jwt"
      @click="showJWT"
    >(JWT)</span>
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, h } from "vue"
import { useMsal } from "../composition-api/useMsal"
import WelcomeName from "./WelcomeName.vue"
import { InteractionRequiredAuthError, InteractionStatus } from "@azure/msal-browser"
import { tokenRequest } from "../authConfig"
import { ElMessageBox } from "element-plus"

const { instance, inProgress } = useMsal()

const logoutRedirect = () => {
  instance.logoutRedirect()
}

const showJWT = (async () => {
  const tokenResponse = await instance.acquireTokenSilent({
    ...tokenRequest
  }).catch(async (e) => {
    if (e instanceof InteractionRequiredAuthError) {
      await instance.acquireTokenRedirect(tokenRequest)
    }
    throw e
  })
  if (inProgress.value === InteractionStatus.None) {
    ElMessageBox({
      title: "Brewz API JSON Web Token",
      customStyle: { "max-width": "90% !important", "overflow-wrap": "anywhere" } as CSSProperties,
      message: h("div", null, [
        h("div", { class: "copy" }, [
          h("button", {
            onClick: () => {
              copyJwtText(tokenResponse.accessToken)
            }
          },
            [
              h("div", { class: "copy-container" }, [
                h("div", { class: "material-icons copy-icon" }, "content_copy"),
                h("div", { class: "material-icons copied" }, "done")
              ])
            ]),
        ]),
        h("textarea", { class: "jwt-text", id: "jwtText" }, tokenResponse.accessToken),
      ]),
      confirmButtonText: "OK",
    })
  }
})

const copyJwtText = (text: string) => {
  // Backward compat code for older browsers
  // @ts-ignore:next-line
  const clipboardData = event.clipboardData || window.clipboardData || event.originalEvent?.clipboardData || navigator.clipboard

  clipboardData.writeText(text)

  const element = document.querySelector(".copied") as HTMLElement
  element.classList.add("fade-out")
  setTimeout(() => element.classList.remove("fade-out"), 3100)
}
</script>

<style scoped>
@import "https://fonts.googleapis.com/icon?family=Material+Icons";

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

<style>
.jwt-container {
  max-width: 90%;
  height: 50%;
  background-color: red;
}

.copy {
  float: right;
  margin-bottom: 10px;
}

.copy button {
  padding-top: 10px;
  padding-bottom: 8px;
  padding-left: 6px;
  padding-right: 6px;
}

.copy-container {
  display: grid;
}

.copy-icon,
.copied {
  grid-area: 1/1;
  margin: 0px;
  padding: 0px;
}

.copy-icon {
  font-size: 20px;
  color: gray;
}

.copied {
  display: block;
  opacity: 0;
  color: green;
  font-size: 20px;
  font-weight: bolder;
  margin-left: 10px;
}

.jwt-text {
  width: 100%;
  height: 400px;
  resize: none;
}

.fade-out {
  animation: fadeOut 3s;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>

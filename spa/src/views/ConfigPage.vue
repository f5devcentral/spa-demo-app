<template>
  <h3>Configuration Items</h3>
  <form>
    <div>
      <label for="spaUrl">SPA Url</label>
      <input
        type="text"
        id="spaUrl"
        @input="updateForm('spaUrl', ($event.target as HTMLInputElement).value)"
        :value="form.spaUrl"
      />
    </div>

    <div>
      <label for="apiUrl">API Url</label>
      <input
        type="text"
        id="apiUrl"
        @input="updateForm('apiUrl', ($event.target as HTMLInputElement).value)"
        :value="form.apiUrl"
      />
    </div>

    <div>
      <label for="recommendationsUrl">Recommendations Url</label>
      <input
        type="text"
        id="recommendationsUrl"
        @input="updateForm('recommendationsUrl', ($event.target as HTMLInputElement).value)"
        :value="form.recommendationsUrl"
      />
    </div>

    <div>
      <label for="inventoryUrl">Inventory Url</label>
      <input
        type="text"
        id="inventoryUrl"
        @input="updateForm('inventoryUrl', ($event.target as HTMLInputElement).value)"
        :value="form.inventoryUrl"
      />
    </div>

    <div>
      <label for="checkoutUrl">Checkout Url</label>
      <input
        type="text"
        id="checkoutUrl"
        @input="updateForm('checkoutUrl', ($event.target as HTMLInputElement).value)"
        :value="form.checkoutUrl"
      />
    </div>

    <div>
      <label for="userId">User Id</label>
      <input
        type="text"
        id="userId"
        @input="updateForm('userId', ($event.target as HTMLInputElement).value)"
        :value="form.userId"
      />
    </div>

    <div>
      <label for="enableSecurity">
        <input
          type="checkbox"
          id="enableSecurity"
          :checked="form.enableSecurity"
          @change="updateForm('enableSecurity', ($event.target as HTMLInputElement).checked)"
        />
        Enable Security
      </label>
    </div>
  </form>
</template>

<script setup lang="ts">
import { loadStorage, saveStorage } from "@/utils/Storage"

const updateForm = (input: string, value: string | boolean) => {
  form[input] = value

  let storedForm = loadStorage() // extract stored form
  storedForm[input] = value // store new value
  saveStorage(storedForm) // save changes into localStorage
}

let form: any = {
  spaUrl: "",
  apiUrl: "",
  recommendationsUrl: "",
  inventoryUrl: "",
  checkoutUrl: "",
  userId: "",
  enableSecurity: false,
}

const storedForm = loadStorage()
if (storedForm) {
  form = {
    ...form,
    ...storedForm,
  }
}
</script>

<style scoped>
input {
  margin: 12px;
}
</style>

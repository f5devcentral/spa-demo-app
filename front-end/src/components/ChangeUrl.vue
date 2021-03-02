<template>
    <div class="formContainer">
    <form id="settings" v-on:submit.prevent="onSubmit">
      <p id="errors" v-if="errors.length > 0">
          Errors:
        <ul id="errors">
        <li v-for="error in errors" :key="error.id">
          {{ error }} 
        </li>
      </ul>
    </p>
      <!-- <label> Change {{ service.title }} URL:</label> -->
      <input type="text" v-model="service.url" />
      
      <button v-if="!showSuccessMessage">Submit</button>
      <button
        class="green-button"
        v-if="showSuccessMessage"
        disabled
      >
        Saved!
      </button>
    </form>
  </div>
</template>
<script>
export default {
  name: "ChangeUrl",
  props: ["service"],
  data() {
    return {
      showSuccessMessage: false,
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.$emit("hide");
      }, 1500);
    },
  },
};
</script>
<style scoped>
label {
  display: inline-block;
  text-align: left;
  font-weight: bold;
}
input[type="text"] {
  display: inline-block;
  text-align: left;
  padding: 10px;
  width: 100%;
  border: 0;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  /* border-radius: 10px; */
}
.green-button {
  background-color: green;
}
</style>
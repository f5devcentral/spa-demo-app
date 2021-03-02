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
      <input type="text" v-model="service.url" :disabled="showSuccessMessage" />
      <span class="material-icons" 
      v-on:click="onSubmit"
      v-if="!showSuccessMessage">
        check_circle
      </span>
      <span class="material-icons green-button" 
      v-if="showSuccessMessage">
        check_circle
      </span>
      
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
button {
  width: 20px;
  height: 20px;
}
.green-button {
  color: green;
}
span {
  position: absolute;
  /* bottom: 20px;
  right: 15px; */
  top: 222px;
  right: 40px;
}
</style>
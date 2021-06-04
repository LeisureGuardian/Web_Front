<template>
  <v-container id="signUpPage">
    <AddDeviceForm></AddDeviceForm>
  </v-container>
</template>

<script>
import AddDeviceForm from "../components/AddDeviceForm";
export default {
  name: "AddDeviceForm",
  components: {
    AddDeviceForm,
  },
};
</script>

<style scoped>
</style>
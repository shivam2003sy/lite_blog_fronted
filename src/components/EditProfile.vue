<template>
    <div class="container my-5">
      <h2 class="mb-4">Edit Profile</h2>
      <form @submit.prevent="updateUser">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email">
      </div>
      <div>
        <label for="image">Image:</label>
        <input type="file" id="image" ref="fileInput">
      </div>
      <button type="submit">Update Profile</button>
    </form>
    </div>
  </template>
  
  <script>
import axios from 'axios';

  export default {
    name: 'EditProfile',
    data() {
      return {
        email: "",
      image: null
      };
    },
    methods: {
      updateUser() {
  const data = new FormData();
  data.append('email', this.email);
  data.append('image', this.$refs.fileInput.files[0]);
  axios.put('/api/user', data)
    .then(response => {
      console.log(response.data.message)
    })
    .catch(error => {
      console.log(error.response.data.error)
    })
}
    }
  };
  </script>
  
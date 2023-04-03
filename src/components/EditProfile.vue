<template>
    <div class="container my-5">
      <h1 class="mb-4">Edit Profile</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="profile-image">Profile Image</label>
          <div class="custom-file">
            <input type="file" id="profile-image" class="custom-file-input" @change="onImageChange" accept="image/*">
            <label class="custom-file-label" for="profile-image">Choose file</label>
          </div>
          <img :src="profileImageUrl" class="img-fluid mt-3" alt="Profile Image">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EditProfile',
    data() {
      return {
        profileImageUrl: '', // stores the URL of the profile image
        email: '', // stores the email address
      };
    },
    methods: {
      onImageChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.profileImageUrl = reader.result;
        };
      },
      submitForm() {
        const formData = new FormData();
        formData.append('profileImage', this.profileImageUrl);
        formData.append('email', this.email);
        // add your logic to send the form data to the server using an HTTP request
        // once the server responds, handle the response appropriately
      },
    },
  };
  </script>
  
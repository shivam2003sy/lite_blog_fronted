<template>
  <div class="container my-5">
    <h2 class="mb-4">Edit Profile</h2>
    <form @submit.prevent="updateUser">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" class="form-control" v-model="email">
      </div>
      <div class="form-group">
        <label for="report">Report Type:</label>
        <div class="form-group mb-3">
              <select class="form-control" id="exampleFormControlSelect1" 
              v-model="report_type">
                <option>html format</option>
                <option>pdf format</option>
              </select>
            </div>
      </div>
      <div class="form-group">
        <label for="image">Image:</label>
        <div class="custom-file">
          <input type="file" id="image" class="custom-file-input" ref="fileInput">
          <label class="custom-file-label" for="image">Choose file</label>
        </div>
      </div>
      <button type="submit" class="btn btn-primary m-5">Update Profile</button>
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
      report_type: "",
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

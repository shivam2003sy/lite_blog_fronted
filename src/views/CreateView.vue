<template>
    <NavBar/>
      <div class="container m-3">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1>Create New Blog Post</h1>
        <div v-if="loading" class="text-center">
        <i class="fa fa-spinner fa-spin fa-2x"></i>
      </div>

      <div v-else-if="message" class="alert alert-sucess">{{ message }}</div>
      <div v-else>
        <form @submit.prevent="submitForm" class="mt-4">
          <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" id="title" v-model="title" class="form-control">
          </div>
          <div class="form-group">
            <label for="description">Description:</label>
            <textarea id="description" v-model="description" class="form-control"></textarea>
          </div>
          <div class="form-group">
            <label for="image">Image:</label>
            <div>
              <input type="file" id="image" @change="previewImage" class="form-control-file">
            </div>
            <div class="mt-2">
              <img v-if="imagePreview" :src="imagePreview" alt="Image preview" class="img-fluid">
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Create Post</button>
        </form>
        </div>  
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
export  default {
  name: 'CreateView',
    components: {   
        NavBar
    },

    data() {
        return {
        title: '',
        description: '',
        image: null,
        imagePreview: null,
        message :"",
        loading : false
        }
    },
    methods: {
        previewImage(event) {
        const file = event.target.files[0];
        this.image = file;
        this.imagePreview = URL.createObjectURL(file);
        },
        async submitForm() {
        try {
        this.loading = true;
        const formData = new FormData();
        formData.append('title', this.title);
        formData.append('description', this.description);
        formData.append('file', this.image);
        const response = await axios.post('api/posts', formData);
        console.log(response);
        this.message = "Post Created Successfully";
        this.loading = false;
        setTimeout(() => {
        this.$router.push('/');
        }, 1000);
        } catch (error) {
        this.message = error.response.data.message;
        }
        this.loading = false;
        this.title = '';
        this.description = '';
        this.image = null;
        this.imagePreview = null;
        }
    }
}
</script>


<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-5">
        <div v-if="editProfile">
       
          <div class="card">
            <button class="btn btn-secondary 
          " @click="close">Close</button>
            <div class="card-body">
              <EditProfile 
              :mail="user.email"

                />
            </div>
          </div>
            </div>
        <div v-else class="card">
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                class="rounded-circle me-3"
                alt="Avatar"
                @click="uploadImage"
                style="width: 60px; height: 60px; object-fit: cover;"
              />
              <div class="flex-grow-1">
                <h2 class="m-0"><b>@{{ user.user }}..</b></h2>
                <p class="text-muted link"></p>
                <span><b>{{ user.email }}</b></span>
                <p>{{ profile.bio }}</p>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <div class="text-center">
                <div class="mid"><strong>{{ profile.no_of_posts }}</strong></div>
                <span>posts</span>
              </div>
              <div class="text-center">
                <div class="mid1"><strong>{{ followers }}</strong></div>
                <span>followers</span>
              </div>
              <div class="text-center">
                <div class="mid1"><strong>{{ profile.no_of_following }}</strong></div>
                <span>following</span>
              </div>
            </div>
            <div class="mt-3">
              <button v-if="isLoggedUser" class="btn btn-primary" @click="edit()">Edit Profile</button>
              <div v-if="!isLoggedUser">
                <button v-if="isFollowing" class="btn btn-danger" @click="toggleunfollow">Unfollow</button>
                <button v-if="!isFollowing" class="btn btn-primary" @click="toggleFollow">Follow</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 " v-if="isLoggedUser">
        <div class="card">
          <div class="card-body">
            <label>
              <h4>Export/Import Posts</h4>
            </label>
            <strong>
              <p class="text-muted">
                Export your posts to a CSV file and import them to another account.
              </p>
              <p class="text-muted">
                Note: This will not export your comments! comments will be lost.
              </p>
            </strong>
            <hr>
            <div>
              <!--  report type -->
              <p class="text-muted">
                <strong> Report Type selected : {{ profile.report_type }}</strong>
              </p>
              <div class="m-1">
                <NotifiCation v-if="message" :message="message" :type="type" />
              </div>
            </div>
            <div v-if="loading">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <button v-else class="btn btn-primary mb-3" @click="exportPosts">Export Posts</button>
            <div class="mb-3">
              <input type="file" class="form-control mb-1" @change="onFileChange" accept=".csv" />
              <button class="btn btn-primary mb-3" @click="importPosts">Import Posts</button>
            </div>
            
            <hr>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
  import EditProfile from '@/components/EditProfile.vue'
  import axios from 'axios'
  import NotifiCation from './NotifiCation.vue'
  export default {
    name: 'ProfileHeader',

    props: {
      user: Object,
      profile: Object,
      isFollowing : Boolean
    },
    components:{
      EditProfile,
      NotifiCation
    },
    data() {
      return {
     
        editProfile: false,
        followers : this.profile.no_of_followers,
        message: '',
        type: '',
        loading : false , 
        file  : null
      }
    },
    methods: {
      onFileChange(event) {
      this.file = event.target.files[0];
      console.log(this.file)
    },
    importPosts() {
      let formData = new FormData();

      if (this.file)
      formData.append('file', this.file);
      axios.post('/api/import', formData)
        .then(response => {
          console.log(response.data);
          this.message = response.data.message;
          this.type = 'success';
          setTimeout(() => {
            // reload the page
            location.reload();
          }, 3000);
        })
        .catch(error => {
          console.error(error);
          this.message = error
          this.type = 'danger'
        });
    },

      async toggleFollow() {
        await axios.post(`/api/users/${this.user.user}/follow`)
        .then((res) => {
          console.log(res.data.data)
          console.log(res.data.message)
          this.$emit('update:isFollowing',true)
          this.followers = this.followers + 1
        })
        .catch((err) => {
          console.log(err)
        })
      },
      async toggleunfollow() {
        await axios.post(`/api/users/${this.user.user}/unfollow`)
        .then((res) => {
          console.log(res.data.data)
          console.log(res.data.message)
          this.$emit('update:isFollowing',false)
          this.followers = this.followers - 1
        })
        .catch((err) => {
          console.log(err)
        })
      },
      edit(){
        this.editProfile = !this.editProfile
      },
      
      close(){
        this.editProfile = !this.editProfile
      },
      exportPosts(){
        this.loading = true
        try {
        axios.get(`/api/export/${this.user.user}`)
        .then((res) => {
          this.loading = false
          console.log(res.data.data)
          this.message = res.data.message
          this.type = 'success'
          console.log(res.data.message)
          setTimeout(() => {
            this.message = ''
          }, 3000)
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
          this.message = err
          this.type = 'error'
          setTimeout(() => {
            this.message = ''
          }, 3000)
        })
      } catch (error) {
        this.loading = false
        console.log(error)
        this.message = error
        this.type = 'error'
        setTimeout(() => {
          this.message = ''
        }, 3000)
      }
    },
    },
    computed: {
      profileImageUrl() {
        if(this.profile.image == null){
          return 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp'
        }
        else{
          return this.profile.image
        }
      },
      isLoggedUser(){
        console.log('route user',this.$route.params.username)
        console.log('local user',localStorage.getItem('user'))
        return this.$route.params.username === localStorage.getItem('user');
      },
    },
    
  }
  </script>
  
  <style scoped>

.container{
  margin-top: 25px;
}
  .profile-header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
    margin-bottom: 5px;
  }
  
  .profile-header-info {
    display: flex;
    align-items: center;
  }
  
  .profile-header-info img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: 20px;
  }
  
  .profile-header-text {
    display: flex;
    flex-direction: column;
    /* margin-left:5px; */
    
  }
  
  .profile-header-text h2 {
    margin: 0;
    font-size: 24px;
  }
  
  .profile-header-text span {
    font-size: 18px;
    color: gray;
  }
  
  .profile-header-text p {
    margin: 10px 0;
    font-size: 16px;
  }
  
  .profile-header-stats {
    display: flex;
    margin-bottom: 10px;
  }
  
  .profile-header-stats div {
    margin-right: 20px;
  }
  
  .profile-header-stats strong {
    display: block;
    font-size: 18px;
  }
  
  .profile-header-stats span {
    font-size: 16px;
    color: gray;
  }
  
  .profile-header button {
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    background-color: #3897f0;
    border: none;
    cursor: pointer;
  }
  
  .profile-header button:hover {
    background-color: #2d6daa;
  }
  .custom-file-label::after {
    content: "Choose file";
  }

  .custom-file-label:hover {
    cursor: pointer;
    color: rgb(255, 162, 0);
    text-decoration: underline;
  }

  .custom-file-label[aria-invalid="true"]::before {
    border-color: red;
  }
  .custom-file-label::after {
  content: "Choose file";
}

.custom-file-label:hover {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
.mid{
 margin-left: 10px;
}
.mid1{
 margin-left: 10px;

}

  </style>
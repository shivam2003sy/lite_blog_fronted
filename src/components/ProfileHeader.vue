<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-4">
        <div v-if="editProfile">
       
          <div class="card">
            <button class="btn btn-secondary 
          " @click="close">Close</button>
            <div class="card-body">
              <EditProfile />
            </div>
          </div>
            </div>
        <div v-else class="card">
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <img
                :src="profileImageUrl"
                class="rounded-circle me-3"
                alt="Avatar"
                @click="uploadImage"
                width="120px"
                height="120px"
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
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <button class="btn btn-primary mb-3" @click="exportPosts">Export Posts</button>
            <div class="mb-3">
              <input type="file" class="form-control" @change="importPosts" />
            </div>
            <button class="btn btn-primary mb-3" @click="importPosts">Import Posts</button>
            
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
  export default {
    name: 'ProfileHeader',
    props: {
      user: Object,
      profile: Object,
      isFollowing : Boolean
    },
    components:{
      EditProfile
    },
    data() {
      return {
        // profileImageUrl: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp',
        editProfile: false,
        followers : this.profile.no_of_followers
      }
    },
    methods: {
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
      changeProfile(){
        
      },
      close(){
        this.editProfile = !this.editProfile
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
 margin-left: 15px;
}
.mid1{
 margin-left: 25px;
}

  </style>
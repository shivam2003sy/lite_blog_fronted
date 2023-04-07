<template>
  <div class="container">
    <div class="profile-header">
      <div class="profile-header-info">
        <!-- <img @click="" :src='h' alt="Profile picture"> -->
        <img  :src="profileImageUrl" class="rounded-circle"  alt="Avatar"  @click="uploadImage" />
        <div class="profile-header-text">
          <h2> <b> {{ user.user }} </b></h2>
          <p class="text-muted mb-0 link">
            <!-- <a @click="changeProfile"       href= '#' v-if='isLoggedUser' class="text-muted mb-0 link">
              Change Profile
            </a> -->
            <!-- <input type="file" id="profile-image" class="custom-file-input" @change="onImageChange" accept="image/*"> -->
          </p> 
          <span> <b> @{{ user.email }} </b>  </span>
          <p>{{ profile.bio }}</p>
          <div class="profile-header-stats">
            <div>
              <div class="mid">
              <strong>{{ profile.no_of_posts}}</strong></div>
              <span>posts</span>
            </div>
            <div>
              <div class="mid1">
              <strong>{{ followers }}</strong></div>
              <span>followers</span>
            </div>
            <div>
                <div class="mid1">
              <strong>{{ profile.no_of_following }}</strong></div>
              <span>following</span>
            </div>
          </div>
          
          <button v-if="isLoggedUser" @click="edit()">Edit Profile</button>
          <div v-if="!isLoggedUser">
          <button v-if="isFollowing" @click="toggleunfollow">Unfollow</button>
          <button v-if="!isFollowing" @click="toggleFollow">follow</button>
        </div>
        </div>
      </div>
      </div>
      <div v-if="editProfile">
        <EditProfile/>
        </div>
      </div>
      <hr>
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
    }
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
    /* margin-left: 10px; */
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
    color: blue;
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
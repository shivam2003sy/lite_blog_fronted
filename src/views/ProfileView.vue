
<template>
  <div class="profile-page">
    <header>
      <profileHeader :user="user" :profile = "profile" />
    </header>
    <main>
      <div class="profile-content">
        <profilePosts :posts="posts" />
      </div>
      <div class="profile-sidebar">
        <profileFollowers :followers="followers" />
      </div>
    </main>
  </div>
  {{ user }}
  {{ profile }}
  {{ posts }}
</template>
<script>

import ProfileHeader from '@/components/ProfileHeader.vue'

import axios from 'axios'
export default {
  name: 'ProfilePage',
  components: {
    ProfileHeader,
    
  },
  data() {
    return {
      posts: [],
      followers: [],
      user : null,
      profile : null
}
  },
async created(){
  let user  = this.$route.params.username
  console.log('params',user)
  let response =  axios.get('api/users/'+user)
  response.then((res) => {
    console.log('response',res.data.data)
    this.user = res.data.data.user
    this.profile =  res.data.data.userprofile
  })
  .catch((err) => {
    console.log(err)
  })
  // let posts =  axios.get('/api/users/'+user+'/posts')
  // posts.then((res) => {
  //   this.posts = res.data.data
  //   console.log(res.data.data)
  // })
}
}
</script>






<style scoped>
.profile-page {
  max-width: 1200px;
  margin: 0 auto;
}

.profile-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.profile-sidebar {
  width: 300px;
  margin-left: 40px;
}

@media screen and (max-width: 1024px) {
  .profile-sidebar {
    display: none;
  }
}
</style>

<template>
  <NavBar />
  <div class="profile-page">
    <header>
      <profileHeader :user="user" :profile = "profile" />
    </header>
    <main>
      <div class="profile-content">
        <!-- <profilePosts :posts="posts" /> -->
      </div>
      <div class="profile-sidebar">
        <!-- <profileFollowers :followers="followers" /> -->
      </div>
    </main>

  </div>
  {{ user }}
  {{ profile }}
  {{ posts }}
</template>
<script>

import ProfileHeader from '@/components/ProfileHeader.vue'

import NavBar from '@/components/NavBar.vue'
import axios from 'axios'
export default {
  name: 'ProfilePage',
  components: {
    ProfileHeader,
    NavBar
  },
  data() {
    return {
      user: {},
      profile : {},
      posts: [],
      followers: []
    }
  },
  computed : {
  //   user () {
  //   return this.$store.state.user.user
  // },
  // userprofile () {
  //   return this.$store.state.user.userprofile
  // }
},
async mounted(){
  let user  = this.$route.params.username
  let response =  axios.get('api/users/'+user)
  response.then((res) => {
    this.user = res.data.user
    this.profile =  res.data.profile
  })
  .catch((err) => {
    console.log(err)
  })
  let posts =  axios.get('/api/users/'+user+'/posts')
  posts.then((res) => {
    this.posts = res.data.data
    console.log(res.data.data)
  })
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
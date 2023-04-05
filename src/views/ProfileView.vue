
<template>
  <div >
    <NavBar/>
    <header>
      <profileHeader :user="user" :profile = "profile"  :isFollowing ='isFollowing' v-on:update:isFollowing="handleUpdateIsFollowing" />
    </header>
    <main>
      <div >
        <profilePosts :posts="posts" />
      </div>
      <div v-if="isLoggedUser">
      <div>
        <profileFollowers  />
      </div>
      <div >
        <profileFollowing />
      </div>
    </div>
    </main>
  </div>
</template>
<script>

import ProfileHeader from '@/components/ProfileHeader.vue'
import ProfilePosts from '@/components/ProfilePosts.vue'
import ProfileFollowers from '@/components/ProfileFollowers.vue'
import ProfileFollowing from '@/components/ProfileFollowing.vue'
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'
export default {
  name: 'ProfilePage',
  components: {
    ProfileHeader,
    NavBar,
    ProfilePosts,
    ProfileFollowers,
    ProfileFollowing
  },
  data() {
    return {
      posts: [],
      user : null,
      profile : null,
      isLoggedUser: false,
      isFollowing: false
}
  },
  methods: {
    async handleUpdateIsFollowing(isFollowing){
      this.isFollowing = isFollowing
    },
  },
async created(){
  // user to show in profile
  let user  = this.$route.params.username
  console.log('params',user)
  if (user === localStorage.getItem('user')){
    this.isLoggedUser = true
  }
  //fetching user details 
  let response =  axios.get('api/users/'+user)
  response.then((res) => {
    console.log('response',res.data.data)
    this.user = res.data.data.user
    this.profile =  res.data.data.userprofile
  })
  .catch((err) => {
    console.log(err)
  })

  //  fetching posts
  let posts =  axios.get('/api/users/'+user+'/posts')
  posts.then((res) => {
    this.posts = res.data.data.posts
    console.log('posts',this.posts)
  })
  .catch((err) => {
    console.log(err)
  })
  // fetching followers
  let followers =  axios.get('/api/users/'+user+'/followers')
  followers.then((res) => {
    this.followers = res.data.data
    this.$store.dispatch('setfollowers', res.data.data)
    console.log('followers',this.followers)
    console.log('from store followers',this.$store.state
    .followers)
    if (this.followers.some(follower => follower.user === localStorage.getItem('user')
    )){
      this.isFollowing = true
      console.log('isFollowing',this.isFollowing)
    }
    else{
      this.isFollowing = false
      console.log('isFollowing',this.isFollowing)
    }
  })
  .catch((err) => {
    console.log(err.message)
  })
  // fetching following
  let following =  axios.get('/api/users/'+user+'/followings')
  following.then((res) => {
    this.following = res.data.data
    console.log('following',res.data.data)
    this.$store.dispatch('setfollowing',res.data.data)
    console.log('from store following',this.$store.state
    .following)

  })
  .catch((err) => {
    console.log(err.message)
  })
}
}
</script>
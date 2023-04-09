<template>
  <div class="container-fluid bodyColor">
    <NavBar/>
    <header>
      <profile-header :user="user" :profile="profile" :isFollowing='isFollowing' v-on:update:isFollowing="handleUpdateIsFollowing" />
    </header>
    <main class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <profile-posts :posts="posts" @deletepost="deletePost(id)" :isLoggedUser="isLoggedUser"/>
      </div>
      <div class="col-lg-4 col-md-10 col-sm-12 mt-5">
        <div v-if="isLoggedUser">
          <div class="card mb-3">
            <profile-followers />
          </div>
          <div class="card mb-3">
            <profile-following />
          </div>
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
      user: null,
      profile: null,
      isLoggedUser: false,
      isFollowing: false
    }
  },
  methods: {
    async handleUpdateIsFollowing(isFollowing) {
      this.isFollowing = isFollowing
    },
    deletePost(id) {
      const index = this.posts.findIndex((post) => post.id === id);
      if (index !== -1) {
        // If post with id is found, remove it from the posts array
        this.posts.splice(index, 1);
      } else {
        console.log('Post not found with id:', id);
      }
    },
  },
  async created() {
    // user to show in profile
    let user = this.$route.params.username
    console.log('params', user)
    if (user === localStorage.getItem('user')) {
      this.isLoggedUser = true
    }
    //fetching user details 
    let response = axios.get('api/users/' + user)
    response.then((res) => {
        console.log('response', res.data.data)
        this.user = res.data.data.user
        this.profile = res.data.data.userprofile
      })
      .catch((err) => {
        console.log(err)
      })

    //  fetching posts
    let posts = axios.get('/api/users/' + user + '/posts')
    posts.then((res) => {
        this.posts = res.data.data.posts
        console.log('posts', this.posts)
      })
      .catch((err) => {
        console.log(err)
      })
    // fetching followers
    let followers = axios.get('/api/users/' + user + '/followers')
    followers.then((res) => {
        this.followers = res.data.data
        this.$store.dispatch('setfollowers', res.data.data)
        console.log('followers', this.followers)
        console.log('from store followers', this.$store.state.followers)
        if (this.followers.some(follower => follower.user === localStorage.getItem('user'))) {
          this.isFollowing = true
          console.log('isFollowing', this.isFollowing)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>


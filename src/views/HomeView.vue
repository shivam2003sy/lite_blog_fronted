<template>
  <NavBar />
  {{ user }}
  {{ email }}
  {{ no_of_followers }}
  {{ no_of_following }}
  {{ no_of_posts }}
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';
export default {
  name: 'HomeView',
  components: {
    NavBar

  },
  data() {
    return {
      user : null,
      email : '',
      no_of_followers : '',
      no_of_following : '',
      no_of_posts : '',
    }
  },
  async created(){
    const response = await axios.get('api/user')
    console.log(response) 
    if (response.status == 401) {
      this.$router.push('/login')
    }
    console.log(response.data.data.user.user)
    this.user = response.data.data.user.user
    this.email = response.data.data.user.email
    this.no_of_followers = response.data.data.userprofile.no_of_followers
    this.no_of_following = response.data.data.userprofile.no_of_following
    this.no_of_posts = response.data.data.userprofile.no_of_posts
  },
  computed: {
  
  }
  ,
}
</script>

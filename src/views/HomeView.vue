<template>
  <NavBar />
  <div>
    <h1>Home View</h1>
    <div v-if="user">
      <h2>{{ user.user}}</h2>
      <p>{{ user.email }}</p>
      <p>{{ user.id }}</p>
    </div>
    <div v-else>
      <p>Loading user data...</p>
    </div>
  </div>
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
    }
  },
  created(){
    if (!localStorage.getItem('tocken'))  {
      console.log(this.$store.state.user)
      this.$router.push('/login')
    }

  },
  async mounted(){
    let response  =  await axios.get('/api/user')
    let user  =  response.data.data
    console.log(user)
    this.$store.dispatch('user' , user)
  },
 
}
</script>

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

export default {
  name :'ProfileView',
    computed : {
    user() {
      return this.$store.state.user.user
    },
    userProfile(){
      return this.$store.state.user.userprofile
    }
  },
 
}
</script>

<template>

  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container">
    <router-link to="/" class="navbar-brand">
       <img src="data:image/jpeg;base64,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" alt="avatar" class="rounded-circle " style="height: 50px; width: 50px;">
    </router-link>

    <div class="collapse navbar-collapse" id="navbarNav">
      <div class="mx-auto">
        <search-box></search-box>
      </div>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ path: '/profile/' +  user}" class="nav-link">Profile</router-link>
        </li>
        <!-- <li class="nav-item"> -->
          <button @click="logout" class="btn btn-outline-dark"> <b> Logout</b></button>
        <!-- </li> -->
      </ul>
    </div>

    <div class="d-flex align-items-center nav-item">
      <router-link to="/create">
        <i class="fa fa-plus" style="font-size: 2rem;"></i>
      </router-link>
      
      <!-- <a href="#" class="heart mr-3">
        <i class="fa fa-heart-o" style="font-size: 2rem;"></i>
      </a> -->
      <a href="#" class="profile">
        <!-- <img src="./assets/profile.png" alt="Profile" class="rounded-circle" style="width: 2rem; height: 2rem;"> -->
      </a>
    </div>
  </div>
  </nav>

</template>

<script>
import SearchBox from './SearchBox.vue'
export default {
  name: 'NavBar',
  components: {
    SearchBox
  },
  data() {
    return {
      user  : localStorage.getItem('user'),
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('tocken')
      localStorage.removeItem('user')
      localStorage.removeItem('email')
      this.$store.dispatch('setUser', null)
      this.$router.push('/login')
    },
    handleCreatePost(){
      this.$store.dispatch('modal', true)
    }
  },
}
</script>

<style scoped>
.navbar {
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}

.navbar-brand img {
  height: 2.5rem;
}

.navbar-nav {
  margin-left: auto;
}

.navbar-nav .nav-item {
  margin: 1 2rem;
}

.navbar-nav .nav-link {
  color: #333;
}

.actions .fa, .actions img {
  font-size: 1.5rem;
  color: #333;
  text-decoration: none;
}

.profile img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}
</style>

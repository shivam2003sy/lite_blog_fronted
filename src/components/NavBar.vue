<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <router-link to="/" class="navbar-brand">
      <!-- <img src="./assets/instagram-logo.png" alt="Instagram"> -->
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
        <li class="nav-item">
          <button @click="logout" class="btn btn-link nav-link">Logout</button>
        </li>
      </ul>
    </div>

    <div class="d-flex align-items-center nav-item">
      <router-link to="/create" class="mr-3 ml-3">
        <i class="fa fa-plus" style="font-size: 2rem;"></i>
      </router-link>
      
      <a href="#" class="heart mr-3">
        <i class="fa fa-heart-o" style="font-size: 2rem;"></i>
      </a>
      <a href="#" class="profile">
        <!-- <img src="./assets/profile.png" alt="Profile" class="rounded-circle" style="width: 2rem; height: 2rem;"> -->
      </a>
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

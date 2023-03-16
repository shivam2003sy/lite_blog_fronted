<template>
    <nav class="instagram-navbar">
      <div class="logo">
        <!-- <img src="./assets/instagram-logo.png" alt="Instagram"> -->
      </div>
      <div class="search">
        <input type="text" placeholder="Search" v-model="search">
      </div>
      <div class="links">
        <ul>
           <li>
            <router-link to="/">Home</router-link>
           </li>
          
              <li>
            <router-link to="/profile">Profile</router-link>
              </li>
              <li>
                <button @click="logout">Logout</button>
              </li>
        </ul>
      </div>
      <div class="actions">
        <a href="#" class="add-post">
          <i class="fa fa-plus"></i>
        </a>
        <a href="#" class="heart">
          <i class="fa fa-heart-o"></i>
        </a>
        <a href="#" class="profile">
          <!-- <img src="./assets/profile.png" alt="Profile"> -->
        </a>
      </div>
    </nav>
  </template>
  
 
<script>
export default {
    props: ['auth'],
    name: 'NavBar',
    data() {
        return {
            search: ''
        }
    },
    methods: {
        logout() {
          localStorage.removeItem('tocken')
          localStorage.removeItem('user')
          localStorage.removeItem('email')
          this.$store.dispatch('user', null)
          this.$router.push('/login')
           
        }
    }
}
</script>
 <style scoped>
  .instagram-navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #fff;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  }
  
  .logo img {
    height: 2.5rem;
  }
  
  .search input[type="text"] {
    width: 100%;
    padding: 0.5rem;
    border-radius: 3px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }
  
  .links ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  .links li {
    margin: 0 1rem;
  }
  
  .links a {
    color: #333;
    text-decoration: none;
  }
  
  .actions a {
    margin-left: 1rem;
  }
  
  .actions img {
    height: 2rem;
    border-radius: 50%;
  }
  
  .add-post, .heart, .profile {
    font-size: 1.5rem;
    color: #333;
    text-decoration: none;
  }
  </style>
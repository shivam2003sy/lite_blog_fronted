<template>
  <div>
  <NavBar/>
  <p>{{ message }}</p>
  <div v-for=" i in users" :key="i.id">
    <RouterLink :to="{name: 'profile', params: {username: i.user}}">{{i.user}}</RouterLink>
  </div>
  <CreateBlogForm v-if="modal"/></div>
  <FeedsComponent/>
</template>
<script>
import CreateBlogForm from '@/components/CreateBlogForm.vue';
import NavBar from '@/components/NavBar.vue';
import FeedsComponent from '@/components/FeedsComponent.vue';
import axios from 'axios';
export default {
  name: 'HomeView',
  components: {
    CreateBlogForm,
    NavBar,
    FeedsComponent
  },
  computed: {
    modal() {
      return this.$store.state.modal
    },
    user() {
      return this.$store.state.user
    }
  },
  data() {
    return {
      loading : false,
      message: '',
      users : []
    }
  },
  async created() {
    if (!localStorage.getItem('tocken')) {
      console.log(this.$store.state.user)
      this.$router.push('/login')
    }
    await axios.get('/api/user').then(response => {
      if (response.data.data!=null) {
        console.log('response',response.data.data)
        this.$store.dispatch('setUser', response.data.data)
      }else{
        this.$router.push('/login')
      }
    })
    .catch(error => {
        if (error.response && error.response.status === 500) {
          this.message = 'There was a server error. Please represh page.';
        } else {
          this.message = 'An error occurred. Please try again later.';
        }
      });
    await axios.get('/api/all')
    .then(response => {
      console.log('all users' , response.data.data)
      this.users = response.data.data
    })
  },
  methods: {
    close() {
      this.$store.dispatch('modal', false)
    }
  }
}
</script>

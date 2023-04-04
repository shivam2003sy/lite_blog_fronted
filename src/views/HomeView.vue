<template>
  <div>
  <NavBar/>
  {{user }}
  <p>{{ message }}</p>
  <CreateBlogForm v-if="modal"/></div>
</template>
<script>
import CreateBlogForm from '@/components/CreateBlogForm.vue';
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';
export default {
  name: 'HomeView',
  components: {
    CreateBlogForm,
    NavBar
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
  },
  methods: {
    close() {
      this.$store.dispatch('modal', false)
    }
  }
}
</script>

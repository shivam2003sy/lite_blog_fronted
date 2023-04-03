<template>
  <NavBar />
  <CreateBlogForm v-if="modal"/>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import CreateBlogForm from '@/components/CreateBlogForm.vue';
import axios from 'axios';
export default {
  name: 'HomeView',
  components: {
    NavBar,
    CreateBlogForm
  },
  computed: {
    modal() {
      return this.$store.state.modal
    },
  },
  data() {
    return {
    }
  },
  created() {
    if (!localStorage.getItem('tocken')) {
      console.log(this.$store.state.user)
      this.$router.push('/login')
    }

  },
  async mounted() {
    let response = await axios.get('/api/user')
    let user = response.data.data
    console.log(user)
    this.$store.dispatch('user', user)
  },
  methods: {
    close() {
      this.$store.dispatch('modal', false)
    }
  }
}
</script>

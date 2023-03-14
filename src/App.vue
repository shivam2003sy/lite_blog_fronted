<template>
  <router-view/>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      user: null,
    };

  },
  created(){
    this.user = localStorage.getItem('tocken')
    if (this.user == null) {
      this.$router.push('/login')
    }
    else{
      this.$router.push('/')
    }
  },
  }
</script>
<style>
* {
  margin: 1;
  padding: 1;
  box-sizing: border-box;
}
</style>


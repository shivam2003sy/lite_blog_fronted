<template>
    <div class="modal-body row">
            <div class="col-12 col-md-6">
              <!-- Your first column here -->
              <div class="card align-middle" style="width:auto;">
                <img src="https://source.unsplash.com/featured?technology" class="card-img-top" alt="..."></div>
            </div>
          
            <div class="col-12 col-md-6 mt-4">
                
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="">
                    <div class="card shadow zindex-100 mb-0">
                        <div class="card-body px-md-5 py-5">
                            <div class="mb-5">
                                <h6 class="h3">
                        Register to create Board
                                </h6>
                                <p class="text-muted mb-0">
                                    <router-link to="/login" class="router-link">Already have an account? Login</router-link>
                                </p>
                            </div>
                            <span class="clearfix"></span>
                            <form @submit.prevent="handleSubmit(e)">
                                <div class="form-group">
                                    <label class="form-control-label">Username</label>
                                    <div class="input-group" >
                                      <input type="text" class="form-control" placeholder="Username" v-model="username">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="form-control-label">Email</label>
                                    <div class="input-group">
                                 <input type="email" class="form-control" placeholder="Email" v-model="email">
                                    </div>
                                </div>

                                <div class="form-group mb-0">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div>
                                            <label class="form-control-label" >Password</label>
                                        </div>
                                    </div>
                                    <div class="input-group">
                                        <input type="password" class="form-control" placeholder="Password" v-model="password">            
                            
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <button type="submit" style="color: aliceblue; background-color: black;" name="register" class="btn btn-block btn-primary">Sign in</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'RegisterView',
  methods: {
    async handleSubmit() {
        const data ={
            username: this.username,
            email: this.email,
            password: this.password
        }
      console.log('data', data)
       const response  = await axios.post('api/users/create', data)
       console.log('response', response)
       this.$router.push('/login')
    }
    
  },
  data() {
    return {
      auth: false,
        username: '',
        email: '',
        password: ''
    }
  }
}
</script>
<style scoped>
.router-link{
    color: black;
    text-decoration: none;
}
.router-link:hover{
    color:blue;
    text-decoration: underline;
}
</style>

<template>
  <div class="modal-body row">
    <div class="col-12 col-md-6 mt-3">
      <!-- Your first column here -->
      <div class="card align-middle" style="width: auto">
        <img
          src="https://source.unsplash.com/featured?technology"
          class="card-img-top"
          alt="..."
        />
      </div>
    </div>

    <div class="col-12 col-md-6 mt-3">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="">
            <div class="card shadow zindex-100 mb-0">
              <div v-if="loading" class="card-body px-md-5 py-4">
                <div class="mb-5 register">
                    <h6 class="h2 join">
                     <i> Join BlogLite</i>
                  </h6>
                  <h6 class="h1">
                    <b> Create a new account </b>
                  </h6>
                  
                  <!-- <p class="text-muted mb-0">
                                    <router-link to="/login" class="router-link">Already have an account? Login</router-link>
                                </p> -->
                </div>
                <span class="clearfix"></span>
                <form @submit.prevent="handleSubmit(e)">
                  <div class="form-group mb-2">
                    <label class="form-control-label h5"> Username</label>
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Username"
                        v-model="username"
                      />
                    </div>
                  </div>

                  <div class="form-group mb-2">
                    <label class="form-control-label h5">Email</label>
                    <div class="input-group">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Email"
                        v-model="email"
                      />
                    </div>
                  </div>

                  <div class="form-group mb-0">
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <div>
                        <label class="form-control-label h5">Password</label>
                      </div>
                    </div>
                    <div class="input-group">
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        v-model="password"
                      />
                    </div>
                  </div>
                  <div class="mt-4 signInBtn">
                    <button
                      type="submit"
                      style="color: aliceblue; background-color: black; width: 100px;"
                      name="register"
                      class="btn btn-block btn-primary"
                    > <b>
                        Sign in
                    </b>
                      
                    </button>
                  </div>
                </form>
                <div class="line-with-text">
                  <hr />
                  <span>or</span>
                  <hr />
                </div>
                <div class="loggedIn">
                    <button class=" newAcc btn btn-light text-muted mb-0">
                        <router-link to="/login" class="router-link"><b> Already have an account? Login </b></router-link>
                    </button>
                </div>
              </div>
              <div v-else class="card-body px-md-5 py-5">
                <div class="text-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterView",
  methods: {
    async handleSubmit() {
      this.loading = false;
      const data = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      console.log("data", data);
      const response = await axios.post("api/users/create", data);
      console.log("response", response);
      this.$router.push("/login");
    },
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      loading: true,
    };
  },
};
</script>
<style scoped>
.register {
  text-align: center;
}
.join{
    text-decoration: underline;
}
.signInBtn{
    text-align: center;
    
}
.router-link {
  color: black;
  text-decoration: none;
}
.router-link:hover {
  color: rgb(7, 7, 8);
  /* text-decoration: underline; */
}
.newAcc{
    border: 1px solid black;
}
.loggedIn{
    text-align: center;
}
.line-with-text {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 18px;
}

.line-with-text hr {
  width: 50%;
  border: 0.1px solid black;
  margin: 0 10px;
 
}

</style>

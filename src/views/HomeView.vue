<template>
  <NavBar />
  <NotifiCation style="position: fixed;" :type="type" :message="message" />
  <div class="container mt-4 middlearea">
    <div class="row">
      <div class="col-12 col-md-3 mt-4">
        <div class="col-xs-12 rightpanel" id="sticky-sidebar">
          <SearchBox />
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <FeedsComponent />
      </div>
        <div class="col-12 col-sm-12 col-md-3 d-sm-none d-md-block mt-4">
          <div class="card col-xs-12 rightpanel" id="sticky-sidebar" style="width: 18rem">
            <div class="card-body d-flex">
              <div>
                <RouterLink :to="{ name: 'profile', params: { username: user.user.user } }">
                  <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    class="rounded-circle"
                    alt="Cinque Terre"
                    width="50"
                    height="50"
                  />
                  
                  <span class="font-weight-bold userName">
                    <b>{{ user.user.user }}</b>
                  </span>
                  <br/>
                  <br/>
                  <span class="font-weight-bold userName">
                    <b>{{ user.user.email }}</b>
                  </span>
                </RouterLink>
              </div>
          </div>
          </div>











        </div>
      </div>
    </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import FeedsComponent from '@/components/FeedsComponent.vue';
import SearchBox from '@/components/SearchBox.vue';
import NotifiCation from '@/components/NotifiCation.vue';
import axios from 'axios';
export default {
  name: 'HomeView',
  components: {
    NavBar,
    FeedsComponent,
    SearchBox,
    NotifiCation
  },
  data() {
    return {
      loading: false,
      message: '',
      type: '',
      users: []
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    // last_seen () { 
    //   value = this.$store.state.user.last_seen
    //   value = value.split('T')
    //   value = value[0]
    //   return value
    // }

  },
  async created() {
    if (!localStorage.getItem('tocken')) {
      console.log(this.$store.state.user)
      this.$router.push('/login')
    }

    await axios.get('/api/user').then(response => {
      if (response.data.data != null) {
        console.log('response', response.data.data)
        this.$store.dispatch('setUser', response.data.data)
      } else {
        this.$router.push('/login')
      }
    })
      .catch(err => {
        // network error
        if (err.message === "Network Error") {
          this.message = "Network Error ! Please check your internet connection";
          this.type = "error";
        }
        // not found
        if (err.response && err.response.status === 404) {
          this.message = "Not found ! Please check your internet connection"
          this.type = "warning";
        }
      })
  }
}

</script>
<style>
rightpanel {
  border: 0;
  background-color: #fafafa6f;
}

.rightpanel {
  border: 0;
  background-color: #FAFAFA;
}

.rightpanellinks {
  text-decoration: none;
  color: lightgrey;
}

.rightpanellinks:hover {
  text-decoration: none;
  color: lightgrey;
}

/* media query for mobile  */
@media only screen and (max-width: 600px) {
  #sticky-sidebar {
    position: static;
  }
}

/* media query for tablet  */
@media only screen and (min-width: 600px) {
  #sticky-sidebar {
    position: static;
  }
}

/* media query for desktop  */
@media only screen and (min-width: 768px) {
  #sticky-sidebar {
    position: fixed;
  }
}

/* media query for large desktop  */
@media only screen and (min-width: 992px) {
  #sticky-sidebar {
    position: fixed;
  }
}

/* media query for extra large desktop  */

@media only screen and (min-width: 1200px) {

  #sticky-sidebar {
    position: fixed;
  }
}
</style>

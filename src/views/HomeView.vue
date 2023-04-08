<template>
  <NavBar />
  <NotifiCation style="position: fixed;" :type="type" :message="message" />
  <div class="container mt-4 middlearea " >
    <div class="row ">
      <div class="col-12 col-md-3 mt-2">
        <div class="col-xs-8 rightpanel" id="sticky-sidebar">
          <SearchBox />
          <div class="card d-flex m-2" style="background-color: azure;">
          
          <img
                src="@/assets/images/banner.jpeg"
                alt="banner"
                width="250"
                class="m-4"
              />
              <p class="text-mute m-1">
                <strong>
                  Adv. listing
                </strong>
              </p>
        </div>
      </div>
       
      </div>
      <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <FeedsComponent />
      </div>
      <!-- <div class="col-12 col-sm-12 col-md-3 d-sm-none d-md-block mt-4">
  <div class="card col-xs-12 rightpanel" id="sticky-sidebar" style="width: 18rem">
    <div class="card-body d-flex flex-column justify-content-between" style="background-color: aliceblue;">
      <div>
        <RouterLink :to="{ name: 'profile', params: { username: user.user.user } }">
          <span class="font-weight-bold userName">
            <b>Creator: Shivam Singh</b>
          </span>
          <br/>
          <span class="font-weight-bold userName">
            <b>Email: shivam2003sy@gmail.com</b>
          </span>
        </RouterLink>
      </div>
      <div class="mt-3">
        <img src="path/to/branding/image.png" alt="Brand Logo" style="width: 100%; max-width: 150px;">
      </div>
    </div>
  </div>
</div> -->
<!-- right column -->
<div class="col-12 col-sm-12 col-md-3 d-sm-none d-md-block">
          <div class="card col-xs-12 rightpanel" id="sticky-sidebar" style="width: 18rem">
            <div class="card-body d-flex">
              <div>
                <a class="nav-link" >
                  <span>
                  <strong>by : Shivam Singh</strong>
                  </span>
                </a>
                <div class="mt-2">
                  
                </div>
                <div class="mt-2 ml-2">
                  <div class="mt-3">
                    <span>
                      <img src="@/assets/images/cardlook.jpeg" style="width: 250px; border-radius: 5%" />
                    </span>
                   
                  </div>
                </div>
                <div class="ml-2 mt-2"
                  style="color: lightgray; font-size: 11px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                  <p></p>
                  <p style="font-size: 12px;">© 2023 Blog lite modern application development 2 project</p>
                </div>
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
      users: [],
      base64String:''
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  methods:{
    convertBase64ToImage() {
      const image = new Image();
      image.src = this.base64String;
      image.addEventListener('load', () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        this.base64String = dataURL;
      });
    },
  },
  async created() {
    if (!localStorage.getItem('tocken')) {
      console.log(this.$store.state.user)
      this.$router.push('/login')
    }

    await axios.get('/api/user').then(response => {
      if (response.data.data != null) {
        console.log('response', response.data.data)
        this.base64String= response.data.data.profileImage
        this.$store.dispatch('setUser', response.data.data)
        this.convertBase64ToImage();
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
.userName{
  font-size: 20px;
  color: #000000;
}
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

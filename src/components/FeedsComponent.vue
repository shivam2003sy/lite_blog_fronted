<template>
  <div class="container mt-4">
    <NotifiCation v-if="no_of_posts" :type='type' :message='message' />
    <div  class="row">
      <!-- <div class="col-md-3 m-2">
        <SearchBox/>
      </div> -->
      <div v-if="loading" class="text-center">
      <i class="fa fa-spinner fa-spin fa-2x"></i>
    </div>
      <div v-else >
      <div v-for="post in posts" :key="post.id" class="card my-3">
        <div class="card-header">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            class="rounded-circle" style="height: 30px; width: 28px;"
            alt="Avatar"
          />
          <RouterLink
            :to="{ name: 'profile', params: { username: post.user.user } }"
          >
            <span class="font-weight-bold userName">
              <b>@{{ post.user.user }}...</b>
            </span>
          </RouterLink>
        </div>
        <div class="card-body">
          <h5>
            <RouterLink :to="{ name: 'post', params: { id: post.id } }">
              <span class="postTitle">    
                {{ post.title }} </span>
            </RouterLink>
            <hr/>
          </h5>
          <p class="font-weight-bold"> Created at :{{ formatDate(post.timestamp)   }}</p>
          <div class="card" >
          <img
            :src="
              'http://localhost:5000/static/path/to/the/uploads/' +
              post.imgpath
            "
            :alt="post.title"
            class="img-fluid imgSize"
          />
        </div>
          <div class="">
            <hr/>
            <p class="card-text">
            <RouterLink
              :to="{ name: 'profile', params: { username: post.user.user } }"
            >
              <span class="font-weight-bold caption">
                <strong>
                <p>@{{ post.user.user }}... :-{{ post.caption }}........</p>
              </strong>..
              </span>
            </RouterLink>
            
              
             
          </p>
          <hr/>
            <div class="col-md-6 text-right ">
              <ul class="list-group list-group-horizontal " style="list-style-type: none; border: 3">
            <!-- heart button  -->
            <li class="nav-item p-2">
              <strong>
                <div v-if="!islikes(post.likes)">
                <button
                  @click="likePost(post.id)"
                  class="btn large btn-sm mr-2"
                >
                  <i class="fa fa-thumbs-up"></i>
                </button>
              </div>

              <div v-else>
                <button
                  @click="unlikePost(post.id)"
                  class="btn large btn-sm mr-2"
                >
                  <i class="fa fa-thumbs-down"></i> {{ post.no_of_likes }}
                </button>
              </div>
              </strong>
            </li>
            <li class="nav-item p-2">
              <strong>
              Likes : {{post.no_of_likes}}</strong>
            </li>

            <li class="nav-item p-2">
              <strong>
              comments : {{post.comments.length }}</strong>
            </li>
          </ul>
              
              
            </div>
            <hr/>
            <div
              v-for="comment in post.comments"
              :key="comment.id"
              class="col-md-12 "
            >
       <p class="font-weight-bold " > <b>@{{ comment.user.user }} :</b> {{ comment.comment }}</p>
            </div>

            <!-- comment box -->
            <comment-box
              :post-id="post.id"
              @submit-comment="submitComment"
            ></comment-box>
          </div>
         
        </div>
      </div>
      <!-- <div class="col-md-3"></div> -->
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CommentBox from "./CommentBox.vue";
import NotifiCation from "./NotifiCation.vue";

export default {
  name: "FeedsComponent",
  components: {
    CommentBox,
    NotifiCation,
    
  },
  data() {
    return {
      loading: true,
      message: "",
      type : "",
      posts: [],
    };
  },
  computed: {
    loggedIn() {
      return localStorage.getItem("user");
    },
    no_of_posts() {
      return this.posts.length === 0 && !this.loading;
    },
  },

  async created() {
    try {
      const response = await axios.get("/api/feeds");
      this.posts = response.data.data;
      console.log("feeds", response.data.data)
      this.loading = false;

  } catch (error) {
    this.loading = false;
    // network error
    if (error.message === "Network Error") {
      this.message = "Network Error ! Please check your internet connection";
      this.type = "error";
    }
    // server error
    if (error.response && error.response.status === 500) {
      this.message = "Server down ! Please try again later ";
      this.type = "error";
    }
    // unauthorized
    if (error.response && error.response.status === 401) {
      this.message = "Unauthorized";
      this.type = "error";
    }
    // forbidden
    if (error.response && error.response.status === 403) {
      this.message = "Forbidden";
      this.type = "warning";
    }
    // not found
    if (error.response && error.response.status === 404) {
      this.message = 'No posts found ! Please follow some users to see their posts';
      this.type = "warning";
    }
  }
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp);
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    },
    islikes(users) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].user == localStorage.getItem("user")) {
          console.log("user", users[i].user);
          return true;
        }
      }
      return false;
    },
    async submitComment(comment, postId) {
      console.log("comment", comment);
      console.log("postId", postId);
      try {
        const response = await axios.post(`/api/posts/${postId}/comment`, {
          comment,
        });
        this.posts = this.posts.map((post) => {
          if (post.id === postId) {
            post.comments = response.data.data;
            console.log("this is comment response", response.data.data);
          }
          return post;
        });
      } catch (error) {
        if (error.response && error.response.status === 500) {
          this.message = "There was a server error. Please refresh the page.";
        } else {
          this.message = "An error occurred. Please try again later.";
        }
      }
    },
    async likePost(postId) {
      try {
        const response = await axios.post(`/api/posts/${postId}/like`);
        const updatedPost = response.data.data;
        console.log("updatedPost like ", updatedPost);
        this.posts = this.posts.map((post) => {
          if (post.id === postId) {
            post.no_of_likes = post.no_of_likes + 1;
          }
          return post;
        });
      } catch (error) {
        if (error.response && error.response.status === 500) {
          this.message = "There was a server error. Please refresh the page.";
        } else {
          this.message = "An error occurred. Please try again later.";
        }
      }
    },
    async unlikePost(postId) {
      try {
        const response = await axios.post(`/api/posts/${postId}/unlike`);
        const updatedPost = response.data.data;
        console.log("updatedPost unlike ", updatedPost);
        this.posts = this.posts.map((post) => {
          if (post.id === postId) {
            post.no_of_likes = post.no_of_likes - 1;
          }
          return post;
        });
      } catch (error) {
        if (error.response && error.response.status === 500) {
          this.message = "There was a server error. Please refresh the page.";
        } else {
          this.message = "An error occurred. Please try again later.";
        }
      }
    },
  },
};
</script>

<style>
.avatar {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
}

.post-like {
  display: inline-block;
  font-size: 1.2rem;
  margin-right: 1rem;
  cursor: pointer;
}

.post-like:hover {
  color: #007bff;
}

.userName {
  color: black;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    margin-left: 15px;
    font-size: 18px;
   
}
a {
  text-decoration: none;
}

.postTitle {
  color: black;
}
/* .timeSet{
  text-align:end;
} */
.caption{
  color: black;
  
}
.card {
  position: relative;
  background-color: rgb(238, 238, 238);
}
.timeSet {
  position: absolute;
  bottom: 0;
  right: 0;
}

.card {
 
  background-color: #fbfbfb;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>

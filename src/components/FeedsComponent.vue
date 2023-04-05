<template>
    <div class="container my-4">
      <div v-if="loading" class="text-center">
        <i class="fa fa-spinner fa-spin fa-2x"></i>
      </div>

      <div v-else-if="message" class="alert alert-danger">{{ message }}</div>
      <div v-else>
        <div v-for="post in posts" :key="post.id" class="card my-3">
          <div class="card-header">
            <RouterLink :to="{name: 'profile', params: {username  : post.user.user}}">
            <span class="font-weight-bold">{{ post.user.user }}</span>
            </RouterLink>
          </div>
          <div class="card-body">
            <h5>
              <RouterLink 
                    :to="{name : 'post' , params : {id : post.id} }" >
                {{ post.title }}
              </RouterLink>
            </h5>
            <img :src="'http://127.0.0.1:5000/static/path/to/the/uploads/' + post.imgpath" :alt="post.title" class="img-fluid">
            <p class="card-text">{{ post.caption }}</p>
            <div class="row">
              <div class="col-md-6">
                <p class="font-weight-bold">{{ post.timestamp }}</p> 
        
            </div>
              <div class="col-md-6 text-right"> 
                <strong>Likes: {{ post.no_of_likes }}</strong>
                <div v-if="!islikes(post.likes)">
                <button @click="likePost(post.id)" class="btn btn-outline-primary btn-sm mr-2">
                  <i class="fa fa-heart"></i> 
                </button>
            </div>
            <div v-if="islikes(post.likes)">
                <button @click="unlikePost(post.id)" class="btn btn-outline-primary btn-sm mr-2">
                  <i class="fa fa-heart"></i> {{ post.no_of_likes }} unLike
                </button>
            </div>
                <strong>Comments: {{ post.comments.length }}</strong>
              </div>
              <div v-for="comment in post.comments" :key="comment.id" class="col-md-12">
                <p class="font-weight-bold">{{ comment.user.user }}</p>
                <p>{{ comment.comment }}</p>
              </div>
  
              <!-- comment box -->
              <comment-box :post-id="post.id" @submit-comment="submitComment"></comment-box>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import CommentBox from './CommentBox.vue';
  
  export default {
    name: 'FeedsComponent',
    components: {
      CommentBox
    },
    data() {
      return {
        loading: true,
        message: '',
        posts: [],
        
      }
    },
    computed:{
        loggedIn(){
            return localStorage.getItem('user');
        } 
    },
    async created() {
      try {
        const response = await axios.get('/api/feeds');
        this.posts = response.data.data;
        console.log('feeds', response.data.data);
       
      } catch (error) {
        if (error.response && error.response.status === 500) {
          this.message = 'There was a server error. Please refresh the page.';
        } else {
          this.message = 'An error occurred. Please try again later.';
        }
      }
      this.loading = false;
    },
    methods: {
        islikes(users){
            for (let i = 0; i < users.length; i++) {
                if (users[i].user == localStorage.getItem('user')) {
                    console.log('user',users[i].user)
                    return true;
                }
            }
            return false;
        },
      async submitComment( comment  , postId) {
        console.log('comment', comment);
        console.log('postId', postId);
        try {
          const response = await axios.post(`/api/posts/${postId}/comment`,{comment});
            this.posts = this.posts.map(post => {
                if (post.id === postId) {
                post.comments = response.data.data;
                console.log('this is comment response',response.data.data)
                }
                return post;
            });
        } catch (error) {
          if (error.response && error.response.status === 500) {
            this.message = 'There was a server error. Please refresh the page.';
          } else {
            this.message = 'An error occurred. Please try again later.';
          }
        }
      },
        async likePost(postId) {
            try {
        const response = await axios.post(`/api/posts/${postId}/like`);
        const updatedPost = response.data.data;
        console.log('updatedPost like ', updatedPost);
        this.posts = this.posts.map(post => {
        if (post.id === postId) {
        post.no_of_likes  = post.no_of_likes + 1;
      }
      return post;
    
    });
  } catch (error) {
    if (error.response && error.response.status === 500) {
      this.message = 'There was a server error. Please refresh the page.';
    } else {
      this.message = 'An error occurred. Please try again later.';
    }
  }
},
async unlikePost(postId) {
    try {
        const response = await axios.post(`/api/posts/${postId}/unlike`);
        const updatedPost = response.data.data;
        console.log('updatedPost unlike ', updatedPost);
        this.posts = this.posts.map(post => {
            if (post.id === postId) {
            post.no_of_likes  = post.no_of_likes - 1;
            }
            return post;
        });
        } catch (error) {
        if (error.response && error.response.status === 500) {
            this.message = 'There was a server error. Please refresh the page.';
        } else {
            this.message = 'An error occurred. Please try again later.';
        }
    }
},
    }
    }

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
</style>
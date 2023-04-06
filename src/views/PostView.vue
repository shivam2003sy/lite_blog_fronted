<template>
    <NavBar/>
    <div class="container">
        <div v-if="loading" class="text-center">
        <i class="fa fa-spinner fa-spin fa-2x"></i>
      </div>

      <div v-else-if="message" class="alert alert-danger">{{ message }}</div>
      <div v-else>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <RouterLink :to="{name: 'profile', params: {username  : user.user}}">
                        <span class="font-weight-bold">{{ user.user }}</span>
                        </RouterLink>
                    </div>
                    <div class="card-body">
                        <h3>{{ post.title}}</h3>
                        <p class="card-text">{{ post.caption }}</p>
                        <img :src="'http://localhost:5000/static/path/to/the/uploads/' + post.imgpath" :alt="post.title" class="img-fluid">
                        <p>
                            {{ post.timestamp }}
                        </p>
                        <div>
                            <p> Likes : {{post.no_of_likes }}</p>
                            <button>
                                <i class="fa fa-heart"></i> Like
                            </button>

                <div v-for="comment in comments" :key="comment.id" class="col-md-12">
                <p class="font-weight-bold">{{ comment.user.user }}</p>
                <p>{{ comment.comment }}</p>
              </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
export default {
    name: 'PostView',
    components: {
        NavBar
    },
    data() {
        return {
            post: null,
            loading: true,
            message: '',
            user  : null,
            comments : null,
            comment : null,
            likes : null

        }
    },
    async created() {
        try {
            const response = await axios.get(`/api/posts/${this.$route.params.id}`);
            this.post = response.data.data.post;
            this.user  = response.data.data.user;
            this.comments = response.data.data.postcommentedby;
            console.log('post', response.data);
        } catch (error) {
            if (error.response && error.response.status === 500) {
                this.message = 'There was a server error. Please refresh the page.';
            } else {
                this.message = 'An error occurred. Please try again later.';
            }
        }
        this.loading = false;
    },
}
</script>
<style>
.container {
    margin-top: 50px;
}
</style>
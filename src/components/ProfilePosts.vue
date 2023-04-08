<template>
  <div class="profile-posts mt-5">
    <div class="container">
      <h2 class="profile-posts__heading">Posts</h2>

      <div class="row">
        <div v-for="post in posts" :key="post.id" class="col-md-4 col-sm-6">
          <div class="profile-posts__item card">
            <RouterLink :to="{ name: 'post', params: { id: post.id } }" class="card-link">
              <div class="card-body">
                <hr />
                <div class="profile-posts__image-wrapper">
                  <img
                    :src="'http://localhost:5000/static/path/to/the/uploads/' + post.imgpath"
                    class="profile-posts__image card-img-top"
                  />
                </div>
                <div class="profile-posts__caption">
                  <p class="profile-posts__title">{{ post.title }}</p>
                  <p class="card-text">{{ post.caption }}</p>
                  <p class="card-text">{{ post.no_of_likes }} likes</p>
                  <p class="card-text">{{ formatDate(post.timestamp) }}</p>
                </div>
              </div>
            </RouterLink>
            <div class="card-footer">
              <div class="d-flex justify-content-between">
                <button @click="deletePost(post.id)" class="btn btn-danger btn-sm">Delete</button>
                <RouterLink :to="{ name: 'edit', params: { id: post.id } }" class="btn btn-primary btn-sm">Edit</RouterLink>
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

export default {
  name: "ProfilePosts",
  props: {
    posts: {
      type: Array,
      required: true,
    },
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
    async deletePost(id) {
      // Call a method to delete the post with the given id
      // You can implement this method according to your backend logic
      await  axios.delete(`/api/posts/${id}`)
      .then((res) => {
        console.log(res);
        // id send to profleView to update the posts
        setTimeout(() => {
          // hard reload
          window.location.reload();
        }, 1);
        this.$emit("deletepost", id);
      })
      .catch((err) => {
        console.log(err);
      });

    },
  },
};
</script>

<style scoped>
.profile-posts {
  margin-top: 2rem;
}

.profile-posts__heading {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.profile-posts__item {
  position: relative;
  overflow: hidden;
}

.profile-posts__image-wrapper {
  padding-bottom: 100%;
  position: relative;
}

.profile-posts__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease-in-out;
}

.profile-posts__item:hover .profile-posts__image {
  transform: scale(1.05);
}

.profile-posts__caption {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.2;
  color: #333;
}

.profile-posts__title {
  font-weight: bold;
  margin-bottom: 0.5rem;
}
</style>
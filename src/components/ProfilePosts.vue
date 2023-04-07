<template>
  <div class="profile-posts">
    <div class="container">
      <h2 class="profile-posts__heading">Posts</h2>
      
          <div class="profile-posts__grid">
            <div
              v-for="post in posts"
              :key="post.id"
              class="profile-posts__item"
            >
            <div class="row">
        <div class="col-md-3 col-sm-12">
              <div class="profile-posts__image-wrapper">
                <img
                  :src="
                    'http://farmproject.azurewebsites.net/static/path/to/the/uploads/' +
                    post.imgpath
                  "
                  class="profile-posts__image"
                />
              </div>
            </div>
      </div>
              <div class="profile-posts__caption">
                <p class="profile-posts__title">{{ post.title }}</p>
                <p>{{ post.caption }}</p>
                <p>{{ post.no_of_likes }} likes</p>
                <p>{{ formatDate(post.timestamp) }}</p>
              </div>
            </div>
          </div>
       
    </div>
  </div>
</template>

<script>
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
  },
};
</script>

<style scoped>
.profile-posts {
  margin-top: 2rem;
}

.profile-posts__heading {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.profile-posts__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
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

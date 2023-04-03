<template>
    <div class="profile-posts">
      <h2 class="profile-posts__heading">Posts</h2>
      <div class="profile-posts__grid">
        <div v-for="post in posts" :key="post.id" class="profile-posts__item">
          <img :src="post.image" class="profile-posts__image" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProfilePosts',
    props: {
      posts: {
        type: Array,
        required: true
      }
    }
  }
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
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  
  .profile-posts__item {
    position: relative;
    overflow: hidden;
  }
  
  .profile-posts__image {
    display: block;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    object-fit: cover;
    transition: transform 0.2s ease-in-out;
  }
  
  .profile-posts__item:hover .profile-posts__image {
    transform: scale(1.05);
  }
  
  </style>
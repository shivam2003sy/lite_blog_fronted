<template>
  <div class="profile-followers">
    <div class="followers-header">
      <h3>Followings ({{ following.length }})</h3>
    </div>
    <div class="followers-list">
      <div class="follower" v-for="follower in following" :key="follower.id">
        <div class="follower-info">
          <h4>{{ follower.user }}</h4>
          <p>{{ follower.email }}</p>
        </div>
        <div>
          <button @click="toggleFollow(follower)">
            {{ following.includes(follower.id) ? 'unfollow' : 'follow' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileFollowing",
  data() {
    return {};
  },
  computed: {
    following() {
      return this.$store.state.following;
    },
  },
  methods: {
    toggleFollow(follower) {
      const followingIndex = this.$store.state.following.findIndex(
        (f) => f.id === follower.id
      );
      if (followingIndex > -1) {
        // If the user is already following this follower, unfollow them
        this.$store.commit("REMOVE_FOLLOWING", followingIndex);
      } else {
        // Otherwise, follow the user
        this.$store.commit("ADD_FOLLOWING", follower);
      }
    },
  },
};
</script>

  
  <style scoped>
  .profile-followers {
    margin-top: 24px;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    padding: 16px;
  }
  
  .followers-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .followers-header h3 {
    font-size: 16px;
    font-weight: 600;
  }
  
  .followers-header a {
    font-size: 14px;
    font-weight: 600;
  }
  
  .follower {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
  
  .follower img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 16px;
  }
  
  .follower h4 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  
  .follower p {
    font-size: 14px;
    color: #8e8e8e;
    margin-bottom: 8px;
  }
  
  .follower button {
    background-color: #3897f0;
    color: #fff;
    border: none;
    border-radius: 3px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
  
  .follower button:hover {
    opacity: 0.8;
  }
  
  .follower button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(56, 151, 240, 0.4);
  }
  </style>
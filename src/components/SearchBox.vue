<template>
    <div>
      <div class="input-group">
        <input type="text" class="form-control" v-model="searchTerm" @input="handleSearch" placeholder="Search for user ...">
      </div>
      <b-modal v-model="showUserList" hide-footer>
        <ul class="list-group">
          <li class="list-group-item" v-for="user in users" :key="user.id">
            <router-link :to="{ name: 'profile', params: { username: user.user }}">
              {{ user.user }}
            </router-link>
          </li>
        </ul>
      </b-modal>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'SearchBox',
    data() {
      return {
        searchTerm: '',
        users: [],
        showUserList: false,
        debouncedSearch: null,
      };
    },
    methods: {
      handleSearch() {
        clearTimeout(this.debouncedSearch);
        this.debouncedSearch = setTimeout(() => {
          this.searchUsers();
        }, 300);
      },
      searchUsers() {
        axios.get(`/api/users?search=${this.searchTerm}`)
          .then(response => {
            this.users = response.data.data.slice(0, 4);
            this.showUserList = true;
          })
          .catch(error => {
            console.error('Error searching users:', error);
          });
      },
    },
  };
  </script>
  
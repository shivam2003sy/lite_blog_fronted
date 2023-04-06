<template>
    <div class="col-md-12">
      <div class="input-group">
        <input type="text" class="form-control comment" placeholder="Add a comment..." v-model="comment">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="submitComment()">Comment</button>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: 'CommentBox',
    props: ['postId'],
    data() {
      return {
        comment: ''
      }
    },
    methods: {
      submitComment() {
        this.$emit('submit-comment', this.comment, this.postId);
        this.comment = '';
      }
    }
  }
  </script>
  <style>
  input[type="text"] {
  margin-right: 8px;
}

.comment{
  border-radius: 60px;
}

</style>
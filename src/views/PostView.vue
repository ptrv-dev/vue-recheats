<template>
  <div class="post-container container">
    <app-aside />
    <div class="post">
      <img :src="`\\${post.image}`" :alt="post.title" />
      <h2>{{ post.title }}</h2>
      <a
        v-if="post.author && post.author.link"
        :href="post.author.link"
        class="btn btn__big"
        >Download</a
      >
      <a v-else :href="post.link" target="_blank" class="btn btn__big"
        >Download</a
      >
      <p>{{ post.description }}</p>
    </div>
  </div>
</template>

<script>
import { appAxios } from '@/axios';
import AppAside from '@/components/AppAside.vue';
export default {
  components: { AppAside },
  data() {
    return {
      post: {},
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.fetchData(id);
  },
  methods: {
    async fetchData(id) {
      const { data } = await appAxios(`/post/${id}`);
      this.post = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.post-container {
  display: flex;
  align-items: flex-start;
}
.post {
  margin-left: 20px;
  width: 580px;
  display: flex;
  flex-direction: column;
  img {
    border-radius: 1rem;
  }
  h2 {
    font-size: 24px;
    font-weight: 400;
    margin-top: 1rem;
  }
  .btn {
    align-self: center;
    margin: 1rem 0;
  }
  p {
    white-space: pre-line;
  }
}
</style>

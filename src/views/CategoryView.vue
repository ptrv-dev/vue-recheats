<template>
  <div class="category">
    <div class="container category__container">
      <app-aside />
      <div class="posts-list">
        <app-post
          v-for="post in posts"
          :key="post._id"
          :id="post._id"
          :category="post.category.title"
          :image="post.image"
          :title="post.title"
        />
        <app-pagination
          :currentPage="page"
          :maxPage="maxPage"
          @changePage="handleChangePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppAside from '@/components/AppAside.vue';
import AppPost from '@/components/AppPost.vue';
import AppPagination from '@/components/AppPagination.vue';

import { appAxios } from '@/axios';

export default {
  components: {
    AppAside,
    AppPost,
    AppPagination,
  },
  data() {
    return { posts: [], page: 1, maxPage: 1 };
  },
  computed: {
    category() {
      return this.$route.params.id;
    },
  },
  methods: {
    async fetchPosts() {
      const { data } = await appAxios.get(
        `/post?category=${this.category}&page=${this.page}`
      );
      this.posts = data.data;
      this.maxPage = data.maxPage;
    },
    handleChangePage(page) {
      this.page = page;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  watch: {
    category() {
      this.fetchPosts();
    },
    page() {
      window.scroll(0, 0);
      this.fetchPosts();
    },
  },
};
</script>

<style lang="scss" scoped>
.category__container {
  display: flex;
  align-items: flex-start;
}
.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 580px;
  margin-left: 20px;
}
</style>

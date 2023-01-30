<template>
  <div class="posts">
    <div class="posts__container container">
      <app-aside />
      <div class="posts-list">
        <h3>Search by request: "{{ search }}"</h3>
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
    return {
      search: '',
      posts: [],
      page: 1,
      maxPage: 1,
    };
  },
  methods: {
    async fetchPosts() {
      const { data } = await appAxios.get(
        `/post?search=${this.search}&page=${this.page}`
      );
      this.posts = data.data;
      this.maxPage = data.maxPage;
    },
    handleChangePage(page) {
      this.page = page;
    },
  },
  mounted() {
    this.search = this.$route.query.search;
  },
  computed: {
    searchQuery() {
      return this.$route.query.search;
    },
  },
  watch: {
    searchQuery() {
      this.search = this.$route.query.search;
    },
    page() {
      this.fetchPosts();
    },
    search() {
      this.fetchPosts();
    },
  },
};
</script>
<style lang="scss" scoped>
.posts {
  &__container {
    display: flex;
    align-items: flex-start;
  }
}
.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 580px;
  margin-left: 20px;
}
</style>

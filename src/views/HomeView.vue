<template>
  <div class="home">
    <div class="home__container container">
      <app-aside />
      <div class="main">
        <div class="games">
          <a href="/posts?search=gta">
            <img src="/assets/img/games/gta5.jpg" alt="" />
          </a>
          <a href="/posts?search=csgo">
            <img src="/assets/img/games/csgo.jpg" alt="" />
          </a>
          <a href="/posts?search=pubg">
            <img src="/assets/img/games/pubg.jpg" alt="" />
          </a>
          <a href="/posts?search=apex legends">
            <img src="/assets/img/games/apex.jpg" alt="" />
          </a>
          <a href="/posts?search=fortnite">
            <img src="/assets/img/games/fortnite.jpg" alt="" />
          </a>
          <a href="/posts?search=rust">
            <img src="/assets/img/games/rust.jpg" alt="" />
          </a>
        </div>
        <h3>Download Free Cheats & Hacks for Your Game</h3>
        <div class="posts">
          <app-post
            v-for="post in posts"
            :key="post._id"
            :id="post._id"
            :title="post.title"
            :image="post.image"
            :category="post.category.title"
          />
        </div>
        <app-pagination
          :currentPage="page"
          :maxPage="maxPage"
          @changePage="handlePageChange"
        />
      </div>
      <app-announcement />
    </div>
  </div>
</template>

<script>
import AppAside from '@/components/AppAside.vue';
import AppPost from '@/components/AppPost.vue';
import AppPagination from '@/components/AppPagination.vue';
import AppAnnouncement from '@/components/AppAnnouncement.vue';

import { appAxios } from '@/axios';

export default {
  components: {
    AppAside,
    AppPost,
    AppPagination,
    AppAnnouncement,
  },
  data() {
    return {
      posts: [],
      page: 1,
      maxPage: 1,
    };
  },
  methods: {
    async fetchPosts() {
      const { data } = await appAxios.get(`/post?page=${this.page}`);
      this.posts = data.data;
      this.maxPage = parseInt(data.maxPage);
    },
    handlePageChange(page) {
      window.scroll(0, 0);
      this.page = page;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  watch: {
    page() {
      this.fetchPosts();
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  &__container {
    display: flex;
    align-items: flex-start;
    gap: 20px;
  }
}
.main {
  flex: 2;
  h3 {
    font-size: 24px;
    font-weight: 400;
    text-transform: uppercase;
  }
}
.announcements {
  flex: 1;
  height: 1px;
  max-width: 275px;
}
.games {
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-between;
  // row-gap: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 36px;
  gap: 20px;
  a {
    display: flex;
    height: 240px;
    border-radius: 1rem;
    overflow: hidden;
    transition: transform 0.2s;
    &:hover {
      transform: translateY(-0.25rem);
    }
    img {
      width: 100%;
      object-fit: cover;
      display: block;
    }
  }
}
.posts {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>

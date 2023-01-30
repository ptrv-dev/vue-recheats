<template>
  <div class="aside">
    <ul class="aside__list">
      <li
        class="aside__item"
        v-for="category in categories"
        :key="category._id"
      >
        <router-link :to="`/category/${category._id}`">{{
          category.title
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { appAxios } from '@/axios';
export default {
  data() {
    return {
      categories: [],
    };
  },
  async mounted() {
    const { data } = await appAxios.get('/category');
    this.categories = data;
  },
};
</script>

<style lang="scss" scoped>
.aside {
  background: #1f2937;
  flex: 1;
  max-width: 275px;
  border-radius: 1rem;
  padding: 1rem;
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  li {
    display: inline-flex;
    a {
      position: relative;
      padding-left: 24px;
      &::before {
        content: '';
        display: block;
        height: 1px;
        width: 1rem;
        background: #e5e7eb;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      text-transform: capitalize;
      color: #e5e7eb;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>

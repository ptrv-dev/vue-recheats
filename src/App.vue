<template>
  <app-header v-if="this.$route.name !== 'admin'" />
  <router-view />
</template>

<script>
import AppHeader from './components/AppHeader.vue';

export default {
  components: {
    AppHeader,
  },
  created() {
    const tokenLS = window.localStorage.getItem('token');
    if (tokenLS) this.$store.commit('setToken', tokenLS);
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: 'Noto Sans', sans-serif;
  padding: 0;
  margin: 0;
}
body {
  font-size: 16px;
  background: #111827;
  color: #e5e7eb;
  padding-bottom: 3rem;
}
.container {
  max-width: 1170px;
  margin: 0 auto;
}
.btn {
  background: #374151;
  border-radius: 0.5rem;
  padding: 5px 15px;
  border: none;
  color: #fff;
  text-transform: uppercase;
  font-size: 16px;
  transition: transform 0.2s;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    transform: translateY(2px);
  }
  &__big {
    font-size: 24px;
    padding: 0.5rem 2rem;
  }
}
.input {
  background: #374151;
  border-radius: 0.5rem;
  padding: 5px 15px;
  border: none;
  color: #fff;
  font-size: 16px;
}
</style>

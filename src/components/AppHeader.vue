<template>
  <header class="header">
    <div class="container header__container">
      <a href="/" class="logo"><strong>RECHEAT</strong>.org</a>
      <div class="search" @click="onSearchClick">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="handleSearch"
        >
          <path
            d="M21 21L15.803 15.803M15.803 15.803C17.2096 14.3964 17.9998 12.4887 17.9998 10.4995C17.9998 8.51029 17.2096 6.60256 15.803 5.19599C14.3964 3.78941 12.4887 2.99921 10.4995 2.99921C8.51031 2.99921 6.60258 3.78941 5.196 5.19599C3.78943 6.60256 2.99922 8.51029 2.99922 10.4995C2.99922 12.4887 3.78943 14.3964 5.196 15.803C6.60258 17.2096 8.51031 17.9998 10.4995 17.9998C12.4887 17.9998 14.3964 17.2096 15.803 15.803V15.803Z"
            stroke="#E5E7EB"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          ref="searchInput"
          :value="$store.state.search"
          @input="handleInput"
          @keydown.enter="handleSearch"
        />
      </div>
      <div class="logo"></div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    onSearchClick() {
      this.$refs.searchInput.focus();
    },
    handleInput(event) {
      this.$store.commit('setSearch', event.target.value);
    },
    handleSearch() {
      if (this.$store.state.search.length <= 0) return false;
      this.$router.push(`/posts?search=${this.$store.state.search}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  &__container {
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 2.25rem 0;
  }
}
.logo {
  color: #e5e7eb;
  font-size: 24px;
  text-decoration: none;
  flex: 1;
}
.search {
  flex: 2;
  background: #1f2937;
  border-radius: 0.5rem;
  padding: 5px 15px;
  gap: 10px;
  display: flex;
  align-items: center;
  svg {
    cursor: pointer;
  }
  input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    font-size: 16px;
    color: #fff;
  }
}
</style>

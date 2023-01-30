<template>
  <div class="pagination">
    <button
      v-for="(page, idx) in [...Array(maxPage)]"
      @click="handlePage(idx + 1)"
      :key="page"
      :class="{ active: idx + 1 === currentPage }"
    >
      {{ idx + 1 }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    maxPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  emits: {
    changePage: null,
  },
  methods: {
    handlePage(page) {
      this.$emit('changePage', page);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 2rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  button {
    width: 1.5rem;
    height: 1.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    background: #374151;
    border: none;
    border-radius: 0.5rem;
    color: #e5e7eb;
    transition: transform 0.2s;
    cursor: pointer;
    &.active {
      transform: scale(1.25);
    }
  }
}
</style>

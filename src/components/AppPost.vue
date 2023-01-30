<template>
  <div class="post">
    <div class="top">
      <div class="category">
        <p><span>Category:</span> {{ category }}</p>
      </div>
      <div class="badge">UNDETECTED</div>
    </div>
    <router-link :to="`/post/${id}`" class="title">{{ title }}</router-link>
    <img v-if="image" :src="image" :alt="title" class="image" />
    <router-link :to="`/post/${id}`" class="btn">Learn more...</router-link>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  display: flex;
  flex-direction: column;
  background: #1f2937;
  border-radius: 1rem;
  .btn {
    align-self: flex-end;
    margin: 1rem;
  }
}
.top {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.badge {
  display: inline-flex;
  background: #22c55e;
  text-transform: uppercase;
  padding: 2px 10px;
  border-radius: 0.5rem;
  color: #fff;
}
.category {
  color: #e5e7eb;
  span {
    opacity: 0.5;
  }
}
.title {
  padding: 0 1rem 1rem 1rem;
  font-size: 20px;
  font-weight: 400;
  color: #e5e7eb;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
.image {
  display: inline-flex;
  width: 100%;
  max-height: 240px;
  object-fit: cover;
}
</style>

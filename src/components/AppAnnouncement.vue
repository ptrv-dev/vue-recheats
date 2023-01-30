<template>
  <div class="announcement">
    <h3>Announcement</h3>
    <p>{{ text }}</p>
  </div>
</template>

<script>
import { appAxios } from '@/axios';
export default {
  data() {
    return {
      text: '',
    };
  },
  methods: {
    async fetchAnnouncement() {
      const { data } = await appAxios.get('/announcement');
      this.text = data.text;
    },
  },
  mounted() {
    this.fetchAnnouncement();
  },
};
</script>

<style lang="scss" scoped>
.announcement {
  flex: 1;
  max-width: 275px;
  background: #1f2937;
  border-radius: 1rem;
  padding: 1rem;
  h3 {
    text-transform: uppercase;
    font-weight: 400;
  }
  p {
    margin-top: 1rem;
    white-space: pre-line;
  }
}
</style>

<template>
  <div class="container" v-if="!$store.state.token">
    <form @submit.prevent="onSubmit">
      <h3>ADMIN PANEL</h3>
      <input type="text" placeholder="Username" v-model="username" />
      <input type="password" placeholder="Password" v-model="password" />
      <button type="submit">Login</button>
    </form>
  </div>
  <template v-else>
    <div class="container">
      <header class="header">
        <h3>ADMIN-PANEL</h3>
        <button class="btn" @click="logout">Logout</button>
      </header>
      <main class="main">
        <div class="categories">
          <h3>Categories</h3>
          <div class="categories__input">
            <input
              type="text"
              placeholder="Category name..."
              v-model="newCategory"
            />
            <button class="btn" @click="addNewCategory">Add new</button>
          </div>
          <ul>
            <li v-for="category in categories" :key="category._id">
              {{ category.title }}
              <button @click="removeCategory(category._id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  width="16"
                  height="16"
                >
                  <path
                    d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
        <div class="post">
          <h3>Create new post</h3>
          <input
            type="text"
            class="input"
            placeholder="Image url..."
            v-model="imageUrl"
          />
          <input
            type="text"
            class="input"
            placeholder="Title here..."
            v-model="title"
          />
          <div class="select">
            <select v-model="selectedCategory">
              <option value="" disabled>Select category</option>
              <option
                v-for="category in categories"
                :key="category._id"
                :value="category._id"
              >
                {{ category.title }}
              </option>
            </select>
          </div>
          <textarea
            v-model="description"
            cols="30"
            rows="10"
            placeholder="Description here..."
            class="input"
          ></textarea>
          <input
            v-model="fileUrl"
            type="text"
            class="input"
            placeholder="File download link url..."
          />
          <button class="btn" @click="handleAddPost">Add</button>
        </div>
      </main>
    </div>
    <div class="container">
      <div class="announcement">
        <h3>Announcement</h3>
        <textarea cols="50" rows="10" v-model="announcement"></textarea>
        <button class="btn" @click="updateAnnouncement">Submit</button>
      </div>
    </div>
  </template>
</template>

<script>
import { appAxios } from '@/axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      categories: [],
      newCategory: '',
      imageUrl: '',
      title: '',
      description: '',
      selectedCategory: '',
      fileUrl: '',
      announcement: '',
    };
  },
  async mounted() {
    const { data } = await appAxios.get('/category');
    this.categories = data;
    this.fetchAnnouncement();
  },
  methods: {
    async fetchAnnouncement() {
      const { data } = await appAxios.get('/announcement');
      this.announcement = data.text;
    },
    async onSubmit() {
      try {
        const { data } = await appAxios.post('/login', {
          username: this.username,
          password: this.password,
        });
        this.$store.commit('setToken', data.token);
        window.localStorage.setItem('token', data.token);
      } catch (error) {
        alert('Login error..');
      }
    },
    logout() {
      this.$store.commit('removeToken');
      window.localStorage.removeItem('token');
    },
    async addNewCategory() {
      try {
        await appAxios.post(
          '/category',
          { title: this.newCategory },
          { headers: { Authorization: this.$store.state.token } }
        );
        alert('Created!');
        window.location.reload();
      } catch (error) {
        alert('Category create error!');
        console.log(error);
      }
    },
    async removeCategory(id) {
      try {
        await appAxios.delete(`/category/${id}`, {
          headers: { Authorization: this.$store.state.token },
        });
        alert('Removed!');
        window.location.reload();
      } catch (error) {
        alert('Category remove error!');
        console.log(error);
      }
    },
    async handleAddPost() {
      if (this.title.length < 2) return alert('Enter a title!');
      if (this.fileUrl.length < 2) return alert('Enter a file url!');
      if (this.selectedCategory === '') return alert('Select category!');

      try {
        await appAxios.post(
          '/post',
          {
            title: this.title,
            description: this.description,
            image: this.imageUrl,
            category: this.selectedCategory,
            link: this.fileUrl,
          },
          {
            headers: { Authorization: this.$store.state.token },
          }
        );
        alert('Successfully!');
        window.location.reload();
      } catch (error) {
        alert('Add post error!');
        console.log(error);
      }
    },
    async updateAnnouncement() {
      try {
        await appAxios.patch(
          '/announcement',
          { text: this.announcement },
          {
            headers: { Authorization: this.$store.state.token },
          }
        );
        alert('Updated!');
        window.location.reload();
      } catch (error) {
        alert('Announcement update error!');
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 480px;
  margin: 0 auto;
  align-items: center;
  h3 {
    color: #e5e7eb;
  }
  button {
    padding: 0.25rem 1rem;
    text-transform: uppercase;
  }
}
.header {
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main {
  padding: 1rem 0;
  display: flex;
  gap: 2rem;
}
.categories {
  flex-basis: 33%;
  background: #1f2937;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  &__input {
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
    input {
      flex: 1;
      padding: 0 0.5rem;
      font-size: 16px;
      color: #fff;
      border-radius: 0.5rem;
      border: none;
      background: #374151;
    }
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    li {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
    }
    button {
      padding: 0;
      margin: 0;
      display: inline-flex;
      cursor: pointer;
      transition: transform 0.2s;
      &:hover {
        transform: translateY(1px);
      }
    }
  }
}
.post {
  background: #1f2937;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
  .btn {
    margin-top: 0.5rem;
    width: 140px;
    align-self: center;
  }
}
.select {
  border-radius: 0.5rem;
  overflow: hidden;
  background: #374151;
  select {
    width: 100%;
    background: transparent;
    border: none;
    height: 32px;
    padding: 0 0.5rem;
    color: #fff;
    font-size: 16px;
    outline: none;
  }
  option {
    background: #374151;
  }
}

.announcement {
  background: #1f2937;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  textarea {
    background: #374151;
    padding: 1rem;
    border-radius: 1rem;
    color: #fff;
    border: none;
    margin-top: 0.5rem;
    font-size: 16px;
  }
  .btn {
    align-self: flex-end;
    margin-top: 1rem;
  }
}
</style>

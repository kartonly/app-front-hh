<template>
  <div class="container">
    <header>
      <div class="menu">
        <router-link to="/" >Все объявления</router-link>
        <router-link to="/add" >Создать объявление</router-link>
      </div>
      <div class="filter">
        <form>
        <select class="price" v-model="price">
          <option value="desc">По убыванию</option>
          <option value="asc">По возрастанию</option>
        </select>
        <label class="form-check-label" for="price">Цена</label>

        <select class="date" v-model="date">
          <option value="desc">По убыванию</option>
          <option value="asc">По возрастанию</option>
        </select>
        <label class="form-check-label" for="price">Дата размещения</label>
        </form>
        <button class="btn btn-secondary" @click="sendFilter()">Отфильтровать</button>
      </div>

      <div v-for="ad in ads" :key="ad.id">
        <div class="card">
          <h4 class="card-header">{{ ad.name }}</h4>
          <div class="card-body">
            <h5 class="card-title">Ссылка на фото - {{ ad.photo }}</h5>
            <p class="card-text">{{ ad.price }} р.</p>
            <router-link style="color:green" :to="adOpen(ad.id)">Просмотр</router-link>
          </div>
        </div>
      </div>

      <div class="pages">
        <button class="btn" v-if="first_page" @click="sendPage(-1)">Назад</button>
        <div>Страница {{data.meta.current_page}} из {{data.meta.last_page}}</div>
        <button class="btn" v-if="last_page" @click="sendPage(1)">Вперед</button>
      </div>
  </header>
  </div>
</template>

<script>
import { getSomething } from "../api/get";

export default {
  name: "Main",
  data(){
    return {
      ads: [],
      data:[],
      price: "desc",
      date: "desc",
      page: "",
      
      showError: false,
      loading: false,
      errorMessage: "",
    };
  },
  created() {
    getSomething(`api/v1/all/${this.price}/${this.date}/?page=${this.page}`).then((resp) => {
      this.ads = resp.data.data;
      this.data = resp.data;
      this.page = resp.data.meta.current_page;
      this.loading = false;
    });
  },
  computed: {
    first_page: function () {
      if (this.data.meta.current_page === 1) return false;
      else return true;
    },
    last_page: function () {
      if (this.data.meta.current_page === this.data.meta.last_page) return false;
      else return true;
    },
  },
  methods: {
    sendFilter() {
      this.loading = true;
      this.showError = false;
      getSomething(`api/v1/all/${this.price}/${this.date}/?page=${this.page}`).then((resp) => {
      this.ads = resp.data.data;
      this.data = resp.data;
      this.page = resp.data.meta.current_page;
      this.loading = false;
      });
    },

    sendPage(a) {
      this.loading = true;
      this.showError = false;
      this.page = this.page+a;
      getSomething(`api/v1/all/${this.price}/${this.date}/?page=${this.page}`).then((resp) => {
      this.ads = resp.data.data;
      this.data = resp.data;
      this.page = resp.data.meta.current_page;
      this.loading = false;
      });
    },

    adOpen: function(id) {
        return `ad/${id}`;
    }
    
  },
};
</script>


<style>
  .menu {
    margin: 2%;
  }
  .filter{
    margin: 2%;
  }
  .filter button{
    margin: 1%;
  }
  .filter select{
    margin-left: 4%;
  }
  .filter label{
    margin-left: 1%;
  }
  .menu a{
    text-decoration: none;
    color:rgb(0, 14, 39);
    font-size: 25px;
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
  }
  .pages {
    margin: 2%;
    display: flex;
    justify-content: space-around;
  }
</style>

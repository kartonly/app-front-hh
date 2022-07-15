<template>
  <div class="cont form-signin">
    <div class="back-cont">
        <router-link class="back btn btn-primary" :to="main()">Назад</router-link>
    </div>
    <form>
      <h1 class="h3 mb-3 fw-normal">Добавить объявление</h1>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="Название"
          v-model="name"
        />
        <label for="name">Название</label>
      </div>
      <div class="form-floating">
        <textarea
          type="text"
          class="form-control"
          id="about"
          placeholder="Описание"
          v-model="about"
        ></textarea>
        <label for="about">Описание</label>
      </div>

      <div class="form-floating">
        <input
          type="number"
          class="form-control"
          id="price"
          v-model="price"
        />
        <label for="price">Цена</label>
      </div>
      <h4>Ссылки на фото</h4>


      <div v-for="input in inputs" :key="input.input_id">
        <div class="form-floating">
          <input
          type="text"
          class="form-control"
          id="link"
          placeholder="Ссылка"
          v-model="input.link"
          />
        </div>   
      </div>
      <button class="btn btn-secondary" v-if="links_limit" @click.prevent="addLink()">Добавить ссылку на фото</button>
    

      
      <div v-show="showError" class="mt-2 alert alert-danger" >
        {{ this.errorMessage }}
      </div>
    </form>
    <button class="w-100 btn btn-submit btn-primary" @click="sendAd()">
      Добавить объявление
    </button>
    
  </div>
</template>

<script>
import { postSomething } from "../api/post.js";
export default {
  name: "AddAd",
  data() {
    return {
        inputs: [
        {
          input_id: 1,
          link: ""
        },
      ],
      name: "",
      about: "",
      price: "",
      count: 2,
      
      showError: false,
      loading: false,
      errorMessage: "",
    };
  },
  computed: {
    links_limit: function () {
      if (this.count>3) return false;
      else return true;
    },
  },
  methods: {
    addLink() {
      this.count=this.count+1
      this.inputs.push({
        id: this.inputs.length + 1,
        link: (this.inputs.length + 1),
      });
    },
    sendAd() {
      this.loading = true;
      this.showError = false;
      let links = []
      for (let i in this.inputs) {
        links.push({
          link: this.inputs[i].link,
        })
      }
      const data = {
        name: this.name,
        about: this.about,
        price: this.price,
        link: links
      }
      console.log(data)
      postSomething('api/v1/create',{
        name: this.name,
        about: this.about,
        price: this.price,
        link: links
      })
        .then((resp) => {
          this.loading = false;
          this.$router.push(`/ad/${resp.data}`);
        })
        .catch((error) => {
          this.loading = false;
          this.errorMessage = error.response.data.errors;
          this.showError = true;
          console.log(error.response.data);
        });
    },

    main: function() {
        return `/`;
    }
  },
};
</script>

<style>
    .cont{
        margin: 1%;
    }
</style>

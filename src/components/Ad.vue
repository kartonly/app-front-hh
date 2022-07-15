<template>
  <div class="container">
    <div class="back-cont">
        <router-link class="back btn btn-primary" :to="main()">Назад</router-link>
    </div>
    
    <div class="card">
        <div class="card-header"> <h2>{{ad.name}}</h2> </div>
        <div class="card-body">
            <h5 class="card-title">{{ad.about}}</h5>
            <ul v-for="link in ad.photos" :key="link.id">
                <li>Ссылка на фото - {{link.link}}</li>
            </ul>
            
        </div>
        <div class="card-footer text-muted"> {{ad.price}} р.</div>
    </div>
   </div>
</template>

<script>
import { getSomething } from "../api/get";

export default {
  name: "Ad",
  inject: ["reload"],
  data() {
    return {
      ad:{},

      showError: false,
      loading: false,
      errorMessage: "",
    };
  },
  computed: {

  },

  created() {
    getSomething(`api/v1/one/${this.$route.params.id}`).then((response) => {
      this.ad = response.data[0];
    });
  },
  methods: {
    main: function() {
        return `/`;
    }
  },
};
</script>

<style>
    .back-cont{
        display:flex;
        margin-bottom:1%;
    }
    .back{
        float: left;
    }
    li{
        list-style: none;
    }
</style>

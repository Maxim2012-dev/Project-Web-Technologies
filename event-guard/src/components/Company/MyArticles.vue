<template>
    <ul id="myArticlesSection">
     <h1 style="padding: 40px; font-size: 40px;"> My Articles</h1>
      <img src="../../assets/add.png" class="article" alt="ADD" width= "80" @click="$router.push('/addProduct')">
      <section class="container">
        <form>
          <img class="searchIcon" src="../../assets/search.png" alt="">
          <input type="text" name="searchbar" v-model="search" placeholder="Search products" @keyup="getSearchProducts">
        </form>
        <v-btn class="filter" color="deep-purple lighten-1" outlined @click="sortCheapest">Cheapest</v-btn>
        <v-btn class="filter" color="deep-purple lighten-1" outlined @click="sortExpensive">Most expensive</v-btn>
        <section class="scrollfield">
        <div v-for="product in products" :key="product.id" class="article">
          <article>
            <router-link :to="{ name: 'ArticleDetails', 
              params: { product_id: product.id, product_name: product.product_name, product_price: product.rent_price,
                        product_description: product.product_description }}">
                <h3 class="detailArticle">{{ product.product_name }}</h3>
                <p class="detailArticle"> € {{ product.rent_price }}</p>
                <p class="detailArticle">{{ product.description }} </p>
            </router-link>
        </article>
       </div>
      </section>
      </section>
    </ul>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data: () => ({
        search: " ",
        products: null
    }),
    mounted() {
      this.getCompanyProducts();
    },
    methods: {
      sortCheapest() {
        return this.products.sort((a, b) => a.rent_price >= b.rent_price ? 1 : -1); 
      },
      sortExpensive() {
        return this.products.sort((a, b) => a.rent_price < b.rent_price ? 1 : -1); 
      },
      getSearchProducts() {
        axios.post("http://localhost:3000/getProducts", {
            company_name: this.$store.getters.getUsername,
            keyValue: this.search
        }).then(response => {
            // response might be array of search results
            let results = response.data.payload;
            if (results != null) {
                this.products = results;
            }
        })
      },
      getCompanyProducts() {
        axios.post("http://localhost:3000/getOwnProducts", {
            name: this.$store.getters.getUserObject.name
        }).then(response => {
            const results = response.data.payload;
            if (results != undefined) {
                this.products = results;
            }
        })
      }
    },
    computed: {
      filteredProducts() {
        if(this.products != null) {
          return this.products.filter(product => product.name.toLowerCase().includes(this.search.toLowerCase()))
        } return null;
      }
    }
  }
  </script>
  
  <style>
  
  #myArticlesSection{
      width: 100%;
      height: 100vh;
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: 'Ubuntu', sans-serif;
  }
  
  .article{
    list-style-type: none;
    background: #f4f4f4;
    margin: 10px auto;
    padding: 20px; 
    border-radius: 10px;
    max-width: 600px;
    cursor: pointer;
  }
  .article:hover {
    background: #ddd;
  }
  
  .article a{
    text-decoration: none;
    color: #444;
  }

  .detailArticle{
    padding-bottom: 10px;
    margin-bottom: 5px;
    background: transparent;
  }
  
  .add{
    background: #ddd;
    padding: 10px 20px; 
    border-radius: 10px;
    align-content: left;
  }
  
  h3{
    font-family: 'Ubuntu', sans-serif;
    padding: 5px;
    font-size: 25px;
  }
  
  .searchIcon{
    padding-left: 10px;
    width: 4%;
  }
  
  .container{
    width: 650px;
  }
  
  .container form{
    width: 98%;
    border: 1px solid rgb(82, 74, 235);
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  .scrollfield::-webkit-scrollbar {
    display: none;
  }
  
  .container form input{
    border: none;
    outline: none;
    box-shadow: none;
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    padding: 8px 10px;
  }

  .scrollfield{
    height: 400px;
    background: #fff;
    overflow-y: scroll;
  }
  
  .filter{
    padding: 5px;
    margin: 20px 5px 20px;
    padding: 10px; 
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1.5px;
  }

  .searchbar {
    position: relative;
    display: inline-block;
    width:auto;
}

  </style>
  

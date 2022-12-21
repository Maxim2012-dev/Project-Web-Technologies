<template>
    <ul id="myArticlesSection">
     <h1 style="padding: 40px; font-size: 40px;"> My Articles</h1>
      <img src="../../assets/add.png" class="article" alt="ADD" width= "80" @click="$router.push('/addProduct')">
      <section class="container">
        <form>
          <img class="searchIcon" src="../../assets/search.png" alt="">
          <input type="text" name="searchbar" v-model="search" placeholder="Search products">
        </form>
        <button class="filter" @click="sortCheapest">Cheapest</button>
        <button class="filter" @click="sortExpensive">Most expensive</button>
        <div v-for="product in filteredProducts" :key="product.id" class="article">
          <article>
            <router-link :to="{ name: 'ArticleDetails', params: { id: product.id }}">
                <h3>{{ product.name }}</h3>
                <b> € {{ product.price }}</b>
                <p>{{ product.shortDescription }} </p>
            </router-link>
            <v-btn class="addBtn" color="deep-purple lighten-1" text @click="add_to_wishlist">Add to wishlist</v-btn>
        </article>
       </div>
      </section>
    </ul>
  </template>
  
  <script>
  export default {
      name: 'myArticles',
      data () {
        //db.Providers.find();
          return {
            search: " ",
            products: [
              { id: 1, name: "Schop", shortDescription: "stevige schop in goede staat", price: 15.00, ammount: 1, organisation: "Scouts Brussel"},
              { id: 2, name: "Koelkast", shortDescription: "goedwerkende koelkast met vriesvak", price: 30.00, ammount: 1, organisation: "Scouts Brussel"},
              { id: 3, name: "Sjorbalk", shortDescription: "8 meter sjorbalken", price: 20.00, ammount: 30, organisation: "Scouts Brussel"},
              { id: 4, name: "Kookpot", shortDescription: "propere, grote kookpotten met deksel", price: 20.00, ammount: 3, organisation: "Scouts Brussel"},
              { id: 5, name: "Koelkast", shortDescription: "energiezuinige koelkasten met wieltjes", price: 35.00, ammount: 2, organisation: "Scouts Brussel"}
            ]
          }
        },
    methods: {
      sortCheapest() {
        return this.products.sort((a, b) => a.price >= b.price ? 1 : -1); },
      sortExpensive() {
        return this.products.sort((a, b) => a.price < b.price ? 1 : -1); }
      },
    computed: {
      filteredProducts() {
        return this.products.filter(product => product.name.toLowerCase().includes(this.search.toLowerCase()))
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
    height: 600px;
    background: #fff;
    overflow-y: scroll;
  }
  
  .container form{
    width: 98%;
    border: 1px solid rgb(82, 74, 235);
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  .container::-webkit-scrollbar {
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
  
  .filter{
    padding: 5px;
    margin: 10px;
    background-color: rgb(245, 245, 245); 
    padding: 10px; 
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1.5px;
  }

  .searchbar {
    position: relative;
    display: inline-block;
    width:auto;
}
  </style>
  

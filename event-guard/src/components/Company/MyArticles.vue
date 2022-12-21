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
        <section class="scrollfield">
        <div v-for="product in filteredProducts" :key="product.id" class="article">
          <post :product="product"></post>
       </div>
      </section>
      </section>
    </ul>
  </template>
  
  <script>
  import Post from "./SearchArticles.vue";
  export default {
    components: { Post },
      data () {
        //db.Providers.find();
          return {
            search: " ",
            products: [
              { id: 1, name: " Schovel", shortDescription: "solid shovel in good condition", price: 15.00, organisation: "Scouts Brussel"},
              { id: 2, name: " Fridge", shortDescription: "good-working refrigerator with freezer compartment", price: 30.00, organisation: "Scouts Brussel"},
              { id: 3, name: " Lashing beam", shortDescription: "8 meter lashing beams", price: 20.00, organisation: "Scouts Brussel"},
              { id: 4, name: " Cooking pot", shortDescription: "clean, large cooking pots with lids", price: 20.00, organisation: "Scouts Brussel"},
              { id: 5, name: " Fridge", shortDescription: "energy-efficient refrigerators with wheels", price: 35.00, organisation: "Scouts Brussel"}
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
  

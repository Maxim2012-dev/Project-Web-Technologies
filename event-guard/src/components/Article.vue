<template>
  <h1> My Articles</h1>
   <ul>
    <img src="../assets/add.png" class="article" alt="ADD" width= "80" @click="$router.push('/add')">
     <li v-for="article in articles" :key="article.id" class="article">
         <router-link :to="{ name: 'ArticleDetails', params: { id: article.id }}">
          <h3>{{ article.name }}</h3>
          <p>{{ article.description }} </p>
         </router-link>
     </li>
    </ul>
</template>

<script>
export default {
  name: 'App',
    data () {
        return {
            articles: [
              { id: 1, name: 'Schop', description: 'stevige schop'},
              { id: 2, name: 'Koelkast', description: 'frisse koelkast'},
            ]
         }
        }
}
</script>

<style>
.article{
  list-style-type: none;
  background: #f4f4f4;
  margin: 10px auto;
  padding: 20px; 
  border-radius: 10px;
 max-width: 1000px;
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
</style>

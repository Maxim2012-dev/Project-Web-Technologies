<template>
    <v-app>
      <div class="section-1">
        <div class="text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eum quaerat iste officiis, 
          adipisci vel aspernatur illo, perferendis nihil, id iusto recusandae accusantium. 
          Nostrum ipsa reiciendis nesciunt blanditiis. Quia, earum.
        </div>
        <div class="image">
          <img src="../assets/img1.jpg" class="img1" alt="event equipment">
        </div>
      </div>
    </v-app>
  </template>
    
  <script>
  export default {

  }
  </script>
    
  <style>
  .section-1 {
    display: flex;
    justify-content: center;
    margin: 80px;
    background-color: gainsboro;
    border: 2px solid red;
  }

  .text {
    border: 2px solid green;
    font-family: 'Ubuntu', sans-serif;
    font-size: 2vw;
    width: 50%;
    margin: 25px 10px;
  }

  .image {
    border: 2px solid green;
    margin: 25px 10px;
    width: 50%;
  }

  .img1 {
    width: 100%;
    height: auto;
  }
  </style>
<template>
    <v-app>
      <div class="section">
        <div class="text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eum quaerat iste officiis, 
          adipisci vel aspernatur illo, perferendis nihil, id iusto recusandae accusantium. 
          Nostrum ipsa reiciendis nesciunt blanditiis. Quia, earum.
        </div>
        <div class="image">
          <img src="../assets/img1.jpg" class="img1" alt="event tent">
        </div>
      </div>
      <div class="section">
        <div class="image">
          <img src="../assets/img2.jpg" class="img1" alt="light equipment">
        </div>
        <div class="text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eum quaerat iste officiis, 
          adipisci vel aspernatur illo, perferendis nihil, id iusto recusandae accusantium. 
          Nostrum ipsa reiciendis nesciunt blanditiis. Quia, earum.
        </div>
      </div>
      <div class="section">
        <div class="text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eum quaerat iste officiis, 
          adipisci vel aspernatur illo, perferendis nihil, id iusto recusandae accusantium. 
          Nostrum ipsa reiciendis nesciunt blanditiis. Quia, earum.
        </div>
        <div class="image">
          <img src="../assets/img3.jpg" class="img1" alt="stage equipment">
        </div>
      </div>
    </v-app>
  </template>
    
  <script>
  export default {

  }
  </script>
    
  <style>
  .section {
    display: flex;
    justify-content: center;
    align-self: center;
    margin: 50px 0px 50px;
    width: 80%;
    background-color: gainsboro;
  }

  .text {
    font-family: 'Ubuntu', sans-serif;
    font-size: 2vw;
    width: 50%;
    margin: 25px 10px;
  }

  .image {
    margin: 25px 10px;
    width: 50%;
  }

  .img1 {
    width: 100%;
    height: auto;
  }
  </style>
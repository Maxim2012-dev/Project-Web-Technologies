<template>
    <v-app>
      <div class="section">
        <div class="text">
          Do you still require a party tent or some specific kind of tent for your events?
          Join the community and discover multiple companies who can offer you that. 
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
          You got everything set up for the biggest event, you have ever organised, but you
          still need light equipment? Well, this is the place to go...
          Be inspired by the largest range of light installatinos offered by various providers. 
        </div>
      </div>
      <div class="section">
        <div class="text">
          Or you might be planning to book a famous artist to perform at your event?
          Then you should explore the largest range of stage equipment, offered by the community!
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
    padding-top: 50px;
    margin: 80px 0px 80px;
    width: 80%;
    border-top: 3px solid gainsboro;
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
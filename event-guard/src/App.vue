<template>
  <div class="header-container">
    <div class="title-container">
      <h1 id="title">EventGuard</h1>
    </div>
    <div class="nav-container">
      <a href="login.html">Organisator</a>
      <a href="login.html">Verhuurder</a>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'App',
  }
</script>

<style>
  #title {
    font-family: 'Ubuntu', sans-serif;
    padding: 20px;
    font-size: 40px;
  }

  .header-container {
      background-color: gainsboro;
  }

  .nav-container {
      font-family: 'Ubuntu', sans-serif;
      display: flex;
      justify-content: flex-end;
  }

  .nav-container a {
      text-decoration: none;
      padding: 10px 20px;
      font-weight: bold;
      font-family: 'Ubuntu', Helvetica, sans-serif;
      font-size: 20px;
  }
</style>

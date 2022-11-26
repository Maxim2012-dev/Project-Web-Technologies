<template>
  <div class="content">
    <header class="header-container">
      <div class="title-container">
        <h1 id="title">EventGuard</h1>
      </div>
      <div class="nav-container">
        <ul>
          <li><router-link to="/login" exact>Log in</router-link></li>
          <li><router-link to="/register" exact>Sign Up</router-link></li>
        </ul>
      </div>
    </header>
    <router-view></router-view>
    <footer>
      <div class="footer-container">
        <h1>EventGuard</h1>
        <p>
          The EventGuard website is designed to take care of the contact between customer and provider when it comes
          to organizing events and offering the equipment necessary for those events. Organizers of any event
          have the ability to create their own account and search for their desired equipment. These products
          are made available by companies for organizers to view.
        </p>
        <a href="#title">Go back to top</a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style>
html {
  scroll-behavior: smooth;
}

#title {
  font-family: 'Ubuntu', sans-serif;
  padding: 20px;
  font-size: 40px;
}

ul {
  list-style-type: none;
  margin: 0;
}

li {
  display: inline-block;
  margin: 10px 0px;
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
  padding: 10px 20px;
  font-size: 20px;
  text-decoration: none;
  font-weight: bold;
}

.nav-container a:hover{
  color: black;
}

.footer-container {
  font-family: 'Ubuntu', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  background-color: #444;
}

.footer-container h1 {
  font-size: 2.1rem;
  line-height: 3rem;
  color: #eee;
}

.footer-container p {
  width: 50%;
  margin: 30px auto;
  line-height: 28px;
  font-size: 14px;
  color: gainsboro;
}

.footer-container a {
  text-decoration: none;
  border: 2px solid gainsboro;
  font-size: 20px;
  margin-bottom: 40px;
  padding: 5px;
  color: gainsboro;
}

.router-link-active {
  background: #eee;
  color: #444;
}
</style>

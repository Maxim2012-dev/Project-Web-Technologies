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
      <!-- here goes the footer -->
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      form_toggle: true,
      message_type: 'Organizer'
    };
  },
  methods: {
    display_login_message(type) {
      this.form_toggle = true
      this.message_type = type
    },
    display_register_message(type) {
      this.form_toggle = false
      this.message_type = type
    }
  }

}
</script>

<style>
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

.router-link-active {
  background: #eee;
  color: #444;
}
</style>

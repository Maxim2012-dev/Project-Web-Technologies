<template>
  <div>
    <header class="header-container">
      <div class="title-container">
        <h1 id="title">EventGuard</h1>
      </div>
      <div class="nav-container">
        <ul>
          <li><router-link  style="color:white;" :to="getUserHomePage" replace exact>Home</router-link></li>
          <li v-if="!user"><router-link style="color:white;" to="/login" replace exact>Log in</router-link></li>
          <li v-if="!user"><router-link style="color:white;" to="/register" replace exact>Sign up</router-link></li>
          <li v-if="user"><router-link  style="color:white;" to="/profile" exact>Profile</router-link></li>
          <li v-if="user">
            <v-btn id="logout" dark outlined @click="log_out_user"><v-icon dark left>mdi-logout</v-icon>Log out</v-btn>
          </li>
        </ul>
      </div>
    </header>
    <!-- where all the components get injected -->
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
        <a class="link" href="#title">Go back to top</a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    user() {
      return this.$store.state.user
    },
    getUserHomePage() {
      const typeUser = this.$store.getters.getTypeUser;
      if (typeUser === 'organizer') {
        return '/organizer-home';
      } else if (typeUser ==='provider') {
        return '/provider-home';
      } else {
        return '/';
      }
    }
  },
  methods: {
    log_out_user() {
      this.$store.commit({
        type: 'clear_user_state',
      })
      this.$router.replace({ name: "root" });
    }
  }
}
</script>

<style>
html {
  scroll-behavior: smooth;
}

#title {
  font-family: 'Ubuntu', sans-serif;
  color: white;
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
  width: 100%;
  background-color: #7E57C2;
}

.nav-container {
  font-family: 'Ubuntu', sans-serif;
  display: flex;
  justify-content: flex-end;
  margin-right: 40px;
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

.link:hover {
  opacity: 0.5;
}

.router-link-active {
  background: #B39DDB;
  color: #444;
}

#logout {
  margin-left: 50px;
  margin-right: 10px;
}
</style>

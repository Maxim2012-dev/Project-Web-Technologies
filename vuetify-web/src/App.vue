<template>
  <div class="content">
    <div class="header-container">
      <div class="title-container">
        <h1 id="title">EventGuard</h1>
      </div>
      <div class="nav-container">
        <a href="#" @click="display_organizer_login">Organizer</a>
        <a href="#" @click="display_company_login">Company</a>
      </div>
    </div>
    <LoginForm v-if="this.form_toggle" :login_type="login_type"></LoginForm>
    <SignUpForm v-else></SignUpForm>
  </div>
</template>

<script>
import SignUpForm from './components/SignUpForm.vue';
import LoginForm from './components/LoginForm.vue';
export default {
  name: "App",
  components: { SignUpForm, LoginForm },
  data() {
    return {
      form_toggle: true,
      login_type: 'Organizer'
    };
  },
  methods: {
    display_organizer_login() {
      this.login_type = 'Organizer'
    },
    display_company_login() {
      this.login_type = 'Company'
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
  margin: 10px 20px;
  font-weight: bold;
  font-family: 'Ubuntu', Helvetica, sans-serif;
  font-size: 20px;
}

.nav-container a:hover{
  color: black;
}
</style>

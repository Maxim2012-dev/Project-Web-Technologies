<template>
  <v-app>
    <v-form class="form">
      <h1>Welcome Back!</h1>
      <h3 class="login-message">{{ login_type }} Login</h3>
      <v-text-field outlined label="Username" id="username" prepend-inner-icon="mdi-account-circle-outline">
      </v-text-field>
      <v-text-field outlined label="Password" id="password" prepend-inner-icon="mdi-lock-outline">
      </v-text-field>
      <div>
        <v-btn class="btn" text>Sign Up</v-btn>
        <v-btn class="btn" depressed>Log in</v-btn>
      </div>
    </v-form>
  </v-app>
</template>
  
<script>
export default {
  name: 'LoginForm',
  props: ['login_type']
}
</script>
  
<style>
.btn {
  margin: 15px;
}

.login-message {
  margin-bottom: 50px;
  color:gray;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}
</style>
  
<template>
  <v-app>
    <v-alert class="dialog" v-if="this.isError" :type=this.typeMsg>{{ errorMsg }}</v-alert>
    <v-form class="form" v-model="formValidity">
      <h1>Welcome Back!</h1>
      <h3 class="login-message">log in as user or provider</h3>
      <v-text-field outlined v-model="username" label="Username" id="username"
        prepend-inner-icon="mdi-account-circle-outline" :rules="usernameRules">
      </v-text-field>
      <v-text-field type="password" outlined v-model="password" label="Password" id="password" prepend-inner-icon="mdi-lock-outline"
        :rules="passwordRules">
      </v-text-field>
      <div>
        <v-btn class="btn" color="deep-purple lighten-1" text to="/register" replace>Sign Up</v-btn>
        <v-btn class="btn" color="deep-purple lighten-1" outlined light :disabled="!formValidity" @click="log_in_user">Log in</v-btn>
      </div>
    </v-form>
  </v-app>
</template>
  
<script>
import axios from "axios";
export default {
  name: 'LoginForm',
  data: () => ({
    username: "",
    password: "",
    errorMsg: "",
    isError: false,
    formValidity: false,
    typeMsg: 'error',
    usernameRules: [
      v => !!v || 'Username is required.',
    ],
    passwordRules: [
      v => !!v || 'Password is required.',
    ],
  }),
  mounted() {
    let message = this.$route.params.message;
    if (message != undefined) {
      this.typeMsg = 'success';
      this.isError = true;
      this.errorMsg = message;
    }
  },
  methods: {
    log_in_user() {
      if (this.formValidity) {
        this.isError = false;
        axios.post("http://localhost:3000/login", {
          username: this.username,
          password: this.password
        }).then(response => {
          const status = response.data.status;
          if (status === 'error') {
            this.typeMsg = 'error';
            this.isError = true;
            this.errorMsg = response.data.error;
            setTimeout(function() { this.isError = false; }.bind(this), 3000);
          } else {
            this.change_user_state(response.data.data, response.data.type, response.data.object)
          }
        })
      }
    },
    redirect_to_user_page(typeUser) {
      if (typeUser === 'organizer') {
        this.$router.replace({ name: "organizerHome", params: { username: this.username } });
      } else if (typeUser === 'provider') {
        this.$router.replace({ name: "providerHome", params: { username: this.username } })
      }
    },
    change_user_state(token, typeUser, object) {
      this.$store.commit({
        type: 'change_user_state',
        userToken: token,
        userType: typeUser,
        username: this.username 
      })
      this.$store.commit({
        type: 'init_user_object',
        object: object 
      })
      this.redirect_to_user_page(typeUser);
    }
  }
}
</script>
  
<style>
.btn {
  margin: 15px;
}

.login-message {
  margin-bottom: 50px;
  color: #9575CD;
}

.dialog {
  width: 30%;
  align-self: center;
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

</style>
  
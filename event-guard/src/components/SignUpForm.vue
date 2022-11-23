<template>
    <v-app>
        <v-form class="form" v-model="formValidity">
            <h1>Sign Up Today!</h1>
            <h3 class="register-message">{{ register_type }} Registration</h3>
            <v-text-field outlined v-model="name" label="Name" prepend-inner-icon="mdi-account-circle-outline" required
            :rules="nameRules">
            </v-text-field>
            <v-text-field outlined v-model="telnr" label="Telephone number" prepend-inner-icon="mdi-phone-outline" required
            :rules="telRules">
            </v-text-field>
            <v-text-field outlined v-model="email" label="E-mail address" prepend-inner-icon="mdi-email-outline" required
            :rules="emailRules">
            </v-text-field>
            <v-text-field outlined v-model="username" label="Username" prepend-inner-icon="mdi-account-circle-outline" required
            :rules="usernameRules">
            </v-text-field>
            <v-text-field outlined v-model="password" label="Password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
            :type="show1 ? 'text' : 'password'" prepend-inner-icon="mdi-lock-outline" required :rules="passwordRules" 
            @click:append="show1 = !show1">
            </v-text-field>
            <div>
                <v-btn class="btn" text to="/login">Log in</v-btn>
                <v-btn class="btn" depressed :disabled="!formValidity" @click="add_user">Register</v-btn>
            </div>
        </v-form>
    </v-app>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
    name: 'SignUpForm',
    data: () => ({
        name: "",
        telnr: "",
        email: "",
        username: "",
        password: "",
        show1: false,
        formValidity: false,
        nameRules: [
            v => !!v || 'Name is required.'
        ],
        telRules: [
            v => !!v || 'Telephone number is required.',
            v => /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/.test(v) || 'Number should be valid.'
        ],
        emailRules: [
            v => !!v || 'Email address is required.',
            v => v.includes('@') || 'Email should be valid.'
        ],
        usernameRules: [
            v => !!v || 'Username is required.',
            v => v.length >= 6 || 'Username should be longer than 6 characters'
        ],
        passwordRules: [
            v => !!v || 'Password is required.',
            v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'a lowercase letter, number and uppercase letter required.'
        ]
    }),
    props: ['register_type'],
    methods: {
        login_event_handler() {
            this.$emit('login-event', this.register_type)
        },
        add_user() {
            if (this.formValidity) {
                axios.post("http://localhost:3000/register", {
                    name: this.name,
                    telnr: this.telnr,
                    email: this.email,
                    username: this.username,
                    password: this.password
                }).then(response => {
                   console.log(response.data)
                })
            }
        }
    }
}
</script>

<style>
.btn {
    margin: 15px;
}

.register-message {
    margin-bottom: 50px;
    color: gray;
}

.form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
}
</style>
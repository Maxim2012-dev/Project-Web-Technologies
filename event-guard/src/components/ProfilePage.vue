<template>
    <v-app>
        <div class="container">
            <v-row>
                <v-col class="left_section">
                    <img class="rounded-circle mt-5" width="150px"
                        src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg">
                    <span>{{ this.name }}</span>
                    <span class="text-black-50">{{ this.email }}</span>
                </v-col>
                <v-col class="middle_section">
                    <span class="section_title">Profile Settings</span>
                    <v-form class="text_fields">
                        <label for="name">Name</label>
                        <v-text-field id="name" label="Name" :rules="nameRules" v-model="name" solo></v-text-field>
                        <label for="telnr">Telephone number</label>
                        <v-text-field id="telnr" label="Telephone number" :rules="telRules" v-model="telnr" solo></v-text-field>
                        <label for="email">E-mail address</label>
                        <v-text-field id="email" label="E-mail address" :rules="emailRules" v-model="email" solo></v-text-field>
                        <label for="username">Username</label>
                        <v-text-field id="username" label="Username" :rules="usernameRules" v-model="username" solo></v-text-field>
                    </v-form>
                    <v-btn color="purple lighten-2" class="white--text" :disabled="!formValidity" 
                        depressed @click="save_profile">Save Profile
                    </v-btn>
                </v-col>
                <v-col class="right_section">
                    <span class="section_title">Edogaru</span>
                    <div class="text_fields">
                        <v-text-field label="Name" solo></v-text-field>
                        <v-text-field label="Telephone number" solo></v-text-field>
                    </div>
                </v-col>
            </v-row>
        </div>
    </v-app>
</template>
<!-- TODO: user specific profile picture -->

<!-- NOTE: here we do the form validation as well -->
<script>
/* eslint-disable */
import axios from 'axios';
export default {
    data: () => ({
        name: "",
        telnr: "",
        email: "",
        username: "",
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
            v => v.length >= 6 || 'Username should be longer than 6 characters.'
        ]
    }),
    mounted() {
        const userData = this.$store.getters.getUserObject;
        console.log(userData);
        // if the user data is already requested once
        if (userData) {
            this.displayUserInfo(userData);
        } else {
        // else we request the user data and store it for future usage
            axios.post("http://localhost:3000/getUser", {
                typeUser: this.$store.getters.getTypeUser,
                username: this.$store.getters.getUsername
            }).then(response => {
                let result = response.data.payload;
                if (result != undefined) {
                    this.$store.commit({
                        type: 'init_user_object',
                        object: result[0]
                    })
                }
                this.displayUserInfo(result[0]);
            })
        }
    },
    methods: {
        displayUserInfo(userData) {
            this.name = userData.name;
            this.telnr = userData.telnr;
            this.email = userData.email;
            this.username = userData.username;
            this.password = userData.password;
        },
        save_profile() {

        }
    }
}
</script>

<style>
.container {
    margin: 35px;
    align-self: center;
    border: 2px solid purple;
}
.section_title {
    font-family: 'Ubuntu', sans-serif;
    font-weight: bold;
    font-size: 2vw;
}
.left_section {
    display: flex;
    align-items: center;
    flex-direction: column;
    border-right: 1px solid gainsboro;
}
.middle_section {
    display: flex;
    padding: 50px;
    justify-content: center;
    flex-direction: column;
    border-right: 1px solid gainsboro;
}
.right_section {
    padding: 50px;
}
.text_fields {
    margin-top: 20px;
}
.white--text {
    margin-top: 20px;
    width: 45%;
    align-self: center;
}
</style>
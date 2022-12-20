<template>
    <v-app>
        <v-alert class="dialog" v-if="this.isError" type="error">{{ errorMsg }}</v-alert>
        <v-form class="form" v-model="formValidity">
            <h1>Sign Up Today!</h1>
            <h3 class="register-message">choose your registration type</h3>
            <v-radio-group v-model="radioGroup" row>
                <v-radio :label="`Organizer`" color="deep-purple lighten-1" :value="'organizer'" @click="nameLabel = 'Organizer name' ">
                </v-radio>
                <v-radio :label="`Provider`"  color="deep-purple lighten-1" :value="'provider'"  @click="nameLabel = 'Provider name'">
                </v-radio>
            </v-radio-group>
            <v-text-field outlined v-model="name" :label="nameLabel" prepend-inner-icon="mdi-account-circle-outline" required
                :rules="nameRules">
            </v-text-field>
            <v-text-field v-if="radioGroup === 'provider'" outlined v-model="address" label="Address" prepend-inner-icon="mdi-map-marker-outline" 
                :rules="addressRules" required>
            </v-text-field>
            <v-text-field outlined v-model="telnr" label="Telephone number" prepend-inner-icon="mdi-phone-outline"
                required :rules="telRules">
            </v-text-field>
            <v-text-field outlined v-model="email" label="E-mail address" prepend-inner-icon="mdi-email-outline"
                required :rules="emailRules">
            </v-text-field>
            <v-text-field outlined v-model="username" label="Username" prepend-inner-icon="mdi-account-circle-outline"
                required :rules="usernameRules">
            </v-text-field>
            <v-text-field type="password" outlined v-model="password" label="Password" prepend-inner-icon="mdi-lock-outline" 
                required :rules="passwordRules">
            </v-text-field>
            <div>
                <v-btn class="btn" color="deep-purple lighten-1" text to="/login" replace>Log in</v-btn>
                <v-btn class="btn" color="deep-purple lighten-1" outlined light :disabled="!formValidity" @click="add_user">Register</v-btn>
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
        radioGroup: 'organizer',
        name: "",
        address: "",
        telnr: "",
        email: "",
        username: "",
        password: "",
        errorMsg: "",
        formValidity: false,
        isError: false,
        nameLabel: 'Organizer name',
        nameRules: [
            v => !!v || 'Name is required.'
        ],
        addressRules: [
            v => !!v || 'Address is required.'
        ],
        telRules: [
            v => !!v || 'Telephone number is required.',
            v => /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/.test(v) || 'Number should be valid.'
        ],
        emailRules: [
            v => !!v || 'Email address is required.',
            v => v.includes('@') || 'Email should include @.',
            v => v.length >= 5 || 'Email should be valid.'
        ],
        usernameRules: [
            v => !!v || 'Username is required.',
            v => v.length >= 6 || 'Username should be longer than 6 characters.'
        ],
        passwordRules: [
            v => !!v || 'Password is required.',
            v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'a lowercase letter, number and uppercase letter required.'
        ]
    }),
    methods: {
        add_user() {
            if (this.formValidity) {
                this.isError = false;
                axios.post("http://localhost:3000/register", {
                    radioSelect: this.radioGroup,
                    name: this.name,
                    address: this.address,
                    telnr: this.telnr,
                    email: this.email,
                    username: this.username,
                    password: this.password
                }).then(response => {
                    const status = response.data.status;
                    if (status === 'error') {
                        this.isError = true;
                        this.errorMsg = response.data.error;
                    } else {
                        let message = 'Successfully created an account!';
                        this.$router.replace({ name: "login", params: { message } });
                    }
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
    margin-bottom: 30px;
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
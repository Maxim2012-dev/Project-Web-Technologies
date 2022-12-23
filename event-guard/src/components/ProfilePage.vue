<template>
    <v-app>
        <v-alert class="dialog" v-if="this.isError" color="deep-purple lighten-1" type="success">{{ errorMsg }}</v-alert>
        <div class="profile_container">
            <v-row>
                <v-col class="left_section">
                    <img class="rounded-circle mt-5" width="150px" :src="getUserAvatar">
                    <span style="margin-top:30px;" class="user_info">{{ this.name }}</span>
                    <span class="user_info">{{ this.email }}</span>
                    <v-btn style="margin-top:20px;" color="deep-purple lighten-1" outlined light @click="toggle_avatar">Toggle photo</v-btn>
                </v-col>
                <v-col class="middle_section">
                    <span class="section_title">Profile Settings</span>
                    <v-form class="text_fields" v-model="formValidity">
                        <label for="name">Name</label>
                        <v-text-field id="name" label="Name" :rules="nameRules" v-model="name" solo></v-text-field>
                        <label for="telnr">Telephone number</label>
                        <v-text-field id="telnr" label="Telephone number" :rules="telRules" v-model="telnr" solo></v-text-field>
                        <label for="email">E-mail address</label>
                        <v-text-field id="email" label="E-mail address" :rules="emailRules" v-model="email" solo></v-text-field>
                        <label for="username">Username</label>
                        <v-text-field id="username" label="Username" :rules="usernameRules" v-model="username" solo></v-text-field>
                    </v-form>
                    <v-btn color="deep-purple lighten-1" class="white--text" :disabled="!formValidity"
                        depressed @click="saveProfile">Save Profile
                    </v-btn>
                </v-col>
                <v-col class="right_section">
                    <span class="section_title">My Wishlist</span>
                    <div class="products">
                        <p v-if="wishlistProducts === null"> no products added yet </p>
                        <div class="product" v-for="product in wishlistProducts" :key="product.id">
                            <h3>{{ product.product_name }}</h3>
                            <p>  company: <i>{{ product.company_name }}</i></p>
                            <p>  price:  <b> € {{ product.rent_price }} </b></p>
                        </div>
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
        startName: "",
        startTelnr: "",
        startEmail: "",
        startUsername: "",
        errorMsg: "",
        isError: false,
        formValidity: false,
        index: 0,
        srcArray: [
            'photo_1.png',
            'photo_2.png',
            'photo_3.png',
            'photo_4.png'
        ],
        wishlistProducts: null,
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
    computed: {
        getUserAvatar() {
            const avatar = this.$store.getters.getUserAvatar;
            if (avatar) {
                return require(`../assets/${avatar}`);
            } else {
                return require(`../assets/${this.srcArray[this.index%this.srcArray.length]}`);
            }
        },
        isChanged() {
            const current     = [this.name, this.telnr, this.email, this.username];
            const startValues = [this.startName, this.startTelnr, this.startEmail, this.startUsername];
            current.forEach((currentValue, index) => {
                const startValue = startValues[index];
                if (!currentValue == startValue) {
                    return true;
                }
            })
            return false;
        }
    },
    mounted() {
        const userData = this.$store.getters.getUserObject;
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
        this.getWishlistProducts(this.$store.getters.getUsername);
    },
    methods: {
        // display the data in the form fields
        displayUserInfo(userData) {
            this.name     = userData.name;
            this.telnr    = userData.telnr;
            this.email    = userData.email;
            this.username = userData.username;
        },
        getWishlistProducts(username) {
            axios.post("http://localhost:3000/getWishlistContent", {
                organizerUserName: username
            }).then(response => {
                let result = response.data.payload;
                if (result != undefined) {
                    this.wishlistProducts = result;
                } else {
                    console.log("result undefined");
                }
            })
        },
        toggle_avatar() {
            this.index = this.index + 1;
            this.$store.commit({
                type: 'set_user_avatar',
                avatar: this.srcArray[this.index]
            })
        },
        // we always update every value (not efficient)
        saveProfile() {
            axios.post("http://localhost:3000/updateOrganizer", {
                username: this.$store.getters.getUsername,
                data: [this.name, this.telnr, this.email, this.username]
            }).then(response => {
                const status = response.data.status;
                if (status === 'error') {
                    console.log("something went wrong.");
                } else {
                    // we also update the state object of the user
                    this.$store.commit({
                        type: 'update_user_object',
                        object_data: [this.name, this.telnr, this.email, this.username]
                    })
                    this.isError = true;
                    this.errorMsg = "Successfully updated profile!";
                    setTimeout(function() { this.isError = false; }.bind(this), 3000);
                }
            })
        }
    }
}
</script>

<style>
.profile_container {
    margin: auto;
    width: 80%;
    align-self: center;
    font-family: 'Ubuntu', sans-serif;
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
.user_info {
    font-size: 1.5em;
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
.products {
    margin-top: 20px;
    height: 450px;
    overflow-y: scroll;
}
.product {
    border-bottom: 2px solid gainsboro;
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
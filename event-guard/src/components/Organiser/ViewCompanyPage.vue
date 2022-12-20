<template>
    <v-app>
        <v-alert class="dialog" v-if="this.isAlert" type="success">{{ alertMsg }}</v-alert>
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">Write review</v-card-title>
                <v-card-text style="margin-top: 20px;">
                    Give a short opinion about this company/provider in terms of the experience 
                    during the interaction with this company:
                </v-card-text>
                <v-divider></v-divider>
                <div class="input_container">
                    <div class="stars">
                        <input type="radio" id="star5" v-model="rateValue" name="rate" value="5" />
                        <label for="star5" title="text">5 stars</label>
                        <input type="radio" id="star4" v-model="rateValue" name="rate" value="4" />
                        <label for="star4" title="text">4 stars</label>
                        <input type="radio" id="star3" v-model="rateValue" name="rate" value="3" />
                        <label for="star3" title="text">3 stars</label>
                        <input type="radio" id="star2" v-model="rateValue" name="rate" value="2" />
                        <label for="star2" title="text">2 stars</label>
                        <input type="radio" id="star1" v-model="rateValue" name="rate" value="1" />
                        <label for="star1" title="text">1 star</label>
                    </div>
                    <textarea id="review_text" v-model="description" maxlength="50" placeholder="enter text here...">
                    </textarea>
                </div>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text :disabled="!isFormValid" @click="save_review">Publish Review</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <h1> This is the page of {{ companyName }}</h1>
        <v-btn class="ma-2" light @click="dialog = true"><v-icon light left>mdi-text-box-edit</v-icon>Rate provider</v-btn>
    </v-app>
</template>

<!-- https://codepen.io/hesguru/pen/BaybqXv -->
<script>
import axios from "axios";
export default {
    name: 'ViewCompanyPage',
    data: () => ({
        dialog: false,
        rateValue: 0,
        description: '',
        companyName: '',
        isAlert: false,
        alertMsg: '',
        disabled: true
    }),
    mounted() {
        let nameCompany = this.$route.params.companyName;
        if (nameCompany != undefined) {
            this.companyName = nameCompany;
        }
    },
    computed: {
        isFormValid() {
            if (this.description != ''
                && this.rateValue > 0 
                && this.rateValue < 6) {
                return true;
            } else { return false; }
        },
    },
    methods: {
        save_review() {
            const date = new Date();
            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1; // Months start at 0!
            let dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            const formattedDate = dd + '/' + mm + '/' + yyyy;
            console.log(formattedDate);
            axios.post("http://localhost:3000/addReview", {
                username: this.$store.getters.getUsername,
                rating: this.rateValue,
                nameCompany: this.companyName,
                date: formattedDate,
                description: this.description
            }).then(response => {
                const status = response.data.status;
                if (status === 'success') {
                    this.dialog = false;
                    this.isAlert = true;
                    this.alertMsg = 'Your review is successfully placed!';
                    setTimeout(function() { this.isAlert = false; }.bind(this), 3000);
                } else {
                    console.log(response.data.error);
                }
            })
        }
    }
}
</script>

<style>
.input_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#review_text {
    margin-top: 20px;
    width: 70%;
    resize: none;
}
.stars {
    height: 46px;
    padding: 0 10px;
}
.stars:not(:checked) > input {
    position:absolute;
    top:-9999px;
}
.stars:not(:checked) > label {
    float:right;
    width:1em;  
    overflow:hidden;
    white-space:nowrap;
    cursor:pointer;
    font-size:30px;
    color:#ccc;
}
.stars:not(:checked) > label:before {
    content: '★ ';
}
.stars > input:checked ~ label {
    color: #ffc700;    
}

.stars:not(:checked) > label:hover,
.stars:not(:checked) > label:hover ~ label {
    color: #deb217;  
}

.stars > input:checked + label:hover,
.stars > input:checked + label:hover ~ label,
.stars > input:checked ~ label:hover,
.stars > input:checked ~ label:hover ~ label,
.stars > label:hover ~ input:checked ~ label {
    color: #c59b08;
}
</style>
<template>
    <v-app>
        <v-alert class="dialog" v-if="this.isAlert" type="success">{{ alertMsg }}</v-alert>
        <v-dialog class="ratings" v-model="dialog" width="500">
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
          <div class="companyText">
             <h1> {{ companyName }}</h1>
             <h3> {{ companyEmail }}</h3>
             <h3> {{ companyTelnr }}</h3>
          </div>
        <ul>
          <section class="reviewContainer">
             <h3> Reviews </h3>
             <v-btn class="ma-2" light @click="dialog = true"><v-icon light left>mdi-text-box-edit</v-icon>Rate provider</v-btn>
             <section class="scrollMenu">
             <div v-for="review in reviews" :key="review.id" class="article">
               <putreview :review="review"></putreview>
             </div>
            </section>
          </section>
          <section class="articlesContainer">
             <h2 style="padding:0 250px 20px; font-size: 30px;"> Articles </h2>
             <section class="scrollMenu">
             <div v-for="product in products" :key="product.id" class="article">
                <article>
                    <router-link :to="{ name: 'ArticleDetails', params: { id: product.id }}">
                        <h3>{{ product.name }}</h3>
                        <b> € {{ product.price }}</b>
                        <p>{{ product.shortDescription }} </p>
                    </router-link>
                    <v-btn color="deep-purple lighten-1" text @click="add_to_wishlist(product)">Add to wishlist</v-btn>
                </article>
             </div>
            </section>
          </section>
        </ul>
    </v-app>
</template>

<!-- https://codepen.io/hesguru/pen/BaybqXv -->
<script>
import axios from "axios";
import Putreview from "./RatingTemplate.vue"
export default {
    name: 'ViewCompanyPage',
    components: {  Putreview },
    data: () => ({
        dialog: false,
        rateValue: 0,
        description: '',
        companyName: 'Scouts Brussel',
        companyEmail: 'Scoutsbrussel@gmail.com',
        companyTelnr: '0480827921',
        isAlert: false,
        alertMsg: '',
        disabled: true,
        search: " ",
            products: [
              { id: 1, name: "Schop", shortDescription: "stevige schop in goede staat", price: 15.00, ammount: 1, organisation: "Scouts Brussel"},
              { id: 2, name: "Koelkast", shortDescription: "goedwerkende koelkast met vriesvak", price: 30.00, ammount: 1, organisation: "Scouts Brussel"},
              { id: 3, name: "Sjorbalk", shortDescription: "8 meter sjorbalken", price: 20.00, ammount: 30, organisation: "Scouts Brussel"},
              { id: 4, name: "Kookpot", shortDescription: "propere, grote kookpotten met deksel", price: 20.00, ammount: 3, organisation: "Scouts Brussel"},
              { id: 5, name: "Koelkast", shortDescription: "energiezuinige koelkasten met wieltjes", price: 35.00, ammount: 2, organisation: "Scouts Brussel"}
            ],
            reviews: [
                {id: 1, username: "Kwinten", rating: 5, date: "20/12/2022", description: "Goede service!"},
                {id: 2, username: "Kwinten", rating: 5, date: "20/12/2022", description: "Goede service!"},
                {id: 3, username: "Kwinten", rating: 5, date: "20/12/2022", description: "Goede service!"},
                {id: 4, username: "Kwinten", rating: 5, date: "20/12/2022", description: "Goed service!"},
                {id: 5, username: "Kwinten", rating: 5, date: "20/12/2022", description: "Goed service!"}
            ]

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
        },
        add_to_wishlist(product) {
            axios.post("http://localhost:3000/addToWishlist", {
                organizerUserName: this.$store.getters.getUsername,
                product_name: product.name,
                company_name: this.companyName,
                description: product.description,
                rent_price: product.price
            }).then(response => {
                let result = response.data.payload;
                if (result != undefined) {
                    console.log("error - sa");
                }
            })
        }
    }
}
</script>

<style>

.companyText{
    padding: 30px 50px;
}

.ratings{
    width: 20%;
}

.reviewContainer{
    margin: 50px 100px 0 150px;
    width: 20%;
    float: right;

}

.articlesContainer{
    float: right;
    width: 650px;
    background: #fff;

}

.scrollMenu{
    height: 500px;
    overflow-y: scroll;
}

.scrollMenu::-webkit-scrollbar {
    display: none;
}
  
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

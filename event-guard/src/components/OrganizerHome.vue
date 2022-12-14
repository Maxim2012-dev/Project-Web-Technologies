<template>
    <v-app>
        <div class="start_message">
            <h1>Hi <i>{{ organizerName }}</i></h1>
        </div>
        <div class="search_box">
            <input type="text" placeholder="search for equipment, companies, ..." v-model="searchInput"
                @keyup="getCompanies">
            <button type="submit" class="search_button">Search</button>
        </div>
        <div class="cards">
            <v-card v-for="result of this.searchResults" :key="result.id">
                <v-img src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
                <v-card-title>{{ result.name }}</v-card-title>
                <v-card-text>
                    <v-row class="mx-0">
                        <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>
                        <div class="grey--text ms-4">
                            4.5 (413)
                        </div>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="red lighten-1" text>
                        View Company
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </v-app>
</template>
    
<script>
import axios from "axios";
export default {
    name: 'OrganizerHome',
    data: () => ({
        organizerName: "",
        searchInput: "",
        searchResults: false
    }),
    mounted() {
        // username from login page
        let displayName = this.$route.params.username;
        if (displayName != undefined) {
            this.organizerName = displayName;
        } else {
        // username from central store
            this.organizerName = this.$store.getters.getUsername;
        }
    },
    methods: {
        getCompanies() {
            axios.post("http://localhost:3000/getCompanies", {
                keyValue: this.searchInput
            }).then(response => {
                // response might be array of search results
                let results = response.data.payload;
                if (results != null) {
                    this.searchResults = results;
                }
            })
        }
    }
}
</script>

<style>
.start_message {
    margin-top: 50px;
    display: flex;
    justify-content: center;
}

.search_box {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}

.search_box input {
    width: 60%;
    padding: 15px;
    border: 1px solid black;
}

.search_box button {
    padding: 10px;
    outline: none;
    border: none;
    color: #fff;
    background: tomato;
}
.cards {
    margin: 50px auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}
</style>
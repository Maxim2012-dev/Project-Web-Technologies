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
        <v-card>
        <v-card-text>
      <v-row
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">
          4.5 (413)
        </div>
      </v-row>

    </v-card-text>
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
        searchInput: ""
    }),
    mounted() {
        let displayName = this.$route.params.username;
        if (displayName != undefined) {
            this.organizerName = displayName;
        }
    },
    methods: {
        getCompanies() {
            axios.post("http://localhost:3000/getCompanies", {
                keyValue: this.searchInput
            }).then(response => {
                console.log("test");
                console.log(response.data.payload)
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
        width: 5%;
        padding: 10px;
        outline: none;
        border: none;
        color: #fff;
        background: tomato;
    }
    .search_box .fa-duotone {
        align-self: center;
        padding: 10px 20px;
    }
</style>
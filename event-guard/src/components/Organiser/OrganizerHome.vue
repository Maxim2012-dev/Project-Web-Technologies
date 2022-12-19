<template>
    <v-app>
        <div class="start_message">
            <h1>Welcome back  <i>{{ organizerUsername }}</i></h1>
        </div>
        <div class="map_section">
            <l-map id="map_component" :zoom="zoom" :center="center" @ready="onReady" ref="map" @locationfound="onLocationFound">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-circle-marker v-if="location" :lat-lng="location.latlng" :radius="10" />
                <l-marker v-for="marker of this.markers" :lat-lng="marker" :key="marker.id"></l-marker>
            </l-map>
            <div class="text">
                If you don't want to travel too far, then you can view various providers nearby you...
            </div>
        </div>
        <div class="search_container">
            <h3 id="subtitle"> Looking for a specific equipment provider? Look it up here.</h3>
            <input type="text" id="search_box" placeholder="search for companies..." v-model="searchInput" @keyup="getCompanies">
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
        </div>
    </v-app>
</template>
    
<script>
import axios from "axios";
import L from 'leaflet';
import { LMap, LTileLayer, LCircleMarker, LMarker } from 'vue2-leaflet';
export default {
    name: 'OrganizerHome',
    components: {
        LMap,
        LTileLayer,
        LCircleMarker,
        LMarker
    },
    data: () => ({
        map: null,
        location: null,
        geocoder: null,
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        zoom: 12,
        center: [50.0, 50.0],
        markers: [],
        organizerUsername: "",
        searchInput: "",
        searchResults: false
    }),
    mounted() {
        this.geocodeCompanyAddresses();
        // username from login page
        // --> if we navigate from the login page to this page
        let displayName = this.$route.params.username;
        if (displayName != undefined) {
            this.organizerUsername = displayName;
        } else {
        // username from central store
        // --> if we navigate from another page to this page
            this.organizerUsername = this.$store.getters.getUsername;
        }
    },
    methods: {
        onReady() {
            this.map = this.$refs["map"].mapObject;
            this.map.locate();
        },
        onLocationFound(l) {
            this.location = l;
            this.center = l.latlng;
        },
        add_marker(location) {
            this.markers.push(new L.LatLng(location[0].lat, location[0].lon));
        },
        geocodeCompanyAddresses() {
            const Nominatim = require('nominatim-geocoder');
            const geocoder = new Nominatim();
            axios.get("http://localhost:3000/getAllCompanyAddresses")
            .then(response => {
                let results = response.data.payload;
                if (results != null) {
                    const addresses = results.map(company => company.address);
                    addresses.forEach(address => 
                        geocoder.search( { q: address } )
                            .then((response) => {
                                this.add_marker(response);
                            })
                            .catch((error) => {
                                console.log(error)
                            }));
                }
            })
        },
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
    flex-direction: column;
    align-items: center;
}

.map_section {
    display: flex;
    justify-content: center;
    align-self: center;
    padding-top: 80px;
    margin: 60px 0px 80px;
    width: 80%;
    border-top: 3px solid gainsboro;
}

#map_component {
    width: 400px;
    height: 350px;
    margin-right: 50px;
    border: 2px dotted black;
}


#subtitle {
    margin-top: 30px;
    color: gray;
}

.search_container {
    background-color: gainsboro;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#search_box {
    width: 70%;
    margin-top: 30px;
    padding: 15px;
    border: 1px solid black;
}

.cards {
    margin: 60px auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}
</style>
<template>
    <v-app>
        <div class="start_message">
            <h1>Welcome back  <i>{{ organizerUsername }}</i></h1>
        </div>
        <div class="map_section">
            <l-map id="map_component" :zoom="zoom" :center="center" @ready="onReady" ref="map" @locationfound="onLocationFound">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-circle-marker v-if="location" :lat-lng="location.latlng" :radius="10" />
                <l-marker v-for="marker of this.markers" :lat-lng="marker.latLng"
                     @click="view_company_page(marker.name)" :key="marker.id">
                    <l-tooltip>{{ marker.name }} <br> {{ marker.companyAddress }}</l-tooltip>
                </l-marker>
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
                        <v-btn color="red lighten-1" text @click="view_company_page(result.name)">
                            View Company
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
        <div class="review_container">
            <h3 id="subtitle"> Checkout the latest reviews here </h3>
            <div class="reviews">
                <v-card style="margin-top:40px;" v-for="review of this.reviews" :key="review.id">
                    <v-card-title> from: <b>{{ review.username }}</b></v-card-title>
                    <v-card-text>
                        <div class="review_details">
                            <span> company: <b>{{ review.nameCompany }}</b></span>
                            <span>{{ review.date }}</span>
                        </div>
                        <v-row class="mx-0">
                            <v-rating id="stars" :value=review.rating color="amber" readonly size="20"></v-rating>
                        </v-row>
                        <span id="review_description">{{ review.description }}</span>
                    </v-card-text>
                </v-card>
            </div>
        </div>
    </v-app>
</template>
    
<script>
import axios from "axios";
import L from 'leaflet';
import { LMap, LTileLayer, LCircleMarker, LMarker, LTooltip } from 'vue2-leaflet';
import { Icon } from 'leaflet';

// For missing marker icon error
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
    name: 'OrganizerHome',
    components: {
        LMap,
        LTileLayer,
        LCircleMarker,
        LMarker,
        LTooltip
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
        reviews: false,
        organizerUsername: "",
        searchInput: "",
        searchResults: false
    }),
    mounted() {
        this.geocodeCompanyAddresses();
        this.loadReviews();
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
        add_marker(location, companyName, address) {
            this.markers.push({
                latLng: new L.LatLng(location[0].lat, location[0].lon),
                name: companyName,
                companyAddress: address});
        },
        geocodeCompanyAddresses() {
            const Nominatim = require('nominatim-geocoder');
            const geocoder = new Nominatim();
            axios.get("http://localhost:3000/getAllCompanyAddresses")
            .then(response => {
                let results = response.data.payload;
                if (results != null) {
                    results.forEach(entry => 
                        geocoder.search( { q: entry.address } )
                            .then((response) => {
                                this.add_marker(response, entry.name, entry.address);
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
        },
        loadReviews() {
            // loads the reviews from database
            axios.get("http://localhost:3000/getReviews", {
            }).then(response => {
                let results = response.data.payload;
                if (results != null) {
                    this.reviews = results;
                }
            })
        },
        view_company_page(name) {
            this.$router.push({ name: "companyView", params: { companyName: name } })
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
    font-family: 'Ubuntu', sans-serif;;
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
    border: 5px dotted #EDE7F6;
}


#subtitle {
    margin-top: 30px;
    color: gray;
}

.search_container {
    background-color: #EDE7F6;
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

.review_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50%;
}

.reviews {
    margin-top: 30px;
    margin-bottom: 30px;
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.review_details {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: 'Ubuntu', sans-serif;
}

#stars {
    margin: 30px;
}

#review_description {
    display: block;
    margin: 10px;
    padding: 5px;
    border: 1px solid gainsboro;
}
</style>
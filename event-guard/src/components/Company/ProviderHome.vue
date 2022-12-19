<template>
    <v-app>
     <div class="options">
        <h1>What do you want to do?</h1>
        <button class="option_container" @click="navigate_to_my_articles">
            <p class="option_text">View my articles/products</p>
            <v-icon x-large light>mdi-chevron-right</v-icon>
        </button>
     </div>
    </v-app>
</template>
    
<script>
export default {
    name: 'ProviderHome',
    methods: {
        navigate_to_my_articles() {
            this.$router.push('MyArticles');
        }
    }
}
</script>

<style>
    .options {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        font-family: 'Ubuntu', sans-serif;
        align-items: center;
    }
    .option_container {
        margin-top: 50px;
        width: 80%;
        padding: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border: 1px solid black;
    }
    .option_container:hover {
        opacity: 0.4
    }
    .option_text {
        font-weight: light;
        font-size: 2vw;
    }
</style>
<template>
    <v-app>
        <article>
            <router-link :to="{ name: 'ArticleDetails', params: { id: product.id }}">
                <h3>{{ product.name }}</h3>
                <b> € {{ product.price }}</b>
                <p>{{ product.shortDescription }} </p>
            </router-link>
            <v-btn class="addBtn" color="deep-purple lighten-1" text @click="add_to_wishlist">Add to wishlist</v-btn>
        </article>
    </v-app>
</template>

<script>
export default {
    name: 'ArticleDetails',
    props: ["product", "companyName"]
}
</script>


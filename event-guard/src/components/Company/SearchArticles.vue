<template>
    <article>
      <router-link :to="{ name: 'ArticleDetails', params: { id: product.id }}">
         <h3>{{ product.name }}</h3>
         <b> € {{ product.price }}</b>
         <p>{{ product.shortDescription }} </p>
        </router-link>
    </article>
</template>

<script>
export default {
 props: ["product"]
}
</script>


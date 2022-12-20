<template>
    <review>
         <h4>{{ review.description }}</h4>
         <b> Rating: {{ review.rating }} stars</b>
         <p>{{ review.date }} by {{  review.username }}</p>
    </review>
</template>

<script>
export default {
 props: ["review"]
}
</script>


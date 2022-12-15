<template>
  <h1>Article Details</h1>
  <h4> Product-ID is {{ this.productId }}</h4>
  <img src="../assets/koelkast.jpg" alt="koelkast" max-width="500" max-height="500">
  <h2> € 30.00 </h2>
  <h3> goedwerkende koelkast met vriesvak </h3>
  <div id="ammountContainer">
    <button v-on:click="decrementCounter" id="decrement">-</button>
    <div id="number">{{ count }}</div>
    <button v-on:click="incrementCounter" id="increment">+</button>
  </div>
  <button id="orderButton"> Add to shopping cart </button> 

</template>

<script>
export default {
 data() { 
   return {
     productId:this.$route.params.id,
     count: 0
   } 
 },
 methods: {
   incrementCounter: function() {
    //if(this.ammount > this.count){
     this.count +=1;
    },
   decrementCounter: function() {
     if(this.count > 0){
       this.count -=1;
     }
   }
 }
}

</script>

<style>
#ammountContainer{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  align-self: center;
}

#number {
  height: 25px;
  width: 75px;
  border: 1px solid black;
  text-align: center;
  background-color: white;
  margin: 0 5px;
}

#increment{
  height: 27px;
  width: 100px;

}

#decrement{
  height: 27px;
  width: 100px;
 
}

#orderButton{
  margin: 12px;
  height: 30px;
  width: 150px;
}
</style>
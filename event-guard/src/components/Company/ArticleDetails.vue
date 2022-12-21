<template>
  <v-app>
    <div class="detailsCont">
    <h1>Article Details</h1>
    <main>
    <img src="../../assets/koelkast.jpg" alt="koelkast" style="width:100%; max-width:500px;">
    <div class="details">
    <h2 class="detail"> € 30.00 </h2>
    <h3 class="detail"> goedwerkende koelkast met vriesvak </h3>
    <button class="filter"> Add to shopping cart </button>
  </div>
  </main>
  </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      productId: this.$route.params.id,
    }
  },
  methods: {
    incrementCounter: function () {
      //if(this.ammount > this.count){
      this.count += 1;
    },
    decrementCounter: function () {
      if (this.count > 0) {
        this.count -= 1;
      }
    }
  }
}

</script>

<style>
#orderButton {
  margin: 12px;
  height: 30px;
  width: 150px;
}

.detailsCont{
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
}

main{ 
  flex-direction: row;
  padding: 3em 3em;
  display: flex;
  flex: 1;
  justify-content: center;
  margin: 30px 30px;

}

.details {
  flex-direction: column;
  padding: 60px;
}

.detail {
  padding-bottom: 50px;
}
</style>

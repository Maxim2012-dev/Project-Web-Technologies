<template>
  <div style="font-family: 'Ubuntu', sans-serif;">
  <h1 style="text-align: center; margin: 30px;"> Add article to product range</h1>
  <v-row justify="center">
  <v-col cols="12" class="articleForm">
    <v-card ref="form">
      <v-card-text>
        <v-text-field
          ref="name"
          v-model="name"
          :rules="[() => !!name || 'This field is required']"
          label="Article name"
          placeholder="Bosch KGE49AICA Fridge"
          required
        ></v-text-field>
        <v-text-field
          ref="description"
          v-model="description"
          :rules="[
            () => !!description || 'This field is required']"
          label="Description"
          placeholder="Good-working fridge on weels with a freezer compartement"
          required
        ></v-text-field>
        <v-text-field
          ref="price"
          v-model="price"
          :rules="[() => !!price || 'This field is required']"
          label="Rent price"
          prefix="€"
          placeholder="10.00"
          required
        ></v-text-field>
        <v-text-field
          ref="details"
          v-model="details"
          :rules="[() => !!details || 'This field is required']"
          label="Details product"
          required
          placeholder="Weight, size, features, etc."
        ></v-text-field>
      </v-card-text>
      <v-card-actions class=" articleButtons">
        <input style="display: none" type="file" @change="onFileSelected" ref="fileInput">
        <v-btn class="filter" color="deep-purple lighten-1" outlined style="margin-bottom: 50px; align-self: flex-start;" 
          @click="$refs.fileInput.click()"> Click to choose photo article</v-btn>
        <v-slide-x-reverse-transition>
        </v-slide-x-reverse-transition>
        <v-btn color="deep-purple lighten-1" @click="add_product">add new article</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</v-row>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: 'ProductForm',
  data: () => ({
      name: "",
      description: "",
      price: "",
      details: "",
      selectedFile: null,
      tempKeyword: "",
      keywords: [],
      errorMsg: "",
      formValidity: false,
      isError: false,
      Rules: [
          v => !!v || 'this field is required.'
      ]
  }),
  methods: {
      add_product() {
          //if (this.formValidity) {
              this.isError = false;
              axios.post("http://localhost:3000/addProduct", {
                  product_name: this.name,
                  company_name: this.$store.getters.getUsername,
                  description: this.description,
                  rent_price: this.price,
              }).then(response => {
                  const status = response.data.status;
                  if (status === 'error') {
                      this.isError = true;
                      this.errorMsg = response.data.error;
                      setTimeout(function() { this.isError = false; }.bind(this), 3000);
                  } else {
                      let message = 'Successfully added an article!';
                      this.$router.replace({ name: "MyArticles", params: { message } });
                  }
              })
          //}
      },
      onFileSelected(event){
        this.selectedFile = event.target.files[0]
      }
  }
}
</script>

<style>

.articleButtons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}

.articleForm {
  padding: 100px;
}
</style>
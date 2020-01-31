<template>
  <div class="container">
    <br />
    <h5>My   Favorite   Books</h5>
    <ul v-if="myFavoritesList.length" class="list-group list-group-flush">
      <li class="list-group-item" v-for="(book,index) in myFavoritesList">
          <span><img :src="book.data.imageLink" style="width:70px; height:80px"/></span>
        <span>{{book.data.bookTitle}}</span>
        <button
          class="btn btn-danger"
          @click="removeFromFavorites(book.data,book.key,index)"
        >X</button>
      </li>
    </ul>
    <p v-else>Nothing to show</p>
    <br />
    <h5>I will read..</h5>
    <ul v-if="myWillReadList.length" class="list-group list-group-flush">
      <li class="list-group-item" v-for="(book,index) in myWillReadList">
          <span><img :src="book.data.imageLink" style="width:70px; height:80px"/></span>
        <span>{{book.data.bookTitle}}</span>
        <button
          class="btn btn-xs btn-danger"
          @click="removeFromWillRead(book.data,book.key,index)"
        >x</button>
      </li>
    </ul>
    <p v-else>Nothing to show</p>
    <br />
    <h5>I already read</h5>
    <ul v-if="myAlreadyReadList.length" class="list-group list-group-flush">
      <li class="list-group-item" v-for="(book,index) in myAlreadyReadList">
          <span><img :src="book.data.imageLink" style="width:70px; height:80px"/></span>
        <span>{{book.data.bookTitle}}</span>
        <button
          class="btn btn-xs btn-danger"
          @click="removeFromAlreadyRead(book.data,book.key,index)"
        >x</button>
      </li>
    </ul>
    <p v-else>Nothing to show</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import config from "../../config";
export default {
  data() {
    return {
      myFavoritesList: [],
      myWillReadList: [],
      myAlreadyReadList: []
    };
  },
  created() {
    console.log("this.getIsGoogleUser : " + this.getIsGoogleUser);
    if (this.getIsGoogleUser) {
      axios({
        method: "get",
        url:
          "https://www.googleapis.com/books/v1/users/" +
          localStorage.getItem("userID") +
          "/bookshelves",
        params: {
          key: config.api_key,
          format: "json",
          maxResults: 40
        }
      }).then(response => {
        console.log("response");
        console.log(response);
        /*let data = response.data;
        console.log(data);
        //console.log(data.items.length);
        this.bookList = data.items;*/
      });
    } else {
      axios({
        method: "get",
        url:
          'https://vue-book-finder.firebaseio.com/books.json?orderBy="userID"&equalTo="' +
          localStorage.getItem("userID") +
          '"'
      }).then(response => {
        console.log(response);
        console.log(response.data);
        for (let key in response.data) {
          if (response.data[key].favorite) {
            this.myFavoritesList.push({
              key: key,
              data: response.data[key]
            });
          }
          if (response.data[key].alreadyRead) {
            this.myAlreadyReadList.push({
              key: key,
              data: response.data[key]
            });
          }
          if (response.data[key].willRead) {
            this.myWillReadList.push({
              key: key,
              data: response.data[key]
            });
          }
        }
      });
    }
  },
  methods: {
    removeFromFavorites(bookData, key, index) {
      console.log("removing from favorites");
      bookData.favorite = false;
      this.remove(bookData, key, index);
      this.myFavoritesList.splice(index);
    },
    removeFromWillRead(bookData, key, index) {
      bookData.willRead = false;
      this.remove(bookData, key, index);
      this.myWillReadList.splice(index);
    },
    removeFromAlreadyRead(bookData, key, index) {
      bookData.alreadyRead = false;
      this.remove(bookData, key, index);
      this.myAlreadyReadList.splice(index);
    },
    remove(bookData, key, index) {
        console.log("bookData");
        console.log(bookData);
      this.$store.state.bookKeyForDeletion = key;
      if (!bookData.favorite && !bookData.willRead && !bookData.alreadyRead) {
        this.$store.dispatch("removeFromDB", key).then(response => {});
      } else {
        this.$store.dispatch("updateDB", bookData).then(response => {});
      }
    }
  },
  computed: mapGetters([
    "getUserName", //114243825253561293087
    "getIsGoogleUser"
  ])
};
</script>
<style scoped>
h5{
    font-family: 'Italianno', cursive;
    font-size: 65px;
    background-color:rgb(252, 236, 236);
    border-radius: 15px;
}
</style>
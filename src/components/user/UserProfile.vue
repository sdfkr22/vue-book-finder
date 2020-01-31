<template>
  <div class="container-fluid">
    <br />
    <h5>My Favorite Books</h5>
    <ul v-if="myFavoritesList" class="list-group">
      <li class="list-group-item" v-for="(book,index) in myFavoritesList">
        <span>{{book.data.bookTitle}}</span>
        <button
          class="btn btn-xs btn-danger"
          @click="removeFromFavorites(book.data,book.key,index)"
        >x</button>
      </li>
    </ul>
    <p v-else> none </p>
<br>
    <h5>I will read..</h5>
    <ul v-if="myWillReadList" class="list-group">
      <li class="list-group-item" v-for="(book,index) in myWillReadList">
        <span>{{book.data.bookTitle}}</span>
        <button
          class="btn btn-xs btn-danger"
          @click="removeFromWillRead(book.data,book.key,index)"
        >x</button>
      </li>
    </ul>
    <p v-else> none </p>
<br>
    <h5>I already read</h5>
    <ul v-if="myAlreadyReadList" class="list-group">
      <li class="list-group-item" v-for="(book,index) in myAlreadyReadList">
        <span>{{book.data.bookTitle}}</span>
        <button
          class="btn btn-xs btn-danger"
          @click="removeFromAlreadyRead(book.data,book.key,index)"
        >x</button>
      </li>
    </ul>
    <p v-else> none </p>
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
      this.myFavoritesList = this.get("favorite")
      this.myWillReadList = this.get("willRead")
      this.myAlreadyReadList = this.get("alreadyRead")
    }
  },
  methods: {
      get(value, list){
          var list=[];
          axios({
        method: "get",
        url:
          'https://vue-book-finder.firebaseio.com/books.json?orderBy="userID"&equalTo="' +
          localStorage.getItem("userID") +
          '"&orderBy="'+value+'"&equalTo=true'
      }).then(response => {
        console.log(response);
        console.log(response.data);
        for (let key in response.data) {
              list.push({
            key: key,
            data: response.data[key]
          });
          
          
        }

      });

      return list;
      },
    removeFromFavorites(bookData, key, index) {
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
        this.$store.state.bookKeyForDeletion = key;
      if (!bookData.favorite && !bookData.willRead && !bookData.alreadyRead) {
        this.$store.dispatch("removeFromDB", key).then(response => {
        });
      } else {
        this.$store.dispatch("updateDB", bookData).then(response => {
        });
      }
    }
  },
  computed: mapGetters([
    "getUserName", //114243825253561293087
    "getIsGoogleUser"
  ])
};
</script>
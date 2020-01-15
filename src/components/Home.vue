<template>
  <div class="container-fluid">
    <br>
    <br>
    <p v-if="getUserName">Welcome {{getUserName}}</p>
  <div class="finder">
     <h1 class="display-4 text-center">Book Finder</h1>
    <br>
    <div class="input-group mb-3">
      <input type="text" v-model="searchKey" class="form-control" placeholder="Enter book title, author" aria-label="Recipient's username" aria-describedby="button-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="search">Search</button>
      </div>
    </div>
</div>
    <div class="text-center">
  <div class="spinner-border text-info" role="status" v-if="isClicked">
    <span class="sr-only">Loading...</span>
  </div>
</div>

<div class="row">
  <app-book-card @data="childData = $event" class="col-lg-3" v-for="book in bookList" :key="book.id" :book="book"/>
  
  </div>

<!-- Modal -->
  <app-modal :bookData="childData"></app-modal>
  
   
  </div>
</template>

<script>
import config from '../config'
import axios from 'axios'
import BookCard from './BookCard'
import Modal from './Modal'
import {mapGetters} from 'vuex'


export default {
  data(){
    return{
      searchKey: "",
      bookList: [],
      childData : "",
      isClicked: false,
      show:true,
    }
  },
  computed: mapGetters([
    'getUserName',
    'getIsLoginSuccess'
  ]),

  components : {
    appBookCard : BookCard,
    appModal : Modal,
  },

  

  created() {
    this.isClicked = false;
    this.show=true;
    this.searchKey= "";
    console.log("created");
  },

  
  methods:{
    search(){
      this.show=false;
      this.isClicked=true;
      console.log("book title : " + this.searchKey+" searching...");
      axios({
        method: 'get',
        url: 'https://www.googleapis.com/books/v1/volumes?q='+this.searchKey,
        params:{
          api_key: config.api_key,
          format: 'json',
          maxResults: 40
        }
      }).then((response) =>{
        this.isClicked = false;
        console.log("response");
        console.log(response);
        let data = response.data;
        console.log(data);
        //console.log(data.items.length);
        this.bookList = data.items;
      
      });
      
    },
    searchForAuthor(author){
      author=this.combine(author);
      console.log("search for author.. author : "+author);
      this.searchKey = author;

       axios({
        method: 'get',
        url: 'https://www.googleapis.com/books/v1/volumes?q=inauthor:'+author,
        params:{
          api_key: config.api_key,
          format: 'json',
          maxResults: 40
        }
      }).then((response) =>{
        this.isClicked = false;
        console.log("response for author");
        console.log(response);
        let data = response.data;
        console.log(data);
        console.log(data.items.length);
        this.bookList = data.items;
      
      });

    },
    searchByCategory(category){
      category=this.combine(category);
      console.log("search for category.. category : "+category);
      this.searchKey = category;

       axios({
        method: 'get',
        url: 'https://www.googleapis.com/books/v1/volumes?q=subject:'+category,
        params:{
          api_key: config.api_key,
          format: 'json',
          maxResults: 40
        }
      }).then((response) =>{
        this.isClicked = false;
        console.log("response for category");
        console.log(response);
        let data = response.data;
        console.log(data);
        console.log(data.items.length);
        this.bookList = data.items;
      
      });
    },
    combine(string){
      return string.split(' ').join('+');
    }
  }
}
</script>

<style>
</style>

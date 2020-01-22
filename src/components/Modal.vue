<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header text-center">
                    <h5 class="modal-title w-100" id="exampleModalLabel">{{bookData.title}} <small v-show="bookData.subtitle" class="text-muted">  -{{bookData.subtitle}}</small></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body row">
                <div class="col-md-4">
                    <img v-if="bookData.thumbnail" :src="bookData.thumbnail" class="card-img" :alt="bookData.title">
                    <img v-else src="http://pspa.com.pl/assets/themes/consultix/images/no-image-found-360x260.png"  class="card-img" :alt="bookData.title">
                    <br>
                    <br>
                    <p class="icons"  @click="isClickedAsFavorite = !isClickedAsFavorite" ><span class="fa fa-heart" :style="isClickedAsFavorite ? 'color : red;' : 'color : black;'"></span>  Add Favorites  </p>
                    <p class="icons" @click="isClickedAsWillRead = !isClickedAsWillRead" ><span class="fa fa-book" :style="isClickedAsWillRead ? 'color : yellow;' : 'color : black;'"></span>  Will read  </p>
                    <p class="icons" @click="isClickedAsAlreadyRead = !isClickedAsAlreadyRead" ><span class="fa fa-check-square" :style="isClickedAsAlreadyRead ? 'color : green;' : 'color : black;'"></span>  Already Read  </p>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <div v-if="bookData.authors">
                      <div v-for="author in bookData.authors" v-bind:key="author">
                        <p class="author card-text" @click="searchForAuthor(author)" data-dismiss="modal">{{author}}</p>
                      </div>
                      </div>
                      <p v-else class="nothing">Author unknown</p>
                        <hr>
                      <p v-if="bookData.description"><em>{{bookData.description}}</em></p>
                      <p v-else class="nothing">No description</p>
                      <hr>
                      <div v-if="bookData.categories">
                      <div v-for="category in bookData.categories" v-bind:key="category" @click="searchByCategory(category)" data-dismiss="modal">
                        <p class="category card-text">#{{category}} </p>
                      </div>
                      </div>
                      <p v-else class="nothing">Not categorized</p>
                      <hr>
                      <div v-if="bookData.averageRating>0">
                        <span class="fa fa-star" :class="bookData.averageRating>=1 ? 'checked' : ''"></span>
                        <span class="fa fa-star" :class="bookData.averageRating>=2 ? 'checked' : ''"></span>
                        <span class="fa fa-star" :class="bookData.averageRating>=3 ? 'checked' : ''"></span>
                        <span class="fa fa-star" :class="bookData.averageRating>=4 ? 'checked' : ''"></span>
                        <span class="fa fa-star" :class="bookData.averageRating>=5 ? 'checked' : ''"></span>
                        <span>  {{bookData.averageRating}}/5  ({{bookData.ratingsCount}} rates)</span>
                      </div>
                      <p v-else class="nothing">Not rated yet</p>
                      <hr>
                      <p>{{bookData.language | getLang}}<span v-if="bookData.pageCount"> - {{bookData.pageCount}} page</span></p>
                      <hr>
                      <p><small class="text-muted">{{bookData.publisher}} / {{bookData.publishedDate}}</small></p>
                      <hr>
                      <p><a :href="bookData.previewLink" target="_blank">Click for preview of book</a></p>
                      <p><a :href="bookData.infoLink" target="_blank">Click for the more information</a></p>

                    </div>
                </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {isoLangs} from '../languages';

export default {
    data(){
    return{
      isoLangs,
      isClickedAsFavorite : false,
      isClickedAsAlreadyRead: false,
      isClickedAsWillRead: false,
    }
  },

    props:['bookData'],
    methods:{
        searchForAuthor(author){
            this.$parent.searchForAuthor(author);
        },
        searchByCategory(category){
            this.$parent.searchByCategory(category);
        }
    },
    filters : {
    getLang(lang){
      var index=isoLangs.findIndex(o => o.code === lang);

      if(index>=0 && index<isoLangs.length)
       return isoLangs[index].name;

      return "";
    }
  },

}
</script>

<style>
.author{
  text-transform: uppercase;

}
.author:hover{
  color: blue;
  cursor: pointer;
  
}

.category{
  background-color:#D5F5E3;
  width: fit-content;
}

.category:hover{
  background-color:#82E0AA;
  cursor: pointer;
}

.checked {
  color: orange;
}

.card-img{
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.nothing{
    font-family: 'Raleway Dots', cursive;
}

.icons{
  cursor: pointer;
  font-size: 12px;
}

.icons :hover{

}
</style>
<template>
    <div class="container-fluid">
        <div class="card mb-3" style="max-width: 540px; background-color:#ECEFEF">
            <div class="row no-gutters" data-toggle="modal" data-target="#exampleModal" @click="sendBook(book)" style="margin:10px">
                <div class="col-md-4">
                    <img v-if="book.volumeInfo.imageLinks" :src="book.volumeInfo.imageLinks.thumbnail" class="card-img" :alt="book.volumeInfo.title">
                    <img v-else src="http://pspa.com.pl/assets/themes/consultix/images/no-image-found-360x260.png" class="card-img" :alt="book.title">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{book.volumeInfo.title}}</h5>
                        <div v-for="author in book.volumeInfo.authors" v-bind:key="author">
                           <p class="card-text">- {{author}}</p>
                        </div>
                        
                        <p class="card-text"><small class="text-muted">Published Date: {{book.volumeInfo.publishedDate}}</small></p>
                    </div>
                </div>
            </div>
        </div>

</div>

</template>

<script>
export default {
    data(){
        return{
            isDetailed:false,
            selectedBook : {
                title:"",
                subtitle:"",
                authors:"",
                thumbnail:"",
                publishedDate:"",
                description:"",
                categories:"",
                averageRating:"",
                ratingsCount:"",
                pageCount:"",
                infoLink:"",
                publisher:"",
                previewLink:"",
                language:"",

            },
        }
        
    },
    props:['book'],
    filters : {

        getCategories(categories){
            if(categories)
                return categories.join(" - ");
            return "";
        }
    },
    methods : {
        sendBook(book){
            this.selectedBook.title = book.volumeInfo.title;
            this.selectedBook.subtitle = book.volumeInfo.subtitle;
            this.selectedBook.authors = book.volumeInfo.authors;
            if(book.volumeInfo.imageLinks)
            this.selectedBook.thumbnail = book.volumeInfo.imageLinks.thumbnail;
            this.selectedBook.publishedDate = book.volumeInfo.publishedDate;
            this.selectedBook.description=book.volumeInfo.description;
            this.selectedBook.categories = book.volumeInfo.categories;
            this.selectedBook.averageRating = book.volumeInfo.averageRating;
            this.selectedBook.ratingsCount = book.volumeInfo.ratingsCount;
            this.selectedBook.pageCount = book.volumeInfo.pageCount;
            this.selectedBook.infoLink = book.volumeInfo.infoLink;
            this.selectedBook.previewLink = book.volumeInfo.previewLink;
            this.selectedBook.publisher = book.volumeInfo.publisher;
            this.selectedBook.language = book.volumeInfo.language;

            this.$emit("data", this.selectedBook);
        }
    }

}
</script>

<style>

img{
    padding: 10px;
}
.no-gutters{
    cursor: pointer;
}

</style>
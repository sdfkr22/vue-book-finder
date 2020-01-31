<template>
<nav class="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
    <router-link to="/">
            <a class="navbar-brand">Home</a>
        </router-link>

  <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navb" aria-expanded="true">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div id="navb" class="navbar-collapse collapse hide">

    <ul class="nav navbar-nav ml-auto">
         <router-link 
            v-if="!isAuthenticated"
            to="/login"
            tag="li"
            class="nav-item">
            <a class="nav-link"><font-awesome-icon icon="user"/> Login/Sign Up</a>
        </router-link>
        <router-link 
            v-if="isAuthenticated"
            to="/myprofile"
            tag="li"
            class="nav-item">
            <a class="nav-link"> My Profile </a>
        </router-link>
         <li 
           v-if="isAuthenticated"
            class="nav-item">
            <a @click.prevent="logout" class="nav-link"><font-awesome-icon icon="sign-in-alt"/> Log Out</a>
        </li>

    </ul>
  </div>
</nav>

</template>

<script>

import {mapGetters} from 'vuex';

export default {
    methods: {
        logout(){
            this.$store.dispatch("logout");
        }
    },
    computed : mapGetters([
        'isAuthenticated',
        'getIsGoogleUser'
    ])
}
</script>

<style>
.nav-link{
    cursor: pointer;
    
}
.nav-item{
    border-left: 1px solid gray;
    
}

</style>
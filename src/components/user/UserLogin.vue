<template>
     <div class="container">
         <br>
         <br>
         
      <form class="col-lg-4 mb-4" :style="isUser ? 'border-color: #337ab7;' : 'border-color: red;'">
          <h2 class="text-center">Welcome</h2>
          <hr>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input v-model="user.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input v-model="user.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <p class="notMember text-muted text-center"><a href="#" @click.prevent="isUser=!isUser">{{ isUser ? 'Uye degilim' : 'Uyeligim var'}}</a></p>
  <div class="form-group text-center">
  <button type="button" :class= "classObject" class="btn btn-block" @click="login()">{{isUser ? 'Login' : 'Sign Up'}}</button>
 </div>

  <div class="form-group text-center">
      <div id="google-signin-btn" data-onsuccess="onSignIn"></div>
 <!-- <button type="button" class="g-signin2 btn btn-primary btn-block"  @click="login(true)">Login with Google Account</button>-->
   </div>
  
</form>

    </div>
</template>

<script>

export default {
    name: "userLogin",

    data(){
        return{
            user:{
                email: null,
                password: null,
            },
            isUser: false,
        }
    },
    computed :{
        classObject(){
            return this.isUser ? 'btn-primary' : 'btn-danger'
        }
    },
    methods: {
      onSignIn (user) {
            const profile = user.getBasicProfile()
            this.$store.commit("setGoogleUser", true);
            this.$store.commit('setUserName', profile.getName());
            this.$store.commit('setUserID', profile.getId());

            user.reloadAuthResponse().then((AuthResponse )=>{
                this.$store.commit('setExpiresIn', +AuthResponse.expires_in*1000);
                this.$store.commit("setToken", AuthResponse.id_token);
                this.$store.dispatch("setTimeoutTimer",this.$store.state.expiresIn);
                localStorage.setItem("token",this.$store.state.token);
                localStorage.setItem("expirationDate", new Date().getTime() + this.$store.state.expiresIn)
                this.$router.replace("/");
            })
            
        },
        login(){
            this.$store.dispatch("login",{...this.user, isUser : this.isUser})
        },
        
    },
    mounted() {
        gapi.signin2.render('google-signin-btn', { 
            onsuccess: this.onSignIn ,
        })
  }
}
</script>

<style>
form{
    border: 1px solid lightgray;
    padding: 20px 20px 10px 20px;
    margin: auto;
    
}
.notMember{
    cursor: pointer;
}

</style>
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {router} from './routes'


Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      token: "",
      apiKey: "AIzaSyAAGkgcn6EJDqWy8r2l60YxghUklXsfg8A",
      userName: "",
      isGoogleUser: false,
      userID:"",
      expiresIn:"",
      googleUser:null
    },
    getters : {
        getUserName(state){
            return state.userName;
        },
        getIsGoogleUser(state){
            return state.isGoogleUser;
        },
        getUserID(state){
            return state.userID;
        },
        isAuthenticated(state){
            return state.token !==""
        },
        getToken(state){
            return state.token;
        },
        getExpiresIn(state){
            return state.expiresIn;
        }
    },
    mutations: {
      setToken(state, token){
          state.token = token
      },
      clearToken(state){
          state.token = ""
      },
      setUserName(state, name){
          state.userName = name;
      },
      clearUserName(state){
          state.userName = "";
      },
      setGoogleUser(state, value){
          state.isGoogleUser = value;
      },
      setUserID(state, userID){
        state.userID = userID;
      },
      setExpiresIn(state, expiresIn){
        state.expiresIn = expiresIn;
      }
    },
    actions : {
        initAuth({commit, dispatch}){
            console.log("init auth beginning")
            let token=localStorage.getItem("token")
            if(token){
                let expirationDate = localStorage.getItem("expirationDate");
                let time = new Date().getTime();

                if(time >= +expirationDate){
                    console.log("token suresi doldu");
                    dispatch("logout");

                }else{
                    
                    commit("setToken", token)
                    let timerSecond = +expirationDate - time
                    console.log("timerSecond : " + timerSecond);
                    dispatch("setTimeoutTimer",timerSecond)
                    router.push("/");
                }
                
            }else{
                router.replace('/login').catch(error => {
                    console.info(error);
                  });
                
                 return false
                }
        
        },
        login({commit, dispatch, state}, authData){
                let authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";

                if(authData.isUser)
                    authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

           
                axios.post(authLink+"AIzaSyAAGkgcn6EJDqWy8r2l60YxghUklXsfg8A",
                        {email: authData.email, password: authData.password,returnSecureToken : true}).then(response =>{
                    commit('setToken', response.data.idToken);
                    commit('setExpiresIn', +response.data.expiresIn*1000);
                    dispatch("setTimeoutTimer",state.expiresIn);
                    localStorage.setItem("token",state.token);
                    localStorage.setItem("expirationDate", new Date().getTime() + state.expiresIn)
                    router.replace("/").catch(error=>{
                        console.log("push error " +error);
                    })
                })

           
            
        },
        logout({commit, dispatch, state}){
            console.log("logouttt");
            if(state.isGoogleUser){
                var GoogleAuth = gapi.auth2.getAuthInstance();

                GoogleAuth.signOut().then(()=>{
                    console.log('User signed out.');
                    commit('clearUserName');
                    commit("setGoogleUser", false);
                    commit("clearToken")
                    localStorage.removeItem("token");
                    localStorage.removeItem("expirationDate");
                    router.push('/login').catch(error=>{
                        console.log("logout error " +error);
                    })
                })
            }
            else{
                commit("clearToken")
                localStorage.removeItem("token");
                localStorage.removeItem("expirationDate");
                router.push('/login').catch(error=>{
                    console.log("logout error " +error);
                })
            }
          
            
        },

        setTimeoutTimer({dispatch}, expiresIn){
            setTimeout(()=>{
                console.log("expires : "+expiresIn)
                dispatch("logout");
            },expiresIn)
        }
    },
   
  })

  export default store
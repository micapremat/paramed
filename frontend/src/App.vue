<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn text @click="login()" v-if="!isActive">
        <span class="mr-2">Ingresar</span>
        <v-icon v-if="!isActive">mdi-login-variant</v-icon>
      </v-btn>
      <v-btn text @click="logout()" v-else>
        <span class="mr-2">Cerrar sesion</span>
        <v-icon v-if="!isActive">mdi-logout-variant</v-icon>
      </v-btn>
      <v-btn text @click="register()">
        <span class="mr-2" v-if="!isActive">Registrarse</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch('readToken')
  },
  computed: {
    loginModal: {
      get(){
        return this.$store.getters.getLoginModal
      },
      set(value){
        return this.$store.commit('setLoginModal',value)
      }
    },
    isLogin: {
      get(){
        return this.$store.getters.getIsLogin
      },
      set(value){
        return this.$store.commit('setIsLogin',value)
      }
    },
    isActive: {
      get(){
        return this.$store.getters.isActive
      }
    }
  },
  methods: {
    login(){
      this.loginModal = true
      this.isLogin = true
    },
    logout(){
      this.$store.dispatch('logout')
    },
    register(){
      this.loginModal = true
      this.isLogin = false
    }
  }
};
</script>

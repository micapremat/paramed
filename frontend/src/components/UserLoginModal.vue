<template>
    <v-container>
      <v-row justify="center">
        <v-dialog
          v-model="loginModal"
          persistent
          max-width="600px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5" v-if="!isLogin">Registrarse</span>
              <span class="text-h5" v-else>Ingresar</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row v-if="!isLogin">
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      label="Nombre*"
                      required
                      v-model="name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      label="Apellido*"
                      persistent-hint
                      required
                      v-model="lastName"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Email*"
                      required
                      v-model="email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Contraseña*"
                      type="password"
                      required
                      v-model="password"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    v-if="!isLogin"
                  >
                    <v-select
                      :items="['User', 'Admin']"
                      label="Rol"
                      v-model="role"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <small v-if="!isLogin">*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="loginModal = false"
              >
                Cerrar
              </v-btn>
              <v-btn @click="register()" v-if="!isLogin">Registrarse</v-btn>
              <v-btn @click="login()" v-else>Ingresar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </template>
  
  <script>
    export default {
      name: 'UserLoginModal',
  
      data() {
        return{
          name: '',
          lastName: '',
          email: '',
          password: '',
          role: ''
        }
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
        }
      },
      methods: {
        login(){
          let user = {
            email: this.email,
            password: this.password
          }
          console.log('login', user)
          this.axios.post('/login', user)
            .then(res => {
              console.log(res.data);
              this.loginModal = false
              const token = res.data.token;
              this.$store.dispatch('saveUser',token);
            })
            .catch(err => {
              console.log(err);
              //this.mensaje = err.response.data.mensaje;
            })
        },
        register(){
          let user = {
            name: this.name,
            lastName: this.lastName,
            email: this.email,
            role: this.role,
            password: this.password
          }
          console.log('register', user)
          this.axios.post('/signup', user)
            .then(res => {
              this.loginModal = false
              console.log(res.data);
            })
            .catch(err => {
              console.log(err);
              //this.mensaje = err.response.data.mensaje;
            })
        }
      }

    }
  </script>
  
<template>
    <v-container>
      <v-row justify="center">
        <v-dialog
          v-model="loginModal"
          persistent
          max-width="600px"
        >
        <v-form ref="form" class="mx-2" @submit.prevent="submitHandler">
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
                      :rules="nameRules"
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
                      :rules="lastNameRules"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Email*"
                      required
                      v-model="email"
                      :rules="emailRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Contraseña*"
                      type="password"
                      required
                      v-model="password"
                      :rules="passwordRules"
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
              <small v-if="!isLogin">*Campos requeridos</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="closeModal()"
              >
                Cerrar
              </v-btn>
              <v-btn type="submit"  v-if="login">Registrarse</v-btn>
              <v-btn @click="login()" v-if="!login">Ingresar</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
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
          role: '',
          nameRules: [],
          lastNameRules: [],
          emailRules: [],
          passwordRules: [],
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
        signup(){
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
        },
        submitHandler(){
          this.nameRules = [
            v => !!v || 'Ingrese un nombre'
          ],
          this.lastNameRules =[
            v => !!v || 'Ingrese un apellido'
          ],
          this.emailRules = [
            v => !!v || 'Ingrese un email',
            v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
          ],
          this.passwordRules = [
            v => !!v || 'Password is required',
          ]
          let self = this
          setTimeout(function () {
            if (self.$refs.form.validate()){
              alert('submitted')
              self.signup()
            }  
          })
        },
        closeModal(){
          this.$refs.form.reset()
          this.loginModal = false
        }
      }

    }
  </script>
  
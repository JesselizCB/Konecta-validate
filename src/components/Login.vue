<template>
  <!-- <v-app id="inspire"> -->
  <!-- <v-content> -->
  <!-- <v-container class="fill-height d-flex justify-center" fluid>
  <v-row align="center" justify="center">-->
  <v-col cols="12" sm="8" md="4">
    <v-card class="elevation-12">
      <v-toolbar color="teal" dark flat>
        <v-toolbar-title>Acceso Colaboradores</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-form action="#" @submit.prevent="submit">
        <v-card-text class="form-group">
          <v-text-field
            :rules="emailRules"
            label="User"
            color="teal"
            id="email"
            type="email"
            name="email"
            prepend-icon="mdi-account-circle"
            class="form-control pb-2"
            fvalue
            required
            autofocus
            v-model="form.email"
          />

          <v-text-field
          :rules="passwordRules"
            id="password"
            label="Password"
            color="teal"
            name="password"
            class="form-control"
            prepend-icon="mdi-eye"
            type="password"
            required
            v-model="form.password"
          />

          <v-alert dense outlined type="error" v-if="error">
            {{error}}
          </v-alert>
        </v-card-text>

        <v-card-actions class="form-group justify-center py-4">
          <v-btn color="teal" class="white--text subtitle-1" type="submit">Iniciar Sesión</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-col>
  <!-- </v-row>
  </v-container>-->
  <!-- </v-content> -->
  <!-- </v-app> -->
</template>

<script>
import firebase from "firebase";
export default {
  created() {
    this.$store.commit("SET_LAYOUT", "login-layout");
  },

  data() {
    return {
      form: {
        // name: "",
        email: "",
        password: ""
      },
      emailRules: [
        v => !!v || "E-mail es requerido",
        v => /.+@.+\..+/.test(v) || "El email no es válido"
      ],
      passwordRules:[
        v => !!v || "Password es requirido",
      ],
      error: null
    };
  },
  
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          this.$router.replace({ name: "home" });
        })
        .catch(err => {
          //  this.error = err.message;
          switch (err.code) {
            case "auth/user-not-found":
              this.error = "El usuario no se encuentra registrado";
              break;
            case "auth/wrong-password":
              this.error = "La contraseña incorrecta";
              break;
            case "auth/invalid-email":
              this.error = "No se ingresó ningún correo electrónico";
              break;
            default:
              this.error = "Se ha producido un error";
          }
        });
    }
  }
};
</script>
<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>pageview</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click="$router.replace('/home')">Consulta Colaboradores</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>person</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click.prevent="consultaPostulante">Consulta Postulantes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item link>
          <v-list-item-action>
            <v-icon>perm_contact_calendar</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click.prevent="$router.replace('/registro')">Registro de invitados</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click.prevent="signOut">Cerrar Sesión</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="teal" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-if="$route.name === 'home'">Consulta de colaboradores</v-toolbar-title>
      <v-toolbar-title v-if="$route.name === 'postulantes'">Consulta de postulantes</v-toolbar-title>
      <v-toolbar-title v-if="$route.name === 'registro'">Registro de invitados</v-toolbar-title>
      <!-- <div class="card-body">
        <div v-if="user" class="alert alert-success" role="alert">You are logged in!</div>
      </div> -->
      <!-- <div>{{user.data.email}}</div> -->
    </v-app-bar>

    <v-content>
      <v-container fluid class="pt-0 pb-0">
        <v-row align="center" justify="center">
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-content>
    <v-footer color="teal" app>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "login"
          });
        });
    },
    consultaPostulante(){
     this.$router.replace({
            name: "postulantes"
          });
    }
  }
};
</script>
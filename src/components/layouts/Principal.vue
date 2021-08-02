<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app >
      <!-- shaped dense  -->
      <v-list dense nav>
        <v-list-item-group color="teal">
          <v-list-item>
            <v-list-item-action>
              <v-img
                width="130"
                class="mb-2"
                alt="Konecta logo"
                src="../../assets/logo_konecta-2.png"
              />
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
         
          <v-list-item link to="/home" class="mt-2">
            <v-list-item-action>
              <v-icon>pageview</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title @click="$router.replace('/home')">Consulta de colaboradores</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/postulantes">
            <v-list-item-action>
              <v-icon>person</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title @click.prevent="$router.replace('/postulantes')">Consulta de postulantes</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="showPerfiles()" link to="/registro">
            <v-list-item-action>
              <v-icon >perm_contact_calendar</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title  @click.prevent="$router.replace('/registro')">Registro de invitados</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/listaInvitados" class="mt-2">
            <v-list-item-action>
              <v-icon>list_alt</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title @click="$router.replace('/listaInvitados')">Lista de invitados</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list-item-group>
      </v-list>

      <template v-slot:append>
       <v-list-item link >
            <v-list-item-action>
              <v-icon >exit_to_app</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title  @click.prevent="signOut">Cerrar Sesión</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="teal" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
         <v-toolbar-title
      v-text="$route.name"
    />
    </v-app-bar>

    <v-content>
      <v-container fluid class="mt-4 pb-0">
        <v-row align="center" justify="center">
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-content>
    <v-footer color="teal" app class="justify-center">
      <span class="white--text">&copy; Konecta - 2020</span>
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

    showPerfiles(){
      const currentUser = this.$firebase.auth().currentUser;
      if(currentUser !== null){
        if(currentUser.email === 'admin@konecta.com'){
        return true;
      }
      else{
        return false;
      }
      }
    }
  }
};
</script>
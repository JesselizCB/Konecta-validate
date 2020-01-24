<template>
  <v-container grid-list-xs>
    <v-layout justify-center>
      <v-flex xs12 md6 xl3 pa-2>
        <div class="d-flex flex-row justify-center pt-4">
          <v-text-field color="indigo" label="Ingrese DNI" required v-model="dniText"></v-text-field>
          <v-btn color="primary" class="ma-2 white--text" @click="validateUser(dniText)">
            Buscar
            <v-icon right dark>mdi-search</v-icon>
          </v-btn>
        </div>
        <div v-if="testCollection.length>0">
          <!-- <h2>Datos del Colaborador</h2> -->
          <v-card>
            <v-card-title class="subheading font-weight-bold">Datos del Colaborado</v-card-title>

            <v-divider></v-divider>

            <v-list dense>
              <div v-for="item in testCollection" :key="item.id">
                <v-list-item>
                <v-list-item-content>DNI/CE:</v-list-item-content>
                <v-list-item-content class="align-end">{{ item.dni }}</v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>Nombre:</v-list-item-content>
                <v-list-item-content class="align-end">{{ item.nombre }}</v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>Apellidos:</v-list-item-content>
                <v-list-item-content class="align-end">{{ item.apellidos }}</v-list-item-content>
              </v-list-item></div>
            </v-list>
              
          </v-card>
        </div>
        <!-- <ul>
          <li :key="item.key" v-for="item in testCollection">{{item}}</li>
        </ul> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  created() {
    this.$store.commit("SET_LAYOUT", "principal-layout");
  },
  data() {
    return {
      dniText: "",
      testCollection: []
    };
  },

  methods: {
    validateUser(user) {
      const userDni = parseInt(user);
      const db = this.$firebase.firestore();
      db.collection("colaboradores")
        .where("dni", "==", userDni)
        .get()
        .then(snap => {
          const testCollection = [];
          snap.forEach(doc => {
            // testCollection.push({ [doc.id]: doc.data() });
            testCollection.push({dni: doc.data().dni, nombre: doc.data().nombre, apellidos:doc.data().apellidos});
          });
          this.testCollection = testCollection;
        });
    }
  }
};
</script>

<style lang="scss">
</style>
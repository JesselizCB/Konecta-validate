<template>
  <v-container grid-list-xs>
    <v-layout justify-center>
      <v-flex xs12 md6 xl3 pa-2>
        <v-radio-group v-model="radios" :mandatory="false" row>
          <v-radio label="DNI" value="radio-1"></v-radio>
          <v-radio label="CE" value="radio-2"></v-radio>
        </v-radio-group>
        <!-- <p>{{ radios || 'null' }}</p> -->
        <div class="d-flex flex-row justify-center pt-4">
          <v-text-field
            :rules="dniRules"
            :clearable="clearable"
            color="indigo"
            label="Ingrese el número"
            type="text"
            maxlength="8"
            required
            v-model="dniText"
          ></v-text-field>
          <v-btn
            color="primary"
            class="ma-2 white--text ml-8"
            @click="validateUser(dniText,radios)"
          >
            Buscar
            <v-icon right dark>mdi-search</v-icon>
          </v-btn>
        </div>
        <div v-if="testCollection.length>0" class="pt-4">
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
                </v-list-item>
              </div>
            </v-list>
          </v-card>
        </div>
        <div v-if="testCollection.length===0">
          <v-alert dense outlined type="error">
            El usuario no se encuentra registrado
          </v-alert>
        </div>
        <!-- <ul>
          <li :key="item.key" v-for="item in testCollection">{{item}}</li>
        </ul>-->
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
      radios: "radio-1",
      clearable: true,
      dniText: "",
      testCollection: [],
      dniRules: [
        v => !!v || "Ingrese un DNI/CE"
        //  v => /.+@.+\..+/.test(v) || "El email no es válido"
      ]
    };
  },
  methods: {
    validateUser(user, radio) {
      const userDoc = parseInt(user);
      const db = this.$firebase.firestore();
      if (radio == "radio-1") {
        db.collection("colaboradores")
          .where("dni", "==", userDoc)
          .get()
          .then(snap => {
            const testCollection = [];
            snap.forEach(doc => {
              // testCollection.push({ [doc.id]: doc.data() });
              testCollection.push({
                dni: doc.data().dni,
                nombre: doc.data().nombre,
                apellidos: doc.data().apellidos
              });
            });
              this.testCollection = testCollection;
              
            
          }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });;
      } else {
          db.collection("colaboradores")
          .where("ce", "==", userDoc)
          .get()
          .then(snap => {
            const testCollection = [];
            snap.forEach(doc => {
              // testCollection.push({ [doc.id]: doc.data() });
              testCollection.push({
                dni: doc.data().dni,
                nombre: doc.data().nombre,
                apellidos: doc.data().apellidos
              });
            });
              this.testCollection = testCollection;
          }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });;
      }
    }
  }
};
</script>

<style lang="scss">
</style>
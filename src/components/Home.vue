<template>
  <v-container grid-list-xs>
    <v-layout justify-center>
      <v-flex xs12 md6 xl3 pa-2>
        <v-card class="mx-auto py-4" outlined>
          <p class="subheading text-center font-weight-bold">Tipo de documento</p>
          <v-radio-group v-model="radios" :mandatory="false" row>
            <v-radio color="teal" label="DNI" value="rdbDNI"></v-radio>
            <v-radio color="teal" label="CE" value="rdbCE"></v-radio>
          </v-radio-group>
          <!-- <p>{{ radios || 'null' }}</p> -->
          <div class="px-6 text-center">
            <v-text-field
              v-if="radios ==='rdbDNI'"
              :rules="dniRules"
              :clearable="clearable"
              color="#4db6ac"
              label="Ingrese el número de DNI"
              type="text"
              maxlength="8"
              required
              v-model="dniText"
              @click="clearData($event)"
              @keypress="isNumber($event)"
              v-on:keyup.enter="validateUser(dniText,radios)"
            ></v-text-field>
            <v-text-field
              v-if="radios ==='rdbCE'"
              :rules="dniRules"
              :clearable="clearable"
              color="#4db6ac"
              label="Ingrese el número de CE"
              type="text"
              maxlength="12"
              required
              v-model="dniText"
              @click="clearData($event)"
              @keypress="isNumber($event)"
              v-on:keyup.enter="validateUser(dniText,radios)"
            ></v-text-field>
            <v-btn
               color="#4db6ac"
              class="ma-2 white--text mt-2 form-control"
              type="submit"
              @click="validateUser(dniText,radios)"
            >
              Buscar
              <v-icon right dark>search</v-icon>
            </v-btn>
          </div>
        </v-card>
        <div v-if="testCollection.length > 0" class="pt-4">
          <!-- <h2>Datos del Colaborador</h2> -->
          <v-card outlined color="#4db6ac">
            <v-card-title
              class="subheading font-weight-bold white--text text-center"
            >Datos del colaborador</v-card-title>

            <v-divider></v-divider>

            <v-list>
              <div v-for="item in testCollection" :key="item.id">
                <!-- <v-list-item>
                  <v-list-item-content>DNI/CE:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.Documento }}</v-list-item-content>
                </v-list-item>-->

                <v-list-item>
                  <v-list-item-content>Nombre:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.Nombre }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Apellidos:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.Apellido }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Fecha Nacimiento:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.FechaNace }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Cuenta:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.Cuenta }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Cargo:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.Cargo }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Superior:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.Superior }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Site:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.Site }}</v-list-item-content>
                </v-list-item>
              </div>
            </v-list>
          </v-card>
        </div>
        <div v-if="errMessage.length!==0" class="mt-6">
          <v-alert dense outlined type="error">El usuario no se encuentra registrado</v-alert>
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
      radios: "rdbDNI",
      clearable: true,
      dniText: "",
      testCollection: [],
      errMessage: "",
      dniRules: [
        v => !!v || "Ingrese un DNI o CE"
        //  v => /.+@.+\..+/.test(v) || "El email no es válido"
      ]
    };
  },
  methods: {
    validateUser(user, radio) {
      const userDoc = parseInt(user);
      const db = this.$firebase.firestore();
      if (radio == "rdbDNI") {
        db.collection("colaboradores")
          .where("Documento", "==", userDoc)
          .where("TipoDocumento", "==", "DNI")
          .get()
          .then(snap => {
            const testCollection = [];
            snap.forEach(doc => {
              // console.log(doc.id, " => ", doc.data());
              testCollection.push({
                Documento: doc.data().Documento,
                Nombre: doc.data().Nombre,
                Apellido: doc.data().Apellido,
                FechaNace: doc.data().FechaNace,
                Cuenta: doc.data().Cuenta,
                Cargo: doc.data().Cargo,
                Superior: doc.data().Superior,
                Site: doc.data().Site
              });
            });
            console.log(testCollection);
            if (testCollection.length === 0) {
              // this.testCollection.push({ message: "El colaborador no se encuentra registrado o no esta áctivo" });
              this.errMessage =
                "El colaborador no se encuentra registrado o no esta áctivo";
              this.testCollection = [];
            } else {
              // this.testCollection.push({ message: "El colaborador no se encuentra registrado o no esta áctivo" });
              this.testCollection = testCollection;
              this.errMessage = "";
            }
            console.log(this.testCollection);
          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
          });
      } else {
        db.collection("colaboradores")
          .where("Documento", "==", userDoc)
          .where("TipoDocumento", "==", "CE ")
          .get()
          .then(snap => {
            const testCollection = [];
            snap.forEach(doc => {
              console.log(doc.id, " => ", doc.data());
              testCollection.push({
                
                Documento: doc.data().Documento,
                Nombre: doc.data().Nombre,
                Apellido: doc.data().Apellido,
                FechaNace: doc.data().FechaNace,
                Cuenta: doc.data().Cuenta,
                Cargo: doc.data().Cargo,
                Superior: doc.data().Superior,
                Site: doc.data().Site
              });
            });
            this.testCollection = testCollection;
            console.log(this.testCollection);
          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
          });
      }
    },
    isNumber: function(evt) {
      // this.testCollection = [];
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    clearData: function(evt) {
      evt = evt ? evt : window.event;
      this.testCollection = [];
      this.errMessage = "";
    }
  }
};
</script>

<style>
.v-input--radio-group--row .v-input--radio-group__input {
  justify-content: center;
}
.theme--light.v-card {
  background: #fafafa;
}
</style>
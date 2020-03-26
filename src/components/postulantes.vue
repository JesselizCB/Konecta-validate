<template>
  <v-container grid-list-xs>
    <v-layout justify-center>
      <v-flex xs12 md6 xl3 pa-2>
        <v-card class="mx-auto py-4 px-4" outlined>
          <!-- <p class="subheading text-center font-weight-bold">Tipo de documento del postulante</p> -->
          <v-row justify="center" class="">
            <v-col class="d-flex " cols="12" sm="12">
              <v-select
                v-model="selectDocumentType"
                :items="DocumentType"
                color="teal"
                :rules="[v => !!v || 'el tipo de documento es requerido']"
                label="Seleccionar"
                hide-details
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-row justify="center" class="">
            <v-col class="d-flex" cols="12" sm="12">
              <v-text-field
                v-if="selectDocumentType !=='Pasaporte' && selectDocumentType!=='Permiso Temporal de Permanencia' && selectDocumentType!=='Carnet de Extranjeria'"
                :rules="dniRules"
                :clearable="clearable"
                color="#4db6ac"
                label="Ingrese el número de DNI"
                type="number"
                pattern="[0-9]*"
                maxlength="8"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                required
                v-model="numDoc"
                @click="clearData($event)"
                @keypress="isNumber($event)"
                v-on:keyup.enter="validatePostulante(numDoc)"
              ></v-text-field>
              <v-text-field
                v-if="selectDocumentType ==='Pasaporte'"
                v-model="numDoc"
                :clearable="clearable"
                label="Ingrese el número de Pasaporte"
                maxlength="11"
                color="#4db6ac"
                type="number"
                pattern="[0-9]*"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                @click="clearData($event)"
                @keypress="isNumber($event)"
                v-on:keyup.enter="validatePostulante(numDoc)"
                :rules="pasaporteRules"
                required
              ></v-text-field>

              <v-text-field
                v-if="selectDocumentType ==='Permiso Temporal de Permanencia' || selectDocumentType ==='Carnet de Extranjeria'"
                v-model="numDoc"
                :clearable="clearable"
                maxlength="9"
                color="#4db6ac"
                label="Ingrese el número de Documento"
                type="number"
                pattern="[0-9]*"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                @click="clearData($event)"
                @keypress="isNumber($event)"
                v-on:keyup.enter="validatePostulante(numDoc)"
                :rules="ptpteRules"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col class="d-flex justify-center" cols="12" sm="6">
              <v-btn
                 color="#4db6ac"
                class="ma-2 white--text mt-2 form-control"
                type="submit"
                @click="validatePostulante(numDoc)"
              >
                Buscar
                <v-icon right dark>search</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <!-- </div> -->
        </v-card>
        <div v-if="postulantes.length > 0" class="pt-4">
          <!-- <h2>Datos del Colaborador</h2> -->
          <v-card outlined color="#4db6ac">
            <v-card-title
              class="subheading font-weight-bold white--text text-center"
            >Datos del postulante</v-card-title>
            <v-divider></v-divider>
            <v-list>
              <div v-for="item in postulantes" :key="item.id">
                <v-list-item>
                  <v-list-item-content>Tipo de Documento:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.TipoDoc }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Documento:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.Documento }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Apellidos:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.Apellidos }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Nombres:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.Nombre }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Fecha Nacimiento:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.FechaNac }}</v-list-item-content>
                </v-list-item>
              </div>
            </v-list>
          </v-card>
        </div>
        <div v-if="errMessage.length!==0" class="mt-6">
          <v-alert dense outlined type="error">El postulante no se encuentra registrado</v-alert>
        </div>
        <!-- <ul>
          <li :key="item.key" v-for="item in testCollection">{{item}}</li>
        </ul>-->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { secondary } from "../main.js";
export default {
  created() {
    this.$store.commit("SET_LAYOUT", "principal-layout");
  },
  data() {
    return {
      radios: "rdbDNI",
      clearable: true,
      numDoc: "",
      postulantes: [],
      errMessage: "",
      selectDocumentType: "",
      dniRules: [
      v => !!v || "El número de documento es requerido",
      v => (v && v.length === 8) || "El número debe ser de 8 carácteres"
    ],
    pasaporteRules: [
      v => !!v || "El número de documento es requerido",
      v => (v && v.length === 11) || "El número debe ser de 11 carácteres"
    ],
    ptpteRules: [
       v => !!v || "El número de documento es requerido",
      v => (v && v.length === 9) || "El número debe ser de 9 carácteres"
    ],
      DocumentType: [
        "DNI",
        "Pasaporte",
        "Carnet de Extranjeria",
        "Permiso Temporal de Permanencia"
      ]
    };
  },
  methods: {
    validatePostulante(user) {
      var secondaryDatabase = secondary.database();
      var ref = secondaryDatabase.ref("POSTULANTES");
      const postulantesCollection = [];
      ref.on("value", function(getPostulantesDates) {
        var datosPostulante = getPostulantesDates.val();
        var queryRef = ref.orderByChild("numdoc").equalTo(user);
        queryRef.on("value", function(querySnapshot) {
          querySnapshot.forEach(function(datoSnapshot) {
            postulantesCollection.push({
              TipoDoc: datoSnapshot.val().tipodoc,
              Documento: datoSnapshot.val().numdoc,
              Apellidos:
                datoSnapshot.val().apellido_p +
                " " +
                datoSnapshot.val().apellido_m,
              Nombre: datoSnapshot.val().nombres,
              NombreSocial: datoSnapshot.val().nombre_social,
              FechaNac: datoSnapshot.val().fecha_nac
            });
            //  this.postulantes = postulantesCollection;
            return true;
          });
        });
      });
      if (postulantesCollection.length === 0) {
              // this.testCollection.push({ message: "El colaborador no se encuentra registrado o no esta áctivo" });
              this.errMessage =
                "El postulante no se encuentra registrado";
              this.postulantes = [];
            } else {
              // this.testCollection.push({ message: "El colaborador no se encuentra registrado o no esta áctivo" });
              this.postulantes = postulantesCollection;
              this.errMessage = "";
            }
      // this.postulantes = postulantesCollection;
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
      this.postulantes = [];
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
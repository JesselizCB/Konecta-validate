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
              v-if="radios === 'rdbDNI'"
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
              v-on:keyup.enter="validateUser(dniText, radios)"
            ></v-text-field>
            <v-text-field
              v-if="radios === 'rdbCE'"
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
              v-on:keyup.enter="validateUser(dniText, radios)"
            ></v-text-field>
            <v-btn
              color="#00c9b7"
              class="ma-2 white--text mt-2 form-control"
              type="submit"
              @click="validateUser(dniText, radios)"
            >
              Buscar
              <v-icon right dark>search</v-icon>
            </v-btn>
          </div>
        </v-card>
        <div v-if="testCollection.length > 0" class="pt-4">
          <v-card outlined color="#00c9b7">
            <div v-for="item in testCollection" :key="item.id">
              <v-card-title
                class="subheading font-weight-bold white--text text-center justify-space-between py-0"
              >
                Datos del colaborador
                <div class="justify-end">
                  <v-dialog v-model="dialog" persistent max-width="400px">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        class="mx-2 my-2"
                        fab
                        color="#ff6e40"
                        dark
                        v-on="on"
                        small
                        @click.stop="openDialog(item)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="pb-0 justify-space-between">
                        <div class="flex-column">
                          <span class="headline pb-0">Registro de colaborador</span>
                          <p
                            class="pb-0 mb-0 font-weight-light subtitle-1 text-center"
                          >{{ item.TipoDocumento }} - {{ item.Documento }}</p>
                        </div>
                        <div class="flex-column pt-0">
                          <v-btn color="#00c9b7" @click="dialog = false" fab top dark small absolute right>
                            <v-icon dark medium>close</v-icon>
                          </v-btn>
                        </div>
                      </v-card-title>
                      <v-form ref="form" v-model="valid">
                        <v-card-text class="py-0 mt-0 grey--text">
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12">
                                <v-select
                                  :items="items"
                                  v-model="obsFotocheck.motivo"
                                  label="Motivo"
                                  color="teal"
                                ></v-select>
                              </v-col>
                              <v-col cols="12" sm="12">
                                <v-textarea
                                  v-model="obsFotocheck.observacion"
                                  outlined
                                  rows="2"
                                  class="body-2"
                                  color="teal"
                                  name="input-7-4"
                                  :clearable="clearable"
                                  hide-details
                                  label="Observación"
                                ></v-textarea>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="#00c9b7"
                            :disabled="!valid"
                            
                            class="mr-4 white--text"
                            @click="
                              addObsFotocheck(),
                                getObservaciones(item.Documento)
                            "
                          >Registrar</v-btn>
                        </v-card-actions>
                      </v-form>
                      <v-card-text class="pt-2 subtitle-2 grey--text">
                        <v-simple-table fixed-header height="200px">
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left">Fecha</th>
                                <th class="text-left">Motivo</th>
                                <th class="text-left">Observación</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in observacionCollection" :key="item.id">
                                <td>{{ item.createdAt }}</td>
                                <td>{{ item.motivo }}</td>
                                <td>{{ item.observacion }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-list>
                <v-list-item>
                  <v-list-item-content>Nombre:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{
                    item.Nombre
                    }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Apellidos:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{
                    item.Apellido
                    }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Fecha Nacimiento:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{
                    item.FechaNace
                    }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Cuenta:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{
                    item.Cuenta
                    }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Cargo:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{
                    item.Cargo
                    }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Superior:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{
                    item.Superior
                    }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Site:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{
                    item.Site
                    }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </v-card>
        </div>
        <div v-if="errMessage.length !== 0" class="mt-6">
          <v-alert dense outlined type="error">El usuario no se encuentra registrado</v-alert>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
  created() {
    this.$store.commit("SET_LAYOUT", "principal-layout");
  },
  data() {
    return {
      valid: true,
      dialog: false,
      radios: "rdbDNI",
      clearable: true,
      obsFotocheck: [
        {
          TipoDocumento: "",
          Documento: "",
          motivo: "",
          observacion: ""
        }
      ],
      observacionCollection: [],
      dniText: "",
      testCollection: [],
      ref: this.$firebase.firestore().collection("obs-fotocheck"),
      errMessage: "",
      items: ["Perdida", "Robo", "Tramite", "Olvido","Otros"],
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
                TipoDocumento: doc.data().TipoDocumento,
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
            // console.log(this.testCollection);
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
              // console.log(doc.id, " => ", doc.data());
              testCollection.push({
                TipoDocumento: doc.data().TipoDocumento,
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
    },
    openDialog(item) {
      // console.log(item);
      this.getObservaciones(item.Documento);
      this.obsFotocheck.Documento = item.Documento;
      this.dialog = true;
    },
    addObsFotocheck() {
      // this.$refs.form.validate();
      this.ref
        .add({
          Documento: this.obsFotocheck.Documento,
          motivo: this.obsFotocheck.motivo,
          observacion: this.obsFotocheck.observacion,
          createdAt: new Date()
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      this.obsFotocheck.TipoDocumento = "";
      this.obsFotocheck.Documento = "";
      this.obsFotocheck.motivo = "";
      this.obsFotocheck.observacion = "";
      // this.$refs.form.reset();
      //   this.$refs.form.resetValidation();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    getObservaciones(numDoc) {
      const db = this.$firebase.firestore();
      // console.log(db);
      db.collection("obs-fotocheck")
        .where("Documento", "==", numDoc)
        .get()
        .then(snap => {
          const observacionCollection = [];
          snap.forEach(doc => {
          // console.log(doc.id, " => ", doc.data());
            observacionCollection.push({
              createdAt: moment.unix(doc.data().createdAt.seconds).format('MM/DD/YYYY, h:mm a'),
              motivo: doc.data().motivo,
              observacion: doc.data().observacion
            });
          });
          this.observacionCollection = observacionCollection;
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
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
.v-btn--fab.v-size--small.v-btn--absolute.v-btn--top {
  top: 15px !important;
}
</style>

<template>
  <v-container grid-list-lg>
    <v-layout justify-center>
      <v-flex xs12 md12 xl3 pa-2>
        <div class></div>
        <v-row class="pr-3 justify-end">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn color="teal" class="text-capitalize" dark v-on="on">
                <v-icon>add_circle_outline</v-icon>Nuevo invitado
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="pb-0">
                <span class="headline pb-0">Registro de invitados</span>
              </v-card-title>
              <v-form ref="form" v-model="valid">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" class="pt-0">
                        <v-select
                          v-model="editedVisit.tipoDocumento"
                          :items="DocumentType"
                          color="teal"
                          :rules="[v => !!v || 'el tipo de numDoc es requerido']"
                          label="Tipo de documento"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" class="pt-0">
                        <v-text-field
                          v-if="editedVisit.tipoDocumento !=='Pasaporte' && editedVisit.tipoDocumento!=='Permiso Temporal de Permanencia' && editedVisit.tipoDocumento!=='Carnet de Extranjeria'"
                          :rules="dniRules"
                          :clearable="clearable"
                          color="#4db6ac"
                          label="Número de documento"
                          pattern="[0-9]*"
                          maxlength="8"
                          oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                          v-model="editedVisit.numDoc"
                          @keypress="isNumber($event)"
                          autocomplete="off"
                        ></v-text-field>
                        <v-text-field
                          v-if="editedVisit.tipoDocumento =='Pasaporte'"
                          v-model="editedVisit.numDoc"
                          :clearable="clearable"
                          label="Número de documento"
                          maxlength="11"
                          color="#4db6ac"
                          pattern="[0-9]*"
                          oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                          @keypress="isNumber($event)"
                          :rules="pasaporteRules"
                          autocomplete="off"
                        ></v-text-field>

                        <v-text-field
                          v-if="editedVisit.tipoDocumento=='Permiso Temporal de Permanencia' || editedVisit.tipoDocumento ==='Carnet de Extranjeria'"
                          v-model="editedVisit.numDoc"
                          :clearable="clearable"
                          maxlength="9"
                          color="#4db6ac"
                          label="Número de documento"
                          pattern="[0-9]*"
                          oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                          @keypress="isNumber($event)"
                          :rules="ptpteRules"
                          autocomplete="off"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" class="pt-0">
                        <v-text-field
                          label="Nombre"
                          v-model="editedVisit.nombres"
                          :clearable="clearable"
                          color="teal"
                          :rules="[v => !!v || 'El nombre es requerido']"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" class="pt-0">
                        <v-text-field
                          label="Apellido"
                          v-model="editedVisit.apellidos"
                          :clearable="clearable"
                          color="teal"
                          :rules="[v => !!v || 'Los apellidos son requeridos']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="mb-0 pa-0 pl-3">
                        <p class="mb-0 title font-weight-bold teal--text">Llegada del invitado</p>
                      </v-col>

                      <v-col cols="12" lg="6" sm="6" class="pt-0">
                        <v-menu
                          ref="menu1"
                          v-model="menu1"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="editedVisit.fecha"
                              color="teal"
                              label="Fecha"
                              persistent-hint
                              prepend-icon="event"
                              :rules="[v => !!v || 'La fecha es requerida']"
                              @blur="date = parseDate(editedVisit.fecha)"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" class="pt-0" sm="6">
                        <!-- <v-text-field label="Hora" v-model="hora" color="teal" single-line></v-text-field> -->
                        <v-select
                          v-model="editedVisit.hora"
                          :items="horaSelect"
                          color="teal"
                          :rules="[v => !!v || 'La hora es requerida']"
                          label="Hora"
                          prepend-icon="watch_later"
                          hide-details
                        ></v-select>
                      </v-col>
                      <v-col cols="12" class="pt-0">
                        <v-select
                          v-model="editedVisit.ubicacion"
                          :items="sedeSelect"
                          color="teal"
                          prepend-icon="place"
                          :rules="[v => !!v || 'la ubicación es requerida']"
                          label="Ubicación"
                          hide-details
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#4db6ac" text @click="dialog = false,clearForm()">Cancelar</v-btn>
                  <v-btn
                    color="teal"
                    :disabled="!valid"
                    class="mr-4 white--text"
                    @click.prevent="addInvitado(editedVisit.id), dialog= false, getVisitas()"
                  >Registrar</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </v-row>
        <div class="pt-4">
          <v-card>
            <v-card-title>
              <p class="teal--text font-weight-bold title">Lista de invitados</p>

              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                color="teal"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="visitantesCollection"
              :search="search"
              locale="es"
              class="elevation-1"
            >
              <template class="justify-center" v-slot:item.action="{ item }">
                <v-icon class="mr-2" @click="editVisita(item)">mdi-pencil</v-icon>
                <!-- <v-icon @click="deleteVisita(item)">mdi-delete</v-icon> -->
              </template>
            </v-data-table>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  created() {
    this.$store.commit("SET_LAYOUT", "principal-layout");
    // this.visitantesCollection;
    this.getVisitas();
  },
  data(vm) {
    return {
      valid: true,
      dialog: false,
      clearable: true,
      errMessage: "",
      visitantesCollection: [],
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
      ],
      sedeSelect: [
        "Sede Centro de Lima",
        "Sede Surquillo",
        "Sede Callao - Lima Cargo",
        "Sede Callao - Bellavista"
      ],
      horaSelect: [
        "7:00 am",
        "7:30 am",
        "8:00 am",
        "8:30 am",
        "9:00 am",
        "9:30 am",
        "10:00 am",
        "10:30 am",
        "11:00 am",
        "11:30 am",
        "12:00 pm",
        "12:30 pm",
        "1:00 pm",
        "1:30 pm",
        "2:00 pm",
        "2:30 pm",
        "3:00 pm",
        "3:30 pm",
        "4:00 pm",
        "4:30 pm",
        "5:00 pm",
        "5:30 pm",
        "6:00 pm",
        "6:30 pm",
        "7:00 pm"
      ],
      search: "",
      headers: [
        {
          text: "Tipo de documento",
          value: "tipoDocumento"
        },
        { text: "Documento", value: "numDoc" },
        { text: "Nombre", value: "nombres" },
        { text: "Apellido", value: "apellidos" },
        { text: "Fecha", value: "fecha" },
        { text: "Hora", value: "hora" },
        { text: "Ubicación", value: "ubicacion" },
        { text: "", value: "action", sortable: false }
      ],
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      ref: this.$firebase.firestore().collection("visitantes"),
      todos: [],
      editedIndex: -1,
      editedVisit: [
        {
          id: "",
          tipoDocumento: "",
          numDoc: "",
          nombres: "",
          apellidos: "",
          fecha: vm.formatDate(new Date().toISOString().substr(0, 10)),
          hora: "",
          ubicacion: ""
        }
      ]
    };
  },
  watch: {
    date(val) {
      this.editedVisit.fecha = this.formatDate(this.date);
    }
  },

  mounted() {
    // this.datosPersonalesPost.arrEjm = this.rrselect;
    this.getVisitas();
  },

  methods: {
    addInvitado(id) {
      this.$refs.form.validate();
      if (this.editedIndex > -1) {
        this.ref.doc(id).update({
          tipoDocumento: this.editedVisit.tipoDocumento,
          numDoc: this.editedVisit.numDoc,
          nombres: this.editedVisit.nombres,
          apellidos: this.editedVisit.apellidos,
          fecha: this.editedVisit.fecha,
          hora: this.editedVisit.hora,
          ubicacion: this.editedVisit.ubicacion,
          estado: 'pendiente',
          createdAt: new Date()
        });
        this.clearForm();
      } else {
        this.ref
          .add({
            tipoDocumento: this.editedVisit.tipoDocumento,
            numDoc: this.editedVisit.numDoc,
            nombres: this.editedVisit.nombres,
            apellidos: this.editedVisit.apellidos,
            fecha: this.editedVisit.fecha,
            hora: this.editedVisit.hora,
            ubicacion: this.editedVisit.ubicacion,
            estado: 'pendiente',
            createdAt: new Date()
          })
          .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
        this.editedVisit.tipoDocumento = "";
        this.editedVisit.numDoc = "";
        this.editedVisit.nombres = "";
        this.editedVisit.apellidos = "";
        this.editedVisit.fecha = "";
        this.editedVisit.hora = "";
        this.editedVisit.ubicacion = "";
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      }
    },
    getVisitas() {
      this.ref
        .orderBy("createdAt", "desc")
        .get()
        .then(snap => {
          const visitantesCollection = [];
          snap.forEach(doc => {
            // console.log(doc.id, " => ", doc.data());
            visitantesCollection.push({
              id: doc.id,
              tipoDocumento: doc.data().tipoDocumento,
              numDoc: doc.data().numDoc,
              nombres: doc.data().nombres,
              apellidos: doc.data().apellidos,
              fecha: doc.data().fecha,
              hora: doc.data().hora,
              ubicacion: doc.data().ubicacion
            });
          });
          this.visitantesCollection = visitantesCollection;
          // console.log(this.visitantesCollection);
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
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

    editVisita(item) {
      console.log(this.visitantesCollection.indexOf(item));
      this.editedIndex = this.visitantesCollection.indexOf(item);
      // console.log(item);
      this.editedVisit = Object.assign({}, item);
      this.dialog = true;
    },
    clearForm() {
      this.editedVisit.tipoDocumento = "";
      this.editedVisit.numDoc = "";
      this.editedVisit.nombres = "";
      this.editedVisit.apellidos = "";
      this.editedVisit.fecha = "";
      this.editedVisit.hora = "";
      this.editedVisit.ubicacion = "";
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }
};
</script>

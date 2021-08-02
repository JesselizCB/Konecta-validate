<template>
  <v-container grid-list-lg>
    <v-layout justify-center>
      <v-flex pa-2>
        <div class="pt-4">
          <v-card>
            <v-card-title>
              <p class="teal--text font-weight-bold title">Lista de invitados registrados</p>
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
              locale="es-ES"
              class="elevation-1"
            >
              <template class="justify-center" v-slot:item.horaIngreso="{ item }">
                <p v-if="item.horaIngreso">{{item.horaIngreso}}</p>
                <v-btn
                  v-if="!item.horaIngreso"
                  color="orange"
                  depressed
                  small
                  class="text-capitalize white--text"
                  @click="editVisita(item), dialogIngreso = true"
                >Ingreso</v-btn>
              </template>
              <template class="justify-center" v-slot:item.horaSalida="{ item }">
                <p v-if="item.horaSalida">{{item.horaSalida}}</p>
                <v-btn
                  v-if="!item.horaSalida"
                  color="green"
                  depressed
                  small
                  class="text-capitalize white--text ml-2"
                  @click="editVisita(item), dialog = true"
                >Salida</v-btn>
              </template>
            </v-data-table>
            <v-dialog persistent v-model="dialogIngreso" max-width="290">
              <v-card>
                <v-card-title class="headline">Registro del invitado</v-card-title>
                <v-card-text>Se registro satisfactoriamente el ingreso del invitado</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialogIngreso = false">Cancelar</v-btn>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="updateHoraIngresoVisita(), dialogIngreso = false"
                  >Aceptar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog persistent v-model="dialog" max-width="290">
              <v-card>
                <v-card-title class="headline">Registro del invitado</v-card-title>
                <v-card-text>Se registro satisfactoriamente la salida del invitado</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">Cancelar</v-btn>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="updateHoraSalidaVisita(), dialog = false"
                  >Aceptar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from "moment";
export default {
  created() {
    this.$store.commit("SET_LAYOUT", "principal-layout");
    // this.visitantesCollection;
    this.getVisitas();
  },
  data() {
    return {
      valid: true,
      clearable: true,
      errMessage: "",
      dialog: false,
      dialogIngreso: false,
      visitantesCollection: [],
      search: "",
      headers: [
        {
          text: "Tipo documento",
          value: "tipoDocumento"
        },
        { text: "Documento", value: "numDoc" },
        { text: "Nombre", value: "nombres" },
        { text: "Apellidos", value: "apellidos" },
        { text: "Fecha", value: "fecha" },
        { text: "Hora programada", value: "hora" },
        { text: "Ubicación", value: "ubicacion"},
        { text: "Hora de ingreso", value: "horaIngreso"},
        { text: "Hora de salida", value: "horaSalida"}
      ],
      ref: this.$firebase.firestore().collection("visitantes"),
      idReg: "",
      editedIndex: -1
    };
  },

  mounted() {
    this.getVisitas();
  },

  methods: {
    getVisitas() {
      this.ref
        // .orderBy("createdAt", "desc")
        .where("estado", "==", "pendiente")
        .get()
        .then(snap => {
          const visitantesCollection = [];
          snap.forEach(doc => {
            //  console.log(doc.id, " => ", doc.data());
            if (doc.data().horaIngreso) {
              if (doc.data().horaSalida) {
                visitantesCollection.push({
                id: doc.id,
                tipoDocumento: doc.data().tipoDocumento,
                numDoc: doc.data().numDoc,
                nombres: doc.data().nombres,
                apellidos: doc.data().apellidos,
                fecha: doc.data().fecha,
                hora: doc.data().hora,
                ubicacion: doc.data().ubicacion,
                horaIngreso: moment.unix(doc.data().horaIngreso.seconds).format('DD/MM/YYYY, h:mm a'),
                horaSalida: moment.unix(doc.data().horaSalida.seconds).format('DD/MM/YYYY, h:mm a')
              });
              } else{
              visitantesCollection.push({
                id: doc.id,
                tipoDocumento: doc.data().tipoDocumento,
                numDoc: doc.data().numDoc,
                nombres: doc.data().nombres,
                apellidos: doc.data().apellidos,
                fecha: doc.data().fecha,
                hora: doc.data().hora,
                ubicacion: doc.data().ubicacion,
                horaIngreso: moment.unix(doc.data().horaIngreso.seconds).format('DD/MM/YYYY, h:mm a')
              });
              }
            } else{
              visitantesCollection.push({
                id: doc.id,
                tipoDocumento: doc.data().tipoDocumento,
                numDoc: doc.data().numDoc,
                nombres: doc.data().nombres,
                apellidos: doc.data().apellidos,
                fecha: doc.data().fecha,
                hora: doc.data().hora,
                ubicacion: doc.data().ubicacion,
              });
            }
          });
          this.visitantesCollection = visitantesCollection;
          console.log(this.visitantesCollection);
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    },
    editVisita(item) {
      this.editedIndex = this.visitantesCollection.indexOf(item);
      this.idReg = item.id;
    },
    updateHoraIngresoVisita() {
      console.log('en update hora ingreso')
     console.log(this.idReg);
      this.ref.doc(this.idReg).update({
        // estado: "finalizado",
        horaIngreso: new Date()
      });
      this.getVisitas();
    },
    updateHoraSalidaVisita() {
      console.log(this.idReg);
      this.ref.doc(this.idReg).update({
        // estado: "finalizado",
        horaSalida: new Date()
      });
      this.getVisitas();
    }
  }
};
</script>

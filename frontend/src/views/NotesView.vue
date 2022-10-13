<template>
    <div>
        <div>
            <b-form @submit="addNote(note)" v-if="show">
                <b-form-group id="input-group-1" label="Name:" label-for="input-1">
                    <b-form-input
                    id="input-1"
                    v-model="note.name"
                    type="text"
                    placeholder="Ingrese un Nombre"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Description:" label-for="input-2">
                    <b-form-input
                    id="input-2"
                    v-model="note.description"
                    placeholder="Ingrese una descripcion"
                    ></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="primary">Agregar</b-button>
            </b-form>
        </div>
        <div>
            <b-table class="table" :items="items" :fields="fields"></b-table>
        </div>
    </div>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
        fields: [
          {
            key: 'userId',
            sortable: true,
            label: 'Id'
          },
          {
            key: 'name',
            sortable: false,
            label: 'Nombre'
          },
          {
            key: 'description',
            label: 'Descripción'
          },
          {
            key: 'date',
            label: 'Fecha'
          },
          {
            key: 'active',
            label: 'Acciones'
          }
        ],
        items:[],
        show: true,
        note: {}
    }
  },
  created(){
    this.listarNotas();
  },
  methods: {
    listarNotas(){
        this.axios.get('notes')
        .then((response) => {
            console.log(response.data)
            this.items = response.data;
        })
        .catch((e)=>{
            console.log('error' + e);
        })
    },
    addNote(note){
        this.axios.post('new-note', note)
        .then(res => {
            this.items.unshift(res.data)
        }).catch (e => {
            console.log(e.response.data.error.errors.nombre.message);
        })
        this.items = {}
    }
  }
}
</script>

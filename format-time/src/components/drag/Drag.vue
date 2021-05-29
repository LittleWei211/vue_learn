<template>
  <div>
    <div class="drop-zone"
         @drop="onDrop($event,1)"
         @dragover.prevent
         @dragenter.prevent
    >
      <div class="drag-el"
          draggable
          @dragstart="startDrag($event,item)"
          v-for="item in listOne"
          :key="item.title"
      >
        {{item.title}}
      </div>
    </div>
    <hr>
    <div class="drop-zone"
         @drop="onDrop($event,2)"
         @dragover.prevent
         @dragenter.prevent
    >
      <div class="drag-el"
           draggable
           @dragstart="startDrag($event,item)"
           v-for="item in listTwo"
           :key="item.title"
      >
        {{item.title}}
      </div>
    </div>
    <hr>
    <div class="drop-zone"
         @drop="onDrop($event,3)"
         @dragover.prevent
         @dragenter.prevent
    >
      <div class="drag-el"
           draggable
           @dragstart="startDrag($event,item)"
           v-for="item in listThree"
           :key="item.title"
      >
        {{item.title}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Drag",
    data() {
      return {
        items:[
          {
            id:0,
            title:'Item A',
            list:1
          },
          {
            id:1,
            title:'Item B',
            list:1
          },
          {
            id:2,
            title:'Item C',
            list:2
          },
          {
            id:3,
            title:'Item D',
            list:3
          }
        ]
      }
    },
    computed:{
      listOne(){
        return this.items.filter(item => item.list === 1)
      },
      listTwo(){
        return this.items.filter(item => item.list === 2)
      },
      listThree(){
        return this.items.filter(item => item.list === 3)
      }
    },
    components: {},
    methods: {
      startDrag(evt,item){
        console.log(evt);
        evt.dataTransfer.dropEffect = 'copy';
        evt.dataTransfer.effectAllowed = 'copy';
        evt.dataTransfer.setData('itemID',item.id);
      },
      onDrop(evt,list){
        const itemID = evt.dataTransfer.getData('itemID');
        const item = this.items.find(item => item.id == itemID);
        console.log(item);
        item.list = list;
      },

    },
    created() {
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .drop-zone{
    background-color: #eee;
    margin-bottom: 10px;
    padding: 10px;
  }
  .drag-el{
    background-color: #fff;
    margin-bottom: 10px;
    padding: 5px;
  }
</style>

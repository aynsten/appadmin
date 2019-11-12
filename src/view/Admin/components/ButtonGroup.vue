<template>
  <ButtonGroup>
    <Button type="primary" v-for="(item,index) in BottonGroupStore" :key="index" @click="emitevents(item)">{{item.title}}</Button>
  </ButtonGroup>
</template>

<script>
export default {
    props:{
        BottonGroupStore:Array
    },
    methods:{
        emitevents(item){
            this.$emit('emitevents',item)
        }
    }
};
</script>

<style>
</style>
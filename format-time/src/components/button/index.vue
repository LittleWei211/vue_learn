<template>
    <div :class="type=='Default'? 'btn default':type=='primary'?'btn primary':type=='danger'?'btn danger':'btn default'">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name:'alley-Button',
    props:{
        type:{
            type:String,
            default:'Default'
        }
    }
}
</script>
<style scoped>
.btn{
    width: 100px;
    height: 40px;
    color:#fff;
    text-align: center;
    line-height: 40px;
    border-radius: 6px;
}
.default{
    background-color: skyblue;
}
.primary{
    background-color: blue;
    background-color: lightblue;
    background-color: pink;
}
.danger{
    background-color: red;
}

</style>
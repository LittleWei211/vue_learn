<template>
    <div class="">
        <p v-pin:[cssText]>{{title}}</p>
        <slot></slot>
    </div>
</template>

<script>

export default {
    props:{
        cssText:{
            type:String
        },
        title:{
            type:String
        }
    },
    data() {
        return {
            pd:{
                position:'fixed',
                //cssText:'top:200px; left:200px;' 
            }
        };
    },
    directives:{
        pin:{
            bind (el, binding, vnode) {
                console.log(binding.arg);
                //el.style.position = binding.arg.position;
                //let derection = binding.arg.derec;
                //el.style[derection] = binding.value +"px";
                el.style.cssText = binding.arg;
                
            }
        }
    },
    components: {},
    methods: {},
    created() {},
    mounted() {}
    }
</script>
<style scoped>

</style>
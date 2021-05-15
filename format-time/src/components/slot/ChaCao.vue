<template v-slot="header">
    <div class="">
        <div>头部</div>
        <slot></slot>
        <br>
        <slot name="footer"></slot>
        <br/>
        <slot name="showChildData" :userName="userName"></slot>
    </div>
</template>

<script>

export default {
    name:"ChaCao",
    data() {
        return {
            userName:'lxw'
        };
    },
    components: {},
    methods: {},
    created() {},
    mounted() {
        console.log(this.$slots);
        console.log(this.$scopedSlots.default());
    }
    }
</script>
<style scoped>
</style>
<template>
    <div>
        <nv-prompt content=""></nv-prompt>
        <router-view></router-view>
    </div>
</template>
<script>

    import prompt from "../components/NewsView.vue"

    var vm = {
        components:{
            'nvPrompt':prompt
        }
    };
    export default vm;

</script>
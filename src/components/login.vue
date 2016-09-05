<template>
    <div>login.vue</div>
    <div  @click='login'>DADOS</div>
</template>

<script>
    import ajax from "../../ex/ajax"
    export default{
        data(){

            return {
                msg: {
                    activityRegisterChnlId:"1234"
                }
            }
        },
        methods: {
            login(){
                var me = this;
                ajax.login(me.msg, function (rs) {
                    console.log(rs);
                })
            }

        }
    }
</script>
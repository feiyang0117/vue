<template>
    <div>
        <input value="" v-model="msg.username" name="username">
        <div>{{msg.username}}</div>
        <input type="button" @click="send">
    </div>

</template>

<script>
    import $ from 'jquery'

    export default {

        name: 'NewsView',

        components: {

        },

        data () {
            return {
                msg: {
                    username: ""
                }
            }
        },

        created () {

        },

        destroyed () {

        },

        methods: {

            send () {
                var me = this;
//                $.ajax({
//                    type: "post",
//                    //url: "http://localhost:3000/index",
//                    data: {
//                        username: me.msg.username
//                    },
//                    dataType: "json",
//                    success: function (data) {
//                        console.log(data);
//                    },
//                    error: function (err) {
//                        console.log(err);
//                    }
//                });
            }
        }
    }
</script>

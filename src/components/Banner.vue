<template>
    <div class="banner" v-show="src">
        <img :src="src">
    </div>
</template>

<style lang="less">
    .banner{
        img{width: 100%;}
    }
</style>

<script>
    export default {
        props: {
            src: {
                type: String,
                required: true
            }
        }
    }
</script>

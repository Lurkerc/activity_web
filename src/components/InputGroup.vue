<template>
    <group>
        <x-input title="姓　　名" placeholder="请输入参加活动的名字" is-type="china-name" v-if="input.indexOf('name') > -1"></x-input>
        <x-input title="手机号码" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
        <x-input title="年　　龄" placeholder="2岁以上" keyboard="number" is-type="number" :max="2" v-if="input.indexOf('age') > -1"></x-input>
        <x-input title="宝宝名字" placeholder="请输入宝宝名字" is-type="china-name"></x-input>
        <x-input title="宝宝年龄" placeholder="2岁以上" keyboard="number" v-on:on-change="ageTest" :max="2"></x-input>
        <x-input title="民　　族" placeholder="请输入民族：汉" type="text" v-on:on-change="nationTest" :max="5"></x-input>
    </group>
</template>

<script>
    import {XInput, Group} from 'vux';

    export default {
        props: {
            input: {
                type:Array,
                required: true
            }
        },
        data () {
            return {

            }
        },
        components: {
            XInput,
            Group
        },
        methods: {
            ageTest (age) {
                console.log(age);
            },
            nationTest (val) {
                console.log(val);
            }
        }
    }
</script>

<style lang="less">
    .weui-cells{font-size: inherit !important;
        &.vux-no-group-title{margin-top: 0;}
    }
</style>

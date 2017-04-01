<template>
    <group>
        <x-input title="姓　　名" placeholder="请输入参加活动的名字" is-type="china-name" v-model="name" v-show="input.indexOf('name') > -1" v-on:on-change="upData('name')"></x-input>
        <x-input title="手机号码" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" v-model="phone" v-show="input.indexOf('phone') > -1" v-on:on-change="upData('phone')"></x-input>
        <x-input title="年　　龄" placeholder="请输入年龄" keyboard="number" is-type="number" v-on:on-change="upData('age')" :max="2" v-model="age" v-show="input.indexOf('age') > -1"></x-input>
        <x-input title="民　　族" placeholder="请输入民族：汉" type="text" v-on:on-change="upData('user_nation')" :max="5" v-model="user_nation" v-show="input.indexOf('user_nation') > -1"></x-input>
        <x-input title="宝宝名字" placeholder="请输入宝宝名字" is-type="china-name" v-model="baby_name" v-show="input.indexOf('baby_name') > -1" v-on:on-change="upData('baby_name')"></x-input>
        <x-input title="宝宝年龄" placeholder="宝宝年龄2岁以上" keyboard="number" v-on:on-change="upData('baby_age')" :max="2" v-model="baby_age" v-show="input.indexOf('baby_age') > -1"></x-input>
        <x-textarea title="备　　注" placeholder="您需要告诉我们什么" :show-counter="false" :rows="1" ref="autosize" :max="200" v-model="user_input" v-show="input.indexOf('user_input') > -1" v-on:on-change="upData('user_input')"></x-textarea>
    </group>
</template>

<script>
    import {XInput, XTextarea, Group} from 'vux';
    import Autosize from 'autosize';

    export default {
        props: {
            input: {
                type:Array,
                required: true
            }
        },
        data () {
            return {
                name: '', // 姓名
                phone: '', // 手机号
                age: '', // 年龄
                user_nation: '', // 所在地区
                baby_name: '', // 抱抱名字
                baby_age: '', // 宝宝年龄
                user_input: '', // 用户备注
                inputData: this.getDataVal()
            }
        },
        components: {
            XInput,
            XTextarea,
            Group
        },
        methods: {
            upData (name) {
                this.inputData[name] = this[name];
                // 触发组件的input完成v-model
                this.$emit('input',this.inputData);
            },
            getDataVal () {
                let obj = new Object();
                this.input.map((val)=>{
                    obj[val] = this[val] || '';
                });
                return obj
            }
        },
        watch: {
            input: function (arr) {
                this.inputData = this.getDataVal();
                this.$emit('input',this.inputData);
            }
        },
        mounted () {
            Autosize(this.$refs.autosize.$refs.textarea)
        }
    }
</script>

<style lang="less">
    .weui-cells{font-size: inherit !important;
        &.vux-no-group-title{margin-top: 0;}
    }
</style>

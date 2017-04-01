<template>
    <div class="app">
        <div class="body" v-if="!loading.state">
            <banner :src="output.sign_img"/>
            <div class="main">
                <!-- 活动标题 -->
                <div class="signTitle"><p>{{ output.sign_title }}</p></div>
                <p class="signTitleItem">活动　　时间：<span class="signTitleText">{{ output.start_time }}</span></p>
                <p class="signTitleItem">报名截止时间：<span class="signTitleText">{{ output.end_time }}</span></p>
                <p class="signTitleItem">活动　　地点：<span class="signTitleText">{{ output.sign_addr }}</span></p>
                <p class="signTitleItem">活动　　介绍：</p>
                <div class="signTitleText" v-html="output.sign_text"></div>
                <button-tab v-model="viewMore">
                    <button-tab-item @on-item-click="viewActivity(0)">当前活动</button-tab-item>
                    <button-tab-item @on-item-click="viewActivity(1)"><span class="vux-reddot-s">更多活动</span></button-tab-item>
                </button-tab>
                <group>
                    <popup-picker :show="popupShow" :show-cell="false" title="TEST" :data="moreAct" v-model="viewAct" @on-hide="viewActivity(0)"></popup-picker>
                </group>
                <input-group v-bind:input="output.sign_input" v-model="input"></input-group>
                <x-button type="primary" action-type="button" :show-loading="btnLoading" @click.native="submitData">立即预约</x-button>
                <toast v-model="toastOpt.state" :type="toastOpt.type" :text="toastOpt.text"></toast>
            </div>
        </div>
        <loading v-model="loading.state" :text="loading.text" :time="1000"></loading>
    </div>
</template>

<script>
    var qs = require('qs');

    import Banner from './components/Banner';
    import InputGroup from './components/InputGroup';
    import { Loading, ButtonTab, ButtonTabItem, PopupPicker, Group, XButton, Toast } from 'vux';

    const oldAid = 0;

    export default {
        data () {
            return {
                loading:{ // 加载图标
                    state: true,
                    text: '活动狂奔中'
                },
                viewMore: 0,
                popupShow: false,
                viewAct: ['3'], // 选中的活动
                output: { // 渲染数据
                    id: 0,
                    sign_title: '', // 活动名称
                    start_time: '', // 活动时间
                    sign_addr: '', // 活动地点
                    end_time: '', // 活动报名截止时间
                    sign_img: '', // 活动图片
                    sign_text: '', // 活动描述
                    sign_input: [] // 选中的输入属性
                },
                moreAct: [],
                input:{}, // 提交的数据
                btnLoading: false, // 提交按钮加载状态
                toastOpt: {
                    state: false, // 显示状态
                    type: 'success', // success成功|warn失败
                    text: '报名成功' // 提示文本 报名成功|你已报名
                }
            }
        },
        methods: {
            getData (aid) {
                var _this = this;
                // 进行请求数据
                if(aid){
                    oldAid = aid;
                }
                // 提交数据
                _this.$http.get('/' + (aid ? '&id=' + aid : ''))
                .then(function(response){
                    _this.moreAct[0] = response.data.lists;
                    _this.output = response.data.output;
                    _this.viewAct[0] = response.data.output.id;
                    oldAid = response.data.output.id;
                    setTimeout(function(){
                        _this.loading.state = false; // 请求成功取消loading
                    },1000);
                })
                .catch(function(error){
                    _this.loading.text = '加载失败';
                })
            },
            viewActivity (type) {
                if(type == 0){
                    this.popupShow = false;
                    this.viewMore = 0;
                }else{
                    this.popupShow = true;
                }
            },
            submitData () {
                var _this = this;
                if(_this.btnLoading){
                    return;
                }
                // 资料填写检测
                if(isEmptyObject(_this.input)){
                    _this.toastOpt.type = 'warn';
                    _this.toastOpt.text = '资料未填写';
                    _this.toastOpt.state = true;
                    return;
                }
                // 按钮加载状态
                _this.btnLoading = true;
                // 提交数据
                _this.$http.post('',qs.stringify({input:_this.input,sid:_this.output.id})).then(function(response){
                    // 成功
                    switch (response.data.status) {
                        case '1':
                            _this.toastOpt.type = 'success';
                            break;
                        default:
                            _this.toastOpt.type = 'warn';
                            break;
                    }

                    _this.toastOpt.text = response.data.info;
                    _this.toastOpt.state = true;
                })
                .catch(function(error){
                    // 失败
                    _this.toastOpt.type = 'text';
                    _this.toastOpt.text = '请检查网络是否可用';
                    _this.toastOpt.state = true;
                });
                setTimeout(function(){
                    _this.btnLoading = false;
                },1000);
            }
        },
        components: {
            Banner,
            Loading,
            ButtonTab,
            ButtonTabItem,
            Group,
            PopupPicker,
            InputGroup,
            XButton,
            Toast
        },
        watch: {
            viewAct: function(val) {
                if(val[0] != oldAid){
                    this.getData(val[0])
                }
            }
        },
        created () {
            this.getData()
        }
    }

    /**
     * 检测对象是否为空
     */
    function isEmptyObject(e) {  
        var t;  
        for (t in e){
            return !1;
        }
        return !0
    }  
</script>

<style lang="less">
    @import '~vux/src/styles/reset';
    @import './assets/less/style';

    .vux-button-group{margin: 20px 0;}
    .weui-btn.weui-btn_primary{margin-bottom: 10px;margin-top: 20px;}
</style>

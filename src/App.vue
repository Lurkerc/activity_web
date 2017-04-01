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
                viewAct: ['3'],
                output: {
                    id: 1,
                    sign_title: '活动名称', // 活动名称
                    start_time: '2017-04-01 08:00', // 活动时间
                    sign_addr: '详细的活动地址', // 活动地点
                    end_time: '2017-04-01 08:00', // 活动报名截止时间
                    sign_img: 'http://www.htmlsucai.com/demo/20161113/%e6%89%8b%e6%9c%ba%e5%be%ae%e4%bf%a1%e5%91%a8%e5%b9%b4%e5%ba%86%e6%8a%a5%e5%90%8d%e6%b4%bb%e5%8a%a8%e9%a1%b5%e9%9d%a2%e6%a8%a1%e6%9d%bf%e4%b8%8b%e8%bd%bd/images/banner.jpg', // 活动图片
                    sign_text: '<p>这是活动描述信息</p>', // 活动描述
                    sign_input: ['name', 'phone', 'age'] // 选中的输入属性
                },
                moreAct: [[ // 活动列表
                    {name:'活动一',value:1},
                    {name:'活动二',value:2},
                    {name:'活动三',value:3},
                    {name:'活动四',value:4},
                    {name:'活动五',value:5},
                ]],
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
                console.log('初始化数据' + (aid || 0));
                if(aid){
                    oldAid = aid;
                }
                setTimeout(function(){
                    _this.loading.state = false; // 请求成功取消loading
                },500)
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
                _this.btnLoading = true;
                _this.toastOpt.state = true;
                console.log(_this.input);
                setTimeout(function(){
                    _this.btnLoading = false
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
</script>

<style lang="less">
    @import '~vux/src/styles/reset';
    @import './assets/less/style';

    .vux-button-group{margin: 20px 0;}
    .weui-btn.weui-btn_primary{margin-bottom: 10px;margin-top: 20px;}
</style>

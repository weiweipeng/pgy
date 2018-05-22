<template>
  <div id="app">
  	<keep-alive>
      <router-view></router-view>
   </keep-alive>
    <ul class="tabList" id="tabList" v-show="$store.state.tabListShow">
    	<li>
    		<router-link :to="'/index'">
    			<i class="iconfont" :class="iconShow[0].icon ? 'icon-tabbar_shouye' : 'icon-tabbar_shouye1'"></i>
    			<span>首页</span>
    		</router-link>
    	</li>
    	<li>
    		<router-link :to="{path:'/train',query: {tabIndex: 2}}">
    			<i class="iconfont" :class="iconShow[1].icon ? 'icon-tabbar_dangjianjiaoyu' : 'icon-tabbar_dangjianjiaoyu1'"></i>
    			<span>党性教育</span>
    		</router-link>
    	</li>
    	<li>
    		<router-link :to="{path:'/activity',query: {tabIndex: 3}}">
    			<i class="iconfont" :class="iconShow[2].icon ? 'icon-tabbar_dangjianhuodong' : 'icon-tabbar_dangjianhuodong1'"></i>
    			<span>支部风采</span>
    		</router-link>
    	</li>
    	<li>
    		<router-link :to="level == '4' ? {path:'/personData',query: {tabIndex: 4, level: level,ouid: ouid, org_id: org_id}} : {path:'/partyData',query: {tabIndex: 4, level: level,ouid: ouid, org_id: org_id}}">
					<i class="iconfont" :class="iconShow[3].icon ? 'icon-tabbar_dangyuanzuzhi' : 'icon-tabbar_dangyuanzuzhi1'"></i>
					<span>党建管理</span>
				</router-link>
    	</li>
    	<li>
    		<router-link :to="{path:'/my',query: {tabIndex: 5}}">
    			<i class="iconfont" :class="iconShow[4].icon ? 'icon-tabbar_wode' : 'icon-tabbar_wode1'"></i>
    			<span>我的</span>
    		</router-link>
    	</li>
    </ul>
    <!--绑定-->
		<authentication ref="authenticationShow"></authentication>
  </div>
</template>

<script type="text/ecmascript-6">
import wx from 'weixin-js-sdk'
import store from '@/vuex/store'
import authentication from './components/authentication/authentication.vue'
export default {
  name: 'app',
  store,
  data: function() {
  	return {
    	iconShow: [{icon: true},{icon: false},{icon: false},{icon: false},{icon: false}],
    	level: null,
    	ouid: null,
    	org_id: null
  	}
	},
	components: {
	  authentication: authentication
	},
  watch: {
		$route(to, from) {
			if(from.name == "articleDetail" || from.name == "article"){
				this.shareOpation();//微信分享
			}
			this.is_weixn();//判断是否是微信内置浏览器
			if(to.name == "index" || to.name == "train" || to.name == "activity" || to.name == "partyData" || to.name == "my" || to.name == 'partyRank' || to.name == 'personData' || to.name == 'personRank'){
				if(store.state.tabListShow === false){
					store.commit('tabListShow');
				}
				
				this.iconShow = [{icon: false},{icon: false},{icon: false},{icon: false},{icon: false}];
				//判断点击的tab 更换icon
				if(to.name == "index"){
					this.iconShow[0].icon = true;
				}else if(to.name == "train"){
					this.iconShow[1].icon = true;
				}else if(to.name == "activity"){
					this.iconShow[2].icon = true;
				}else if(to.name == "partyData"){
					this.iconShow[3].icon = true;
				}else if(to.name == "my"){
					this.iconShow[4].icon = true;
				}else{
					return false;
				}
				
			}else{
				if(store.state.tabListShow === true){
					store.commit('tabListHide');
				}
				
			}
		}
  },
  mounted: function() {
  	var _this = this;
  	_this.onload();
  	if(_this.$route.query.tabIndex || _this.$route.query.tabIndex != undefined){
  		var tabIndex = _this.$route.query.tabIndex;
  		_this.init(tabIndex);
  	}else{
  		_this.init(1);
  	}
  	window.onpopstate = () => {
  		tabIndex = _this.$route.query.tabIndex;
	  	_this.init(tabIndex);
	  }
  	this.bindUser();
    this.cacheUrl();
    this.shareOpation();//微信分享
	},
	methods: {
		onload: function(){
			//这里主要防止路由跳转之后，人为刷新，造成vuex 状态重置
			var nowRoute = this.$route.path.split('/')[1];
		  	if(nowRoute == "index" || nowRoute == "train" || nowRoute == "activity" || nowRoute == "partyData" || nowRoute == "my" || nowRoute == 'partyRank' || nowRoute == 'personData' || nowRoute == 'personRank'){
		  		store.commit('tabListShow');
		  	}else{
		  		store.commit('tabListHide');
		  	}
		},
		init: function(tabIndex){
			//初始化
			this.iconShow = [{icon: false},{icon: false},{icon: false},{icon: false},{icon: false}];
			if(tabIndex == '1'){
	  		this.iconShow[0].icon = true;
	  	}else if(tabIndex == '2'){
	  		this.iconShow[1].icon = true;
	  	}else if(tabIndex == '3'){
	  		this.iconShow[2].icon = true;
	  	}else if(tabIndex == '4'){
	  		this.iconShow[3].icon = true;
	  	}else if(tabIndex == '5'){
	  		this.iconShow[4].icon = true;
	  	}else{
	  		this.iconShow[0].icon = true;
	  	}
		},
		cacheUrl: function(){
			if (!store.state.url) {
			  store.commit('setUrl', document.URL);
			}
		},
		bindUser: function(){
			var _this = this;
		    _this.$api.get('index.php/Home/User/getMemberOpenidIsBind', null, function(res){
		    	console.log(res);
		    	if(res.code == "200"){
		    		_this.level = res.level;
		    		_this.ouid = res.ouid;
		    		_this.org_id = res.org_id;
		    		store.commit('authenticationSuccess');
		    	}else if(res.code == "300"){
		    		mui.toast('您还没有绑定！');
		    		_this.$refs.authenticationShow.authenticationShow();
		    	}else{
		    		return false;
		    	}
		    },function(err){
		    	if(err){
		    		console.log(err);
		    	}
		    })
		},
		getQueryString: function(name){
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if(r!=null)return  unescape(r[2]); return null;
		},
		is_weixn: function(){
			//判断微信浏览器
			var ua = navigator.userAgent.toLowerCase(); 
			if(ua.match(/MicroMessenger/i)=="micromessenger") { 
				return true; 
			} else { 
				mui.alert('请在微信内打开！');
			}
		},
		shareOpation: function(){
			var _this = this;
			var url = '';
			// 判断是否是ios微信浏览器
		   	if (window.__wxjs_is_wkwebview === true) {
		    	url = _this.$store.state.url.split('#')[0];
		   	} else {
		    	url = window.location.href.split('#')[0];
		   	}
		    _this.$api.post('ts.php', {url:url}, function(res){
		    	console.log(res);
		    	if(res){
		    		wx.config({
					    debug: false,
					    appId: res.appId,
					    timestamp: res.timestamp,
					    nonceStr: res.nonceStr,
					    signature: res.signature,
					    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']
					});
					wx.ready(function() {
						//设置分享
						wx.onMenuShareTimeline({
					        title: '中浦智慧党建', // 分享标题
					        desc: '中国浦东干部学院智慧党建平台欢迎您', // 分享的内容简介
					        link: 'http://dj.celap.cn/pgy/index.html#/index',//分享的链接地址
					        imgUrl: 'http://dj.celap.cn/pgy/logo.png', // 分享图标
					        type: 'link', // 分享类型,music、video或link，不填默认为link
					        success: function () {
					        	console.log('分享成功！');
					        }
			        	});
				        wx.onMenuShareAppMessage({
					        title: '中浦智慧党建', // 分享标题
					        desc: '中国浦东干部学院智慧党建平台欢迎您', // 分享的内容简介
					        link: 'http://dj.celap.cn/pgy/index.html#/index',//分享的链接地址
					        imgUrl: 'http://dj.celap.cn/pgy/logo.png', // 分享图标
					        type: 'link', // 分享类型,music、video或link，不填默认为link
					        success: function () {
					        	console.log('分享成功！');
					        }
			        	});
		        	})
		    	}else{
		    		return false;
		    	}
		    },function(err){
		    	if(err){
		    		console.log(err);
		    	}
		    })
		}
		
	}
}
</script>

<style lang="scss" type="text/css">
body{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
}
#app{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow-y: auto;
}
.tabList{
	position: fixed;
	bottom: 0;
	left: 0;
	background: #fff;
	-webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  z-index: 99;
  li{
  	float: left;
  	width: 20%;
  	a{
  		display: block;
  		text-align: center;
  		padding: .1rem .2rem;
  		height: 1.3rem;
  		.iconfont{
  			color: #999;
		    display: block;
		    font-size: .6rem;
  		}
  		span{
  			color: #929292;
  			font-size: .34rem;
  			vertical-align: text-top;
  		}
  		&.active{
  			span{
  				color: #e51c23;
  			}
  			.iconfont{
	  			color: #e51c23;
	  		}
  		}
  	}
  }
}
</style>

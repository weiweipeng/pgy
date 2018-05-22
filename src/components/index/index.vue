<template>
	<div id="index">
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<!--banner-->
				<div id="slider1" class="mui-slider">
					<div class="mui-slider-group mui-slider-loop">
						<!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
						<div class="mui-slider-item mui-slider-item-duplicate">
							<router-link :to="{path:'/articleDetail',query: {article_id: sliderData[sliderData.length - 1].article_id, flag_type: 4, status: 4}}">
								<img :src="sliderData[sliderData.length - 1].adfile">
								<p class="mui-slider-title"><span v-text="sliderData[sliderData.length - 1].adname"></span></p>
							</router-link>
						</div>
						<div class="mui-slider-item" v-for="(slider, index) in sliderData">
							<router-link :to="{path:'/articleDetail',query: {article_id: slider.article_id, flag_type: 4, status: 4}}">
								<img :src="slider.adfile">
								<p class="mui-slider-title"><span v-text="slider.adname"></span></p>
							</router-link>
						</div>
						<!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
						<div class="mui-slider-item mui-slider-item-duplicate">
							<router-link :to="{path:'/articleDetail',query: {article_id: sliderData[0].article_id, flag_type: 4, status: 4}}">
								<img :src="sliderData[0].adfile">
								<p class="mui-slider-title"><span v-text="sliderData[0].adname"></span></p>
							</router-link>
						</div>
					</div>
					<div class="mui-slider-indicator mui-text-right">
						<div class="mui-indicator" :class="index === 0 ? 'mui-active' : ''" v-for="(item, index) in sliderData.length"></div>
					</div>
				</div>
				
				
				<!--topBar-->
				<ul class="topBarList mui-text-center mui-clearfix">
					<li>
						<!--<div id="tp-weather-widget"></div>-->
						<div class="weather" v-if="weatherData.length != 0">
							<img :src="'//weixin.jirengu.com/images/weather/code/'+ weatherData[0].now.code +'.png'" alt="" />
							<div>
								<p>
									<span>今日</span>
									<span v-text="weatherData[0].now.text"></span>
									<span>（上海）</span>
								</p>
								<p>
									<span class="red-num" v-text="weatherData[0].now.temperature + '℃'"></span>
									<span v-text="'空气：'+weatherData[0].now.air_quality.city.quality"></span>
								</p>
							</div>
						</div>
					</li>
					<li>
						<router-link to="/schedule">
							<i class="iconfont icon-wodericheng"></i>
							<span>日程</span>
						</router-link>
					</li>
					<li>
						<router-link to="/myNews">
							<span class="mui-badge mui-badge-danger" v-if="info_number != '0'">{{info_number}}</span>
							<i class="iconfont icon-xiangqing_pinglun"></i>
							<span>消息</span>
						</router-link>
					</li>
				</ul>
				<!--iconList-->
				<ul class="iconList mui-text-center mui-clearfix">
					<li>
						<router-link to="/threeM_oneC">
							<i class="iconfont icon-shouye_sanhuiyike"></i>
							<span>三会一课</span>
						</router-link>
					</li>
					<li>
						<router-link :to="{path:'/branchLife',query: {category_id: 517,title: '主题党日'}}">
							<i class="iconfont icon-shouye_zhibushenghuo"></i>
							<span>主题党日</span>
						</router-link>
					</li>
					<li>
						<router-link :to="{path:'/branchLife',query: {category_id: 518,title: '民主生活会'}}">
							<i class="iconfont icon-shouye_minzhushenghuo"></i>
							<span>民主生活会</span>
						</router-link>
					</li>
				</ul>
				<ul class="iconList mui-text-center mui-clearfix">
					<!--<li>
						<router-link to="/study">
							<i class="iconfont icon-shouye_dangyuanzhengwen"></i>
							<span>党员学习</span>
						</router-link>
					</li>-->
					<li>
						<router-link :to="{path:'/branchLife',query: {category_id: 523,title: '民主评议'}}">
							<i class="iconfont icon-index_mzpy"></i>
							<span>民主评议</span>
						</router-link>
					</li>
					<li>
						<router-link to="/proposal">
							<i class="iconfont icon-shouye_jianyanxiance"></i>
							<span>建言献策</span>
						</router-link>
					</li>
					<li>
						<router-link :to="{path:'/mienList',query: {category_id: 520}}">
							<i class="iconfont icon-shouye_dangjianguanli"></i>
							<span>党建制度</span>
						</router-link>
					</li>
					<!--<li>
						<router-link :to="level == '4' ? {path:'/personData',query: {level: level,ouid: ouid, org_id: org_id}} : {path:'/partyData',query: {level: level,ouid: ouid, org_id: org_id}}">
							<i class="iconfont icon-data"></i>
							<span>党建管理</span>
						</router-link>
					</li>-->
				</ul>
				<!--imgList-->
				<ul class="imglist mui-clearfix">
					<li>
						<router-link :to="{ path:'train', query: {sliderNum: 0, tabIndex: 2} }">
							<div class="leftDiv">
								<p>习语</p>
								<span>学习习近平总书记关于党建</span>
							</div>	
							<div class="rightDiv">
								<img src="../../assets/images/index/pic1.png">
							</div>
						</router-link>
					</li>
					<li>
						<router-link :to="{path:'train', query: {sliderNum: 1, tabIndex: 2}}">
							<div class="leftDiv">
								<p>两学一做</p>
								<span>学党章党规、学系列讲话、做人民好干部</span>
							</div>
							<div class="rightDiv">
								<img src="../../assets/images/index/pic2.png">
							</div>
						</router-link>
					</li>
					<li>
						<router-link :to="{path:'train', query: {sliderNum: 2, tabIndex: 2}}">
							<div class="leftDiv">
								<p>从严治党</p>
								<span>治国必先治党、治党务必从严</span>
							</div>
							<div class="rightDiv">
								<img src="../../assets/images/index/pic3.png">
							</div>
						</router-link>
					</li>
					<li>
						<router-link :to="{path:'train', query: {sliderNum: 3, tabIndex: 2}}">
							<div class="leftDiv">
								<p>筑梦中国</p>
								<span>弘扬中国精神、凝聚中国力量</span>
							</div>
							<div class="rightDiv">
								<img src="../../assets/images/index/pic4.png">
							</div>
						</router-link>
					</li>
				</ul>
			
			</div>
		</div>
		
		<!--每日一学弹窗-->
		<transition name="fade">
			<div class="popover-box" v-show="msgPopoverShow" transition="fade">
				<div class="msg-popover">
					<p class="msg-title">每日一学</p>
					<span class="mui-icon mui-icon-closeempty" @click="msgPopoverShow = false"></span>
					<p class="mui-ellipsis article-title" v-text="dayStudy.title"></p>
					<div class="msg-cont" v-text="dayStudy.content"></div>
					<router-link :to="{path:'/articleDetail',query: {article_id: dayStudy.id, flag_type: 4, status: dayStudy.status}}">
						<button class="submit-btn">进入学习</button>
					</router-link>
				</div>
			</div>
		</transition>
		
		<!--<authentication ref="authenticationShow"></authentication>-->
		<!--loading-->
		<loading v-show="loadShow"></loading>
	</div>
</template>
<script type="text/ecmascript-6">
import store from '@/vuex/store'
import loading from '../loading/loading.vue'
//import authentication from '../authentication/authentication.vue'
export default {
  	name: 'index',
	store,  	
  	data: function() {
      	return {
        	msgPopoverShow: false,
        	dayStudy: {},
        	firstShow: false,
        	weatherData: [],
        	level: null,
        	ouid: null,
        	org_id: null,
        	info_number: 0,
        	sliderData: [
        		{
        			adfile: '',
        			adname: ''
        		}
        	],
        	loadShow: true
      	}
   	},
   	components: {
	  	loading: loading
	},
  	activated: function(){
		this.bindUser();
	},
   	mounted: function() {
		//初始化滚动组件
		var _this = this;
   		mui('.mui-scroll-wrapper').scroll({deceleration:0.002});
   		_this.resSlider();
   		_this.onload();
   		//判断每日一学是显示，间隔为12小时
   		var msg = _this.getCookie('msgPopover');
   		if(msg === null){
   			_this.resPopoverData();
   			_this.msgPopoverShow = true;
			_this.setCookie('msgPopover','true', 1);
		}else{
			_this.msgPopoverShow = false;
		}
	},
   	methods: {
   		bindUser: function(){
   			var _this = this;
		    _this.$api.get('index.php/Home/User/getMemberOpenidIsBind', null, function(res){
		    	console.log(res);
		    	if(res.code == "200"){
		    		_this.level = res.level;
		    		_this.ouid = res.ouid;
		    		_this.info_number = res.info_number;
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
   		onload: function(){
   			//加载天气
//	    	(function(T,h,i,n,k,P,a,g,e){g=function(){P=h.createElement(i);a=h.getElementsByTagName(i)[0];P.src=k;P.charset="utf-8";P.async=1;a.parentNode.insertBefore(P,a)};T["ThinkPageWeatherWidgetObject"]=n;T[n]||(T[n]=function(){(T[n].q=T[n].q||[]).push(arguments)});T[n].l=+new Date();if(T.attachEvent){T.attachEvent("onload",g)}else{T.addEventListener("load",g,false)}}(window,document,"script","tpwidget","//widget.seniverse.com/widget/chameleon.js"))
//			tpwidget("init", {
//			    "flavor": "slim",
//			    "location": "WTW3SJ5ZBJUY",
//			    "geolocation": "enabled",
//			    "language": "zh-chs",
//			    "unit": "c",
//			    "theme": "chameleon",
//			    "container": "tp-weather-widget",
//			    "bubble": "enabled",
//			    "alarmType": "circle",
//			    "uid": "U54A6E8D69",
//			    "hash": "498fa1ccb9efd5dbe6e1333dc9354049"
//			});
//			tpwidget("show");
			var _this = this;
			_this.$api.get('//weixin.jirengu.com/weather?key=study_javascript_in_jirengu.com', null, function(res){
		    	console.log(res);
		    	if(res.status == 'OK'){
		    		_this.weatherData = res.weather;
		    	}else{
		    		mui.toast('天气获取失败！');
		    	}
		    },function(err){
		    	if(err){
		    		mui.toast('天气获取失败！');
		    		console.log(err);
		    	}
		    })
			
			
   		},
   		resSlider: function(){
   			//请求轮播图
   			var _this = this;
   			_this.$api.get('index.php/Home/Api/getAdsListData', null, function(res){
		    	console.log(res);
		    	if(res.code == "200"){
		    		_this.sliderData = res.data;
		    		if(res.data.length == 1){
		    			setTimeout(function(){
			    			mui("#slider1").slider({
								interval: 0
							});
			    		},4000)
		    		}else{
		    			setTimeout(function(){
			    			mui("#slider1").slider({
								interval: 4000
							});
			    		},4000)
		    		}
			    		
			    		
		    	}else{
		    		mui.toast('轮播图获取失败！');
		    		return false;
		    	}
		    	_this.loadShow = false;
		    },function(err){
		    	if(err){
		    		_this.loadShow = false;
		    		mui.toast('轮播图获取失败！');
		    		console.log(err);
		    	}
		    })
   		},
   		resPopoverData: function(){
   			var _this = this;
   			_this.$api.get('index.php/Home/Api/everyDayStudy', null, function(res){
		    	console.log(res);
		    	if(res.code == "200"){
		    		var cont=res.data.content.replace(/<\/?.+?>/g,"");
 					var content=cont.replace(/ /g,"");
 					
		    		_this.dayStudy = res.data;
		    		_this.dayStudy.content = content;
		    		_this.msgPopoverShow = true;
		    	}else{
		    		_this.msgPopoverShow = false;
		    		console.log('每日一学获取失败！')
		    		return false;
		    	}
		    },function(err){
		    	if(err){
		    		_this.msgPopoverShow = false;
		    		console.log(err);
		    	}
		    })
   		},
   		setCookie: function(name, value, time) { 
		    var Days = time;
		    var exp = new Date();
		    exp.setTime(exp.getTime() + Days*24*60*60*1000);
		    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
		},
		getCookie: function(name) { 
		    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); //正则匹配
		    if(arr=document.cookie.match(reg)){
		      	return unescape(arr[2]);
		    }
		    else{
		     	return null;
		    }
		}
   	}
}
</script>
<style lang="scss" type="text/css">
  @import "../../assets/css/index/index.scss";
</style>
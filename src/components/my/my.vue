<template>
	<div id="my">
		<div class="mui-scroll-wrapper bottom1_3">
			<div class="mui-scroll">
				<div class="banner">
					<div class="user-info">
						<div class="header">
							<a>
				            	<img :src="headerImg">
				            	<input type="file" name="files" id="img-file-input" >
				            </a>
				        </div>
				        <!--<div class="userInfo" v-show="$store.state.authentication ||  authenticationSuccess">-->
				        <div class="userInfo">
				        	<span v-text="userInfo.name"></span>
					        <p v-show="userInfo.entry_date != null || userInfo.entry_date != ''">
					        	<i class="iconfont icon-party"></i>
					        	<span v-text="'入党时间：' + userInfo.entry_date"></span>
					        </p>
					        <p v-if="userInfo.fullname && userInfo.fullname.length === 2">
					        	<span>所属组织：</span>
					        	<span v-for="(item, index) in userInfo.fullname" v-html="item + '&nbsp;'" :class="index === 1 ? 'team' : ''"></span>
					        </p>
					        <p v-if="userInfo.fullname && userInfo.fullname.length !== 2">
					        	<span>所属组织：</span>
					        	<span v-for="(item, index) in userInfo.fullname" v-html="item + '&nbsp;'" :class="index === 2 ? 'team' : ''"></span>
					        </p>
					        <div class="grade">
					        	<span class="leve">
					        		<i class="iconfont icon-vimeo"></i>
					        		<span v-text="userInfo.level"></span>
					        	</span>
					        	<span>活跃度</span>
					        </div>
				        </div>
				        <!--</div>-->
				        <!--<div class="goAuthentication" v-show="!$store.state.authentication && authenticationSuccess"  @click="authenticationPopoverShow">去认证</div>-->
					</div>
						
				</div>
				<!--功能列表-->
				<ul class="mui-table-view modularList">
			        <li class="mui-table-view-cell">
			            <router-link to="/myNews" class="mui-navigate-right">
			                <i class="iconfont icon-wodexiaoxi"></i>
			               	<span>我的消息</span>
			               	<span class="mui-badge mui-badge-danger" v-show="userInfo.info_number != '0'" v-text="userInfo.info_number"></span>
			            </router-link>
			        </li>
			         <!--<li class="mui-table-view-cell">
			            <router-link to="/membershipDues" class="mui-navigate-right">
			                <i class="iconfont icon-wodedangfei"></i>
			               	<span>我的党费</span>
			            </router-link>
			        </li>-->
			        <li class="mui-table-view-cell">
			            <router-link to="/schedule" class="mui-navigate-right">
			                <i class="iconfont icon-wodericheng"></i>
			               	<span>我的日程</span>
			            </router-link>
			        </li>
			         <li class="mui-table-view-cell">
			            <router-link to="/myEssay" class="mui-navigate-right">
			                <i class="iconfont icon-wodezhengwen"></i>
			               	<span>我的征文</span>
			            </router-link>
			        </li>
			        <li class="mui-table-view-cell">
			            <router-link to="/myCollection" class="mui-navigate-right">
			                <i class="iconfont icon-wodeshoucang"></i>
			               	<span>我的收藏</span>
			            </router-link>
			        </li>
			        <!--<li class="mui-table-view-cell">
			            <router-link to="/myInformation" class="mui-navigate-right">
			                <i class="iconfont icon-wodeziliao"></i>
			               	<span>我的资料</span>
			            </router-link>
			        </li>-->
			        <li class="mui-table-view-cell">
			        	<router-link to="/organiza" class="mui-navigate-right">
			        		<i class="iconfont icon-index_zz-"></i>
			        		<span>党员组织</span>
			        	</router-link>
			        </li>
			        <li class="mui-table-view-cell">
			            <router-link :to="{path:'/partyPortrait',query: {ouid: userInfo.ouid, level: userInfo.level}}" class="mui-navigate-right">
			                <i class="iconfont icon-jifenqiandao"></i>
			               	<span>党员画像</span>
			            </router-link>
			        </li>
			        <li class="mui-table-view-cell">
			            <router-link to="/myProposal" class="mui-navigate-right">
			                <i class="iconfont icon-pengyouquan"></i>
			               	<span>我的建言献策</span>
			            </router-link>
			        </li>
			    </ul>
			    
			</div>
			<!--公司信息-->
		    <div class="company">
		    	<p><img src="../../assets/images/company_logo.png"/>技术支持：上海建朗信息科技有限公司</p>
		    	<p>网址：www.gobestsoft.com | 服务电话：021-65106875</p>
		    </div>
		</div>
		
	    <authentication ref="authenticationShow"></authentication>
	    <!--头像裁剪-->
		<div ontouchstart="" class="photoClip" v-show="photoClipShow">
			<div id="clipArea"></div>
			<button id="cancel" @click="photoClipShow = false">取消</button>
			<button id="clipBtn">完成</button>
			<div id="view"></div>
		</div>
	    <!--loading-->
		<loading v-show="loadShow"></loading>
	</div>
</template>
<script type="text/ecmascript-6">
import store from '@/vuex/store'
import loading from '../loading/loading.vue'
import authentication from '../authentication/authentication.vue'
export default {
  	name: 'my',
  	store,
  	data: function(){
      	return {
        	userInfo: {},
        	loadShow: true,
        	headerImg: '../../assets/images/header1.png',
        	img_URL: 'http://dj.celap.cn/pgy/',
        	authenticationSuccess: false,
        	photoClipShow: false
      	};
   	},
   	components: {
	  	authentication: authentication,
	  	loading: loading
	},
	activated: function(){
		this.init();
	},
	created: function() {
		var _this = this;
		var authenticationType = window.localStorage.getItem("authenticationType");
		if(authenticationType == "true"){
			store.commit('authenticationSuccess');
			_this.authenticationSuccess = true;
		}
	},
   	mounted: function() {
		this.photoClip();
		mui('.mui-scroll-wrapper').scroll({deceleration:0.002});
	},
   	methods: {
   		init: function(){
//			if(store.state.authentication === true || this.authenticationSuccess === true){
	   			var _this = this;
			    _this.$api.get('index.php/Home/ApiMy/get_push', null, function(res){
			    	console.log(res);
			    	if(res.code == "200"){
			    		_this.userInfo = res.data;
			    		_this.headerImg = res.data.header_img;
			    		_this.authenticationSuccess = true;
			    	}else{
			    		mui.toast('网络繁忙！');
			    	}
			    	setTimeout(function(){
			    		_this.loadShow = false;
			    	},1000)
			    	
			    },function(err){
			    	if(err){
			    		_this.loadShow = false;
			    		console.log(err);
			    	}
			    })
//	   		}
		},
   		authenticationPopoverShow: function(){
   			//调用子组件中的authenticationShow方法
   			this.$refs.authenticationShow.authenticationShow();
   		},
   		photoClip: function(){
   			var _this = this;
   			var clipArea = new bjj.PhotoClip("#clipArea", {
				size: [260, 260],
				outputSize: [640, 640],
				file: "#img-file-input",
				view: "#view",
				ok: "#clipBtn",
				loadStart: function() {
					console.log("照片读取中");
					_this.loadShow = true;
				},
				loadComplete: function() {
					console.log("照片读取完成");
					_this.loadShow = false;
					_this.photoClipShow = true;
				},
				clipFinish: function(dataURL) {
					_this.loadShow = true;
					_this.uploadImg(dataURL);
				}
			});
   		},
   		uploadImg: function(imgBase){
   			var _this = this;
   			var data = {
   				headerImg: imgBase
   			}
		    _this.$api.post('index.php/Home/ApiMy/update_Headimg', data, function(res){
		    	console.log(res);
		    	if(res.code == "200"){
		    		_this.headerImg = imgBase;
		    		
		    		_this.photoClipShow = false;
		    		setTimeout(function(){
		    			_this.loadShow = false;
		    			mui.alert('头像修改成功！');
		    		},1000)
		    	}else{
		    		_this.loadShow = false;
		    		_this.photoClipShow = false;
		    		mui.alert('头像修改失败！');
		    		return false;
		    	}
		    },function(err){
		    	if(err){
		    		_this.loadShow = false;
		    		_this.photoClipShow = false;
		    		mui.alert('头像修改失败！');
		    		console.log(err);
		    	}
		    })
   		}
   	}
}
</script>
<style lang="scss">
#my{
	.company{
		position: absolute;
		bottom: .15rem;
		width: 100%;
		text-align: center;
		p{
			font-size: .3rem;
			color: #aaa;
		}
		img{
			width: .6rem;
			vertical-align: middle;
		}
	}
	/*此参数为iphone4的高度限制*/
	@media screen and (max-height:480px) and (max-width:320px){
		.company{
			display: none;
		}
	}
	.banner{
		background: url(../../assets/images/my/wd-bg@3x.png) no-repeat;
		background-size: cover;
		height: 3.7rem;
		width: 100%;
		position: relative;
		.user-info{
			position: absolute;
			top: 50%;
		    -webkit-transform: translate3d(0,-50%,0);
			transform: translate3d(0,-50%,0);
			width: 100%;
		}
		.header{
			float: left;
			margin-left: .4rem;
			border-radius: 50%;
		    border: 0.08rem solid rgba(255,255,255,0.5);
		    overflow: hidden;
		    width: 2rem;
		    height: 2rem;
		    a{
		    	display: block;
		    	position: relative;
		    }
		    img{
		    	width: 100%;
		    	height: 100%;
		    }
		    #img-file-input{
				position: absolute;
			    top: 0;
			    left: 0;
			    width: 100%;
			    height: 100%;
			    opacity: 0;
			}
		}
		.userInfo{
			position: relative;
			top: 1rem;
		    overflow: hidden;
		    -webkit-transform: translate3d(0, -50%, 0);
		    transform: translate3d(0, -50%, 0);
			padding-left: .3rem;
		    color: #fff;
		    >span{
		    	font-size: 0.48rem;
		    }
		    p{
		    	width: 70%;
				white-space: initial;
		    	.icon-party{
		    		display: inline-block;
		    		width: .35rem;
		    		height: .35rem;
		    		background: #FFFD1B;
		    		border-radius: 50%;
		    		color: #E51D24;
		    		font-size: .28rem;
		    		text-align: center;
		    		line-height: .35rem;
		    	}
		    	span{
		    		line-height: .5rem;
		    		margin-top: .1rem;
			    	color: rgba(255,255,255,.8);
			    	font-size: 0.3rem;
			    	
		    	}
		    	.team{
		    		display: inline-block;
		    		line-height: 1;
				    margin-top: 0;
				    padding-left: 1.6rem;
		    	}
		    }
		    .grade{
		    	position: absolute;
			    right: 0;
			    top: 50%;
			    -webkit-transform: translate3d(0,-50%,0);
				transform: translate3d(0,-50%,0);
				background: #FD9D19;
				padding: .1rem;
    			border-radius: 1.4rem 0 0 1.4rem;
				.leve{
					position: relative;
					display: inline-block;
					background: #E51D24;
					border-radius: 50%;
					width: .7rem;
		    		height: .7rem;
		    		color: #FFFF1B;
		    		.iconfont {
		    			position: absolute;
		    			left: .1rem;
		    			top: 50%;
		    			margin-top: -.17rem;
		    			font-size: .34rem;
		    		}
		    		span{
		    			position: absolute;
		    			right: .1rem;
		    			top: 50%;
		    			margin-top: -.1rem;
		    			color: #FFFF1B;
		    			font-size: .28rem;
		    		}
				}
				span{
					color: #fff;
					font-size: .34rem;
					vertical-align: middle;
				}
		    }
		}
	    .goAuthentication{
	    	position: absolute;
		    top: 50%;
		    left: 2.7rem;
		    -webkit-transform: translate3d(0,-50%,0);
			transform: translate3d(0,-50%,0);
		    color: rgba(255, 255, 255, 0.8);
		    font-size: 0.34rem;
		    border: 1px solid rgba(255, 255, 255, 0.8);
		    display: inline-block;
		    padding: .15rem .5rem;
		    line-height: 1;
		    vertical-align: middle;
		    border-radius: .64rem;
	    }
	}
	
	.modularList{
		li{
			height: 1.3rem;
			line-height: 1.3rem;
			padding: 0 .4rem;
			a{
				margin: 0 -.4rem;
			    font-size: 0.4rem;
			    color: #333;
			    .iconfont{
			    	color: #E51C23;
			    	font-size: .5rem;
			    	margin-right: .3rem;
			    }
			}
		}
		.mui-table-view-cell:after{
			background: #F2F2F2;
		}
	}
	/*头像裁剪*/
	
    .photoClip{
    	position: fixed;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    background: rgba(0,0,0,1);
	    z-index: 9999;
    }
    #clipArea{
    	height: 100vh;
    	width: 100vw;
    }
    #cancel{
    	position: absolute;
    	bottom: 1rem;
    	left: 1rem;
    	background: #999;
    	border: none;
    	padding: .2rem 1rem;
    	color: #fff;
    }
    #clipBtn{
    	position: absolute;
    	bottom: 1rem;
    	right: 1rem;
    	background: #03a9f4;
    	border: none;
    	padding: .2rem 1rem;
    	color: #fff;
    }
}
</style>
<template>
	<div id="proposal">
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<ul class="prop-list">
					<li v-for="(item, index) in proposalList">
						<!--<router-link :to="{path:'/proposalDetail',query: {proposal: item}}">-->
							<div @click="goDetail(item, item.suggest.id)">
								<div class="prop-top-bar">
									<img :src="item.suggest.head_img ? img_URL + item.suggest.head_img : '../../../static/images/header1.png'" alt="" />
									<div class="prop-media-body">
										<div class="mui-clearfix">
											<p v-text="item.suggest.author"></p>
											<span v-text="item.suggest.published_time"></span>
										</div>
									</div>
								</div>
								<div class="prop-content">
									<p class="mui-ellipsis title" v-text="item.suggest.title"></p>
									<p class="content">
										<span class="member" v-for="member in item.memberList" v-text="'@' + member.name"></span>
										<span v-text="item.suggest.content"></span>
									</p>
								</div>
							</div>
							<div class="prop-content">
								<div class="img-list mui-clearfix" v-show="item.imgList.length === 0 ? false : true">
									<div class="img-box" v-for="(img, index) in item.imgList" >
										<img v-show="img.img_path" :src="img_URL + img.img_path" @click="previewImg(item.imgList, index)">
									</div>
								</div>
							</div>
							<div class="operation mui-clearfix">
								<div class="box">
									<i class="iconfont" :class="item.suggest.is_digg === '0' ? 'icon-xiangqing_dianzan' : 'icon-xiangqing_yidianzan-1'" @click="fabulous(item.suggest, index)"><span v-text="item.diggList.length"></span></i>
									<i class="iconfont icon-xiangqing_pinglun" @click="showPop(item.suggest.id, index)"><span v-text="item.commentList.length"></span></i>
								</div>
							</div>
							<div class="comment-list">
								<div class="username" v-show="item.diggList.length === 0 ? false : true">
									<i class="iconfont icon-xiangqing_dianzan"></i>
									<span v-for="(like, num) in item.diggList" v-text="num === 0 ? like.name : '，' + like.name"></span>
								</div>
								<div class="userly" v-show="item.commentList.length === 0 ? false : true">
									<p v-for="(comment, index) in item.commentList " v-if="index <= 9">
										<span v-text="comment.name + '：'"></span>
										<span style="color: rgb(51, 51, 51);" v-html="comment.content.replace(/\n/g, '<br>')"></span>
									</p>
									<div class="more" @click="goDetail(item, item.suggest.id)" v-if="item.commentList.length > 9">查看更多评论</div>
								</div>
							</div>
						<!--</router-link>-->
					</li>
				</ul>
				
				<div class="load-box">
					<div class="load-type" v-show="resLoad">
						<div class="load-start" v-html="resDataLoad">
								
						</div>
					</div>
				</div>
				
			</div>
		</div>
		
		
		<div class="btnBox">
			<router-link to="/releaseProposal">
				<button class="submit-btn">建言献策</button>
			</router-link>
		</div>
		<!--预览图片-->
		<transition name="fade">
			<div class="preview-img" v-show="previewShow">
				<p class="previewIndex">{{previewIndex}}/{{previewList.length}}</p>
				<div id="preview-box" :style="'width:' + (100 * previewList.length) + '%;'">
					<div class="preview-img-box" @click="previewShow = false" 
						v-for="(img, index) in previewList" 
						v-swipeleft="{fn:vuetap, index:index, totalLength: previewList.length, gesture: 'swipeleft'}" 
						v-swiperight="{fn:vuetap,index:index, totalLength: previewList.length, gesture: 'swiperight'}">
						<img :src="img_URL + img.img_path" alt="" />
					</div>
				</div>
			</div>
		</transition>
		
		<!--loading-->
		<loading v-show="loadShow"></loading>
		<!--popup-->
		<popup ref="popup" @proposal-comment="proposalComment" :title='title'></popup>
		<!--绑定-->
		<authentication ref="authenticationShow"></authentication>
	</div>
</template>

<script type="text/ecmascript-6">
import store from '@/vuex/store'
import loading from '../loading/loading.vue'
import popup from '../popup/popup.vue'
import vueTouch from '../../assets/api/vueTouch.js'
import authentication from '../authentication/authentication.vue'
export default {
  	name: 'proposal',
  	store,
  	data: function(){
      	return {
        	loadShow: false,
        	proposalList: [],
        	page: 1,
        	resLoad: true,
        	resLoadType: true,
        	resType: true,//（发生于滚动条滚动）防止上一次请求未完成，又请求的情况（包括请求多次的情况）
        	img_URL: 'http://dj.celap.cn/pgy/',
        	previewList: [],
        	previewShow: false,
        	resDataLoad: '',
        	previewIndex: 1,
        	proComment: '',
        	title: '评论'
      	}
    },
    components: {
	  	loading: loading,
	  	popup: popup,
	  	authentication: authentication
	},
	watch: {
		$route(to, from) {
			if(to.name == "proposalDetail"){
		   		console.log('proposalDetail');
			}
			if(from.name == "index"){
				this.loadShow = true;
		   		this.proposalList = [];
		   		this.page = 1;
		   		this.init();
			}
			if(from.name == "releaseProposal"){
				console.log("submit pro: "+(store.state.proposalSuccess === true));
				if(store.state.proposalSuccess === true){
					mui('.mui-scroll-wrapper').scroll({deceleration:0.002,  bounce: false});
					mui('.mui-scroll-wrapper').scroll().scrollTo(0,0);
					this.loadShow = true;
			   		this.proposalList = [];
			   		this.page = 1;
			   		this.init();
			   		//还原
			   		store.commit('reductionProposal');
				}
			}
		}
	},
	activated: function(){
		mui('.mui-scroll-wrapper').scroll().scrollTo(0,0);
	},
    created: function() {
    	var _this = this;
    	
	    _this.$api.get('index.php/Home/User/getMemberOpenidIsBind', null, function(res){
	    	console.log(res);
	    	if(res.code == "200"){
	    		_this.level = res.level;
	    		store.commit('authenticationSuccess');
	    		
	    	}else if(res.code == "300"){
	    		mui.toast('您还没有绑定！')
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
    mounted: function() {
  		//初始化滚动组件
   		mui('.mui-scroll-wrapper').scroll({deceleration:0.002,  bounce: false});
   		this.loadShow = true;
   		this.init();
   	},
   	methods: {
   		init: function(){
   			console.log('resquest data');
   			//请求初始的数据
			var _this = this,
				load_start = '上拉加载更多数据',
				load_now = '<i class="mui-spinner"></i><span>正在努力加载中</span>',
				load_end = '<span>数据已全部加载</span>';
			var data = {
					page: _this.page,
					row: 5
				}
			
			_this.resLoad = true;
			_this.resType = false;
			_this.resDataLoad = load_now;
		    _this.$api.post('index.php/Home/Api/getSuggestList', data, function(res){
		    	console.log(res);
		    	if(res.code == '200'){
	    			_this.proposalList.push.apply(_this.proposalList, res.data);
	    			_this.page ++;
	    			_this.loadShow = false;
	    			_this.listenerScroll();
					if(res.data.length < 5){
						_this.resDataLoad = load_end;
						_this.resLoad = true;
						_this.resLoadType = false;
		    		}else{
		    			_this.resDataLoad = load_start;
		    			_this.resLoadType = true;
		    			_this.resType = true;
		    		} 
		    	}else if(res.code == '300'){
		    		_this.resDataLoad = load_end;
		    		_this.loadShow = false;
		    		_this.resLoadType = false;
		    	}else{
		    		_this.loadShow = false;
		    		mui.toast('数据请求失败！');
		    	}
		    	
		    },function(err){
		    	if(err){
		    		_this.loadShow = false;
		    		mui.toast('数据请求失败！');
		    		console.log(err);
		    	}
		    })
   		},
   		listenerScroll: function(){
			var scroll = mui('.mui-scroll-wrapper').scroll(), _this = this;
			
			document.querySelector('.mui-scroll-wrapper').addEventListener('scroll', function (e){
				//这里判断上一次是否请求完毕或者数据已经加载完成，如果为true，也就是还没有请求完毕，则不继续请求，防止服务出错
				if(_this.resType === false || _this.resLoadType === false){
					return false;
				}
			    var scrollTop = scroll.y;
			    //判断滚动到底部
			    if(scrollTop === scroll.maxScrollY){
			        //上拉加载逻辑代码
			        _this.init();
			    }
			});
		},
		goDetail: function(data,id){
			store.commit('forProposalData', data);
			this.$router.push({path: '/proposalDetail', query: {pro_id: id}});
		},
		fabulous: function(params, index){
			var _this = this, isDigg = 0;
			if(params.is_digg === '0'){
				isDigg = 1;
			}else{
				isDigg = 2;
			}
			
			var	data = {
					suggest_id: params.id,
					isDigg: isDigg
				}
			_this.$api.post('index.php/Home/Api/diggSuggest', data, function(res){
		    	console.log(res);
		    	if(res.code == 200){
		    		if(isDigg === 1){
		    			_this.proposalList[index].suggest.is_digg = '1';
		    			_this.proposalList[index].diggList.unshift(res.data);
		    			mui.toast('点赞成功！');
		    		}else{
		    			_this.proposalList[index].suggest.is_digg = '0';
		    			_this.proposalList[index].diggList.filter(function(obj, i){
						  	if(obj.ouid === res.data.ouid){
						  		_this.proposalList[index].diggList.splice(i,1);
						  	}
						});
		    		}
		    	}else{
		    		mui.toast('操作失败，请稍后再试！');
		    	}
		    	
		    },function(err){
		    	if(err){
		    		mui.toast('操作失败，请稍后再试！');
		    	}
		    })
		},
		showPop: function(params, index){
			this.$refs.popup.operationPopup(params, index);
		},
		proposalComment: function(params, index, val){
			var _this = this;
			if(val == ''){
				mui.toast('您的评论不能为空哦~');
				return false;
			}
			var data = {
				suggest_id: params,
				content: val
			}
			_this.$api.post('index.php/Home/Api/insertCommentSuggest', data, function(res){
		    	console.log(res);
		    	if(res.code == 200){
	    			_this.proposalList[index].commentList.unshift(res.data);
	    			mui.toast('评论成功！');
		    	}else{
		    		mui.toast('评论失败，请稍后再试！');
		    	}
		    	_this.$refs.popup.operationPopup();
		    },function(err){
		    	if(err){
		    		_this.$refs.popup.operationPopup();
		    		mui.toast('评论失败，请稍后再试！');
		    	}
		    })
		},
		previewImg: function(imgList, index){
			this.previewList = imgList;
			this.previewIndex = index + 1;
			var imgEl = document.getElementById('preview-box');
		  		imgEl.style.webkitTransitionDuration = '0.5s';
		  		imgEl.style.webkitTransform = 'translate3d(-'+ 100 * index +'vw, 0, 0)';
			this.previewShow = true;
		},
		vuetap:function(s){
			if(s.gesture == 'swipeleft'){
				var index = s.index + 1;
			}else{
				var index = s.index - 1;
			}
	  		if(index === s.totalLength || index < 0){
	  			return false;
	  		}else{
	  			this.previewIndex = index + 1;
	  			var imgEl = document.getElementById('preview-box');
		  		imgEl.style.webkitTransitionDuration = '0.5s';
		  		imgEl.style.webkitTransform = 'translate3d(-'+ 100 * index +'vw, 0, 0)';
	  		}
		  		
	  	}
   	}
}
</script>
<style lang="scss">
#proposal{
	.mui-scroll-wrapper{
		bottom: 1.6rem;
	}
	.member{
		color: #E51C23;
		margin-right: .2rem;
	}
	.prop-list{
		li{
			background: #fff;
			.prop-top-bar{
				padding: .3rem;
				img{
					float: left;
					line-height: 1.3rem;
				    width: 1.3rem;
				    height: 1.3rem;
				    border-radius: 50%;
				    margin-right: .3rem;
				}
				.prop-media-body{
					overflow: hidden;
					min-height: 1.3rem;
					position: relative;
					p{
					    color: #333;
					    line-height: 1.5;
					    font-size: 0.453rem;
					}
					div:last-child{
						position: absolute;
						bottom: .1rem;
						width: 100%;
					}
					span{
						font-size: 0.373rem;
    					color: #999;
					}
				}
			}
			.prop-content{
				padding: 0 .3rem .3rem .3rem;
				.title{
					color: #333;
					padding-bottom: .2rem;
					font-size: .4rem;
				}
				.content{
					color: #999;
					font-size: .36rem;
				}
				
				.img-list{
					padding-top: .3rem;
					.img-box{
						display: inline-block;
						float: left;
						overflow: hidden;
						height: 30vw;
					    width: 30vw;
					    margin: 2vw 2vw 0 0;
					    background: #eee;
					    img{
					    	position: relative;
						    top: 50%;
						    -webkit-transform: translate3d(0,-50%,0);
						    transform: translate3d(0,-50%,0);
					    	width: 100%;
					    }
					}
					.img-box:nth-child(3n){
						margin-right: 0;
					}
				}
			}
			.operation {
				padding: 0 .3rem .3rem .3rem;
				.box{
					float: right;
					position: relative;
					height: .5rem;
					>.iconfont{
						position: relative;
						font-size: .46rem;
					    display: block;
					    float: left;
					    text-align: center;
						&.icon-xiangqing_yidianzan-1{
							color: #ee4b51;
						}
						span{
							font-size: .34rem;
							margin-left: .1rem;
						}
					}
					>.iconfont:first-child{
						padding-right: .2rem;
					}
					>.iconfont:last-child{
						padding-left: .2rem;
					}
				}
				
			}
			.comment-list{
				border-top: .05rem solid #f5f5f5;
				/*padding: 0 .3rem .3rem .3rem;*/
				margin-bottom: .15rem;
				.username{
					height: 1rem;
    				line-height: 1rem;
    				color: #999;
    				font-size: 0.32rem;
    				border-bottom: 1px solid #f2f2f2;
    				padding: 0 .3rem;
				}
				.userly{
					padding: .3rem;
					span:first-child{
						color: #999;
					}
					p{
						font-size: 0.356rem;
    					color: #333;
    					line-height: 1.5;
					}
				}
				.more{
					border-top: 1px solid #eee;
					text-align: center;
					padding-top: .3rem;
				}
			}
		}
		
	}
	.preview-img{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: #000;
		z-index: 2;
		.previewIndex{
			position: fixed;
		    top: 0;
			height: 1rem;
		    line-height: 1rem;
		    font-size: .5rem;
		    color: #fff;
		    text-align: center;
		    width: 100vw;
		    z-index: 3;
		}
		#preview-box{
			width: auto;
			height: 100%;
			overflow-x: auto;
		}
		.preview-img-box{
			height: 100%;
			width: 100vw;
			position: relative;
			overflow-y: auto;
			float: left;
			img{
				width: 100%;
				position: absolute;
				top: 50%;
				left: 50%;
				-webkit-transform: translate3d(-50%,-50%,0);
				transform: translate3d(-50%,-50%,0);
			}
		}
		
	}
}
</style>
<template>
	<div id="proposalDetail">
		<ul class="prop-list">
			<li v-if="proposalDetail">
				<div class="prop-top-bar">
					<img :src="img_URL + proposalDetail.suggest.head_img" alt="" />
					<div class="prop-media-body">
						<div class="mui-clearfix">
							<p v-text="proposalDetail.suggest.author"></p>
							<span v-text="proposalDetail.suggest.published_time"></span>
						</div>
					</div>
				</div>
				<div class="prop-content">
					<p class="title" v-text="proposalDetail.suggest.title"></p>
					<p class="content">
						<span class="member" v-for="member in proposalDetail.memberList" v-text="'@' + member.name"></span>
						<span v-text="proposalDetail.suggest.content"></span>
					</p>
				</div>
				<div class="prop-content">
					<div class="img-list mui-clearfix">
						<div class="img-box" v-for="(img, index) in proposalDetail.imgList">
							<img :src="img_URL + img.img_path" @click="previewImg(proposalDetail.imgList, index)">
						</div>
					</div>
				</div>
				<div class="operation mui-clearfix">
					<div class="box" v-if="proposalDetail.diggList && proposalDetail.commentList">
						<i class="iconfont" :class="proposalDetail.suggest.is_digg === '0' ? 'icon-xiangqing_dianzan' : 'icon-xiangqing_yidianzan-1'" @click="fabulous(proposalDetail.suggest)"><span v-text="proposalDetail.diggList.length"></span></i>
						<i class="iconfont icon-xiangqing_pinglun" @click="showPop(proposalDetail.suggest.id, 0)"><span v-text="proposalDetail.commentList.length"></span></i>
					</div>
				</div>
				<div class="comment-list">
					<div class="username" v-show="proposalDetail.diggList.length === 0 ? false : true">
						<i class="iconfont icon-xiangqing_dianzan"></i>
						<span v-for="(like, num) in proposalDetail.diggList" v-text="num === 0 ? like.name : '，' + like.name"></span>
					</div>
					<div class="userly" v-show="proposalDetail.commentList.length === 0 ? false : true">
						<p v-for="(comment, index) in proposalDetail.commentList ">
							<span v-text="comment.name + '：'"></span>
							<span style="color: rgb(51, 51, 51);" v-text="comment.content"></span>
						</p>
					</div>
				</div>
			</li>
		</ul>
		<!--预览图片-->
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
		
		<!--loading-->
		<loading v-show="loadShow"></loading>
		<!--popup-->
		<popup ref="popup" @proposal-comment="proposalComment" :title='title'></popup>
	</div>
</template>

<script type="text/ecmascript-6">
import store from '@/vuex/store'
import popup from '../popup/popup.vue'
import loading from '../loading/loading.vue'
import vueTouch from '../../assets/api/vueTouch.js'
export default {
  	name: 'proposalDetail',
  	data: function(){
      	return {
        	loadShow: false,
        	proposalDetail: null,
        	img_URL: 'http://dj.celap.cn/pgy/',
        	previewList: [],
        	previewSrc: '',
        	previewShow: false,
        	previewIndex: 1,
        	title: '评论',
        	nowLoad: false
      	}
    },
    store,
    components: {
	  	loading: loading,
	  	popup: popup
	},
	activated: function(){
   		//vue会缓存组件，造成文章详情只请求一次之后不在重新请求
   		this.loadShow = true;
   		this.proposalDetail = null;
   		var data = store.state.proposalDetail;
		if(data){
			console.log('父页面传入');
			this.proposalDetail = data;
			this.loadShow = false;
		}else{
			console.log('重新求情');
			this.init();
		}
   		
   	},
    mounted: function() {
  		//初始化滚动组件
   		mui('.mui-scroll-wrapper').scroll({deceleration:0.002});
   	},
   	methods: {
   		init: function(){
   			var _this = this;
   			var	data = {
					suggest_id: _this.$route.query.suggest_id
				}
			_this.$api.post('index.php/Home/Api/getSuggestInfoBySuggestId', data, function(res){
		    	console.log(res);
		    	if(res.code == '200'){
		    		_this.proposalDetail = res.data[0];
					_this.loadShow = false;
		    	}else{
		    		_this.loadShow = false;
		    		mui.toast('获取失败，请稍后再试！');
		    	}
		    	
		    },function(err){
		    	if(err){
		    		_this.loadShow = false;
		    		mui.toast('获取失败，请稍后再试！');
		    	}
		    })
   		},
   		fabulous: function(params){
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
		    	if(res.code == '200'){
		    		if(isDigg === 1){
		    			_this.proposalDetail.suggest.is_digg = '1';
		    			_this.proposalDetail.diggList.unshift(res.data);
		    			mui.toast('点赞成功！');
		    		}else{
		    			_this.proposalDetail.suggest.is_digg = '0';
		    			_this.proposalDetail.diggList.filter(function(obj, i){
						  	if(obj.ouid === res.data.ouid){
						  		_this.proposalDetail.diggList.splice(i,1);
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
			_this.loadShow = true;
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
	    			_this.proposalDetail.commentList.unshift(res.data);
	    			mui.toast('评论成功！');
		    	}else{
		    		mui.toast('评论失败，请稍后再试！');
		    	}
		    	_this.$refs.popup.operationPopup();
		    	_this.loadShow = false;
		    },function(err){
		    	if(err){
		    		_this.loadShow = false;
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
#proposalDetail{
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
					span{
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
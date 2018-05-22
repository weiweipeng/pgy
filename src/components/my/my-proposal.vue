<template>
	<div id="myProposal">
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll" id="scroll1">
				<div>
					<!--遍历数据-->
					<ul class="prop-list">
						<li v-for="(item, index) in itemData">
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
					<!--无数据-->
					<div class="no-data-box" v-if="noData && itemData.length === 0">
						<div class="load-type">
							<div class="load-noData">
								<img class="nodata_img" src="../../../static/images/noMore.png"/>
								<!--<p class="nodata">暂无内容，我们正在努力为您准备精彩内容</p>-->
							</div>
						</div>
					</div>
				</div>
				<!--分割线-->
			</div>
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
	</div>
</template>
<script type="text/ecmascript-6">
import store from '@/vuex/store'
import loading from '../loading/loading.vue'
import popup from '../popup/popup.vue'
import vueTouch from '../../assets/api/vueTouch.js'
export default {
  	name: 'myProposal',
  	data: function() {
      	return {
        	loadShow: true,
        	itemData: [],
        	page: 1,
        	noData: false,
        	img_URL: 'http://dj.celap.cn/pgy/',
        	admin_img_URL: 'http://dj.celap.cn:8080/pgy-dj-admin/',
        	row: 10,
        	self: null,
        	previewList: [],
        	previewShow: false,
        	resDataLoad: '',
        	previewIndex: 1,
        	title: '评论'
      	}
   	},
   	watch: {
		$route(to, from) {
			if(from.name == "releaseProposal"){
				if(store.state.proposalSuccess === true){
					var deceleration = mui.os.ios?0.003:0.0009;
					mui('.mui-scroll-wrapper').scroll({
						bounce: false,
						indicators: true, //是否显示滚动条
						deceleration:deceleration
					});
					this.loadShow = true;
					this.noData = false;//还原无数据的显示状态，避免下拉刷新时出现
					this.page = 1;
					this.itemData = [];
			   		this.init();
			   		//还原
			   		store.commit('reductionProposal');
				}
			}
		}
	},
   	components: {
	  	loading: loading,
	  	popup: popup
	},
	mounted: function(){
		var deceleration = mui.os.ios?0.003:0.0009;
		mui('.mui-scroll-wrapper').scroll({
			bounce: false,
			indicators: true, //是否显示滚动条
			deceleration:deceleration
		});
		this.loadShow = true;
		this.noData = false;//还原无数据的显示状态，避免下拉刷新时出现
		this.page = 1;
		this.itemData = [];
   		this.init();
   		this.goHref();
	},
   	methods: {
   		init: function(){
   			var _this = this;
   			
   			if(_this.self){
   				_this.self.refresh(true);//重置上拉加载
   			}
			mui.ready(function() {
				mui('#scroll1').pullToRefresh({
					down: {
						callback: function() {
							var self = this;
							//刷新先清空页数和数据
							_this.noData = false;//还原无数据的显示状态，避免下拉刷新时出现
							_this.page = 1;
							_this.itemData = [];
							var	data = {
									page: _this.page,
									row: _this.row
								}
							self.refresh(true);//重置上拉加载	
							_this.getData(data, self, 0);
						}
					},
					up: {
						auto: true,
						callback: function() {
							var self = this;
							var	data = {
									page: _this.page,
									row: _this.row
								}
							_this.self = self;
							//data表示参数，index表示第一个选项卡， self表示当前dom节点，1 表示上拉加载
							_this.getData(data, self, 1);
						}
					}
				})
			})
   		},
   		getData: function(data, self, type){
   			var _this = this;
   			//请求数据
   			_this.$api.post('index.php/Home/Api/getMySuggestMsg', data, function(res){
   				console.log(res);
   				if(res.code == "200"){
   					
   					//根据index判断一下是哪个选项卡请求数据
   					_this.itemData.push.apply(_this.itemData, res.data);
					_this.page ++;
					
					//判断数据长度
   					var noMore = res.data.length < _this.row ? true : false;
   					//复位下拉 或者上拉状态
   					//type 说明： 0 表示下拉刷新 1 表示上啦加载
	   				if(type === 0){
	   					self.endPullDownToRefresh();//关闭下拉刷新
	   					if(noMore){
	   						self.endPullUpToRefresh(noMore);
	   					}else{
	   						self.refresh(true);//重置上拉加载
	   					}
	   					mui.toast('刷新成功！');
	   				}else if(type === 1){
						self.endPullUpToRefresh(noMore);//根据返回数据判断是否还有后续数据来控制加载状态
	   				}
	   				
   				}else if(res.code == "0" || res.code == "300"){
   					if(type === 0){
   						self.endPullDownToRefresh();//关闭下拉刷新
   					}
   					self.endPullUpToRefresh(true);
   					_this.noData = true;
   				}else{
   					if(type === 0){
   						self.endPullDownToRefresh();//关闭下拉刷新
   					}
   					self.endPullUpToRefresh(true);
   					mui.toast('数据加载失败，请稍后再试！');
   				}
   				
   				if(_this.loadShow){
   					setTimeout(function(){
   						_this.loadShow = false;
   					},500)
   				}	
		    	
		    },function(err){
		    	if(err){
		    		_this.loadShow = false;
		    		mui.toast('数据请求失败，请稍后再试！');
		    	}
		    })
   			
	   			
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
		    			_this.itemData[index].suggest.is_digg = '1';
		    			_this.itemData[index].diggList.unshift(res.data);
		    			mui.toast('点赞成功！');
		    		}else{
		    			_this.itemData[index].suggest.is_digg = '0';
		    			_this.itemData[index].diggList.filter(function(obj, i){
						  	if(obj.ouid === res.data.ouid){
						  		_this.itemData[index].diggList.splice(i,1);
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
	    			_this.itemData[index].commentList.unshift(res.data);
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
		  		
	  	},
	  	goHref: function(){
   		// 监听tap事件，解决 a标签 不能跳转页面问题
			mui('.mui-scroll').on('tap','a',function(){
				document.location.href=this.href;
			});
   		}
   	}
}
</script>
<style lang="scss">
#myProposal{
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
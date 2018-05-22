<template>
	<div id="articleDetail">
		<div class="mui-scroll-wrapper" :class="hiddenBar()">
			<div class="mui-scroll">
				<div class="article">
					<!--文章头部-->
					<div class="articleTop">
						<p class="title" v-text="articleData.title"></p>
						<div class="articleInfo mui-clearfix">
							<span class="mui-pull-left" v-text="'主持人：' + articleData.host" v-show="articleData.host && articleData.host != null"></span>
							<span class="mui-pull-right" v-text="'发布时间：' + articleData.published_time"></span>
						</div>
					</div>
					<!--文章主题内容-->
					<!--<h5 class="bold-text">详情：</h5>-->
					<div class="artCont" v-html="articleData.content != null ? articleData.content.replace(/\n/g, '<br>') : articleData.content"></div>
					<div class="img-list" v-if="articleData.imgList && articleData.imgList.length != 0">
						<img :src="img_URL + img.img_path" alt="" v-for="img in articleData.imgList "/>
					</div>
				</div>
					
				<!--用户心得-->
				<div class="comment" v-show="articleData.is_topic == '0' ? false : true">
					<div class="commentTitle"><span>用户心得</span> <p>experience</p></div>
					<div class="noComment" v-show="commentList.length == 0">
						<img src="../../assets/images/noComment.png"/>
						<p>还没评论，快来说两句</p>
					</div>
					<ul class="commentList mui-table-view">
						<li class="mui-table-view-cell mui-media" v-for="(comment, index) in commentList">
							<a href="javascript:;">
								<img class="mui-media-object mui-pull-left" :src="comment.header_img ? img_URL + comment.header_img : '../../../static/images/header1.png'">
								<div class="mui-media-body">
									<p class="commentInfo">
										<span class="color_black" v-text="comment.name"></span>
										<span class="mui-pull-right" @click="fabulous(comment, index)">{{comment.thumbup_num}}<i class="iconfont" :class="comment.is_comment_flag == '0' ? 'icon-xiangqing_dianzan' : 'icon-xiangqing_yidianzan-1'"></i></span>
									</p>
									<p v-text="comment.create_time"></p>
								</div>
								<div class="commentCont" v-html="comment.content.replace(/\n/g, '<br>')"></div>
							</a>
						</li>
					</ul>
					<div class="load-box">
						<div class="load-type" v-show="commentList.length !== 0 || commentLoad">
							<div class="load-start" v-show="commentLoadType">
								<i class="mui-spinner"></i>
								<span>正在努力加载中</span>
							</div>
							<div class="load-end" v-show="!commentLoadType">
								数据已全部加载
							</div>
						</div>
					</div>
						
				</div>
			
			</div>
		</div>
		
		<!--bottoomBar-->
		<div class="bottomBar">
			<ul class="mui-row">
				<li class="mui-col-sm-4 mui-col-xs-6" v-show="articleData.is_topic == '0' ? false : true" @click="writeComment">
					<span class="commentInput">写心得~</span>
				</li>
				<li class="mui-col-sm-2 mui-col-xs-2" v-show="articleData.is_like == '0' ? false : true" @click="fabulous(articleData)">
					<i class="iconfont" :class="articleData.is_article_flag == '0' ? 'icon-xiangqing_dianzan' : 'icon-xiangqing_yidianzan-1'">
						<span v-text="articleData.thumbup_num"></span>
					</i>
				</li>
				<li class="mui-col-sm-2 mui-col-xs-2" v-show="articleData.is_collect == '0' ? false : true" @click="collect">
					<i class="iconfont" :class="articleData.is_article_collect == '0' ? 'icon-tabbar_dangjianhuodong1' : 'icon-tabbar_dangjianhuodong'">
						<span v-text="articleData.collect_num"></span>
					</i>
				</li>
				<li class="mui-col-sm-2 mui-col-xs-2" v-show="articleData.is_topic == '0' ? false : true" @click="gotoComment">
					<i class="iconfont icon-xiangqing_pinglun">
						<span v-text="articleData.comm_num"></span>
					</i>
				</li>
				<!--<li class="mui-col-sm-2 mui-col-xs-2" v-show="articleData.is_share == '1' ? false : true" @click="showShare">
					<i class="iconfont icon-xiangqing_fenxiang"></i>
				</li>-->
			</ul>
		</div>
		
		<!--loading-->
		<loading v-show="loadShow"></loading>
		<!--popup-->
		<popup ref="popup" @experience="experience" :title='title'></popup>
		<!--分享-->
		<!--<div class="shareBox" style="display: none;" v-show="shareShow" @click="shareShow = false"></div>-->
	</div>
</template>
<script type="text/ecmascript-6">
import wx from 'weixin-js-sdk'
import loading from '../loading/loading.vue'
import popup from '../popup/popup.vue'
export default {
  	name: 'article_detail',
  	data: function(){
      	return {
        	articleData: {},
        	commentList: [],
        	loadShow: true,
        	shareShow: false,
        	page: 1,
        	commentLoad: false,
        	commentLoadType: true,
        	img_URL: 'http://dj.celap.cn/pgy/',
        	admin_img_URL: 'http://dj.celap.cn:8080/pgy-dj-admin/',
        	title: '心得'
      	};
   	},
   	activated: function(){
   		//vue会缓存组件，造成文章详情只请求一次之后不在重新请求，
   		this.page = 1;
   		this.articleData = {};
   		this.commentList = [];
   		this.init();
   		
   	},
   	components: {
	  	loading: loading,
	  	popup: popup
	},
  	mounted: function() {
  		//初始化滚动组件
   		mui('.mui-scroll-wrapper').scroll({deceleration:0.002, bounce: false});
   },
   	methods: {
   		init: function(){
   			var _this = this, data = {}, url = '';
   			_this.loadShow = true;
   			
   			if(_this.$route.query.flag_type == '5'){
   				url = 'index.php/Home/Api/getEssayIdToDetailInfo';
   				data = {
					submit_id: _this.$route.query.article_id,
					flag_type: _this.$route.query.flag_type
				}
   			}else{
   				url = 'index.php/Home/Api/getArticleInfoByArticleId';
   				data = {
					article_id: _this.$route.query.article_id,
					flag_type: _this.$route.query.flag_type,
					status: _this.$route.query.status
				}
   			}
		    _this.$api.post(url, data, function(res){
		    	console.log(res);
		    	if(res.code == "200"){
		    		_this.articleData = res.data.articleData;
		    		
		    		mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0);
		    		if(_this.articleData.is_topic == '1'){
		    			_this.resCommentList();
			   			//判断心得数量是否大于多于1页，多于则调用分页函数
   						_this.listenerScroll();
			   		}
		    		_this.shareOpation();//分享
		    		
		    	}else if(res.code == '300' || res.code == "0"){
		    		mui.toast('文章详情获取失败，请稍后再试！');
		    	}else{
		    		return false;
		    	}
		    	setTimeout(function(){
					_this.loadShow = false;	
				},1000);
		    },function(err){
		    	if(err){
		    		mui.toast('文章详情获取失败，请稍后再试！');
		    	}
		    })
   		},
   		resCommentList: function(){
   			var _this = this, data = {}, url = '';
   			if(_this.$route.query.flag_type == '5'){
   				url = 'index.php/Home/Api/getSubmitIdToCommlist';
   				data = {
					submit_id: _this.$route.query.article_id,
					page: _this.page,
					row: 10
				}
   			}else{
   				url = 'index.php/Home/Api/getCommentListByAtticleId';
   				data = {
					article_id: _this.$route.query.article_id,
					flag_type: _this.$route.query.flag_type,
					page: _this.page,
					row: 10
				}
   			}
   			_this.commentLoad = true;
			_this.$api.post(url, data, function(res){
		    	console.log(res);
		    	if(res.code == '200'){
		    		_this.commentList.push.apply(_this.commentList, res.data.commentList);
	    			_this.page ++;
	    			if(res.data.commentList.length < 10){
		    			_this.commentLoadType = false;
		    			_this.commentLoad = true;
		    		}else{
		    			_this.commentLoad = false;
		    		}
		    		
		    	}else if(res.code == '300' || res.code == '0'){
		    		_this.commentLoadType = false;
		    		if(_this.commentList,length == 0){
		    			_this.commentLoad = false;
		    		}
		    	}else{
		    		mui.toast('获心得论列表失败，请稍后再试！');
		    	}
		    	
		    },function(err){
		    	if(err){
		    		mui.toast('获取心得列表失败，请稍后再试！');
		    	}
		    })
   		},
   		hiddenBar: function(){
   			var articleData = this.articleData;
   			if(articleData.is_collect == '0' && articleData.is_share == '0' && articleData.is_topic == '0' && articleData.is_like == '0'){
   				return 'for-bottom';
   			}
   		},
		fabulous(data, index){
			var _this = this, isDigg = '', res_data = {}, url = '';
			if(data.is_comment_flag == "1"){
				isDigg = '2';
			}else if(data.is_comment_flag == "0"){
				isDigg = '1';
			}else if(data.is_article_flag == "1"){
				isDigg = '2';
			}else if(data.is_article_flag == "0"){
				isDigg = '1';
			}else{
				mui.toast('点赞失败，请稍后再试！');
			}
			//判断是征文文章详情，还是普通文章详情
			if(_this.$route.query.flag_type == '5'){
   				url = 'index.php/Home/Api/studyArticlesAndComments';
   				if(index != undefined){
					res_data = {
						type: "2",
						isDigg: isDigg,
						comment_id: data.id,
						from_ouid: data.ouid
					}
				}else{
					res_data = {
						type: "1",
						isDigg: isDigg,
						submit_id: data.id,
					}
				}
   			}else{
   				url = 'index.php/Home/Api/likeArticlesAndComments';
   				if(index != undefined){
					res_data = {
						type: "2",
						isDigg: isDigg,
						comment_id: data.id,
						from_ouid: data.ouid
					}
				}else{
					res_data = {
						type: "1",
						isDigg: isDigg,
						article_id: data.id,
					}
				}
   			}
			
			
			_this.$api.post(url, res_data, function(res){
		    	console.log(res);
		    	if(res.code == '200'){
		    		if(isDigg == '1'){
		    			mui.toast('点赞成功！');
		    			if(index != undefined){
		    				_this.commentList[index].is_comment_flag = "1";
		    				_this.commentList[index].thumbup_num = Number(data.thumbup_num) + 1;
		    			}else{
		    				_this.articleData.is_article_flag = "1";
		    				_this.articleData.thumbup_num = Number(_this.articleData.thumbup_num) + 1;
		    			}
		    			
		    		}else{
		    			if(index != undefined){
		    				_this.commentList[index].is_comment_flag = "0";
		    				_this.commentList[index].thumbup_num = Number(data.thumbup_num) - 1;
		    			}else{
		    				_this.articleData.is_article_flag = "0";
		    				_this.articleData.thumbup_num = Number(_this.articleData.thumbup_num) - 1;
		    			}
		    			
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
		writeComment: function(){
			this.$refs.popup.operationPopup();
		},
		experience: function(val){
			var _this = this, data = {}, url = '';
			
			if(val == ''){
				mui.toast('您的心得不能为空哦~');
				return false;
			}
			if(_this.$route.query.flag_type == '5'){
   				url = 'index.php/Home/Api/publicStudyComment';
   				data = {
					submit_id: _this.articleData.id,
					content: val
				}
   			}else{
   				url = 'index.php/Home/Api/publishArticleComment';
   				data = {
					article_id: _this.articleData.id,
					cotent: val
				}
   			}
			_this.$api.post(url, data, function(res){
		    	console.log(res);
		    	if(res.code == "200"){
		    		if(_this.articleData.is_topic_check == '0'){
		    			if(res.data.length != 0){
		    				_this.commentList.unshift(res.data[0]);
		    				_this.articleData.comm_num = Number(_this.articleData.comm_num) + 1;
		    			}
		    			mui.toast('发布成功！');
		    		}else{
		    			mui.toast('发布成功，审核通过才会给予显示！');
		    		}
		    		
		    	}else{
		    		mui.toast('发布失败，请稍后再试！');
		    	}
		    	_this.$refs.popup.operationPopup();
		    },function(err){
		    	if(err){
		    		_this.$refs.popup.operationPopup();
		    		mui.toast('发布失败，请稍后再试！');
		    	}
		    })
		},
		collect: function(){
			var _this = this, is_collect = '', data = {}, url = '', articleData = this.articleData;
			if(articleData.is_article_collect == "1"){
				is_collect = '2';
			}else if(articleData.is_article_collect == "0"){
				is_collect = '1';
			}else{
				mui.toast('收藏失败，请稍后再试！');
			}
   			if(_this.$route.query.flag_type == '5'){
   				url = 'index.php/Home/Api/essayCollection';
   				data = {
   					type: _this.$route.query.flag_type,
					submit_id: _this.$route.query.article_id,
					is_collection: is_collect
				}
   			}else{
   				url = 'index.php/Home/Api/articleCollection';
   				data = {
					type: _this.$route.query.flag_type,
					article_id: articleData.id,
					is_collection: is_collect
				}
   			}
			_this.$api.post(url, data, function(res){
		    	console.log(res);
		    	if(res.code == "200"){
		    		if(is_collect == '1'){
		    			mui.toast('收藏成功！');
		    			_this.articleData.is_article_collect = "1";
		    			_this.articleData.collect_num = Number(_this.articleData.collect_num) + 1;
		    		}else{
		    			_this.articleData.is_article_collect = "0";
		    			_this.articleData.collect_num = Number(_this.articleData.collect_num) - 1;
		    		}
		    		
		    		
		    	}else{
		    		mui.toast('收藏失败，请稍后再试！');
		    	}
		    	
		    },function(err){
		    	if(err){
		    		mui.toast('收藏失败，请稍后再试！');
		    	}
		    })
		},
		listenerScroll: function(){
			var scroll = mui('.mui-scroll-wrapper').scroll(), _this = this;
			
			document.querySelector('.mui-scroll-wrapper').addEventListener('scroll', function (e){
				//这里判断上一次是否请求完毕或者数据已经加载完成，如果为true，也就是还没有请求完毕，则不继续请求，防止服务出错
				if(_this.commentLoad == true || _this.commentLoadType == false){
					return false;
				}
			    var scrollTop = scroll.y;
			    //判断滚动到底部
			    if(scrollTop == scroll.maxScrollY){
			        //上拉加载逻辑代码
			        _this.resCommentList();
			    }
			});
		},
		gotoComment(){
			mui('.mui-scroll-wrapper').scroll().scrollTo(0, -(document.getElementsByClassName('comment')[0].offsetTop));
		},
		shareOpation: function(){
			var _this = this;
			var url = '';
			// 判断是否是ios微信浏览器
		   	if (window.__wxjs_is_wkwebview === true) {
		    	url = this.$store.state.url.split('#')[0];
		   	} else {
		    	url = window.location.href.split('#')[0];
		   	}
		    _this.$api.post('ts.php', {url:url}, function(res){
		    	if(res){
		    		_this.share(res);
		    	}else{
		    		return false;
		    	}
		    },function(err){
		    	if(err){
		    		console.log(err);
		    	}
		    })
		},
		share: function(res){
			var _this = this;
			wx.config({
			    debug: false,
			    appId: res.appId,
			    timestamp: res.timestamp,
			    nonceStr: res.nonceStr,
			    signature: res.signature,
			    jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline']
			});
				
//			wx.ready(function () {
				var cont=_this.articleData.content.replace(/<\/?.+?>/g,"");
 				var content=cont.replace(/ /g,"");//dds为得到后的内容
 				
 				var cover_path = _this.$route.query.cover_path;
 				if(cover_path){
 					var img_url = _this.admin_img_URL + cover_path;
 				}else{
 					var img_url = 'http://dj.celap.cn/pgy/logo.png';
 				}
 				
				//设置分享
				wx.onMenuShareAppMessage({
			        title: _this.articleData.title, // 分享标题
			        desc: content, // 分享的内容简介
			        link: 'http://dj.celap.cn/pgy/index.html#/article?article_id='+_this.articleData.id+'&flag_type=4&status=4',//分享的链接地址
			        imgUrl: img_url,  // 分享图标
			        type: 'link', // 分享类型,music、video或link，不填默认为link
			        success: function () {
			        	console.log('分享成功！');
			        }
	        	});
				wx.onMenuShareTimeline({
			        title: _this.articleData.title, // 分享标题
			        desc: content, // 分享的内容简介
			        link: 'http://dj.celap.cn/pgy/index.html#/article?article_id='+_this.articleData.id+'&flag_type=4&status=4',//分享的链接地址
			        imgUrl: img_url,  // 分享图标
			        type: 'link', // 分享类型,music、video或link，不填默认为link
			        success: function () {
			        	console.log('分享成功！');
			        }
	        	});
		        
//  		})
			//处理验证失败的信息
	        wx.error(function (res) {
	          	console.log('验证失败返回的信息:',res);
	        });
		}
//		showShare(){
//			this.shareShow = true;
//		}
   	}
}
</script>
<style lang="scss">
#articleDetail{
	.mui-scroll-wrapper{
	    bottom: 1.23rem;
	    &.for-bottom{
	    	bottom: 0 !important;
	    }
	}
	.article{
		background: #fff;
		padding: .5rem;
		.title{
			font-size: .55rem;
		    color: #333;
		    padding-bottom: .2rem;
		    line-height: 1.2;
		    box-sizing: border-box;
		    font-weight: 700;
		}
		
		.articleInfo{
			background: #fff;
			padding-bottom: .5rem;
			span{
				font-size: .28rem;
				color: #999;
			}
		}
		.artRecord{
			p{
				padding: .15rem 0;
				.record-title{
					color: #333;
				}
				.record-info{
					margin-right: .3rem;
				}
			}
		}
		.bold-text{
			font-weight: 700;
			padding-top: .3rem;
    		color: #f26d71;
		}
		.artCont{
			font-size: 0.38rem;
		    line-height: 0.6rem;
		    color: #666;
		    padding-top: .3rem;
		    /*white-space: pre;*/
		    img{
		    	width: 100%;
		    	float: left;
		    }
		}
		.img-list{
			padding: .5rem 0;
			img{
				width: 100%;
				padding: .1rem 0;
			}
		}
	}
		
	.comment{
		background-color: #fff;
	    margin-top: .1rem;
	    margin-bottom: .1rem;
	    .noComment{
			padding: .5rem 0;
		    text-align: center;
		    color: #999;
		    font-size: .4rem;
		    font-weight: 200;
		    img{
		    	width: 2.5rem;
		    }
	    }
	    .commentTitle{
	    	padding-bottom: .4rem;
		    text-align: center;
		    position: relative;
		    padding: .4rem;
		    span{
		    	font-size: .5rem;
			    font-weight: 700;
			    letter-spacing: .1rem;
		    }
		    p{
		    	color: #000;
			    letter-spacing: .08rem;
			    font-size: .28rem;
		    }
		    &:before{
		    	content: '';
			    background: #ccc;
			    position: absolute;
			    right: 20%;
			    top: .8rem;
			    height: 1px;
			    width: 1rem;
		    }
		    &:after{
		    	content: '';
			    background: #ccc;
			    position: absolute;
			    top: .8rem;
			    left: 20%;
			    height: 1px;
			    width: 1rem;
		    }
	    }
	    
	    /*评论列表*/
	   	.mui-media-body {
		    position: relative;
		    min-height: 1.06rem;
		}
	   	.mui-table-view .mui-media-object.mui-pull-left{
	   	    width: 1.06rem;
	   	    min-width: 1.06rem;
    		height: 1.06rem;
    		max-width: 1.06rem;
    		border-radius: 50%;
	   	}
	   	.mui-media-body>p{
	   		font-size: .3rem;
	   	}
	   	.commentInfo>span{
	   		font-size: .38rem;
	   	}
	   	.iconfont{
	   		margin-left: .2rem;
	   		&.icon-xiangqing_yidianzan-1{
	   			color: #f26d71 !important;
	   		}
	   	}
	   	.commentCont{
	   		padding: .4rem 0 .2rem 1.36rem;
	   		font-size: 0.4rem;
    		color: #666;
    		line-height: 1.5;
	   	}
	   	
		   	
	}
	/*bottomBar*/
	.bottomBar{
		position: fixed;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    height: 1.2rem;
	    background: #fff;
	    &.for-bottom{
	    	display: none;
	    }
	    ul{
	    	height: 1.2rem;
		    padding: .2rem;
		    text-align: center;
		    .commentInput {
			    display: inline-block;
			    width: 90%;
			    padding: .2rem .4rem;
			    height: .8rem;
			    border-radius: .8rem;
			    color: #999;
			    background: #f2f2f2;
			    font-size: .3rem;
			    text-align: left;
			    line-height: 1.4;
			}
			.iconfont {
			    font-size: .6rem;
			    color: #ccc;
			    span{
			    	font-size: .34rem;
			    	margin-left: .1rem;
			    }
			    &.icon-tabbar_dangjianhuodong, &.icon-xiangqing_yidianzan-1{
		   			color: #f26d71;
		   		}
			}
	    }
	}
	
}
</style>
<template>
	<div id="article">
		<div class="mui-scroll-wrapper">
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
			
			</div>
		</div>
		
		
		<!--loading-->
		<loading v-show="loadShow"></loading>
	</div>
</template>
<script type="text/ecmascript-6">
import wx from 'weixin-js-sdk'
import loading from '../loading/loading.vue'
export default {
  	name: 'article',
  	data: function(){
      	return {
        	articleData: {},
        	loadShow: true,
        	img_URL: 'http://dj.celap.cn/pgy/',
        	admin_img_URL: 'http://dj.celap.cn:8080/pgy-dj-admin/'
      	};
   	},
   	components: {
	  	loading: loading
	},
  	mounted: function() {
  		//初始化滚动组件
   		mui('.mui-scroll-wrapper').scroll({deceleration:0.002});
   		
   },
   	activated: function(){
   		this.articleData = {};
   		this.init();
   		
   	},
   	methods: {
   		init: function(){
   			var _this = this, data = {};
   			_this.loadShow = true;
   			
   			data = {
				article_id: _this.$route.query.article_id,
				flag_type: 4,
				status: 4
			}
		    _this.$api.post('index.php/Home/Api/getArticleInfoByArticleIdAndOpenid', data, function(res){
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
//					wx.ready(function() {
						var cont=_this.articleData.content.replace(/<\/?.+?>/g,"");
 						var content=cont.replace(/ /g,"");//dds为得到后的内容
 						
 						var cover_path = _this.$route.query.cover_path;
		 				if(cover_path){
		 					var img_url = _this.admin_img_URL + cover_path;
		 				}else{
		 					var img_url = 'http://dj.celap.cn/pgy/logo.png';
		 				}
						//设置分享
						wx.onMenuShareTimeline({
					        title: _this.articleData.title, // 分享标题
					        desc: content, // 分享的内容简介
					        link: 'http://dj.celap.cn/pgy/index.html#/article?article_id='+_this.articleData.id+'&flag_type=4&status=4',//分享的链接地址
					        imgUrl: img_url, // 分享图标
					        type: 'link', // 分享类型,music、video或link，不填默认为link
					        success: function () {
					        	console.log('分享成功！');
					        }
			        	});
				        wx.onMenuShareAppMessage({
					        title: _this.articleData.title, // 分享标题
					        desc: content, // 分享的内容简介
					        link: 'http://dj.celap.cn/pgy/index.html#/article?article_id='+_this.articleData.id+'&flag_type=4&status=4',//分享的链接地址
					        imgUrl: img_url, // 分享图标
					        type: 'link', // 分享类型,music、video或link，不填默认为link
					        success: function () {
					        	console.log('分享成功！');
					        }
			        	});
//	        		})
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
<style lang="scss">
#article{
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
	
}
</style>
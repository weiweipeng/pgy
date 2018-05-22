<template>
	<div id="studyDetail">
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll" id="scroll">
				<div>
					<!--topBanner-->
					<div class="topBanner">
						<div class="banner"><img :src="$route.query.img"/></div>
						<ul class="mui-row">
							<li class="mui-col-sm-6 mui-col-xs-6">
								<router-link :to="{path:'/eassyInfo',query: {essayId: $route.query.essayId}}">
									<i class="iconfont icon-dangjianhuodong_dangyuanzhengwen-"></i>
									<span>征文启事</span>
								</router-link>
							</li>
							<li class="mui-col-sm-6 mui-col-xs-6">
								<router-link :to="{path:'/submission',query: {essayId: $route.query.essayId}}">
									<i class="iconfont icon-sanhuiyike_dangxiaozuhui"></i>
									<span>我要投稿</span>
								</router-link>
							</li>
						</ul>
					</div>
					<!--list-->
					<p class="tab_title"><span class="color_red">来稿选登</span></p>
					<!--articleList-->
					<ul class="articleList" v-if="itemData.length != 0">
						<li v-for="item in itemData">
							<router-link :to="{path:'/articleDetail',query: {article_id: item.id, flag_type: 5, cover_path: 'http://dj.celap.cn:8080/pgy-dj-admin/h5/banner/235174643214198837.png'}}">
								<p v-text="item.title"></p>
								<p><span v-text="item.simplename"></span> --- <span v-text="item.name"></span></p>
							</router-link>
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
			
		<!--loading-->
		<loading v-show="loadShow"></loading>
	</div>
</template>
<script type="text/ecmascript-6">
import loading from '../loading/loading.vue'
export default {
  	name: 'studyDetail',
  	data: function() {
      	return {
        	loadShow: true,
        	itemData: [],
        	page: 1,
        	noData: false,
        	admin_img_URL: 'http://dj.celap.cn:8080/pgy-dj-admin/',
        	row: 10,
        	self: null,
        	rerequest: false
      	}
   	},
   	components: {
	  	loading: loading
	},
	watch: {
		$route(to, from) {
			if(from.name == 'articleDetail'){
				this.rerequest = true;
			}else{
				this.rerequest = false;
			}
		}
	},
	activated: function(){
		if(!this.rerequest){
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
	   }
	},
   	methods: {
   		init: function(){
   			var _this = this;
   			
			if(_this.self){
   				_this.self.refresh(true);//重置上拉加载
   			}
			mui.ready(function() {
				mui('#scroll').pullToRefresh({
					down: {
						callback: function() {
							var self = this;
							//刷新先清空页数和数据
							_this.noData = false;//还原无数据的显示状态，避免下拉刷新时出现
							_this.page = 1;
							_this.itemData = [];
							var	data = {
									essayId: _this.$route.query.essayId,
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
							console.log('1')
							var self = this;
							var	data = {
									essayId: _this.$route.query.essayId,
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
   			_this.$api.post('index.php/Home/Api/getEssayListByEssayId', data, function(res){
   				console.log(res);
   				if(res.code == "200" && res.data){
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
#studyDetail{
	.topBanner{
		position: relative;
		background: #fff;
		.banner{
			img{
				width: 100%;
			}
		}
		ul.mui-row{
			padding: .2rem 0;
			width: 100%;
			li{
				position: relative;
				&:first-child:after{
			    	position: absolute;
			    	right: 0;
			    	top: 25%;
			    	content: '';
			    	height: 50%;
			    	width: 1px;
			    	background: #f7afb1;
			    }
				a{
					display: block;
					text-align: center;
					color: #e51c23;
					.iconfont{
						display: inline-block;
					    font-size: .6rem;
					    border: 1px solid #e51c23;
					    padding: .2rem;
					    border-radius: 50%;
					    line-height: 1;
					}
					span{
						display: block;
					    font-size: 0.33rem;
					    margin-top: 0.16rem;
					}
				}
			}
		}
		
	}
	.articleList{
		background: #fff;
		padding-top: 0.3rem;
		li{
			position: relative;
			padding-left: 0.533rem;
		    box-sizing: border-box;
		    padding-bottom: 0.7rem;
		    p{
			    font-size: 0.32rem;
			    color: #999;
			}
		    p:first-child {
			    font-size: 0.4533rem;
			    color: #333;
			    margin-bottom: .1rem;
			}
		}
	}
	.tab_title{
		margin-top: .1rem;
	}
}
</style>
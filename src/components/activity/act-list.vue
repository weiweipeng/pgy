<template>
	<!--old mien-list-->
	<div id="actList">
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<!--文章列表-->
				<div class="actList">
					<div v-for="itemList in actList">
						<ul class="mui-table-view">
							<li class="mui-table-view-cell mui-media" v-for="item in itemList.data">
								<router-link :to="{path:'/articleDetail',query: {article_id: item.id, flag_type: 4, status: 4, cover_path: item.cover_path}}">
									<img class="mui-media-object mui-pull-left lgImg" :src="img_URL + item.cover_path" onerror="this.src='http://dj.celap.cn:8080/pgy-dj-admin/h5/article/201804147398/201804151637378334.jpg'">
									<div class="mui-media-body">
										<span class="title mui-ellipsis-2" v-text="item.title"></span>
										<div class="adds">
											<p class="mui-clearfix">
												<span class="mui-pull-left" v-text="item.pub_time"></span>
												<span class="mui-pull-right"><i class="iconfont icon-yanjing"></i>{{item.hit_num}}</span>
												<span class="mui-pull-right"><i class="iconfont icon-xiangqing_dianzan"></i>{{item.thumbup_num}}</span>
											</p>
										</div>
									</div>
								</router-link>
							</li>
						</ul>
					</div>
				</div>
				<!--无数据-->
				<div class="load-box" v-if="actList.length === 0">
					<div class="load-type">
						<div class="load-noData">
							<img class="nodata_img" src="../../../static/images/noMore.png"/>
							<p class="nodata">暂无内容，我们正在努力为您准备精彩内容</p>
						</div>
					</div>
				</div>
				<!--加载状态-->
				<div class="load-box" v-if="actList.length != 0">
					<div class="load-type">
						<div class="load-start" v-html="resDataLoad">
							
						</div>
					</div>
				</div>
				
			</div>
		</div>
		
		<!--loading-->
		<loading v-show="loadShow"></loading>
	</div>
</template>
<script type="text/ecmascript-6">
import loading from '../loading/loading.vue'
export default {
  	name: 'actList',
  	data: function() {
      	return {
        	loadShow: false,
        	actList: [],
        	page: 1,
        	resLoadType: true,
        	resType: true,//（发生于滚动条滚动）防止上一次请求未完成，又请求的情况（包括请求多次的情况）
        	resDataLoad: '',
        	img_URL: 'http://dj.celap.cn:8080/pgy-dj-admin/'
      	}
   	},
   	components: {
	  	loading: loading
	},
	activated: function(){
		this.actList=[];
        this.page=1;
		this.init();
	},
	mounted: function() {
        //初始化滚动组件
   		mui('.mui-scroll-wrapper').scroll({deceleration:0.002});
   		this.listenerScroll();
	},
   	methods: {
   		init: function(){
   			//请求初始的数据
			var _this = this,
				load_start = '上拉加载更多数据',
				load_now = '<i class="mui-spinner"></i><span>正在努力加载中</span>',
				load_end = '<span>数据已全部加载</span>';
				
			var data = {
					category_id: _this.$route.query.category_id,
					p: _this.page,
					row: 10
				}
			
			_this.resType = false;
			_this.loadShow = true;
			_this.resDataLoad = load_now;
		    _this.$api.post('index.php/Home/Api/articleList', data, function(res){
		    	console.log(res);
		    	if(res.code == '200'){
		    		_this.actList.push.apply(_this.actList, res.data);
					_this.page ++;
					var totalLenth = 0;
					for (var i = 0; i < res.data.length; i++) {
						totalLenth += res.data[i].data.length;
					}
					
					if(totalLenth < 10){
						_this.resDataLoad = load_end;
						_this.resLoadType = false;
		    		}else{
		    			_this.resDataLoad = load_start;
		    			_this.resLoadType = true;
		    			_this.resType = true;
		    		}
		    		_this.loadShow = false;
		    	}else if(res.code == '0'){
		    		_this.resDataLoad = load_end;
		    		_this.loadShow = false;
		    	}else{
		    		_this.loadShow = false;
		    		mui.toast('网络繁忙！');
		    	}
		    },function(err){
		    	if(err){
		    		_this.loadShow = false;
		    		mui.toast('网络繁忙！');
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
			    if(scrollTop == scroll.maxScrollY){
			        //上拉加载逻辑代码
			        _this.init();
			    }
			});
		}
   	}
}
</script>
<style lang="scss">
#actList{
	.mui-pull-right{
		margin-left: .2rem;
	}
	.icon-yanjing,.icon-xiangqing_dianzan{
		font-size: .32rem;
    	margin-right: .1rem;
	}
	.nodata_img{
		width: 40%;
		margin-top: .4rem;
	}
	.nodata{
		color: #999;
		font-size: .34rem;
	}
	.mui-media-body>div.adds:last-child{
		width: 100%;
	}
}
</style>
<template>
	<div id="train">
		<div class="mui-content">
			<div id="slider" class="mui-slider mui-fullscreen bottom1_3">
				<div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<a class="mui-control-item mui-active" href="#item1mobile">习语</a>
					<a class="mui-control-item" href="#item2mobile">两学一做</a>
					<a class="mui-control-item" href="#item3mobile">从严治党</a>
					<a class="mui-control-item" href="#item4mobile">筑梦中国</a>
				</div>
				<div class="mui-slider-group">
					<div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
						<div class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<div>
									<!--遍历数据-->
									<div v-for="itemList in itemData[0].data">
										<ul class="mui-table-view">
											<li class="mui-table-view-cell mui-media" v-for="item in itemList.data">
												<router-link :to="{path:'/articleDetail',query: {article_id: item.id, flag_type: 4, status: 4, cover_path: item.cover_path}}">
													<img class="mui-media-object mui-pull-left lgImg" :src="admin_img_URL + item.cover_path" onerror="this.src='http://dj.celap.cn:8080/pgy-dj-admin/h5/article/201804147398/201804151637378334.jpg'">
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
									<!--无数据-->
									<div class="no-data-box" v-if="noData[0].type && itemData[0].data.length === 0">
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
					</div>
					<div id="item2mobile" class="mui-slider-item mui-control-content">
						<div class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<div>
									<!--遍历数据-->
									<div v-for="itemList in itemData[1].data">
										<ul class="mui-table-view">
											<li class="mui-table-view-cell mui-media" v-for="item in itemList.data">
												<router-link :to="{path:'/articleDetail',query: {article_id: item.id, flag_type: 4, status: 4, cover_path: item.cover_path}}">
													<img class="mui-media-object mui-pull-left lgImg" :src="admin_img_URL + item.cover_path" onerror="this.src='http://dj.celap.cn:8080/pgy-dj-admin/h5/article/201804147398/201804151637378334.jpg'">
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
									<!--无数据-->
									<div class="no-data-box" v-if="noData[1].type && itemData[1].data.length === 0">
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
					</div>
					<div id="item3mobile" class="mui-slider-item mui-control-content">
						<div class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<div>
									<!--遍历数据-->
									<div v-for="itemList in itemData[2].data">
										<ul class="mui-table-view">
											<li class="mui-table-view-cell mui-media" v-for="item in itemList.data">
												<router-link :to="{path:'/articleDetail',query: {article_id: item.id, flag_type: 4, status: 4, cover_path: item.cover_path}}">
													<img class="mui-media-object mui-pull-left lgImg" :src="admin_img_URL + item.cover_path" onerror="this.src='http://dj.celap.cn:8080/pgy-dj-admin/h5/article/201804147398/201804151637378334.jpg'">
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
									<!--无数据-->
									<div class="no-data-box" v-if="noData[2].type && itemData[2].data.length === 0">
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
					</div>
					<div id="item4mobile" class="mui-slider-item mui-control-content">
						<div class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<div>
									<!--遍历数据-->
									<div v-for="itemList in itemData[3].data">
										<ul class="mui-table-view">
											<li class="mui-table-view-cell mui-media" v-for="item in itemList.data">
												<router-link :to="{path:'/articleDetail',query: {article_id: item.id, flag_type: 4, status: 4, cover_path: item.cover_path}}">
													<img class="mui-media-object mui-pull-left lgImg" :src="admin_img_URL + item.cover_path" onerror="this.src='http://dj.celap.cn:8080/pgy-dj-admin/h5/article/201804147398/201804151637378334.jpg'">
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
									<!--无数据-->
									<div class="no-data-box" v-if="noData[3].type && itemData[3].data.length === 0">
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
  	name: 'train',
  	data: function() {
      	return {
      		loadShow: true,
      		itemData: [{data:[]},{data:[]},{data:[]},{data:[]}],
			page: [{page: 1},{page: 1},{page: 1},{page: 1}],
			noData: [{type: false},{type: false},{type: false},{type: false}],
			admin_img_URL: 'http://dj.celap.cn:8080/pgy-dj-admin/',
			row: 10
      	};
   	},
   	watch: {
		$route(to, from) {
			if(to.name == "train" && from.name == "index"){
				this.gotoItem();
			}
		}
	},
   	components: {
	  	loading: loading
	},
   	mounted: function() {
   		var deceleration = mui.os.ios?0.003:0.0009;
		mui('.mui-scroll-wrapper').scroll({
			bounce: false,
			indicators: true, //是否显示滚动条
			deceleration:deceleration
		});
   		this.init();
   		this.gotoItem();
   		this.goHref();
   	},
   	methods: {
   		init: function(){
			//阻尼系数
			var _this = this;
			mui.ready(function() {
				//循环初始化所有下拉刷新，上拉加载。
				mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
					console.log(pullRefreshEl)
					mui(pullRefreshEl).pullToRefresh({
						down: {
							callback: function() {
								var self = this;
								//刷新先清空页数和数据
								_this.noData[index].type = false;//还原无数据的显示状态，避免下拉刷新时出现
								_this.page[index].page = 1;
								_this.itemData[index].data = [];
								var	data = {
										category_id: (501 + index),
										p: _this.page[index].page,
										row: _this.row
									}
								self.refresh(true);//重置上拉加载	
								_this.getData(data, index, self, 0);
							}
						},
						up: {
							auto: true,
							callback: function() {
								var self = this;
								var	data = {
										category_id: (501 + index),
										p: _this.page[index].page,
										row: _this.row
									}
								//data表示参数，index表示第一个选项卡， self表示当前dom节点，1 表示上拉加载
								_this.getData(data, index, self, 1);
							}
						}
					})
				})
			})
   		},
   		getData: function(data, index, self, type){
   			var _this = this;
   			//请求数据
   			_this.$api.post('index.php/Home/Api/articleList', data, function(res){
   				console.log(res);
   				if(res.code == "200" && res.data){
   					//根据index判断一下是哪个选项卡请求数据
   					_this.itemData[index].data.push.apply(_this.itemData[index].data, res.data);
					_this.page[index].page ++;
					//判断数据长度
					var totalLenth = 0;
					for (var i = 0; i < res.data.length; i++) {
						totalLenth += res.data[i].data.length;
					}
   					var noMore = totalLenth < _this.row ? true : false;
					
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
   					_this.noData[index].type = true;
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
   					},1000)
   						
   				}	
		    	
		    },function(err){
		    	if(err){
		    		_this.loadShow = false;
		    		mui.toast('数据请求失败，请稍后再试！');
		    	}
		    })
   			
	   			
   		},
   		gotoItem: function(){
   			var newType = this.$route.query.sliderNum;
   			if(!newType){
   				newType = 0;
   			}
   			
	   		var gallery = mui('.mui-slider');
			gallery.slider().gotoItem(newType);
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
#train{
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
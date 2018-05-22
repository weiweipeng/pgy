<template>
	<div id="train">
		<div class="mui-content">
			<div id="slider" class="mui-slider mui-fullscreen bottom1_3">
				<div id="sliderSegmentedControl" class="bg-white mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<a class="mui-control-item mui-active" href="#item1mobile">习语</a>
					<a class="mui-control-item" href="#item2mobile">两学一做</a>
					<a class="mui-control-item" href="#item3mobile">从严治党</a>
					<a class="mui-control-item" href="#item4mobile">筑梦中国</a>
				</div>
				
				<div class="mui-slider-group">
					<div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
						<div id="scroll1" class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<!--数据-->
								<div v-for="itemList in item1Data">
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
								<!--无数据-->
								<div class="load-box" v-if="item1Data.length === 0 && noData1">
									<div class="load-type">
										<div class="load-noData">
											<img class="nodata_img" src="../../../static/images/noMore.png"/>
											<p class="nodata">暂无内容，我们正在努力为您准备精彩内容</p>
										</div>
									</div>
								</div>
								<!--加载状态-->
								<div class="load-box" v-if="item1Data.length != 0">
									<div class="load-type">
										<div class="load-start" v-html="resDataLoad1">
											
										</div>
									</div>
								</div>
								
							</div>
						</div>
					</div>
					<div id="item2mobile" class="mui-slider-item mui-control-content">
						<div class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<div v-for="itemList in item2Data">
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
								
								<!--无数据-->
								<div class="load-box" v-if="item2Data.length === 0 && noData2">
									<div class="load-type">
										<div class="load-noData">
											<img class="nodata_img" src="../../../static/images/noMore.png"/>
											<p class="nodata">暂无内容，我们正在努力为您准备精彩内容</p>
										</div>
									</div>
								</div>
								<!--加载状态-->
								<div class="load-box" v-if="item2Data.length != 0">
									<div class="load-type">
										<div class="load-start" v-html="resDataLoad2">
											
										</div>
									</div>
								</div>
								
							</div>
						</div>
					</div>
					<div id="item3mobile" class="mui-slider-item mui-control-content">
						<div class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<div v-for="itemList in item3Data">
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
								<!--无数据-->
								<div class="load-box" v-if="item3Data.length === 0 && noData3">
									<div class="load-type">
										<div class="load-noData">
											<img class="nodata_img" src="../../../static/images/noMore.png"/>
											<p class="nodata">暂无内容，我们正在努力为您准备精彩内容</p>
										</div>
									</div>
								</div>
								<!--加载状态-->
								<div class="load-box" v-if="item3Data.length != 0">
									<div class="load-type">
										<div class="load-start" v-html="resDataLoad3">
											
										</div>
									</div>
								</div>
								
							</div>
						</div>
					</div>
					<div id="item4mobile" class="mui-slider-item mui-control-content">
						<div class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<div v-for="itemList in item4Data">
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
								<!--无数据-->
								<div class="load-box" v-if="item4Data.length === 0 && noData4">
									<div class="load-type">
										<div class="load-noData">
											<img class="nodata_img" src="../../../static/images/noMore.png"/>
											<p class="nodata">暂无内容，我们正在努力为您准备精彩内容</p>
										</div>
									</div>
								</div>
								<!--加载状态-->
								<div class="load-box" v-if="item4Data.length != 0">
									<div class="load-type">
										<div class="load-start" v-html="resDataLoad4">
											
										</div>
									</div>
								</div>
								
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
      		item1Data: [],
			item2Data: [],
			item3Data: [],
			item4Data: [],
			resDataLoad1: '',//resDataLoad 表示加载时显示的文字信息
			resDataLoad2: '',
			resDataLoad3: '',
			resDataLoad4: '',
			resDataLoadType1: true, //resDataLoadType表示是否可以继续加载 的一个状态
			resDataLoadType2: true,
			resDataLoadType3: true,
			resDataLoadType4: true,
			item1Page: 1,//请求页码
			item2Page: 1,
			item3Page: 1,
			item4Page: 1,
			noData1: true,
			noData2: false,
			noData3: false,
			noData4: false,
        	loadShow: true,
        	img_URL: 'http://dj.celap.cn:8080/pgy-dj-admin/'
      	};
   	},
   	components: {
	  	loading: loading
	},
	created: function() {
		//请求tab1的数据
		this.getItemData({category_id: 501, p: 1, row: 10}, 0);
	},
	watch: {
		$route(to, from) {
			if(to.name == "train" && from.name == "index"){
				this.gotoItem();
			}
		}
	},
   	mounted: function() {
   		//初始化轮播组件和滚动组件
		mui("#slider").slider();
   		mui('.mui-scroll-wrapper').scroll({deceleration:0.002});//, bounce: false
   		this.init();
   		this.listenerScroll('#item1mobile', 0);
   		this.gotoItem();
   	},
   	methods: {
   		init: function(){
			var _this = this;
			
			//监听tab切换
			document.getElementById('slider').addEventListener('slide', function(e) {
				if (e.detail.slideNumber === 0 && _this.item1Data == '') {
					_this.loadShow = true;
					_this.getItemData({category_id: 501, p: _this.item1Page, row: 10}, 0);
					_this.listenerScroll('#item1mobile', 0);
				}else if (e.detail.slideNumber === 1 && _this.item2Data == '') {
					_this.noData2 = true;
					_this.loadShow = true;
					_this.getItemData({category_id: 502, p: _this.item2Page, row: 10}, 1);
					_this.listenerScroll('#item2mobile', 1);
				}else if (e.detail.slideNumber === 2 && _this.item3Data == '') {
					_this.noData3 = true;
					_this.loadShow = true;
					_this.getItemData({category_id: 503, p: _this.item3Page, row: 10}, 2);
					_this.listenerScroll('#item3mobile', 2);
				}else if (e.detail.slideNumber === 3 && _this.item4Data == '') {
					_this.noData4 = true;
					_this.loadShow = true;
					_this.getItemData({category_id: 504, p: _this.item4Page, row: 10}, 3);
					_this.listenerScroll('#item4mobile', 3);
				}else{
					return false;
				}
			});
		},
		getItemData: function(data, index) {
			var _this = this,
				load_start = '<i class="mui-spinner"></i><span>正在努力加载中</span>',
				load_noData = '<img class="nodata_img" src="../../../static/images/noMore.png"/><p class="nodata">暂无内容，我们正在努力为您准备精彩内容</p>',
				load_end = '<span>数据已全部加载</span>';
				
			if(index === 0){
				_this.resDataLoad1 = load_start;
				_this.resDataLoadType1 = false;
			}else if(index === 1){
				_this.resDataLoad2 = load_start;
				_this.resDataLoadType2 = false;
			}else if(index === 2){
				_this.resDataLoad3 = load_start;
				_this.resDataLoadType3 = false;
			}else if(index === 3){
				_this.resDataLoad4 = load_start;
				_this.resDataLoadType4 = false;
			}else{
				return false;
			}
			_this.$api.post('index.php/Home/Api/articleList', data, function(res){
		    	console.log(res);
//		    	setTimeout(function(){
			    	if(res.code == "200" && res.data){
			    		if(index == 0){
							_this.item1Data.push.apply(_this.item1Data, res.data);
							_this.item1Page ++;
							var totalLenth = 0;
							for (var i = 0; i < res.data.length; i++) {
								totalLenth += res.data[i].data.length;
							}
							if(totalLenth < 10){
								_this.resDataLoad1 = load_end;
								_this.resDataLoadType1 = false;
				    		}else{
				    			_this.resDataLoadType1 = true;
				    		}
						}else if(index === 1){
							_this.item2Data.push.apply(_this.item2Data, res.data);
							_this.item2Page ++;
							var totalLenth = 0;
							for (var i = 0; i < res.data.length; i++) {
								totalLenth += res.data[i].data.length;
							}
							if(totalLenth < 10){
								_this.resDataLoad2 = load_end;
								_this.resDataLoadType2 = false;
				    		}else{
				    			_this.resDataLoadType2 = true;
				    		}
							
						}else if(index === 2){
							_this.item3Data.push.apply(_this.item3Data, res.data);
							_this.item3Page ++;
							var totalLenth = 0;
							for (var i = 0; i < res.data.length; i++) {
								totalLenth += res.data[i].data.length;
							}
							if(totalLenth < 10){
								_this.resDataLoad3 = load_end;
								_this.resDataLoadType3 = false;
				    		}else{
				    			_this.resDataLoadType3 = true;
				    		}
						}else if(index === 3){
							_this.item4Data.push.apply(_this.item4Data, res.data);
							_this.item4Page ++;
							var totalLenth = 0;
							for (var i = 0; i < res.data.length; i++) {
								totalLenth += res.data[i].data.length;
							}
							if(totalLenth < 10){
								_this.resDataLoad4 = load_end;
								_this.resDataLoadType4 = false;
				    		}else{
				    			_this.resDataLoadType4 = true;
				    		}
						}else{
							return false;
						}
						
			    	}else if(res.code == "0"){
			    		if(index === 0){
							_this.resDataLoad1 = load_end;
							_this.resDataLoadType1 = false;
						}else if(index === 1){
							_this.resDataLoad2 = load_end;
							_this.resDataLoadType2 = false;
						}else if(index === 2){
							_this.resDataLoad3 = load_end;
							_this.resDataLoadType3 = false;
						}else if(index === 3){
							_this.resDataLoad4 = load_end;
							_this.resDataLoadType4 = false;
						}else{
							return false;
						}
			    	}else{
			    		mui.toast('数据加载失败，请稍后再试！');
			    	}
		    	
					_this.loadShow = false;
//				},1000);
		    	
		    },function(err){
		    	if(err){
		    		_this.loadShow = false;
		    		mui.toast('数据请求失败，请稍后再试！');
		    	}
		    })
		},
		listenerScroll: function(ele, index){
			var scroll = mui('.mui-scroll-wrapper').scroll(), _this = this, page = 1;
			document.querySelector(ele).addEventListener('scroll', function (e){
				
				if(index === 0 && _this.resDataLoadType1 === true){
					page = _this.item1Page;
				}else if(index === 1 && _this.resDataLoadType2 === true){
					page = _this.item2Page;
				}else if(index === 2 && _this.resDataLoadType3 === true){
					page = _this.item3Page;
				}else if(index === 3 && _this.resDataLoadType4 === true){
					page = _this.item4Page;
				}else{
					return false;
				}
			    var scrollTop = scroll[index].y;
			    //判断滚动到底部
			    if(scrollTop == scroll[index].maxScrollY){
			        //上拉加载逻辑代码
			        _this.getItemData({category_id: (512 + index), p: page, row: 10}, index);
			    }
			});
		},
   		gotoItem: function(){
   			var newType = this.$route.query.sliderNum;
   			if(!newType){
   				newType = 0;
   			}
   			
	   		var gallery = mui('.mui-slider');
			gallery.slider().gotoItem(newType);
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
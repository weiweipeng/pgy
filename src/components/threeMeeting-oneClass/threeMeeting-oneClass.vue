<template>
	<div id="threeM_oneC">
		<div class="mui-content icon_tab tab_box">
			<div id="slider" class="mui-slider mui-fullscreen">
				<div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<a class="mui-control-item mui-active" href="#item1mobile"><i class="iconfont icon-dangjianhuodong_sanhuiyike-"></i><p>三会一课</p></a>
					<a class="mui-control-item" href="#item2mobile"><i class="iconfont icon-sanhuiyike_zhibudahui"></i><p>支部大会</p></a>
					<a class="mui-control-item" href="#item3mobile"><i class="iconfont icon-sanhuiyike_zhibuweiyuanhui"></i><p>支部委员会</p></a>
					<a class="mui-control-item" href="#item4mobile"><i class="iconfont icon-sanhuiyike_dangxiaozuhui"></i><p>党小组会</p></a>
					<a class="mui-control-item" href="#item5mobile"><i class="iconfont icon-sanhuiyike_dangke"></i><p>党课</p></a>
				</div>
				<div class="mui-slider-group">
					<div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
						<div class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<div class="itemBox">
									<!--遍历数据-->
									<div class="explain mui-pull-right">
										<span><span class="orange_circle"></span>正在进行</span>
										<span><span class="red_circle"></span>已结束</span>
									</div>
									<div v-for="itemList in itemData[0].data">
										<div class="nowYear" v-if="itemList.year" v-text="itemList.year"></div>
										<ul class="tablist">
											<li :class="item.status != '4' ? 'active' : ''" v-for="(item, index) in itemList.continueData">
												<router-link :to="{path:'/meetingDetail',query: {article_id: item.id, flag_type: 1, status: item.status}}">
													<p class="title"><i class="iconfont icon-huiyixiangqing-huiyi"></i><span v-text="item.title"></span></p>
													<p>
														<span v-text="'时间：' + item.pub_time"></span>
													</p>
													<p>
														<span v-text="'地址：' + (item.meeting_addr === null ? '--' : item.meeting_addr)"></span>
														<span class="bandge mui-pull-right" v-text="item.category_name"></span>
													</p>
												</router-link>
												<span class="cicle"  v-if="item.pub_time" v-text="item.pub_time.slice(5,10)"></span>
											</li>
										</ul>
										<ul class="tablist">
											<li :class="item.status != '4' ? 'active' : ''" v-for="(item, index) in itemList.endData">
												<router-link :to="{path:'/meetingDetail',query: {article_id: item.id, flag_type: 1, status: item.status}}">
													<p class="title"><i class="iconfont icon-huiyixiangqing-huiyi"></i><span v-text="item.title"></span></p>
													<p>
														<span v-text="'时间：' + item.pub_time"></span>
													</p>
													<p>
														<span v-text="'地址：' + (item.meeting_addr === null ? '--' : item.meeting_addr)"></span>
														<span class="bandge mui-pull-right" v-text="item.category_name"></span>
													</p>
												</router-link>
												<span class="cicle"  v-if="item.pub_time" v-text="item.pub_time.slice(5,10)"></span>
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
								<div class="itemBox">
									<!--遍历数据-->
									<div class="explain mui-pull-right">
										<span><span class="orange_circle"></span>正在进行</span>
										<span><span class="red_circle"></span>已结束</span>
									</div>
									<div v-for="itemList in itemData[1].data">
										<div class="nowYear" v-if="itemList.year" v-text="itemList.year"></div>
										<ul class="tablist">
											<li :class="item.status != '4' ? 'active' : ''" v-for="(item, index) in itemList.continueData">
												<router-link :to="{path:'/meetingDetail',query: {article_id: item.id, flag_type: 1, status: item.status}}">
													<p class="title"><i class="iconfont icon-huiyixiangqing-huiyi"></i><span v-text="item.title"></span></p>
													<p>
														<span v-text="'时间：' + item.pub_time"></span>
													</p>
													<p>
														<span v-text="'地址：' + (item.meeting_addr === null ? '--' : item.meeting_addr)"></span>
														<span class="bandge mui-pull-right" v-text="item.category_name"></span>
													</p>
												</router-link>
												<span class="cicle"  v-if="item.pub_time" v-text="item.pub_time.slice(5,10)"></span>
											</li>
										</ul>
										<ul class="tablist">
											<li :class="item.status != '4' ? 'active' : ''" v-for="(item, index) in itemList.endData">
												<router-link :to="{path:'/meetingDetail',query: {article_id: item.id, flag_type: 1, status: item.status}}">
													<p class="title"><i class="iconfont icon-huiyixiangqing-huiyi"></i><span v-text="item.title"></span></p>
													<p>
														<span v-text="'时间：' + item.pub_time"></span>
													</p>
													<p>
														<span v-text="'地址：' + (item.meeting_addr === null ? '--' : item.meeting_addr)"></span>
														<span class="bandge mui-pull-right" v-text="item.category_name"></span>
													</p>
												</router-link>
												<span class="cicle"  v-if="item.pub_time" v-text="item.pub_time.slice(5,10)"></span>
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
								<div class="itemBox">
									<!--遍历数据-->
									<div class="explain mui-pull-right">
										<span><span class="orange_circle"></span>正在进行</span>
										<span><span class="red_circle"></span>已结束</span>
									</div>
									<div v-for="itemList in itemData[2].data">
										<div class="nowYear" v-if="itemList.year" v-text="itemList.year"></div>
										<ul class="tablist">
											<li :class="item.status != '4' ? 'active' : ''" v-for="(item, index) in itemList.continueData">
												<router-link :to="{path:'/meetingDetail',query: {article_id: item.id, flag_type: 1, status: item.status}}">
													<p class="title"><i class="iconfont icon-huiyixiangqing-huiyi"></i><span v-text="item.title"></span></p>
													<p>
														<span v-text="'时间：' + item.pub_time"></span>
													</p>
													<p>
														<span v-text="'地址：' + (item.meeting_addr === null ? '--' : item.meeting_addr)"></span>
														<span class="bandge mui-pull-right" v-text="item.category_name"></span>
													</p>
												</router-link>
												<span class="cicle"  v-if="item.pub_time" v-text="item.pub_time.slice(5,10)"></span>
											</li>
										</ul>
										<ul class="tablist">
											<li :class="item.status != '4' ? 'active' : ''" v-for="(item, index) in itemList.endData">
												<router-link :to="{path:'/meetingDetail',query: {article_id: item.id, flag_type: 1, status: item.status}}">
													<p class="title"><i class="iconfont icon-huiyixiangqing-huiyi"></i><span v-text="item.title"></span></p>
													<p>
														<span v-text="'时间：' + item.pub_time"></span>
													</p>
													<p>
														<span v-text="'地址：' + (item.meeting_addr === null ? '--' : item.meeting_addr)"></span>
														<span class="bandge mui-pull-right" v-text="item.category_name"></span>
													</p>
												</router-link>
												<span class="cicle"  v-if="item.pub_time" v-text="item.pub_time.slice(5,10)"></span>
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
								<div class="itemBox">
									<!--遍历数据-->
									<div class="explain mui-pull-right">
										<span><span class="orange_circle"></span>正在进行</span>
										<span><span class="red_circle"></span>已结束</span>
									</div>
									<div v-for="itemList in itemData[3].data">
										<div class="nowYear" v-if="itemList.year" v-text="itemList.year"></div>
										<ul class="tablist">
											<li :class="item.status != '4' ? 'active' : ''" v-for="(item, index) in itemList.continueData">
												<router-link :to="{path:'/meetingDetail',query: {article_id: item.id, flag_type: 1, status: item.status}}">
													<p class="title"><i class="iconfont icon-huiyixiangqing-huiyi"></i><span v-text="item.title"></span></p>
													<p>
														<span v-text="'时间：' + item.pub_time"></span>
													</p>
													<p>
														<span v-text="'地址：' + (item.meeting_addr === null ? '--' : item.meeting_addr)"></span>
														<span class="bandge mui-pull-right" v-text="item.category_name"></span>
													</p>
												</router-link>
												<span class="cicle"  v-if="item.pub_time" v-text="item.pub_time.slice(5,10)"></span>
											</li>
										</ul>
										<ul class="tablist">
											<li :class="item.status != '4' ? 'active' : ''" v-for="(item, index) in itemList.endData">
												<router-link :to="{path:'/meetingDetail',query: {article_id: item.id, flag_type: 1, status: item.status}}">
													<p class="title"><i class="iconfont icon-huiyixiangqing-huiyi"></i><span v-text="item.title"></span></p>
													<p>
														<span v-text="'时间：' + item.pub_time"></span>
													</p>
													<p>
														<span v-text="'地址：' + (item.meeting_addr === null ? '--' : item.meeting_addr)"></span>
														<span class="bandge mui-pull-right" v-text="item.category_name"></span>
													</p>
												</router-link>
												<span class="cicle"  v-if="item.pub_time" v-text="item.pub_time.slice(5,10)"></span>
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
					<div id="item5mobile" class="mui-slider-item mui-control-content">
						<div class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<div class="itemBox">
									<!--遍历数据-->
									<div class="explain mui-pull-right">
										<span><span class="orange_circle"></span>正在进行</span>
										<span><span class="red_circle"></span>已结束</span>
									</div>
									<div v-for="itemList in itemData[4].data">
										<div class="nowYear" v-if="itemList.year" v-text="itemList.year"></div>
										<ul class="tablist">
											<li :class="item.status != '4' ? 'active' : ''" v-for="(item, index) in itemList.continueData">
												<router-link :to="{path:'/meetingDetail',query: {article_id: item.id, flag_type: 1, status: item.status}}">
													<p class="title"><i class="iconfont icon-huiyixiangqing-huiyi"></i><span v-text="item.title"></span></p>
													<p>
														<span v-text="'时间：' + item.pub_time"></span>
													</p>
													<p>
														<span v-text="'地址：' + (item.meeting_addr === null ? '--' : item.meeting_addr)"></span>
														<span class="bandge mui-pull-right" v-text="item.category_name"></span>
													</p>
												</router-link>
												<span class="cicle"  v-if="item.pub_time" v-text="item.pub_time.slice(5,10)"></span>
											</li>
										</ul>
										<ul class="tablist">
											<li :class="item.status != '4' ? 'active' : ''" v-for="(item, index) in itemList.endData">
												<router-link :to="{path:'/meetingDetail',query: {article_id: item.id, flag_type: 1, status: item.status}}">
													<p class="title"><i class="iconfont icon-huiyixiangqing-huiyi"></i><span v-text="item.title"></span></p>
													<p>
														<span v-text="'时间：' + item.pub_time"></span>
													</p>
													<p>
														<span v-text="'地址：' + (item.meeting_addr === null ? '--' : item.meeting_addr)"></span>
														<span class="bandge mui-pull-right" v-text="item.category_name"></span>
													</p>
												</router-link>
												<span class="cicle"  v-if="item.pub_time" v-text="item.pub_time.slice(5,10)"></span>
											</li>
										</ul>
									</div>
									<!--无数据-->
									<div class="no-data-box" v-if="noData[4].type && itemData[4].data.length === 0">
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
  	name: 'threeM_oneC',
  	data: function() {
      	return {
			loadShow: true,
      		itemData: [{data:[]},{data:[]},{data:[]},{data:[]},{data:[]}],
			page: [{page: 1},{page: 1},{page: 1},{page: 1},{page: 1}],
			noData: [{type: false},{type: false},{type: false},{type: false},{type: false}],
			admin_img_URL: 'http://dj.celap.cn:8080/pgy-dj-admin/',
			row: 10
      	};
   },
   	components: {
	  	loading: loading
	},
   	mounted: function() {
   		mui("#slider").slider();
   		var deceleration = mui.os.ios?0.003:0.0009;
		mui('.mui-scroll-wrapper').scroll({
			bounce: false,
			indicators: true, //是否显示滚动条
			deceleration:deceleration
		});
   		this.init();
   		this.goHref();
   	},
   	methods: {
   		init: function(){
			//阻尼系数
			var _this = this;
			mui.ready(function() {
				//循环初始化所有下拉刷新，上拉加载。
				mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
					mui(pullRefreshEl).pullToRefresh({
						down: {
							callback: function() {
								var self = this;
								//刷新先清空页数和数据
								_this.noData[index].type = false;//还原无数据的显示状态，避免下拉刷新时出现
								_this.page[index].page = 1;
								_this.itemData[index].data = [];
								if(index == '0'){
									var category_id = 'threeAll'
								}else{
									var category_id = 511 + index;
								}
								var	data = {
										category_id: category_id,
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
								if(index == '0'){
									var category_id = 'threeAll'
								}else{
									var category_id = 511 + index;
								}
								var	data = {
										category_id: category_id,
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
   					if(!res.data){
		    			var newResData = [];
		    		}else{
		    			var newResData = res.data;
		    		}
					var dataLength = 0;
					for(var i = 0;i < newResData.length;i++){
                        var _i = i;
						if(!_this.itemData[index].data[_i]){
							_this.itemData[index].data.push(newResData[_i]);
						}else{
                            var existence = false;
                            for(var x = 0;x < _this.itemData[index].data.length;x++){
                                if(_this.itemData[index].data[x].year == newResData[_i].year){
                                    if(_this.itemData[index].data[x].continueData){
                                        _this.itemData[index].data[x].continueData.push.apply(_this.itemData[index].data[x].continueData, newResData[_i].continueData);
                                    }
                                    if(_this.itemData[index].data[x].endData){
                                        _this.itemData[index].data[x].endData.push.apply(_this.itemData[index].data[x].endData, newResData[_i].endData);
                                    }
                                    _this.itemData[index].data[x].year = newResData[_i].year;
                                    existence = true;
                                }
                            }
                            if(existence === false){
                                _this.itemData[index].data.push(newResData[_i]);
						    }
                        }
						dataLength += newResData[i].continueData.length + newResData[i].endData.length;
					}
					_this.page[index].page ++;
					//判断数据长度
   					var noMore = dataLength < _this.row ? true : false;
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
#threeM_oneC{
	.mui-fullscreen .mui-segmented-control~.mui-slider-group {
	    top: 1.5rem;
	}
	.mui-segmented-control.mui-segmented-control-inverted .mui-control-item {
	    font-size: .4rem;
	    min-height: inherit;
    	line-height: inherit;
	    color: #666;
	    height: 1.5rem;
	    padding: .2rem 0 .3rem;
	}
	.tab_box .mui-scroll-wrapper {
	    top: 0;
	}
	
}

</style>
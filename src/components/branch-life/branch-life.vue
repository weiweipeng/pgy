<template>
	<div id="branchLife">
		<div class="tab_box">
			<div class="tab_title">
				<span>{{$route.query.title}}安排</span>
				<div class="explain mui-pull-right">
					<span><span class="orange_circle"></span>正在进行</span>
					<span><span class="red_circle"></span>已结束</span>
				</div>
			</div>
			<div class="mui-scroll-wrapper">
				<div class="mui-scroll" id="scroll">
					<div>
					<!--遍历数据-->
						<div v-for="itemList in itemData">
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
											<span class="bandge mui-pull-right" v-text="item.simplename"></span>
										</p>
									</router-link>
									<span class="cicle" v-text="item.pub_time.slice(5,10)"></span>
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
											<span class="bandge mui-pull-right" v-text="item.simplename"></span>
										</p>
									</router-link>
									<span class="cicle" v-text="item.pub_time.slice(5,10)"></span>
								</li>
							</ul>
						</div>
					</div>
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
  	name: 'branchLife',
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
			if(from.name == 'meetingDetail'){
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
				deceleration: deceleration
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
									category_id: _this.$route.query.category_id,
									p: _this.page,
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
									category_id: _this.$route.query.category_id,
									p: _this.page,
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
   			_this.$api.post('index.php/Home/Api/articleList', data, function(res){
   				console.log(res);
   				if(res.code == "200"){
   					//根据index判断一下是哪个选项卡请求数据
   					if(!res.data){
		    			var newResData = [];
		    		}else{
		    			var newResData = res.data;
		    		}
					var dataLength = 0;
					for(var i = 0;i < newResData.length;i++){
                        var _i = i;
						if(!_this.itemData[_i]){
							_this.itemData.push(newResData[_i]);
						}else{
                            var existence = false;
                            for(var x = 0;x < _this.itemData.length;x++){
                                if(_this.itemData[x].year == newResData[_i].year){
                                    if(_this.itemData[x].data.continueData){
                                        _this.itemData[x].data.continueData.push.apply(_this.itemData[x].data.continueData, newResData[_i].data.continueData);
                                    }
                                    if(_this.itemData[x].data.endData){
                                        _this.itemData[x].data.endData.push.apply(_this.itemData[x].data.endData, newResData[_i].data.endData);
                                    }
                                    _this.itemData[x].year = newResData[_i].year;
                                    existence = true;
                                }
                            }
                            if(existence === false){
                                _this.itemData.push(newResData[_i]);
						    }
                        }
						dataLength += newResData[i].continueData.length + newResData[i].endData.length;
					}
					_this.page ++;
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
	
</style>
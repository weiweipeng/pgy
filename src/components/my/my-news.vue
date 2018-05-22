<template>
	<div id="my-news">
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll" id="scroll">
				<div>
					<!--遍历数据-->
					<ul>
						<li v-for="item in itemData">
							<div v-if="item.cat_id == '522'">
								<router-link :to="{path:'/proposalDetail',query: {suggest_id: item.mid}}">
									<p class="time" v-text="item.notice_time"></p>
									<div class="news-box">
										<p class="news-title mui-clearfix">
											<span class="mui-pull-left" v-text="item.title"></span>
											<span class="mui-pull-right">(点击查看详情)</span>
										</p>
										<p class="news-cont" v-html="item.content"></p>
										<div class="news-info">
										  	<span v-text="'时间：' + item.meeting_time"></span>
										  	<span v-text="'地址：' + item.address" v-show="item.address != '' && item.address != null"></span>
									    </div>
									</div>
								</router-link>
							</div>
							<div v-else>
								<p class="time" v-text="item.notice_time"></p>
								<div class="news-box">
									<p class="news-title mui-clearfix">
										<span class="mui-pull-left" v-text="item.title"></span>
										<span class="mui-pull-right" v-text="item.host"></span>
									</p>
									<p class="news-cont" v-html="item.content"></p>
									<div class="news-info">
									  	<span v-text="'时间：' + item.meeting_time"></span>
									  	<span v-text="'地址：' + item.address" v-show="item.address != '' && item.address != null"></span>
								    </div>
								</div>
							</div>
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
  	name: 'my-news',
  	data: function() {
      	return {
        	loadShow: true,
        	itemData: [],
        	page: 1,
        	noData: false,
        	admin_img_URL: 'http://dj.celap.cn:8080/pgy-dj-admin/',
        	row: 10,
        	self: null
      	}
   	},
   	components: {
	  	loading: loading
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
				mui('#scroll').pullToRefresh({
					down: {
						callback: function() {
							var self = this;
							//刷新先清空页数和数据
							_this.noData = false;//还原无数据的显示状态，避免下拉刷新时出现
							_this.page = 1;
							_this.itemData = [];
							var	data = {
									page: _this.page
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
									page: _this.page
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
   			console.log(self);
   			var _this = this;
   			//请求数据
   			_this.$api.post('index.php/Home/ApiMy/get_Information_List', data, function(res){
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
	   				
   				}else if(res.code == "0" || res.code == "300" || res.code == '401'){
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
#my-news{
	/*ul{
		margin-bottom: 1rem;
	}*/
	.time{
		height: 1.173rem;
	    line-height: 1.173rem;
	    text-align: center;
	    font-size: 0.4rem;
	    color: #666;
	}
	.news-box{
		background-color: #fff;
	    width: 90%;
	    margin: 0 auto;
	    border-radius: .1rem;
	    padding: 0.4rem;
		.news-title{
			color: #333;
			span:first-child{
    			font-size: 0.48rem;
			}
			span:last-child{
			    font-size: 0.4rem;
			}
		}
		.news-cont{
			font-size: 0.4rem;
		    color: #666;
		    margin-top: 0.3rem;
		}
		.news-info{
			margin-top: 0.1rem;
			span{
				color: #e51c23;
    			font-size: 0.32rem;
    			&:first-child{
    				margin-right: .8rem;
    			}
			}
		}
	}
}
</style>
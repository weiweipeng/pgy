<template>
	<div id="my-collection">
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll" id="scroll">
				<div>
					<!--遍历数据-->
					<ul class="mui-table-view">
						<li class="mui-table-view-cell mui-media" v-for="item in itemData">
							<router-link :to="{path:'/articleDetail',query: {article_id: item.id, flag_type: item.flag_type, status: item.status}}">
								<img class="mui-media-object mui-pull-left lgImg" :src="item.cover_path" onerror="this.src='http://dj.celap.cn:8080/pgy-dj-admin/h5/article/201804147398/201804151637378334.jpg'">
								<div class="mui-media-body">
									<span class="title mui-ellipsis-2" v-text="item.title"></span>
									<div class="adds">
										<p class="mui-clearfix">
											<span class="mui-pull-left" v-text="item.create_time"></span>
											<span class="mui-pull-right"><i class="iconfont icon-yanjing"></i>{{item.hit_num}}</span>
											<span class="mui-pull-right"><i class="iconfont icon-xiangqing_dianzan"></i>{{item.thumbup_num}}</span>
										</p>
									</div>
								</div>
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
  	name: 'my-collection',
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
	filters: {  
        fomartTime: function(value) {
        	var year = value.slice(0,4);
        	var month = value.slice(4,6);
            return year + '年' + month + '月';
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
   			_this.$api.post('index.php/Home/ApiMy/get_Collection_List', data, function(res){
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
#my-collection{
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
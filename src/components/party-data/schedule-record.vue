<template>
	<div id="scheduleRecord">
		<!--头部标题-->
		<div class="top-bar mui-row">
			<div class="mui-col-sm-4 mui-col-xs-4 logo">
				<img :src="img_URL + $route.query.head_img">
				<span v-text="$route.query.title"></span>
			</div>
			<div class="mui-col-sm-6 mui-col-xs-6 now-date">
				<span v-text="checkDate.start" @click="picker(1)"></span>
				至
				<span v-text="checkDate.end" @click="picker(2)"></span>
			</div>
			<div class="mui-col-sm-2 mui-col-xs-2 sub-btn">
				<button @click="searchData">搜索</button>
			</div>
		</div>
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll" id="scroll">
				<div>
					<!--遍历数据-->
					<ul class="person" v-show="itemData.length != 0">
						<li v-for="item in itemData">
							<div>
								<span>{{item.create_time}}</span>
								<p class="info-data-info">{{item.title}}</p>
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
  	name: 'scheduleRecord',
  	data: function() {
      	return {
        	loadShow: true,
        	itemData: [],
        	page: 1,
        	checkDate:{
        		start: '2017-01',
        		end: '2018-01'
        	},
        	noData: false,
        	img_URL: 'http://dj.celap.cn/pgy/',
        	admin_img_URL: 'http://dj.celap.cn:8080/pgy-dj-admin/',
        	row: 20,
        	self: null,
        	rerequest: false
      	}
   	},
   	components: {
	  	loading: loading
	},
	activated: function(){
		//获取完整的日期 
		var date=new Date;  
		var year=date.getFullYear();   
		var month=date.getMonth();  
		month =(month<10 ? "0"+month:month);   
		var mydate = (year.toString()+'-'+month.toString());
		var myStartDate = (year.toString()+'-'+'01');
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
		this.checkDate = {
        		start: myStartDate,
        		end: mydate
        	}
   		this.init();
	},
   	methods: {
   		searchData: function(){
   			this.loadShow = true;
   			this.page = 1;
			this.itemData = [];
			this.noData = false;
	   		this.init();
   		},
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
									start: _this.checkDate.start,
									end: _this.checkDate.end,
									ouid: _this.$route.query.ouid,
									type: _this.$route.query.type,
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
									start: _this.checkDate.start,
									end: _this.checkDate.end,
									ouid: _this.$route.query.ouid,
									type: _this.$route.query.type,
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
   			_this.$api.post('index.php/Home/Api/getUserReportInfo', data, function(res){
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
   		picker: function(index){
			var _this = this;
			var dtpicker = new mui.DtPicker({
			    type: "month"
			});
			dtpicker.show(function(e) {
				if(index == 1){
					var start = Date.parse(new Date(e.text));
					var end = Date.parse(new Date(_this.checkDate.end));
					if(start > end){
						mui.toast('开始时间必须小于结束时间！');
						return false;
					}
					_this.checkDate.start = e.text;
				}else if(index == 2){
					var start = Date.parse(new Date(_this.checkDate.start));
					var end = Date.parse(new Date(e.text));
					
					var date=new Date;  
					var year=date.getFullYear();   
					var month=date.getMonth()+1;
					var timestamp = Date.parse((year+'-'+month));
					if(start > end){
						mui.toast('结束时间必须大于开始时间！');
						return false;
					}
					if(end > timestamp){
						mui.toast('结束月份必须小于当前月份！');
						return false;
					}
					_this.checkDate.end = e.text;
				}else{
					return false;
				}
			});
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
#scheduleRecord{
	
	.top-bar{
		background: #fff;
		padding: .3rem 0;
		background: url(../../assets/images/personBg.png) no-repeat;
		background-size: cover;
		color: #fff;
		.logo{
			height: 1.2rem;
			line-height: 1.2rem;
			font-size: .42rem;
			text-align: center;
			img{
				border-radius: 50%;
				width: .9rem;
				height: .9rem;
				margin-right: .1rem;
				vertical-align: middle;
			}
		}
		.now-date{
			/*border: 1px solid #e6e3e3;*/
		    text-align: center;
		    border-radius: .8rem;
		    margin: .2rem 0;
		    height: .8rem;
		    font-size: .42rem;
		    line-height: .75rem;
		    span{
		    	border: 1px solid #ddd;
			    text-align: center;
			    padding: .1rem .3rem;
			    border-radius: .8rem;
		    }
		}
		.sub-btn{
			margin: .25rem 0;
			text-align: center;
			button{
				background: #fff;
				color: #e71e1d;
				padding: .1rem .3rem;
				border: none;
			}
		}
	}
	.mui-scroll-wrapper{
		top: 1.8rem;
	}
	.mui-scroll{
		.person{
			background: #fff;
			padding: .5rem 0;
			li{
				padding-bottom: .3rem;
				border-left: 1px solid #ddd;
				width: 70%;
				margin: 0 auto;
				div{
					position: relative;
				    text-align: left;
					font-family: "iconfont" !important;
					padding-left: .3rem;
					padding-bottom: .2rem;
					span{
						color: #999;
						font-size: .32rem;
					}
					&:before{
						position: absolute;
						left: -.2rem;
						top: -.1rem;
						content: "\e600";
						color: #E51D24;
						font-size: .38rem;
					}
					position: relative;
					.info-data-info{
						color: #333;
						font-size: .38rem;
					}
				}
				&:last-child{
					border-left: none;
				}
			}
		}
		
		
	}
}
</style>
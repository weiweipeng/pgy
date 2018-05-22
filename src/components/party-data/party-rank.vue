<template>
	<div id="partyRank">
		<div class="mui-content">
			<!--头部标题-->
			<div class="top-bar mui-row">
				<div class="mui-col-sm-4 mui-col-xs-4 logo mui-ellipsis"><i class="iconfont icon-xuexi"></i>{{$route.query.title}}</div>
				<div class="mui-col-sm-6 mui-col-xs-6 now-date">
					<span v-text="checkDate.start" @click="picker(1)"></span>
					至
					<span v-text="checkDate.end" @click="picker(2)"></span>
				</div>
				<div class="mui-col-sm-2 mui-col-xs-2 sub-btn">
					<button @click="searchData">搜索</button>
				</div>
			</div>
			<!--排行榜-->
			<div id="slider" class="mui-slider mui-fullscreen bottom1_3">
				<div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<a class="mui-control-item mui-active" href="#item1mobile">组织排名</a>
					<a class="mui-control-item" href="#item2mobile">个人排名</a>
					<a class="mui-control-item" href="#item3mobile" v-if="$route.query.type == '2' || $route.query.type == '3' || $route.query.type == '4'">详情</a>
				</div>
				<div class="mui-slider-group">
					<div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
						<div class="mui-scroll-wrapper">
							<div class="mui-scroll" id="scroll1">
								<div>
									<!--遍历数据-->
									<ul class="mui-clearfix">
										<li v-for="(item, index) in itemData[0].data">
											<router-link v-if="is_flag" :to="{path:'/partyData',query: {org_id: item.org_id, level: $route.query.level, ouid: $route.query.ouid, name: item.name, is_flag: is_flag}}" class="mui-navigate-right">
												<span class="rank-num" v-text="index > 2 ? (index + 1) : ''"></span>
												<span class="org_box">
													<span class="rank-org" v-text="item.name"></span>
												</span>
												<span class="rank-data">次数：<span v-text="item.total == null ? '0' : item.total"></span>次</span>
												<span class="rank-data">得分：<span v-text="item.point == null ? '0' : item.point"></span>分</span>
											</router-link>
											<router-link v-else :to="{path:'/partyData',query: {org_id: item.org_id, level: $route.query.level, ouid: $route.query.ouid, name: item.name, is_flag: item.is_flag}}" class="mui-navigate-right">
												<span class="rank-num" v-text="index > 2 ? (index + 1) : ''"></span>
												<span class="org_box">
													<span class="rank-org" v-text="item.name"></span>
												</span>
												<span class="rank-data">次数：<span v-text="item.total == null ? '0' : item.total"></span>次</span>
												<span class="rank-data">得分：<span v-text="item.point == null ? '0' : item.point"></span>分</span>
											</router-link>
											
										</li>
									</ul>
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
							<div class="mui-scroll" id="scroll2">
								<div>
									<!--遍历数据-->
									<ul class="mui-clearfix">
										<li v-for="(item, index) in itemData[1].data">
											<router-link :to="{path:'/personData',query: {ouid: item.ouid, level: $route.query.level}}" class="mui-navigate-right">
												<span class="rank-num" v-text="index > 2 ? (index + 1) : ''"></span>
												<span class="org_box">
													<span class="rank-org">
														<img :src="img_URL + item.head_img" alt="" />
														<span v-text="item.name"></span>
													</span>
												</span>
												<span class="rank-data">次数：<span v-text="item.total == null ? '0' : item.total"></span>次</span>
												<span class="rank-data">得分：<span v-text="item.point == null ? '0' : item.point"></span>分</span>
											</router-link>
											
										</li>
									</ul>
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
					<div id="item3mobile" class="mui-slider-item mui-control-content tab_box"  v-if="$route.query.type == '2' || $route.query.type == '3' || $route.query.type == '4'">
						<div class="mui-scroll-wrapper">
							<div class="mui-scroll" id="scroll3">
								<div>
									<!--遍历数据-->
									<div v-for="itemList in itemData[2].data">
										<div class="nowYear" v-if="itemList.year" v-text="itemList.year"></div>
										<ul class="tablist">
											<li class="tabLi" :class="item.status != '4' ? 'active' : ''" v-for="(item, index) in itemList.continueData">
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
											<li class="tabLi" :class="item.status != '4' ? 'active' : ''" v-for="(item, index) in itemList.endData">
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
  	name: 'partyRank',
  	data: function() {
      	return {
      		loadShow: true,
      		itemData: [{data:[]},{data:[]},{data:[]}],
			page: [{page: 1},{page: 1},{page: 1}],
			noData: [{type: false},{type: false},{type: false}],
			img_URL: 'http://dj.celap.cn/pgy/',
			admin_img_URL: 'http://dj.celap.cn:8080/pgy-dj-admin/',
			row: 5,
			is_flag: null,
			checkDate:{
        		start: '2017-01',
        		end: '2018-01'
        	},
        	self: [{ele: null},{ele: null},{ele: null}],
        	rerequest: false
      	};
   	},
   	components: {
	  	loading: loading
	},
	watch: {
		$route(to, from) {
			if(from.name == 'personData' || from.name == 'meetingDetail'){
				this.rerequest = true;
			}else{
				this.rerequest = false;
			}
				
		}
	},
   	activated: function() {
   		if(!this.rerequest){
   			//获取完整的日期 
			var date=new Date;  
			var year=date.getFullYear();   
			var month=date.getMonth();  
			month =(month<10 ? "0"+month:month);   
			var mydate = (year.toString()+'-'+month.toString());
			var myStartDate = (year.toString()+'-'+'01');
			this.checkDate = {
	        		start: myStartDate,
	        		end: mydate
	        	}
			this.itemData = [{data:[]},{data:[]},{data:[]}];
			this.page = [{page: 1},{page: 1},{page: 1}];
			this.noData = [{type: false},{type: false},{type: false}];
	   		mui("#slider").slider();
	   		var deceleration = mui.os.ios?0.003:0.0009;
			mui('.mui-scroll-wrapper').scroll({
				bounce: false,
				deceleration:deceleration
			});
			//重置上啦加载
			this.self.forEach(function(e,index){
				if(e.ele){
					e.ele.refresh(true);
				}	
			})
			mui('.mui-slider').slider().gotoItem(0);
	   		this.init();
	   		this.goHref();
   		}
	   		
   	},
   	mounted: function() {
   		
   	},
   	methods: {
   		searchData: function(){
   			this.loadShow = true;
   			this.itemData = [{data:[]},{data:[]},{data:[]}];
			this.page = [{page: 1},{page: 1},{page: 1}];
			this.noData = [{type: false},{type: false},{type: false}];
			//重置上啦加载
			this.self.forEach(function(e,index){
				if(e.ele){
					e.ele.refresh(true);
				}
			})
			mui('.mui-slider').slider().gotoItem(0);
	   		this.init();
	   		this.goHref();
   		},
   		init: function(){
			//阻尼系数
			var _this = this;
			_this.loadShow = true;
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
								//根据当前选项卡判断参数数据
								if(index == '0'){
									if(_this.$route.query.grade){
							   			var data = {
								   			start: _this.checkDate.start,
								   			end: _this.checkDate.end,
								   			type: _this.$route.query.grade,
								   			flag_type: 1,
								   			org_id: _this.$route.query.org_id
								   		}
							   		}else{
							   			var data = {
								   			start: _this.checkDate.start,
								   			end: _this.checkDate.end,
								   			type: _this.$route.query.type,
								   			flag_type: 1,
								   			org_id: _this.$route.query.org_id
								   		}
							   		}
								}else if(index == '1'){
									if(_this.$route.query.grade){
							   			var data = {
								   			start: _this.checkDate.start,
								   			end: _this.checkDate.end,
								   			type: _this.$route.query.grade,
								   			flag_type: 2,
								   			org_id: _this.$route.query.org_id,
								   			row: _this.row,
								   			page: _this.page[index].page
								   		}
							   		}else{
							   			var data = {
								   			start: _this.checkDate.start,
								   			end: _this.checkDate.end,
								   			type: _this.$route.query.type,
								   			flag_type: 2,
								   			org_id: _this.$route.query.org_id,
								   			row: _this.row,
								   			page: _this.page[index].page
								   		}
							   		}
								}else if(index == '2'){
									if(_this.$route.query.type == '2'){
										var category_id = 'threeAll';
									}else if(_this.$route.query.type == '3'){
										var category_id = '517';
									}else if(_this.$route.query.type == '4'){
										var category_id = '518';
									}
									var data = {
								   			start: _this.checkDate.start,
								   			end: _this.checkDate.end,
								   			category_id: category_id,
								   			org_id: _this.$route.query.org_id,
								   			row: _this.row,
								   			page: _this.page[index].page
								   		}
								}else{
									return false;
								}
								self.refresh(true);//重置上拉加载
								_this.getData(data, index, self, 0);
							}
						},
						up: {
							auto: true,
							callback: function() {
								var self = this;
								//根据当前选项卡判断参数数据
								if(index == '0'){
									if(_this.$route.query.grade){
							   			var data = {
								   			start: _this.checkDate.start,
								   			end: _this.checkDate.end,
								   			type: _this.$route.query.grade,
								   			flag_type: 1,
								   			org_id: _this.$route.query.org_id
								   		}
							   		}else{
							   			var data = {
								   			start: _this.checkDate.start,
								   			end: _this.checkDate.end,
								   			type: _this.$route.query.type,
								   			flag_type: 1,
								   			org_id: _this.$route.query.org_id
								   		}
							   		}
								}else if(index == '1'){
									if(_this.$route.query.grade){
							   			var data = {
								   			start: _this.checkDate.start,
								   			end: _this.checkDate.end,
								   			type: _this.$route.query.grade,
								   			flag_type: 2,
								   			org_id: _this.$route.query.org_id,
								   			row: _this.row,
								   			page: _this.page[index].page
								   		}
							   		}else{
							   			var data = {
								   			start: _this.checkDate.start,
								   			end: _this.checkDate.end,
								   			type: _this.$route.query.type,
								   			flag_type: 2,
								   			org_id: _this.$route.query.org_id,
								   			row: _this.row,
								   			page: _this.page[index].page
								   		}
							   		}
								}else if(index == '2'){
									if(_this.$route.query.type == '2'){
										var category_id = 'threeAll';
									}else if(_this.$route.query.type == '3'){
										var category_id = '517';
									}else if(_this.$route.query.type == '4'){
										var category_id = '518';
									}
									var data = {
								   			start: _this.checkDate.start,
								   			end: _this.checkDate.end,
								   			category_id: category_id,
								   			org_id: _this.$route.query.org_id,
								   			row: _this.row,
								   			page: _this.page[index].page
								   		}
								}else{
									return false;
								}
								_this.self[index].ele = self;
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
   			//判断url
   			if(_this.$route.query.grade){
				var url = 'index.php/Home/api/getComprehensiveRankingByOrgId'
			}else{
				if(_this.$route.query.level == '2' && index != '2'){
					var url = 'index.php/Home/api/getGroupRnakDetailByOrgId'
				}else if(index == '2'){
					var url = 'index.php/Home/api/getMeetingInfo'
				}else{
					var url = 'index.php/Home/api/getBranchRnakMoreDetailInfo'
				}
			}
   			//请求数据
   			_this.$api.post(url, data, function(res){
   				console.log(res);
   				if(res.code == "200"){
   					//根据index判断一下是哪个选项卡请求数据
   					if(index == '0' || index == '1'){
   						_this.itemData[index].data.push.apply(_this.itemData[index].data, res.data);
   						//判断数据长度
						var totalLenth = res.data.length;
						if(totalLenth > _this.row){
							var noMore = true;
						}else{
							var noMore = totalLenth < _this.row ? true : false;
						}
   					}else if(index == '2'){
   						var newResData = res.data;
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
						var noMore = dataLength < _this.row ? true : false;
   					}
   					
					_this.page[index].page ++;
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
   					console.log(res.code);
   					mui.toast('网络繁忙！');
   				}
   				
   				if(_this.loadShow){
   					setTimeout(function(){
   						_this.loadShow = false;
   					},1000)
   						
   				}	
		    	
		    },function(err){
		    	if(err){
		    		console.log(err);
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
#partyRank{
	.top-bar{
		background: #fff;
		border-bottom: 1px solid #f2f2f2;
		.logo{
			height: 1.2rem;
			line-height: 1.2rem;
			font-size: .42rem;
			text-align: center;
			.iconfont{
				color: #e60000;
    			font-size: .7rem;
    			vertical-align: sub;
    			margin-right: .1rem;
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
	}
	.mui-fullscreen{
		top: 1.2rem;
	}
	.mui-slider-indicator.mui-segmented-control.mui-segmented-control-inverted{
		background: url(../../assets/images/personBg.png) no-repeat;
		background-size: cover;
	}
	.mui-segmented-control.mui-segmented-control-inverted .mui-control-item{
		color: rgba(255,255,255,.6);
	}
	.mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active{
		color: #fff !important;
	}
	.mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active:after{
		content: "";
		z-index: 1;
	    width: 0;
	    height: 0;
	    bottom: 0;
	    margin-left: 0;
	    -webkit-transform: translateX(-50%);
	    transform: translateX(-50%);
	    border-style: solid;
	    border-width: 10px;
	    background: none;
	    border-color: transparent transparent #f5f5f5 transparent;
	}
	.mui-slider .mui-segmented-control.mui-segmented-control-inverted~.mui-slider-group .mui-slider-item{
		border: none;
	}
	.mui-scroll{
		ul{
			background: #fff;
			li{
    			position: relative;
    			padding: .5rem 0 .5rem 1.5rem;
				&:after{
					position: absolute;
				    right: 0;
				    bottom: 0;
				    left: 0;
				    height: 1px;
				    content: '';
				    -webkit-transform: scaleY(.5);
				    transform: scaleY(.5);
				    background-color: #F5F5F5;
				}
				span{
					font-size: .34rem;
					/*vertical-align: middle;*/
				}
				
				.rank-num{
					position: absolute;
					left: .5rem;
					top: 50%;
					-webkit-transform: translate3d(0,-50%,0);
    				transform: translate3d(0,-50%,0);
					background: #f6dfdf;
					border-radius: 50%;
					width: .65rem;
					height: .65rem;
					line-height: .65rem;
					text-align: center;
					color: #fff;
					font-size: .36rem;
				}
				&:nth-child(1){
					.rank-num{
						border-radius:0;
						left: .4rem;
						width: .8rem;
						height: .8rem;
						background: url(../../assets/images/org-rank1.png) no-repeat center center;
						background-size: contain;
					}
				}
				&:nth-child(2){
					.rank-num{
						border-radius:0;
						left: .4rem;
						width: .8rem;
						height: .8rem;
						background: url(../../assets/images/org-rank2.png) no-repeat center center;
						background-size: contain;
					}
				}
				&:nth-child(3){
					.rank-num{
						border-radius:0;
						left: .4rem;
						width: .8rem;
						height: .8rem;
						background: url(../../assets/images/org-rank3.png) no-repeat center center;
						background-size: contain;
					}
				}
				.org_box{
					display: inline-block;
    				width: 35%;
				}
				.rank-org{
					position: absolute;
				    left: 1.5rem;
				    top: 50%;
				    width: 30%;
				    overflow: hidden;
				    white-space: nowrap;
				    text-overflow: ellipsis;
				    -webkit-transform: translate3d(0,-50%,0);
				    transform: translate3d(0,-50%,0);
				    line-height: .8rem;
					display: inline-block;
				    color: #666;
				    
					img{
						width: .8rem;
						height: .8rem;
						border-radius: 50%;
						vertical-align: middle;
						margin-right: .3rem;
					}
				}
				.rank-data{
					color: #999;
					margin-right: .5rem;
					&:last-child{
						margin-right: 0;
					}
					span{
						color: #E51C23;
						font-size: .4rem;
					}
				}
			}
			
		}
		ul.tablist{
			background: none;
			li.tabLi{
				padding: 0.33rem;
			}
		}
	}
	.tab_box .mui-scroll-wrapper{
		top: 0;
	}
	.sub-btn{
		margin: .25rem 0;
		text-align: center;
		button{
			background: #e71e1d;
			color: #fff;
			padding: .1rem .3rem;
			border: none;
		}
	}
}

</style>
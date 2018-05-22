<template>
	<div id="rank">
		<!--头部标题-->
		<div class="top-bar mui-row">
			<div class="mui-col-sm-4 mui-col-xs-4 logo mui-ellipsis"><i class="iconfont icon-xuexi"></i>{{$route.query.title}}</div>
			<div class="mui-col-sm-6 mui-col-xs-6 now-date">
				<span v-text="checkDate.start" @click="picker(1)"></span>
				至
				<span v-text="checkDate.end" @click="picker(2)"></span>
			</div>
			<div class="mui-col-sm-2 mui-col-xs-2 sub-btn">
				<button @click="resData">搜索</button>
			</div>
		</div>
		<!--排行榜-->
		<div id="slider" class="mui-slider mui-fullscreen">
			<div id="sliderSegmentedControl" class="bg-white mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<a class="mui-control-item mui-active" href="#item1mobile">组织排名</a>
				<a class="mui-control-item" href="#item2mobile">个人排名</a>
				<a class="mui-control-item" href="#item3mobile" v-if="$route.query.type == '2' || $route.query.type == '3' || $route.query.type == '4'">会议详情</a>
			</div>
			<div class="mui-slider-group">
				<div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
					<div id="scroll1" class="mui-scroll-wrapper bottom1_3">
						<div class="mui-scroll">
							<ul class="mui-clearfix">
								<li v-for="(item, index) in item1Data">
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
							
							<div class="load-box">
								<div class="load-type">
									<div class="load-start" v-html="resDataLoad1">
										
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="item2mobile" class="mui-slider-item mui-control-content">
					<div id="scroll2" class="mui-scroll-wrapper bottom1_3">
						<div class="mui-scroll">
							<ul class="mui-clearfix">
								<li v-for="(item, index) in item2Data">
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
							<div class="load-box">
								<div class="load-type">
									<div class="load-start" v-html="resDataLoad2">
										
									</div>
								</div>
							</div>
							
							
						</div>
					</div>
				</div>
				<div id="item3mobile" class="mui-slider-item mui-control-content tab_box" v-if="$route.query.type == '2' || $route.query.type == '3' || $route.query.type == '4'">
					<div id="scroll3" class="mui-scroll-wrapper bottom1_3">
						<div class="mui-scroll">
								<div v-for="itemList in item3Data">
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
								
								<div class="load-box">
									<div class="load-type">
										<div class="load-start" v-html="resDataLoad3">
											
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
  	name: 'rank',
  	data:function() {
      	return {
        	loadShow: false,
        	checkDate:{
        		start: '2017-01',
        		end: '2018-01'
        	},
        	item1Data: [],
			item2Data: [],
			item3Data: [],
			resDataLoad1: '',//resDataLoad 表示加载时显示的文字信息
			resDataLoad2: '',
			resDataLoad3: '',
			resDataLoadType1: true, //resDataLoadType表示是否可以继续加载 的一个状态
			resDataLoadType2: true,
			resDataLoadType3: true,
			item1Page: 1,//请求页码
			item2Page: 1,
			item3Page: 1,
			img_URL: 'http://dj.celap.cn/pgy/',
		    is_flag: null
      	}
    },
    components: {
	  	loading: loading
	},
	activated: function(){
		mui("#slider").slider();
    	mui("#slider").slider().gotoItem(0);
   		mui('.mui-scroll-wrapper').scroll({deceleration:0.002});
		mui('#scroll1').scroll().scrollTo(0,0);
		mui('#scroll2').scroll().scrollTo(0,0);
		this.loadShow = true;
		//获取完整的日期 
		var date=new Date;  
		var year=date.getFullYear();   
		var month=date.getMonth();  
		month =(month<10 ? "0"+month:month);   
		var mydate = (year.toString()+'-'+month.toString());
		var myStartDate = (year.toString()+'-'+'01');
		
		this.item1Data = [];
		this.item2Data = [];
		this.item3Data = [];
		this.item1Page = 1;
		this.item2Page = 1;
		this.item3Page = 1;
		this.checkDate = {
        		start: myStartDate,
        		end: mydate
        	}
   		//请求tab1的数据
   		if(this.$route.query.grade){
   			var data = {
	   			start: this.checkDate.start,
	   			end: this.checkDate.end,
	   			type: this.$route.query.grade,
	   			flag_type: 1,
	   			org_id: this.$route.query.org_id
	   		}
   		}else{
   			var data = {
	   			start: this.checkDate.start,
	   			end: this.checkDate.end,
	   			type: this.$route.query.type,
	   			flag_type: 1,
	   			org_id: this.$route.query.org_id
	   		}
   		}
	   		
		this.getData(data, 0);
		
   	},
    mounted: function() {
    	//初始化滚动组件
    	
// 		this.listenerScroll('#item1mobile', 0, 1);
   		this.init();
   	},
   	methods: {
   		resData: function(){
   			this.item1Data = [];
			this.item2Data = [];
			this.item3Data = [];
			var data = {
	   			start: this.checkDate.start,
	   			end: this.checkDate.end,
	   			type: this.$route.query.type,
	   			flag_type: 1,
	   			org_id: this.$route.query.org_id
	   		}
			this.getData(data, 0);
   		},
   		init: function(){
   			var _this = this;
			//监听tab切换
			document.getElementById('slider').addEventListener('slide', function(e) {
				console.log(e.detail.slideNumber);
				if (e.detail.slideNumber === 0 && _this.item1Data == '') {
					_this.loadShow = true;
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
					_this.getData(data, 0);
					//_this.listenerScroll('#item1mobile', 0, 1);
				}else if (e.detail.slideNumber === 1 && _this.item2Data == '') {
					_this.loadShow = true;
					if(_this.$route.query.grade){
			   			var data = {
				   			start: _this.checkDate.start,
				   			end: _this.checkDate.end,
				   			type: _this.$route.query.grade,
				   			flag_type: 2,
				   			org_id: _this.$route.query.org_id,
				   			row: 20,
				   			page: _this.item2Page
				   		}
			   		}else{
			   			var data = {
				   			start: _this.checkDate.start,
				   			end: _this.checkDate.end,
				   			type: _this.$route.query.type,
				   			flag_type: 2,
				   			org_id: _this.$route.query.org_id,
				   			row: 20,
				   			page: _this.item2Page
				   		}
			   		}
						
					_this.getData(data, 1);
					_this.listenerScroll('#item2mobile', 1, 2);
				}else if (e.detail.slideNumber === 2 && _this.item3Data == '') {
					_this.loadShow = true;
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
				   			row: 20,
				   			page: _this.item3Page
				   		}
						
					_this.getData(data, 2);
					_this.listenerScroll('#item2mobile', 2, 3);
				}else{
					return false;
				}
			});
			
   		},
   		listenerScroll: function(ele, index, type){
			
			var scroll = mui('.mui-scroll-wrapper').scroll(), _this = this, page = 1;
			document.querySelector(ele).addEventListener('scroll', function (e){
				
				if(index === 0 && _this.resDataLoadType1 === true){
					page = _this.item1Page;
				}else if(index === 1 && _this.resDataLoadType2 === true){
					page = _this.item2Page;
				}else{
					return false;
				}
			    var scrollTop = scroll[index].y;
			    //判断滚动到底部
			    if(scrollTop == scroll[index].maxScrollY){
//			    	var data = {
//			   			start: _this.checkDate.start,
//			   			end: _this.checkDate.end,
//			   			type: _this.$route.query.type,
//			   			flag_type: type,
//			   			org_id: _this.$route.query.org_id,
//			   			row: 20,
//				   		page: _this.item2Page
//			   		}
			    	if(_this.$route.query.grade){
			   			var data = {
				   			start: _this.checkDate.start,
				   			end: _this.checkDate.end,
				   			type: _this.$route.query.grade,
				   			flag_type: type,
				   			org_id: _this.$route.query.org_id,
				   			row: 20,
				   			page: page
				   		}
			   		}else{
			   			var data = {
				   			start: _this.checkDate.start,
				   			end: _this.checkDate.end,
				   			type: _this.$route.query.type,
				   			flag_type: type,
				   			org_id: _this.$route.query.org_id,
				   			row: 20,
				   			page: page
				   		}
			   		}
			        //上拉加载逻辑代码
			        _this.getData(data, index);
			    }
			});
		},
   		getData: function(data, index){
   			var _this = this,
				load_start = '<i class="mui-spinner"></i><span>正在努力加载中</span>',
				load_more = '<span>上拉加载更多</span>',
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
			}else{
				return false;
			}
			if(_this.$route.query.grade){
				var url = 'index.php/Home/api/getComprehensiveRankingByOrgId'
			}else if(index === 2){
				var url = 'index.php/Home/api/getMeetingInfo'
			}else{
				if(_this.$route.query.level == '2'){
					var url = 'index.php/Home/api/getGroupRnakDetailByOrgId'
				}else{
					var url = 'index.php/Home/api/getBranchRnakMoreDetailInfo'
				}
			}
				
			_this.$api.post(url, data, function(res){
		    	console.log(res);
		    	if(res.is_flag){
		    		_this.is_flag = res.is_flag;
		    	}
		    	if(res.code == '200'){
		    		if(index == 0){
						_this.item1Data.push.apply(_this.item1Data, res.data);
						_this.item1Page ++;
						_this.resDataLoad1 = load_end;
						
						_this.resDataLoadType1 = false;
//						if(res.data.length < 10){
//							_this.resDataLoadType1 = false;
//			    		}else{
//			    			_this.resDataLoadType1 = true;
//			    		}
					}else if(index === 1){
						_this.item2Data.push.apply(_this.item2Data, res.data);
						_this.item2Page ++;
						
						
						if(res.data.length < 20){
							_this.resDataLoadType2 = false;
							_this.resDataLoad2 = load_end;
			    		}else if(res.data.length > 20){
							_this.resDataLoadType2 = false;
							_this.resDataLoad2 = load_end;
			    		}else{
			    			_this.resDataLoadType2 = true;
			    			_this.resDataLoad2 = load_more;
			    		}
						
					}else if(index === 2){
						if(!res.data){
			    			var newResData = [];
			    		}else{
			    			var newResData = res.data;
			    		}
						var dataLength = 0;
						for(var i = 0;i < newResData.length;i++){
	                        var _i = i;
							if(!_this.item3Data[_i]){
								_this.item3Data.push(newResData[_i]);
							}else{
	                            var existence = false;
	                            for(var x = 0;x < _this.item3Data.length;x++){
	                                if(_this.item3Data[x].year == newResData[_i].year){
	                                    if(_this.item3Data[x].data.continueData){
	                                        _this.item3Data[x].data.continueData.push.apply(_this.item3Data[x].data.continueData, newResData[_i].data.continueData);
	                                    }
	                                    if(_this.item3Data[x].data.endData){
	                                        _this.item3Data[x].data.endData.push.apply(_this.item3Data[x].data.endData, newResData[_i].data.endData);
	                                    }
	                                    _this.item3Data[x].year = newResData[_i].year;
	                                    existence = true;
	                                }
	                            }
	                            if(existence === false){
	                                _this.item3Data.push(newResData[_i]);
							    }
	                        }
							dataLength += newResData[i].continueData.length + newResData[i].endData.length;
						}
						
						if(dataLength < 20){
							_this.resDataLoadType3 = false;
							_this.resDataLoad3 = load_end;
			    		}else{
			    			_this.resDataLoadType32 = true;
			    			_this.resDataLoad3 = load_more;
			    		}
						
					}else{
						return false;
					}
					
					
		    	}else if(res.code == '300' || res.code == '0'){
		    		if(index === 0){
						_this.resDataLoad1 = load_end;
						_this.resDataLoadType1 = false;
					}else if(index === 1){
						_this.resDataLoad2 = load_end;
						_this.resDataLoadType2 = false;
					}else if(index === 2){
						_this.resDataLoad3 = load_end;
						_this.resDataLoadType3 = false;
					}else{
						return false;
					}
		    		mui.alert('暂无更多数据！');
		    	}else{
		    		if(index === 0){
						_this.resDataLoad1 = load_end;
						_this.resDataLoadType1 = false;
					}else if(index === 1){
						_this.resDataLoad2 = load_end;
						_this.resDataLoadType2 = false;
					}else if(index === 2){
						_this.resDataLoad3 = load_end;
						_this.resDataLoadType3 = false;
					}else{
						return false;
					}
					
		    		mui.toast('网络繁忙！');
		    	}
		    	setTimeout(function(){
		    		_this.loadShow = false;
		    	},1000)
		    		
		    	
		    },function(err){
		    	if(err){
		    		_this.loadShow = false;
		    		mui.toast('网络繁忙！');
		    		console.log(err);
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
   		}
   	}
}
</script>
<style lang="scss">
#rank{
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
	    border-color: transparent transparent #fff transparent;
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
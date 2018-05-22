<template>
	<div id="partyPortrait">
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<!--个人信息-->
				<div id="my-information">
					<ul class="mui-table-view mui-table-view-chevron">
						<li class="mui-table-view-cell mui-media">
							<a>
								<img class="mui-media-object mui-pull-left head-img" id="head-img" :src="resImg">
								<span class="mui-pull-right name" v-text="userInfo.name"></span>
							</a>
						</li>
						<li class="mui-table-view-cell">
							<a>
								<span>所属组织</span>
								<span class="mui-pull-right"><span v-for="(name, index) in userInfo.fullname" v-html="index == 2 ? '<br>' + name : '&nbsp;' + name"></span></span>
							</a>
						</li>
						<li class="mui-table-view-cell">
							<a>
								<span>入党日期</span>
								<span class="mui-pull-right" v-text="userInfo.entry_date"></span>
							</a>
						</li>
						
					</ul>
					<ul class="mui-table-view mui-table-view-chevron mt015" v-if="userInfo.honor">
						<li class="mui-table-view-cell">
							<a>
								<span>荣誉称号：</span>
								<div class="honor mt015" v-html="userInfo.honor.replace(/\n/g, '<br>')"></div>
							</a>
						</li>
					</ul>
				</div>
				<div class="myStudy"><span>我的学习</span></div>
				<!--我的学习-->
				<div class="top-bar mui-row">
					<!--<div class="mui-col-sm-4 mui-col-xs-4 logo">
						<img :src="img_URL + resData.head_img"/>
						<span v-text="resData.name"></span>
					</div>-->
					<div class="mui-col-sm-9 mui-col-xs-9 now-date">
						<span v-text="checkDate.start" @click="picker(1)"></span>
						至
						<span v-text="checkDate.end" @click="picker(2)"></span>
					</div>
					<div class="mui-col-sm-3 mui-col-xs-3 sub-btn">
						<button @click="init">搜索</button>
					</div>
				</div>
				<div class="radar-map">
					<canvas id="radar" :style="'width:' + screenW + 'px;'+'height:' + (screenW - 120) + 'px;'"></canvas>
				</div>
				<div class="statistics mui-row">
					<div class="mui-col-sm-6 mui-col-xs-6">
						<span>总次数</span>
						<p>{{resData.frequency_count}}<span>次</span></p>
					</div>
					<div class="mui-col-sm-6 mui-col-xs-6">
						<span>总分数</span>
						<p>{{resData.frequency_point}}<span>分</span></p>
					</div>
				</div>
				<div class="info">
					<div id="slider" class="mui-slider">
						<div class="mui-slider-group">
							<div class="mui-slider-item" v-for="(item, index) in resData.mdata">
								<div class="header-bar">
									<p class="info-title" v-text="item.title"></p>
									<router-link :to="{path:'/scheduleRecord',query: {ouid: $route.query.ouid, type: item.type, title: item.title, head_img: resData.head_img}}">
										<span class="mui-pull-right">更多》</span>
									</router-link>
								</div>
								<div class="info-detail mui-row">
									<div class="mui-col-sm-6 mui-col-xs-6 first-info-box">
										<div class="circle-canvas">
											<canvas :id="'circle-canvas-' + index" :style="'width:' + (screenW * 0.22) + 'px;'+'height:' + (screenW * 0.22) + 'px;'"></canvas>
											<i class="iconfont icon-xuexi"></i>
											<p v-text="item.title"></p>
										</div>
										<div class="info-data">
											<span>次数：</span>
											<span class="info-data-info"><span v-text="item.count"></span>次</span>
										</div>
										<div class="info-data">
											<span>得分：</span>
											<span class="info-data-info"><span v-text="item.point"></span>分</span>
										</div>
										<!--<div class="info-data">
											<span>评分：</span>
											<i class="iconfont icon-xing active"></i>
											<i class="iconfont icon-xing active"></i>
											<i class="iconfont icon-xing active"></i>
											<i class="iconfont icon-xing active"></i>
											<i class="iconfont icon-xing"></i>
										</div>-->
									</div>
									<div class="mui-col-sm-6 mui-col-xs-6 second-info-box">
										<p class="rank-title" v-text="item.title"></p>
										<ul class="person">
											<li v-for="newData in item.data">
												<div>
													<span class="branch_name">{{newData.create_time}}</span>
													<p class="info-data-info">{{newData.title}}</p>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div class="mui-slider-indicator">
							<div class="mui-indicator mui-active"></div>
							<div class="mui-indicator"></div>
							<div class="mui-indicator"></div>
							<div class="mui-indicator"></div>
							<div class="mui-indicator"></div>
							<div class="mui-indicator"></div>
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
  	name: 'partyPortrait',
  	data:function() {
      	return {
        	loadShow: false,
        	resData: {},
        	checkDate:{
        		start: '2017-01',
        		end: '2018-01'
        	},
        	rankList: [],
		    screenW: 0,
		    level: null,
		    userInfo: {},
		    resImg: '',
		    img_URL: 'http://dj.celap.cn/pgy/'
      	}
   	},
   	components: {
	  	loading: loading
	},
   	created: function(){
   		//获取完整的日期 
		var date=new Date;  
		var year=date.getFullYear();   
		var month=date.getMonth();
		month =(month<10 ? "0"+month:month);   
		var mydate = (year.toString()+'-'+month.toString());
		var myStartDate = (year.toString()+'-'+'01');
		
   		this.resData = {};
   		this.checkDate = {
        		start: myStartDate,
        		end: mydate
        	}
   		this.init();
   		this.getUserInfo();
   		mui("#slider").slider({interval: 0});
   	},  
   	mounted: function() {
  		//初始化滚动组件
		mui('.mui-scroll-wrapper').scroll({deceleration:0.002});
		this.screenW = window.innerWidth;
   		this.level = this.$route.query.level;
   		
   		//监听tab切换
  		var _this = this;
		document.getElementById('slider').addEventListener('slide', function(e) {
			var rate = _this.resData.mdata[e.detail.slideNumber].point / 50;
			_this.drawCircle(e.detail.slideNumber, rate);
		})
     	
   	},
   	methods: {
   		init: function(){
   			var _this = this;
   			var data = {
					start: _this.checkDate.start,
					end: _this.checkDate.end,
					ouid: _this.$route.query.ouid,
					level: _this.$route.query.level
				}
   			_this.loadShow = true;
			_this.$api.post('index.php/Home/Api/getPersonDataByOuid', data, function(res){
		    	console.log(res);
		    	if(res.code == '200'){
		    		_this.resData = res.data;
		    		_this.radarMap();
		    		setTimeout(function(){
		    			var rate = res.data.mdata[0].point / 50;
		    			_this.drawCircle(0, rate);
		    			mui("#slider").slider({interval: 0});
		    			_this.loadShow = false;
		    		})
		    	}else if(res.code == '300' || res.code == '0'){
		    		_this.loadShow = false;
		    		mui.alert('您选择的时间段没有数据，请更换其它时间段！');
		    	}
		    	else{
		    		_this.loadShow = false;
		    		mui.toast('数据请求失败！');
		    	}
		    	
		    },function(err){
		    	if(err){
		    		_this.loadShow = false;
		    		mui.toast('数据请求失败！');
		    		console.log(err);
		    	}
		    })
			
   		},
   		getUserInfo: function(){
   			var _this = this;
		    _this.$api.get('index.php/Home/ApiMy/get_User_Info', null, function(res){
		    	console.log(res);
		    	if(res.code == "200"){
		    		_this.userInfo = res.data;
		    		_this.resImg = _this.img_URL + res.data.header_img;
		    	}else{
		    		return false;
		    	}
		    	_this.loadShow = false;
		    },function(err){
		    	if(err){
		    		_this.loadShow = false;
		    		console.log(err);
		    	}
		    })
		},
   		radarMap: function(){
   			var _this = this;
   			var mCount = 6; //边数
   			var mdata = _this.resData.mdata;
   			var dpr = window.devicePixelRatio;
   			if(dpr){
				var mW = _this.screenW*dpr;
	   			var mH = (_this.screenW - 120)*dpr;
   				var mCenter = mW / 2;
		    	var mRadius = mCenter - 90*dpr;
   			}else{
   				mW = _this.screenW;
			    mH = _this.screenW -120;
			    mRadius = mCenter - 90;
   			}
		    var mAngle = (Math.PI * 2 / mCount); //角度
		    var mCtx = null;
		    var mColorPolygon = '#39a3f1'; //多边形颜色
		    var mColorLines = '#39a3f1'; //顶点连线颜色
		    var mColorText = '#39a3f1';
		    var canvas = document.getElementById('radar');
	      	canvas.height = mH;
	      	canvas.width = mW;
	      	mCtx = canvas.getContext('2d');
	  		
	      	drawPolygon(mCtx);
	      	drawLines(mCtx);
	      	drawText(mCtx);
	      	drawpointText(mCtx);
	      	drawRegion(mCtx);
	      	drawCircle(mCtx);
	      	drawCircleLines(mCtx);
	      	
	      	// 绘制多边形边
		    function drawPolygon(ctx){
		        ctx.save();
		  
		        ctx.strokeStyle = mColorPolygon;
		        ctx.lineWidth = 0.5;
		        var r = (mRadius/ mCount); //单位半径
		        //画6个圈
		        for(var i = 0; i < mCount; i ++){
		            ctx.beginPath();        
		            var currR = r * ( i + 1); //当前半径
		            //画6条边
		            for(var j = 0; j < mCount; j ++){
		                var x = mCenter + currR * Math.cos(mAngle * j);
		                var y = (mH / 2) + currR * Math.sin(mAngle * j);
		  				
		                ctx.lineTo(x, y);
		            }
		            ctx.closePath()
		            ctx.stroke();
		        }
		  		
		        ctx.restore();
		    }
		  
		    //顶点连线
		    function drawLines(ctx){
		        ctx.save();
		  
		        ctx.beginPath();
		        ctx.strokeStyle = mColorLines;
		  		ctx.lineWidth = 0.5;
		        for(var i = 0; i < mCount; i ++){
		            var x = mCenter + mRadius * Math.cos(mAngle * i);
		            var y = (mH / 2) + mRadius * Math.sin(mAngle * i);
		  
		            ctx.moveTo(mCenter, (mH / 2));
		            ctx.lineTo(x, y);
		        }
		  
		        ctx.stroke();
		        ctx.restore();
		    }
		  
		    //绘制文本
		    function drawText(ctx){
		        ctx.save();
		  
		        var fontSize = mCenter / 16;
		        ctx.font = fontSize + 'px Microsoft Yahei';
		        ctx.fillStyle = mColorText;
		  
		        for(var i = 0; i < mCount; i ++){
		            var x = mCenter + mRadius * Math.cos(mAngle * i);
		            var y = (mH / 2) + mRadius * Math.sin(mAngle * i);
		  
		            if( mAngle * i >= 0 && mAngle * i <= Math.PI / 2 ){
		                ctx.fillText(mdata[i].title, x, y + fontSize);
		                
		            }else if(mAngle * i > Math.PI / 2 && mAngle * i <= Math.PI){
		                ctx.fillText(mdata[i].title, x - ctx.measureText(mdata[i].title).width, y + fontSize); 
		                
		            }else if(mAngle * i > Math.PI && mAngle * i <= Math.PI * 3 / 2){
		                ctx.fillText(mdata[i].title, x - ctx.measureText(mdata[i].title).width, y - fontSize);
		                
		            }else{
		                ctx.fillText(mdata[i].title, x, y - fontSize);
		                
		            }
		  
		        }
		  
		        ctx.restore();
		    }
		    //绘制次数/分数文本
		    function drawpointText(ctx){
		        ctx.save();
		  
		        var fontSize = mCenter / 16;
		        ctx.font = fontSize + 'px Microsoft Yahei';
		        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
		  
		        for(var i = 0; i < mCount; i ++){
		            var x = mCenter + mRadius * Math.cos(mAngle * i);
		            var y = (mH / 2) + mRadius * Math.sin(mAngle * i);
		  			var textCont = mdata[i].count+'次/'+mdata[i].point+'分';
		  			
		            if( mAngle * i >= 0 && mAngle * i <= Math.PI / 2 ){
		                ctx.fillText(textCont, x, y + (fontSize * 2));
		                
		            }else if(mAngle * i > Math.PI / 2 && mAngle * i <= Math.PI){
		                ctx.fillText(textCont, x - ctx.measureText(textCont).width, y + (fontSize * 2)); 
		                
		            }else if(mAngle * i > Math.PI && mAngle * i <= Math.PI * 3 / 2){
		                ctx.fillText(textCont, x - ctx.measureText(textCont).width, y);
		                
		            }else{
		                ctx.fillText(textCont, x, y);
		                
		            }
		  
		        }
		  
		        ctx.restore();
		    }
		  
		    //绘制数据区域
		    function drawRegion(ctx){
		        ctx.save();
		  
		        ctx.beginPath();
		        for(var i = 0; i < mCount; i ++){
		        	//这里做了修改（后期删除：为了演示，让低于50分的都现在50分）
		        	var point = mdata[i].point;
		  			if(point < 50){
		  				point = 50;
		  			}
		            var x = mCenter + mRadius * Math.cos(mAngle * i) * point / 100;
		            var y = (mH / 2) + mRadius * Math.sin(mAngle * i) * point / 100;
		            
		            ctx.lineTo(x, y);
		        }
		        ctx.closePath();
		        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
		        ctx.fill();
		  
		        ctx.restore();
		    }
		  
		    //画点
		    function drawCircle(ctx){
		        ctx.save();
		  		
		        var r = mCenter / 70;
		        for(var i = 0; i < mCount; i ++){
		        	//这里做了修改（后期删除：为了演示，让低于50分的都现在50分）
		        	var point = mdata[i].point;
		  			if(point < 50){
		  				point = 50;
		  			}
		            var x = mCenter + mRadius * Math.cos(mAngle * i) * point / 100;
		            var y = (mH / 2) + mRadius * Math.sin(mAngle * i) * point / 100;
		            
		            ctx.beginPath();
		            ctx.arc(x, y, r, 0, Math.PI * 2);
		            ctx.fillStyle = 'rgba(255, 0, 0, 1)';
		            ctx.fill();
		        }       
		  
		        ctx.restore();
		    }
		    //画点连线
		    function drawCircleLines(ctx){
		    	ctx.save();
		  
		        ctx.beginPath();
		        ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
		        for(var i = 0; i < mCount; i ++){
		        	//这里做了修改（后期删除：为了演示，让低于50分的都现在50分）
		        	var point = mdata[i].point;
		  			if(point < 50){
		  				point = 50;
		  			}
		            var x = mCenter + mRadius * Math.cos(mAngle * i) * point / 100;
		            var y = (mH / 2) + mRadius * Math.sin(mAngle * i) * point / 100;
		            var _i = i + 1;
		            if(_i == mCount){
		            	_i = 0;
		            }
		            var otherPoint = mdata[_i].point;
		  			if(otherPoint < 50){
		  				otherPoint = 50;
		  			}
		            var x1 = mCenter + mRadius * Math.cos(mAngle * _i) * otherPoint / 100;
		            var y1 = (mH / 2) + mRadius * Math.sin(mAngle * _i) * otherPoint / 100;
		  			
		            ctx.moveTo(x, y);
		            ctx.lineTo(x1, y1);
		        }       
		  		ctx.stroke();
		  
		        ctx.restore();
		        
		    }
		    
		    
   		},
   		drawCircle: function(index, rate){
   			var that = this;
   			var id = 'circle-canvas-' + index;
   			var canvas = document.getElementById(id);
	      	var mCtx = canvas.getContext('2d');
	      	var len = this.screenW * 0.11;
	      	var dpr = window.devicePixelRatio;
   			if(dpr){
				len = this.screenW * 0.11*dpr;
   			}
	      	var step = 1, startAngle = 1.5 * Math.PI, endAngle = 0.5 * Math.PI;
		    var n = 60, speed = 10;
	      	
	      	canvas.width = len*2;
  			canvas.height = len*2;
	      	if(dpr){
				mCtx.lineWidth = 2*dpr;
   			}else{
   				mCtx.lineWidth = 2;
   			}
	      	
	      	if(index == 0){
	      		mCtx.strokeStyle = 'rgb(255, 0, 0)';
	      	}else if(index == 1){
	      		mCtx.strokeStyle = '#F39800';
	      	}else if(index == 2){
	      		mCtx.strokeStyle = '#0DC6B6';
	      	}else if(index == 3){
	      		mCtx.strokeStyle = '#E051A5';
	      	}else if(index == 4){
	      		mCtx.strokeStyle = '#FFDA1C';
	      	}else{
	      		mCtx.strokeStyle = '#FE605D';
	      	}
	      	
		    
		    mCtx.lineCap = 'round';
//		    mCtx.beginPath();
		    
		    function drawArc(s, e) {
		    	mCtx.clearRect(0, 0, len*2, len*2);
		    	mCtx.beginPath();
		        mCtx.arc(len, len, len - 2, s, e, true);
		    	mCtx.stroke();
		    }
		    var animation = function () {
		        if (step <= n) {
		           endAngle = -step * rate * Math.PI / n + 1.5 * Math.PI;
		           drawArc(startAngle, endAngle);
		           var varName = requestAnimationFrame(animation);
		           //var varName = setInterval(animation,35);
		           step++;
		        } else {
		            cancelAnimationFrame(varName);
		            //clearInterval(varName);
		        }
		    }
//		    var varName = setInterval(animation,35);
		    var varName = requestAnimationFrame(animation);
		    
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
#partyPortrait{
	.top-bar{
		background: #fff;
		border-bottom: 1px solid #f2f2f2;
		.logo{
			/*background: url(../../assets/images/logo.png) no-repeat left center;
			background-size: auto .7rem;*/
			height: 1.2rem;
			line-height: 1.2rem;
			font-size: .42rem;
			/*padding-left: .5rem;*/
			text-align: center;
			img{
				border-radius: 50%;
				width: .7rem;
				margin-right: .1rem;
				vertical-align: middle;
			}
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
			    padding: .1rem .7rem;
			    border-radius: .8rem;
		    }
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
	.honor{
		white-space: initial;
	}
	.radar-map{
		background: #fff;
	}
	.statistics{
		text-align: center; 
		color: #fff;
		padding: .2rem 0;
	    background: -webkit-gradient(linear, 0 0, 0 bottom, from(#fd4443), to(#d80505));
	    div:after{
	    	position: absolute;
	    	top: 0;
	    	right: 0;
	    	content: '';
	    	background: -webkit-gradient(linear, 0 0, 0 bottom, from(#f79c9c), to(#f92323));
	    	height: 100%;
	    	width: 1px;
	    }
	    span{
	    	color: #f1f1f1;
	    }
	    p{
	    	color: #fff;
	    	font-size: .42rem;
	    	span{
	    		font-size: .32rem;
	    	}
	    }
	}
	.mui-slider .mui-slider-group .mui-slider-item{
		padding-bottom: .5rem;
	}
	.info{
		.header-bar{
			padding: .3rem;
			background: #f9f9f9;
			.info-title{
				display: inline-block;
				border-left: .1rem solid red;
			    background: #f9f9f9;
			    padding-left: .1rem;
			    color: #333;
			    
			}
			span{
				color: #999;
			}
		}
		.info-detail{
			background: #fff;
			padding: .4rem 0;
			.first-info-box{
				position: relative;
				padding-left: .7rem;
				
				.circle-canvas{
					position: relative;
					display: inline-block;
					text-align: center;
					height: 22vw;
					width: 22vw;
					border: 3px solid #eee;
					border-radius: 50%;
					#circle-canvas-0, #circle-canvas-1, #circle-canvas-2, #circle-canvas-3, #circle-canvas-4, #circle-canvas-5, #circle-canvas-6{
						position: absolute;
						top: -3px;
					    left: -3px;
					    height: 22vw;
					    width: 22vw;
					}
					.iconfont{
						display: inline-block;
						color: #e60000;
    					font-size: .9rem;
    					margin-top: .15rem;
					}
					p{
						font-size: .32rem;
						width: 90%;
						margin: 0 auto;
					}
				}
				.info-data{
					margin-top: .1rem;
					span{
						color: #999;
					}
					.info-data-info>span{
						font-size: .42rem;
						font-weight: 700;
					}
					.iconfont{
						color: #eee;
						font-size: .36rem;
					}
				}
			}
			
			.second-info-box{
				text-align: center;
				&:before{
					position: absolute;
					left: 0;
					top: 0;
					content: '';
					width: 1px;
					height: 100%;
					background: #eee;
				}
				.rank-title{
					color: #f16666;
					line-height: .7rem;
					margin-bottom: .3rem;
					position: relative;
					&:after{
						position: absolute;
						bottom: 0;
						left: 50%;
						margin-left: -1.8rem;
						content: '';
						width: 3.6rem;
						height: .07rem;
						background: linear-gradient(to right,#fff 10%,#fce6c0 50%,#fff 90%);
					}
					
				}
				.org{
					li{
						height: .75rem;
						line-height: .75rem;
						padding-left: .5rem;
						position: relative;
						.info-data-info{
							color: #f16666;
							font-size: .32rem;
							overflow: hidden;
					    	white-space: nowrap;
					    	text-overflow: ellipsis;
						}
						&:first-child{
							background: url(../../../static/images/rank1.png) no-repeat .5rem .05rem;
							background-size: .55rem auto;
						}
						&:nth-child(2){
							background: url(../../../static/images/rank2.png) no-repeat .5rem .05rem;
							background-size: .55rem auto;
						}
						&:nth-child(3){
							background: url(../../../static/images/rank3.png) no-repeat .5rem .05rem;
							background-size: .55rem auto;
						}
						&:nth-child(4):before{
							position: absolute;
							left: .55rem;
							top: .1rem;
							content: '4';
							background: #f6dfdf;
							border-radius: 50%;
							width: .5rem;
							height: .5rem;
							line-height: .5rem;
							text-align: center;
							color: #fff;
							font-size: .32rem;
						}
					}
				}
				.person{
					li{
						div{
							position: relative;
							width: 65%;
						    margin: 0 auto;
						    text-align: left;
							font-family: "iconfont" !important;
							border-left: 1px solid #ccc;
							padding-left: .2rem;
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
								
							}
							position: relative;
							.info-data-info{
								color: #333;
								font-size: .32rem;
								overflow: hidden;
							    white-space: nowrap;
							    text-overflow: ellipsis;
							}
						}
						&:last-child{
							div{
								border-left: none;
							}
						}
						span.branch_name{
							display: inline-block;
						    width: 75%;
						    overflow: hidden;
						    white-space: nowrap;
						    text-overflow: ellipsis;
						    line-height: 1;
						}
					}
				}
					
			}
			
			
		}	
	}
	.myStudy{
		padding: .2rem .4rem;
	    color: #e51c1c;
	    font-size: .4rem;
	    span{
	    	border-left: .05rem solid #e51c1c;
	    	padding-left: .25rem;
	    }
	}
	.name{
		line-height: 1.24rem;
	}
	.mui-slider-item{
		&:nth-child(1){
			.circle-canvas .iconfont{
				color: #e60000 !important;
			}
			.info-data{
				.info-data-info>span{
					color: #e60000;
				}
				.active{
					color: #e60000 !important;
				}
			}
		}
		&:nth-child(2){
			.circle-canvas .iconfont{
				color: #F39800 !important;
				&:before{
					content: "\e640";
				}
			}
			.info-data{
				.info-data-info>span{
					color: #F39800;
				}
				.active{
					color: #F39800 !important;
				}
			}
		}
		&:nth-child(3){
			.circle-canvas .iconfont{
				color: #0DC6B6 !important;
				&:before{
					content: "\e63b";
				}
			}
			.info-data{
				.info-data-info>span{
					color: #0DC6B6;
				}
				.active{
					color: #0DC6B6 !important;
				}
			}
		}
		&:nth-child(4){
			.circle-canvas .iconfont{
				color: #E051A5 !important;
				&:before{
					content: "\e64e";
				}
			}
			.info-data{
				.info-data-info>span{
					color: #E051A5;
				}
				.active{
					color: #E051A5 !important;
				}
			}
		}
		&:nth-child(5){
			.circle-canvas .iconfont{
				color: #FFDA1C !important;
				&:before{
					content: "\e609";
				}
			}
			.info-data{
				.info-data-info>span{
					color: #FFDA1C;
				}
				.active{
					color: #FFDA1C !important;
				}
			}
		}
		&:nth-child(6){
			.circle-canvas .iconfont{
				color: #FE605D !important;
				&:before{
					content: "\e602";
				}
			}
			.info-data{
				.info-data-info>span{
					color: #FE605D;
				}
				.active{
					color: #FE605D !important;
				}
			}
		}
	}
	.mui-slider{
		overflow: visible;
		.mui-slider-indicator{
			bottom: .1rem;
			.mui-indicator{
				background: #ccc;
				border: none;
				box-shadow: none;
				margin: 1px 3px;
				width: 5px;
    			height: 5px;
			}
			.mui-indicator.mui-active{
				background: #e61515;
			    width: 14px;
			    height: 4px;
			    border-radius: 4px;
			}
		}
	}
	#my-information{
		.mui-table-view-cell:after{
			left: .3rem;
		}
		.mui-table-view .mui-media-object.mui-pull-left{
			margin-right: .3rem;
		    line-height: 1.24rem;
		    max-width: 1.24rem;
		    width: 1.24rem;
		    height: 1.24rem;
		    border-radius: 50%;
		    min-width: auto;
		}
		.mui-table-view-chevron .mui-table-view-cell{
			padding: .4rem .5rem;
		}
		.mui-table-view-chevron .mui-table-view-cell>a:not(.mui-btn) {
			margin: -.4rem -.5rem;
		}
		.mui-table-view-chevron .mui-table-view-cell>a:not(.mui-btn)>span{
			color: #999;
			&.mui-pull-right{
				color: #333;
				width: 75%;
				text-align: right;
				white-space: initial;
			}
		}
	    .mt015{
	    	margin-top: .15rem;
	    }
	}
}
</style>
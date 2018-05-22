<template>
	<div id="meetingDetail">
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<div class="article" v-if="articleData">
					<!--会议头部-->
					<div class="meetingBox">
						<div class="title"><i class="iconfont icon-huiyixiangqing-huiyi"></i><span v-text="articleData.title"></span></div>
						<p v-text="'时间：' + articleData.published_time"></p>
						<p v-text="articleData.meeting_addr != null ? '地点：' + articleData.meeting_addr : '待定'"></p>
					</div>
					<!--会议记录-->
					<div class="meetingBox">
						<div class="table-view-cell" v-if="articleData.participantData && articleData.participantData != ''">
							<div class="mui-navigate-right" :class="participantShow ? 'active' : ''" @click="participantShow = !participantShow">
								<span class="record-title"><i class="iconfont icon-huiyixiangqing-canhuiren-"></i>参会人：</span>
								<span v-text="participantDataLength(articleData.participantData)"></span>
							</div>
							<div class="cell-detail" v-show="participantShow">
								<span class="cell-title">人员名单：</span>
								<span v-text="articleData.participantData"></span>
							</div>
						</div>
						<div class="mui-row table-view-cell" v-show="articleData.attend != '' && articleData.attend != null">
							<span class="record-title mui-col-sm-3 mui-col-xs-3"><i class="iconfont icon-huiyixiangqing-liexi-"></i>列席：</span>
							<span class="mui-col-sm-9 mui-col-xs-9" v-text="articleData.attend"></span>
						</div>
						<div class="mui-row table-view-cell" v-show="articleData.host != '' && articleData.host != null">
							<div class="mui-col-sm-6 mui-col-xs-6" v-show="articleData.host != '' && articleData.host != null">
								<i class="iconfont icon-huiyixiangqing-zhujiangren-" style="margin-right: 0;"></i>
								<span class="record-title">主持人：</span>
								<span v-text="articleData.host"></span>
							</div>
							<div class="mui-col-sm-6 mui-col-xs-6" v-show="articleData.teacher != '' && articleData.teacher != null">
								<i class="iconfont icon-huiyixiangqing-zhujiangren-" v-show="articleData.host == '' || articleData.host == null"></i>
								<span class="record-title">主讲人：</span>
								<span v-text="articleData.teacher"></span>
							</div>
						</div>
						<div class="table-view-cell mui-row" v-show="articleData.recorder != '' && articleData.recorder != null">
							<span class="ui-col-sm-3 mui-col-xs-3 record-title"><i class="iconfont icon-huiyixiangqing-jilu-"></i>记录：</span>
							<span class="ui-col-sm-9 mui-col-xs-9" v-text="articleData.recorder"></span>
						</div>
						<div class="mui-row table-view-cell" v-show="articleData.notice != '' && articleData.notice != null">
							<span class="record-title"><i class="iconfont icon-huiyixiangqing-zhuyishixiang-"></i>注意事项：</span>
							<span v-text="articleData.notice"></span>
						</div>
						<div class="mui-row table-view-cell" v-show="articleData.contact != '' && articleData.contact != null">
							<span class="record-title"><i class="iconfont icon-lianxiren"></i>会议联系人：</span>
							<span v-text="articleData.contact + '    '"></span>
							<span v-text="articleData.contact_num"></span>
						</div>
						<div class="mui-row table-view-cell" v-show="articleData.agenda != '' && articleData.agenda != null">
							<span class="record-title mui-col-sm-4 mui-col-xs-4"><i class="iconfont icon-huiyixiangqing-huiyiyicheng-"></i>会议议程：</span>
							<span class="mui-col-sm-8 mui-col-xs-8" v-html="articleData.agenda != '' && articleData.agenda != null ? articleData.agenda.replace(/\n/g, '<br>') : ''"></span>
						</div>
					</div>
					<div class="recordBox" v-show="$route.query.status == '4'">
						<div class="mui-row table-view-cell">
							<div class="mui-col-sm-6 mui-col-xs-6">
								<span class="record-title"><i class="iconfont icon-huiyixiangqing-yingdao-"></i><span class="letterSpace">应</span>到：</span>
								<span v-text="articleData.lesson_should_cnt" class="fixedWidth"></span>
								<span>人</span>
							</div>
							<div class="mui-col-sm-6 mui-col-xs-6">
								<span class="record-title"><span class="letterSpace">实</span>到：</span>
								<span v-text="articleData.lesson_real_cnt" class="fixedWidth"></span>
								<span>人</span>
							</div>
						</div>
						<div class="table-view-cell">
							<div class="mui-navigate-right" :class="leaveShow ? 'active' : ''">
								<div class="mui-row" @click="leaveShow = !leaveShow">
									<div class="mui-col-sm-6 mui-col-xs-6">
										<span class="record-title"><i class="iconfont icon-huiyixiangqing-yiqingjia-"></i>已请假：</span>
										<span v-text="articleData.leave" class="fixedWidth"></span>
										<span>人</span>
									</div>
									<div class="mui-col-sm-6 mui-col-xs-6">
										<span class="record-title">未请假：</span>
										<span v-text="articleData.not" class="fixedWidth"></span>
										<span>人</span>
									</div>
								</div>
							</div>
								
							<div class="cell-detail" v-show="leaveShow" v-if="!(articleData.leaveData == '' && articleData.noleaveWhere == '')">
								<p v-if="articleData.leaveData != ''"><span class="cell-title">已请假：</span><span v-text="articleData.leaveData != '' ? articleData.leaveData : '0人'"></span></p>
								<p v-if="articleData.noleaveWhere != ''"><span class="cell-title">未请假：</span><span v-text="articleData.noleaveWhere"></span></p>
							</div>
						</div>
						<div class="mui-row table-view-cell" v-show="articleData.summary != '' && articleData.summary != null">
							<span class="mui-col-sm-4 mui-col-xs-4 record-title"><i class="iconfont icon-huiyixiangqing-huiyijiyao-"></i>会议纪要：</span>
							<span class="mui-col-sm-8 mui-col-xs-8" v-html="articleData.summary != '' && articleData.summary != null ? articleData.summary : ''"></span>
						</div>
					</div>
					<!--参会联系人-->
					<!--<div class="meetingBox">
						<div class="table-view-cell" v-if="articleData.participantData && articleData.participantData != ''">
							<div class="mui-navigate-right" :class="participantShow ? 'active' : ''" @click="participantShow = !participantShow">
								<span class="record-title"><i class="iconfont icon-huiyixiangqing-canhuiren-"></i>会议联系人：</span>
							</div>
							<div class="cell-detail" v-show="participantShow">
								<span class="cell-title">联系方式：</span>
								<span v-text="articleData.contact + '：' + articleData.contact_num"></span>
							</div>
						</div>
					</div>-->
					
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
  	name: 'articleDetail',
  	data:function() {
      	return {
        	articleData: null,
        	loadShow: true,
        	img_URL: 'http://dj.celap.cn/pgy/',
        	participantShow: false,
        	leaveShow: false
      	};
   	},
   	components: {
	  	loading: loading
	},
  	mounted: function() {
  		//初始化滚动组件
   		mui('.mui-scroll-wrapper').scroll({deceleration:0.002, bounce: false});
   	},
   	activated: function(){
   		//vue会缓存组件，造成文章详情只请求一次之后不在重新请求，
   		this.loadShow = true;
   		this.articleData = {};
   		this.participantShow = false;
       	this.leaveShow = false;
   		this.init();
   	},
   	methods: {
   		init: function(){
   			var _this = this, url = '';
   			_this.loadShow = true;
			var data = {
				article_id: _this.$route.query.article_id,
				flag_type: _this.$route.query.flag_type,
				status: _this.$route.query.status
			}
		    _this.$api.post('index.php/Home/Api/getArticleInfoByArticleId', data, function(res){
		    	console.log(res);
		    	if(res.code == "200"){
		    		_this.articleData = res.data.articleData;
		    		mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0);
		    		_this.loadShow = false;	
		    	}else if(res.code == '300' || res.code == "0"){
		    		_this.loadShow = false;	
		    		mui.toast('文章详情获取失败，请稍后再试！');
		    	}else{
		    		_this.loadShow = false;	
		    		return false;
		    	}
		    },function(err){
		    	if(err){
		    		_this.loadShow = false;	
		    		mui.toast('文章详情获取失败，请稍后再试！');
		    	}
		    })
   		},
   		participantDataLength: function(data){
   			var newData = data.split(',');
   			return newData.length + '人';
   		}
   	}
}
</script>
<style lang="scss">
#meetingDetail{
	.article{
		.meetingBox,.recordBox{
			padding: 0 .4rem;
			background: #fff;
			line-height: 1.5;
			font-size: .4rem;
		}
		.recordBox{
			margin-top: .15rem;
		}
		.letterSpace{
			padding-right: 1em;
		}
		.fixedWidth{
			display: inline-block;
			width: 1rem;
		}
		.table-view-cell{
			position: relative;
			border-bottom: 1px solid #f2f2f2;
			padding: .3rem 0 !important;
			&:last-child{
				border-bottom: none;
			}
			.mui-pull-right{
				color: #999;
				font-size: .32rem;
				position: absolute;
			    top: 50%;
			    right: .5rem;
			    -webkit-transform: translateY(-50%);
			    transform: translateY(-50%);
			}
			
		}
		.mui-navigate-right{
			position: relative;
		}
		.mui-navigate-right:after{
			right: 0;
			content: '\e581';
		}
		.active.mui-navigate-right:after{
			content: '\e580';
		}
		.cell-detail{
			margin-top: .3rem;
			padding-top: .3rem;
			border-top: 1px dashed #999;
			font-size: .34rem;
			p{
				padding-left: 0;
				font-size: .34rem;
			}
			.cell-title{
				color: #fe494f;
			}
		}
		p{
			padding-left: .8rem;
			font-size: .4rem;
			color: #333;
		}
		.title{
			font-size: .55rem;
			color: #333;
			padding: .3rem 0 0;
			.iconfont{
				color: #e51c23;
				font-size: .6rem;
				margin-right: .2rem;
			}
			span{
				font-weight: 700;
			}
		}
		.table-view-cell{
			.iconfont{
				font-size: .42rem;
				color: #ccc;
				margin-right: .2rem;
			}
		}
	}
	
	
}
</style>
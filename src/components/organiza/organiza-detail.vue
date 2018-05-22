<template>
	<div id="organizaDetail">
		<div class="mui-content">
			<div id='list' class="mui-indexed-list">
				<div class="mui-indexed-list-inner">
					<ul class="mui-table-view">
						<li class="mui-table-view-cell mui-indexed-list-item">
							<a href="javascript:;">
								<img class="mui-media-object mui-pull-left headerImg" :src="member.header_img ? img_URL + member.header_img : ''" @click="previewImg(img_URL + member.header_img)">
								<!--<div class="mui-media-body">
									<div class="mui-clearfix">
										<span class="mui-pull-left" v-text="member.name"></span>
										<span v-text="member.part"></span>
										<span class="mui-pull-right" v-text="member.birthday"></span>
									</div>
									<div class="adds mui-clearfix">
										<span class="mui-pull-left" v-text="member.education"></span>
										<span class="mui-pull-right" v-text="member.phone"></span>
									</div>
									<div class="adds mui-clearfix">
										<span class="mui-pull-left"  v-text="'个人荣誉：' + member.honor"></span>
									</div>
								</div>-->
								<div class="mui-media-body">
									<div class="mui-clearfix adds">
										<span class="mui-pull-left name" v-text="member.name"></span>
										<!--<span v-text="member.part"></span>-->
										<span class="mui-pull-right" v-text="'入党时间：'+member.entry_date"></span>
									</div>
									<div class="adds mui-clearfix">
										<!--<span class="mui-pull-left" v-text="'个人荣誉：' + member.honor"></span>-->
										<span v-if="member.g_name != undefined" class="mui-pull-left" v-text="'小组：' + member.g_name"></span>
									</div>
									<div class="adds mui-ellipsis">
										<!--<span class="mui-pull-left" v-text="'学历：'+member.education"></span>
										<span class="mui-pull-right" v-text="member.phone"></span>-->
										<span v-text="'个人荣誉：'+member.honor"></span>
									</div>
									
								</div>
								<a :href="'tel:' + member.phone" class="iconfont icon-call-1"></a>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<!--class-->
			<ul class="curriculum" v-if="member.info">
				<li>
					<p class="class_title" v-text="'三会一课（' + member.info.sessions.count + '次）'"></p>
					<div class="act" v-if="member.info.sessions.data != null">
						<span>最近活动</span>
						<p v-text="'标题：' + member.info.sessions.data.title"></p>
						<p v-text="'时间：' + member.info.sessions.data.begin_time"></p>
						<p v-text="'地点：' + member.info.sessions.data.address"></p>
						<router-link :to="{path:'/orgMettingList', query: {type: 1, ouid: $route.query.ouid}}">
							<button class="more">更多</button>
						</router-link>
					</div>
				</li>
				<li>
					<p class="class_title" v-text="'支部生活（' + member.info.branch.count + '次）'"></p>
					<div class="act" v-if="member.info.branch.data != null">
						<span>最近活动</span>
						<p v-text="'标题：' + member.info.branch.data.title"></p>
						<p v-text="'时间：' + member.info.branch.data.begin_time"></p>
						<p v-text="'地点：' + member.info.branch.data.address"></p>
						<router-link :to="{path:'/orgMettingList', query: {type: 2, ouid: $route.query.ouid}}">
							<button class="more">更多</button>
						</router-link>
					</div>
				</li>
				<li>
					<p class="class_title" v-text="'民主生活（' + member.info.democratic.count + '次）'"></p>
					<div class="act" v-if="member.info.democratic.data != null">
						<span>最近活动</span>
						<p v-text="'标题：' + member.info.democratic.data.title"></p>
						<p v-text="'时间：' + member.info.democratic.data.begin_time"></p>
						<p v-text="'地点：' + member.info.democratic.data.address"></p>
						<router-link :to="{path:'/orgMettingList', query: {type: 3, ouid: $route.query.ouid}}">
							<button class="more">更多</button>
						</router-link>
					</div>
				</li>
				
			</ul>
		</div>
		
		<!--预览图片-->
		<transition name="fade">
			<div class="preview-img" v-show="previewShow">
				<div class="preview-img-box" @click="previewShow = false">
					<img :src="previewSrc" alt="" />
				</div>
					
			</div>
		</transition>
		
		<!--loading-->
		<loading v-show="loadShow"></loading>
		
	</div>
</template>
<script type="text/ecmascript-6">
import loading from '../loading/loading.vue'
export default {
  	name: 'organizaDetail',
  	data: function(){
      	return {
        	member: {},
        	loadShow: true,
        	img_URL: 'http://dj.celap.cn/pgy/',
        	previewShow: false,
        	previewSrc: ''
      	};
   	},
   	components: {
	  	loading: loading
	},
	activated: function(){
   		//vue会缓存组件，造成文章详情只请求一次之后不在重新请求
   		this.previewSrc = '';
   		this.loadShow = true;
   		this.member = {};
		this.init();
   	},
   	mounted: function() {
   		//初始化滚动组件
   		mui('.mui-scroll-wrapper').scroll({deceleration:0.002});
   	},
   	methods: {
   		init: function(){
   			var _this = this,
	   			data = {
	   				ouid: _this.$route.query.ouid
	   			};
		    _this.$api.post('index.php/Home/ApiMy/get_org_detail', data, function(res){
		    	console.log(res);
		    	if(res.code == "200"){
		    		_this.member = res.data;
		    	}else{
		    		mui.toast('个人详情获取失败，请稍后再试！');
		    	}
		    	setTimeout(function(){
		    		_this.loadShow = false;
		    	},1000)
		    	
		    },function(err){
		    	if(err){
		    		_this.loadShow = false;
		    		mui.toast("个人详情获取失败，请稍后再试!");
		    		console.log(err);
		    	}
		    })
   		},
   		previewImg: function(src){
			this.previewSrc = src;
			this.previewShow = true;
		}
   	}
}
</script>
<style lang="scss">
#organizaDetail{
	
	/*成员列表*/
	.mui-search .mui-placeholder .mui-icon{
		color: #999;
	}
	.mui-indexed-list-search.mui-input-row.mui-search.mui-active:before{
		color: #999;
		top: .44rem;
	}
	.mui-indexed-list-inner::-webkit-scrollbar {
		width: 0px;
		height: 0px;
		visibility: hidden;
	}
	.mui-indexed-list-inner.empty ul {
		display: none;
	}
	.mui-indexed-list-inner.empty .mui-indexed-list-empty-alert {
		display: block;
	}
	.mui-indexed-list-empty-alert {
		padding: 30px 15px !important;
		text-align: center;
		color: #ccc;
	}
	.mui-indexed-list-group {
		padding-right: 1.1rem;
	}
	.mui-ios .mui-indexed-list-group,
	.mui-ios .mui-indexed-list-empty-alert {
		padding-right: 1.3rem;
	}
	.mui-indexed-list-group {
		background-color: #f7f7f7;
	}
	.mui-indexed-list-group {
		padding: .1rem 0 .1rem .4rem;
		font-size: .34rem;
	}
	.mui-table-view-cell.mui-indexed-list-item{
		font-size: .4rem;
	}
	
	.mui-indexed-list-bar a {
		display: block;
		text-align: center;
		font-size: .34rem;
		padding: 0px;
		margin: 0px;
		line-height: .5rem;
		color: #333;
	}
	.mui-table-view-cell:after{
		left: 0;
	}
	.btn_outlined {
	    border: 1px solid #e6242b;
	    color: #e6242b;
	    font-size: .28rem;
	    padding: .1rem;
	    line-height: 1 !important;
	}
	.mui-indexed-list-bar.active a {
		color: #333;
	}
	.mui-indexed-list-bar.active a.active {
		color: #e51d24;
	}
	.mui-indexed-list-alert {
		position: absolute;
		z-index: 20;
		background-color: rgba(0, 0, 0, 0.5);
		width: 80px;
		height: 80px;
		left: 50%;
		top: 50%;
		margin-left: -40px;
		margin-top: -40px;
		border-radius: 40px;
		text-align: center;
		line-height: 80px;
		font-size: 35px;
		color: #fff;
		display: none;
		-webkit-transition: .2s;
	}
	.mui-indexed-list-alert.active {
		display: block;
	}
	.mui-table-view .mui-media-object.mui-pull-left{
		width: 1.84rem;
	}
	.mui-media-body {
	    min-height: 1.84rem;
	    padding-right: 1rem;
	}
	.mui-table-view-cell{
		overflow: hidden;
	}
	.mui-table-view-cell>a:not(.mui-btn).icon-call-1{
		position: absolute;
	    right: 0;
	    top: 0;
	    color: #e6242b;
	    line-height: 1;
	    font-size: 0.6rem;
	    padding: 1.2rem .7rem 1rem .3rem;
	}
	.icon-call-1{
		position: absolute;
	    right: 0;
	    top: 0;
	    color: #e6242b;
	    font-size: 0.6rem;
	    height: 100%;
	    width: 1.4rem;
	    text-align: center;
	    line-height: 2.24rem;
	}
	
	.mui-table-view-cell:after{
		background: #eee;
	}
	.mui-media-body span{
		line-height: .55rem;
	}
	.mui-media-body>div:first-child{
		padding-bottom: .1rem;
		text-align: center;
	}
	.mui-media-body .adds{
		font-size: .33rem;
		color: #999;
	}
	.title{
		color: #999;
	    padding: .1rem .4rem;
	    font-size: .34rem;
	}
	/*详情*/
	.curriculum{
		background: #fff;
	    margin-top: .1rem;
	}
	.curriculum>li{
		border-bottom: .1rem solid #eee;
		padding: 0 .3rem;
	}
	.curriculum>li:last-child{
		border-bottom: none;
	}
	.class_title{
		border-bottom: 1px solid #eee;
	    padding: 0.2rem 0;
	    text-align: center;
	    font-size: .4rem;
	    font-weight: 700;
	    color: #333;
	}
	.act{
		padding: .3rem 0;
	    line-height: 1.5;
	    position: relative;
	}
	.act>span{
		font-size: .44rem;
		color: #333;
	}
	.act>p{
		font-size: .4rem;
	}
	span.icon-dianhua2.detailTel{
		top: .5rem;
	}
	.more{
		position: absolute;
	    right: 0;
	    bottom: .3rem;
	    padding: .1rem .5rem;
	    border-radius: 0;
	    color: #e6242b;
	    border-color: #e6242b;
	    line-height: 1;
	}
	.preview-img{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: #000;
		z-index: 2;
		.preview-img-box{
			height: 100%;
			width: 100%;
			position: relative;
			overflow-y: auto;
			img{
				width: 100%;
				position: absolute;
				top: 50%;
				left: 50%;
				-webkit-transform: translate3d(-50%,-50%,0);
				transform: translate3d(-50%,-50%,0);
			}
		}
		
	}
}
</style>
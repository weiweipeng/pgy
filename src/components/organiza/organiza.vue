<template>
	<div id="organiza">
		<div class="mui-content">
			<div id='list' class="mui-indexed-list">
				<div class="searchBox">
					<div class="search">
					    <input type="search" placeholder="请输入您要搜索的姓名..." v-model='search'>
					</div>
				</div>
				
				<div class="mui-scroll-wrapper">
					<div class="mui-scroll">
						<div class="mui-indexed-list-inner organizaList" v-if="personList">
							<div class="mui-indexed-list-empty-alert" v-show="noMember">没有该用户</div>
							<div style="display: block;" v-for="(item, index) in personList" v-show="!noMember">
								<ul class="mui-table-view" v-if="item.user">
									<li class="mui-table-view-cell mui-collapse orgName" :class="search != '' ? 'mui-active' : ''">
										<a class="mui-navigate-right" href="#"><i class="iconfont icon-party"></i><span v-text="item.org_name"></span></a>
										<div class="mui-collapse-content">
											<div class="part-member mui-row" v-if="item.part" v-show="item.part.length != 0">
												<p class="mui-col-sm-6 mui-col-xs-6" v-for="partMember in item.part">
													<span v-text="partMember.part + ':'"></span>
													<span v-text="partMember.member_name"></span>
													<!--<a :href="'tel:' + partMember.phone" class="iconfont icon-call-1"></a>-->
												</p>
											</div>
											<ul class="mui-table-view orgList">
												<li class="mui-table-view-cell mui-indexed-list-item" v-if="!item.user[0].children" v-for="(member, index) in item.user">
													<!--<router-link :to="{path:'/organizaDetail',query: {ouid: member.ouid}}">-->
													<a href="##">
														<img class="mui-media-object mui-pull-left headerImg" :src="img_URL + member.header_img">
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
													</a>
													<!--</router-link>-->
													<a :href="'tel:' + member.phone" class="iconfont icon-call-1"></a>
												</li>
												<li class="mui-table-view-cell child-wrap mui-indexed-list-item" v-if="item.user[0].children" v-for="(children, num) in item.user">
													<p class="grouping"><i class="iconfont icon-party"></i><span v-text="children.children_name"></span></p>
													<a class="child-h" v-for="(mem, n) in children.children">
														<!--<router-link :to="{path:'/organizaDetail',query: {ouid: mem.ouid}}">-->
														<a href="##">
															<img class="mui-media-object mui-pull-left headerImg" :src="img_URL + mem.header_img">
															<div class="mui-media-body">
																<div class="mui-clearfix adds">
																	<span class="mui-pull-left name" v-text="mem.name"></span>
																	<!--<span v-text="mem.part"></span>-->
																	<span class="mui-pull-right" v-text="mem.entry_date != '' ? '入党时间：'+mem.entry_date : '入党时间：未录入'"></span>
																</div>
																<div class="adds mui-clearfix">
																	<span v-if="mem.g_name != undefined" class="mui-pull-left" v-text="'小组：' + mem.g_name"></span>
																</div>
																<div class="adds mui-ellipsis">
																	<!--<span class="mui-pull-left" v-text="mem.education != '' ? '学历：'+mem.education : '学历：未录入'"></span>
																	<span class="mui-pull-right" v-text="mem.phone"></span>-->
																	<span v-text="'个人荣誉：'+mem.honor"></span>
																</div>
																
															</div>
														</a>
														<!--</router-link>-->
														<a :href="'tel:' + mem.phone" class="iconfont icon-call-1"></a>
													</a>
												</li>
											</ul>
											
										</div>
									</li>
								</ul>
								
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
  	name: 'organiza',
  	data: function(){
      	return {
        	loadShow: true,
        	partyList: [],
        	personList: null,
        	noMember: false,
        	search: '',
        	img_URL: 'http://dj.celap.cn/pgy/'
      	};
    },
    watch: {
    	search: function(){
    		mui('.mui-scroll-wrapper').scroll().scrollTo(0,0);
    		this.searchData();
    	}
    },
    created: function() {
   		var _this = this;
// 			data = {
// 				level: "2"
// 			};
	    _this.$api.post('index.php/Home/ApiMy/get_PartyList', null, function(res){
	    	console.log(res);
	    	if(res.code == "200"){
	    		_this.partyList = res.data;
	    		_this.searchData();
	    	}else if(res.code == "401"){
	    		mui.toast('请绑定会员卡！')
	    		return false;
	    	}else{
	    		mui.toast('网络繁忙，请稍后再试！')
	    		return false;
	    	}
	    	
	    },function(err){
	    	if(err){
	    		console.log(err);
	    	}
	    })
  	},
    components: {
	  	loading: loading
	},
   	mounted: function() {
   		//初始化滚动组件
   		mui('.mui-scroll-wrapper').scroll({deceleration:0.002});
   		
   	},
   	methods: {
   		searchData: function(){
   			var _this = this, search = _this.search, searchData = [];
			if (search) {
				console.log(search);
		        _this.partyList.forEach(function(json,index,arr){
		        	var data = json.user;
		        	var newData = {
        					org_name: json.org_name,
	        				user: []
	        			}
		        	if(data.length != 0){
		        		data.forEach(function(item,index,arr1){
			        		if(!item.children){
			        			// || String(item.phone).toLowerCase().indexOf(search) > -1
				        		if(String(item.name).toLowerCase().indexOf(search) > -1){ 
					        		newData.user.push(item);
//					        		newData.user.org_name = org_name;
//					        		searchData.push(newData);
					        	}
			        		}else{
			        			var child = item.children;
			        			child.forEach(function(member,index,arr2){
//			        				var newData = {
//					        			user: []
//					        		}
									// || String(member.phone).toLowerCase().indexOf(search) > -1
					        		if(String(member.name).toLowerCase().indexOf(search) > -1){
						        		newData.user.push(member);
						        		searchData.push(newData);
						        	}
			        			})
			        		}
			        	})
		        		if(newData.user.length != 0){
		        			searchData.push(newData);
		        		}
		        			
		        	}
			        	
		        })
		        console.log(searchData)
		        if(searchData.length === 0){
		        	_this.noMember = true;
		        }else{
		        	//重新定义滚动条
		        	mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0);
		        	_this.noMember = false;
		        	_this.personList = searchData;
		        }
		        _this.loadShow = false;
		    }else{
		    	_this.noMember = false;
		    	_this.personList = _this.partyList;
		    	setTimeout(function(){
		    		_this.loadShow = false;
		    	},1000)
		    }
		    
		},
		orgShow: function(index){
			if(index){
				return 'active';
			}
		}
   	}
}
</script>
<style lang="scss">
#organiza{
	/*搜索*/
	.searchBox {
	    position: fixed;
	    top: 0;
	    left: 0;
	    background: #fff;
	    width: 100%;
	    z-index: 99;
	    height: 1.5rem;
	    padding: .3rem;
	    .mui-search{
	    	height: 100%;
	    	input{
	    		margin-bottom: 0;
	    		border-radius: 1rem;
	    		height: .9rem;
			    line-height: .9rem;
			    vertical-align: middle;
			    font-size: .4rem;
			    position: absolute;
			    width: 100%;
	    	}
			.mui-placeholder{
				height: .9rem;
				line-height: .9rem;
				span{
					font-size: .4rem;
				}
				.mui-icon-search{
					font-size: .5rem;
				}
			}
				
	    }
	    .mui-input-row.mui-search.mui-active:before{
	    	top: 50%;
			font-size: .5rem;
	    	left: .3rem;
	    	margin-top: 0;
	    	transform: translateY(-50%);
			-webkit-transform: translateY(-50%);
	    }
	    .mui-input-row.mui-search .mui-icon-clear{
	    	top: 0;
	    	height: .9rem;
			line-height: .9rem;
			width: .9rem;
	    }
	    .mui-icon.mui-icon-clear:before{
	    	top: 50%;
	    	transform: translateY(-50%);
			-webkit-transform: translateY(-50%);
	    	right: .4rem;
	    }
	}
	.mui-table-view-cell.mui-collapse .mui-collapse-content{
		background: #ddd;
	}
	
	/*成员列表*/
	/*.organizaList{
		position: absolute;
	    top: 1.5rem;
	    bottom: 1.3rem;
	    left: 0;
	    right: 0;
	    overflow-y: auto;
	}*/
	.mui-scroll-wrapper{
		top: 1.5rem;
	}
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
		font-size: 1rem;
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
		padding: .35rem .4rem;
	}
	.orgList .icon-call-1{
		position: absolute;
	    right: 0;
	    top: .3rem;
	    color: #e6242b;
	    font-size: 0.6rem;
	    height: 100%;
	    width: 1.8rem;
	    text-align: center;
	    line-height: 2.7rem;
	    z-index: 99;
	    padding: 0;
	}
	.part-member .icon-call-1{
		position: relative;
	    color: #e6242b;
	    font-size: 0.4rem;
	    padding: 0;
	}
	
	.mui-table-view-cell:after{
		background: #eee;
	}
	.mui-media-body span{
		line-height: .55rem;
		color: #999;
	}
	.mui-media-body span.name{
		color: #333;
		font-size: .42rem;
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
	    padding: .4rem;
	    font-size: .42rem;
	    position: relative;
	    background: #fff;
	    border-bottom: 1px solid #eee;
	}
	.mui-table-view-cell.mui-collapse .mui-table-view{
		margin: 0;
		background-color: #ddd;
	}
	.mui-table-view-cell.mui-collapse .mui-table-view .mui-table-view-cell{
		padding-left: .4rem;
		background: #fff;
		margin-bottom: .2rem;
	}
	.orgList .mui-table-view-cell>a:not(.mui-btn) {
		margin-left: 0;
		padding-left: 0;
	}
	.orgName.mui-table-view-cell:last-child:after, .mui-table-view-cell:last-child:before{
		height: 1px;
		left: .35rem;
	}
	.mui-table-view-cell.mui-active {
	    background: #f5f5f5;
	}
	/*----------*/
	.mui-table-view-cell.child-wrap{
		padding-right: 0;
		a.child-h{
			padding-right: .4rem;
			border-bottom: 1px solid #eee;
			margin-top: .4rem;
			.icon-call-1{
				top: 0;
			}
		}
	}
	.grouping{
		padding-bottom: .4rem;
	    color: #e6242b;
	    font-size: .36rem;
	    font-weight: 700;
	}
	.icon-party{
		color: #E51C23;
		margin-right: .2rem;
	}
	.part-member{
		background: #fff;
    	margin-bottom: .2rem;
    	padding: .3rem .4rem;
    	p{
    		line-height: 2;
    		color: #333;
    		span:first-child{
    			display: inline-block;
    			width: 2.1rem;
    		}
    	}
	}
}
</style>
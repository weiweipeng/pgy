<template>
	<div id="orgMettingList">
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<ul>
					<li v-for="item in scheduleList">
						<router-link :to="{path:'/meetingDetail',query: {article_id: item.mid, flag_type: 1, status: 3}}">
							<i class="iconfont icon-dangjianhuodong_dangyuanzhengwen-"></i>
							<div class="card">
								<span class="title" v-text="item.title"></span>
								<p>
									<span>会议时间：</span>
									<span v-text="item.begin_time"></span>
								</p>
								<p>
									<span>会议地址：</span>
									<span v-text="item.address"></span>
								</p>
							</div>
						</router-link>
					</li>
				</ul>
				
				<div class="load-box">
					<div class="load-type" v-show="resLoad">
						<div class="load-start" v-html="resDataLoad">
										
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
  	name: 'orgMettingList',
  	data: function(){
      	return {
        	loadShow: true,
        	scheduleList: [],
        	page: 1,
        	resLoad: true,
        	resLoadType: true,
        	resType: true,//（发生于滚动条滚动）防止上一次请求未完成，又请求的情况（包括请求多次的情况）
        	resDataLoad: ''
      	}
   	},
   	components: {
	  	loading: loading
	},
   	activated: function(){
   		//vue会缓存组件，造成文章详情只请求一次之后不在重新请求
   		this.scheduleList = [];
   		this.page = 1;
   		this.init();
   	},
   	filters: {  
        fomartTime: function(value) {
        	var year = value.slice(0,4);
        	var month = value.slice(4,6);
            return year + '年' + month + '月';
        }  
    },  
   	mounted: function() {
  		//初始化滚动组件
   		mui('.mui-scroll-wrapper').scroll({deceleration:0.002, bounce: false});
   	},
   	methods: {
   		init: function(){
   			var _this = this,
				load_start = '上拉加载更多数据',
				load_now = '<i class="mui-spinner"></i><span>正在努力加载中</span>',
				load_end = '<span>暂无更多会议</span>';
				
			var data = {
					page: _this.page,
					ouid: _this.$route.query.ouid,
					type: _this.$route.query.type
				}
			
			_this.resLoad = true;
			_this.resType = false;
			_this.resDataLoad = load_now;
		    _this.$api.post('index.php/Home/ApiMy/get_more_org_detail', data, function(res){
		    	console.log(res);
		    	if(res.code == '200'){
		    		setTimeout(function(){
		    			_this.scheduleList.push.apply(_this.scheduleList, res.data);
		    			_this.page ++;
		    			_this.loadShow = false;
		    			_this.listenerScroll();
						if(res.data.length < 10){
							_this.resDataLoad = load_end;
							_this.resLoad = true;
							_this.resLoadType = false;
			    		}else{
			    			_this.resDataLoad = load_start;
			    			_this.resLoadType = true;
			    			_this.resType = true;
			    		} 		    			
		    		})
		    	}else if(res.code == '401'){
		    		_this.resDataLoad = load_end;
		    		_this.loadShow = false;
		    		_this.resLoadType = false;
		    	}else{
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
   		listenerScroll: function(){
			var scroll = mui('.mui-scroll-wrapper').scroll(), _this = this;
			
			document.querySelector('.mui-scroll-wrapper').addEventListener('scroll', function (e){
				//这里判断上一次是否请求完毕或者数据已经加载完成，如果为true，也就是还没有请求完毕，则不继续请求，防止服务出错
				if(_this.resType === false || _this.resLoadType === false){
					return false;
				}
			    var scrollTop = scroll.y;
			    //判断滚动到底部
			    if(scrollTop == scroll.maxScrollY){
			        //上拉加载逻辑代码
			        _this.init();
			    }
			});
		}
   	}
}
</script>
<style lang="scss">
#orgMettingList{
	ul>li{
		position: relative;
		padding: .3rem .5rem .3rem 1.8rem;
		p{
			font-size: .4rem;
			padding-bottom: .1rem;
			span:first-child{
				color: #999;
			}
			span:last-child{
				color: #333;
			}
		}
	}
	.icon-dangjianhuodong_dangyuanzhengwen-{
		position: absolute;
		left: .2rem;
		display: inline-block;
	    color: #fff;
	    font-size: .6rem;
	    background: #fbb55c;
	    height: 1.2rem;
	    width: 1.2rem;
	    text-align: center;
	    line-height: 1.2rem;
	    border-radius: 50%;
	}
	.card{
		background: #fff;
		border-radius: .1rem;
		padding: .3rem;
		>span{
			color: #333;
		}
	}
	.title{
		display: inline-block;
		font-size: .48rem;
		padding-bottom: .15rem;
	}
	
	
}
</style>
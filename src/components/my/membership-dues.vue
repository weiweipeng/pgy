<template>
	<div id="membership-dues">
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<ul>
					<li v-for="item in membershipDuesList">
						<span class="time mui-pull-left">{{item.pay_time|fomartTime}}</span>
						<p class="dues" v-html="payType(item.status)"></p>
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
  	name: 'membership-dues',
  	data: function(){
      	return {
        	loadShow: true,
        	membershipDuesList: [],
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
   		this.membershipDuesList = [];
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
				load_end = '<span>数据已全部加载</span>';
				
			var data = {
					page: _this.page
				}
			
			_this.resLoad = true;
			_this.resType = false;
			_this.resDataLoad = load_now;
		    _this.$api.post('index.php/Home/ApiMy/get_Fee_List', data, function(res){
		    	console.log(res);
		    	if(res.code == '200'){
		    		setTimeout(function(){
		    			_this.membershipDuesList.push.apply(_this.membershipDuesList, res.data);
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
		},
   		payType: function(type){
   			if(type == '1'){
   				return "<span class='havaToPay'>已缴纳党费</span>";
   			}else{
   				return "<span class='noPay'>未缴纳党费</span>";
   			}
   		}
   	}
}
</script>
<style lang="scss">
#membership-dues{
	li{
		background: #fff;
	    height: 1.5rem;
	    line-height: 1.5rem;
	    position: relative;
	    &:after{
	    	position: absolute;
		    right: 0;
		    bottom: 0;
		    left: 0;
		    height: 1px;
		    content: '';
		    -webkit-transform: scaleY(.5);
		    transform: scaleY(.5);
		    background-color: #f2f2f2;
	    }
		.time{
			font-size: 0.4rem;
    		color: #333;
    		margin-left: .4rem;
		}
		.dues{
			font-size: 0.32rem;
		    color: #999;
		    position: absolute;
		    right: .4rem;
		    span.havaToPay{
		    	color: #e51c23;
    			font-size: 0.433rem;
    			margin-left: .1rem;
		    }
		    span.noPay{
		    	color: #999;
    			font-size: 0.433rem;
    			margin-left: .1rem;
		    }
		}
	}
}
</style>
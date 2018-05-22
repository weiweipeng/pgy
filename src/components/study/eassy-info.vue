<template>
	<div id="eassy-info">
		<div class="studyBox">
			<div class="title" v-if="infoData">{{infoData.title}}</div>
			<div class="mui-scroll-wrapper">
				<div class="mui-scroll">
					<p class="content" v-if="infoData" v-html="infoData.content.replace(/\n/g, '<br>')"></p>
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
  	name: 'eassy-info',
  	data: function(){
      	return {
        	infoData: null,
        	loadShow: true
      	}
    },
    components: {
	  	loading: loading
	},
    activated: function(){
    	//初始化滚动组件
    	this.loadShow = true;
   		mui('.mui-scroll-wrapper').scroll({deceleration:0.002});
    	this.getData();
    },
    mounted: function() {
  		
   	},
   	methods: {
   		getData: function(){
   			var _this = this;
   			var data = {
   				essayId: _this.$route.query.essayId
   			}
   			_this.$api.post('index.php/Home/Api/getEssayInfoByEssayId', data, function(res){
		    	console.log(res);
		    	if(res.code === '200'){
		    		_this.loadShow = false;
		    		_this.infoData = res.data;
		    	}else{
		    		_this.loadShow = false;
		    		mui.toast('数据请求失败！');
		    	}
		    		
		    },function(err){
		    	this.loadShow = false;
		    	if(err){
		    		_this.loadShow = false;
		    		mui.toast('数据请求失败！');
		    		console.log(err);
		    	}
		    })
   		}
   	}
}
</script>
<style lang="scss">
#eassy-info{
	.mui-scroll-wrapper{
		top: 3.2rem;
		bottom: 2rem;
	}
	.mui-scrollbar-vertical{
		right: 9%;
	}
	.studyBox{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: url(../../assets/images/activity/bgzwqs@3x.png) no-repeat;
		background-size: 100% 100%;
		text-align: center;
		.title{
			padding-top: 1.5rem;
			width: 80%;
    		margin: 0 auto;
    		font-size: .6rem;
    		font-weight: 700;
    		font-family: cursive;
		}
		.content{
			width: 80%;
    		margin: 0 auto;
			color: #333;
			text-align: left;
			font-size: .46rem;
		}
	}
}
</style>
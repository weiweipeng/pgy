<template>
	<div id="love-donation">
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell mui-media" v-for="item in 15">
						<router-link to="/donationDetail">
							<img class="mui-media-object mui-pull-left lgImg" src="../../assets/images/train/banner2.jpg">
							<div class="mui-media-body">
								<span class="title mui-ellipsis-2">给流动儿童一个温馨的家</span>
								<p class="mui-ellipsis">已筹集：<span>21758</span>积分</p>
							</div>
						</router-link>
						<button class="donation-btn" @click="msgShow = true">我要捐赠</button>
					</li>
				</ul>
			</div>
		</div>
		<div class="msgbg" style="display: none;" v-show="msgShow">
			<div class="msg"><p>捐赠</p>
			<p>目前积分：<span>300</span>积分</p>
			<p>可捐赠积分：<span>300</span>积分</p>
			<input type="number" placeholder="请输入您要捐赠的积分" id="integral">
			<button>确认捐赠</button></div>
			<i class="iconfont icon-cha "  @click="msgShow = false"></i>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
  	name: 'love-donation',
  	data: function(){
      	return {
        	msgShow: false
      	}
   	},
   	mounted: function() {
   		//滚动组件
   		mui('.mui-scroll-wrapper').scroll({deceleration:0.002});
   	},
   	methods: {
   		
   	}
}
</script>
<style lang="scss">
#love-donation{
	.donation-btn{
		position: absolute;
	    right: .4rem;
	    bottom: .3rem;
	    font-size: .28rem;
	    padding: .05rem .2rem;
	    border-color: #e51c23;
	    color: #e51c23;
	    border-radius: .05rem;
	}
	.msgbg{
		width: 100%;
		height: 100%;
		background-color:rgba(0,0,0,.36);
		position: fixed;
		top:0px;
		z-index: 11;
	}
	.msg{
		height:auto;
		width:7.06rem;
		height: 6.73rem;
		background-color:#fff;
		border-radius: 5px;	
		margin: auto;
		padding-bottom: 1rem;
		position: absolute;
	    top: 45%;
	    left: 50%;
	    -webkit-transform: translate3d(-50%,-50%,0);
	    transform: translate3d(-50%,-50%,0);
		box-sizing: border-box;		
	}
	.msg p{
		display: block;
		text-align: center;
	}
	.msg p span{
		color: #E51C23;
	}
	.msg p:nth-of-type(1){
			color:#333;
			font-size:0.48rem;
			border-bottom: 1px solid #ccc;
			height: 1.2rem;
			line-height: 1.2rem;
	}
	.msg p:nth-of-type(2){
		margin-top:0.56rem;
	}
	.msg p:nth-of-type(3){
		margin-top:0.2rem;
	}
	.msg p:nth-of-type(2),.msg p:nth-of-type(3){
		font-size: 0.4rem;
		color: #333333;
	}
	.msg input{
		width: 6.26rem;
		height: 1.1rem;
		display: block;
		margin: 0 auto;
		border:1px solid #ccc;
		margin-top:0.8rem;
		font-size: .4rem;
	}
	
	.msg button{
		display: block;
		width: 6.26rem;
		height: 1.1rem;
		line-height: 1.1rem;
		font-size: 0.373rem;
		color: #fff;
		background-color: #E51C23;
		padding: 0;
		outline: none;
		border:0;
		margin:0 auto;
		margin-top:0.5rem;
	}
	.icon-cha{
		position: fixed;
	    top: 70%;
	    margin-left: 50%;
	    transform: translate(-50%);
	    -webkit-transform: translate(-50%);
	    color: #fff;
	    font-size: 1rem;
	}
}

</style>
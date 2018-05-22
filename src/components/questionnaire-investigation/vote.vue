<template>
	<div id="vote">
		<div class="mui-content">
			<div id="slider" class="mui-slider mui-fullscreen">
				<div id="sliderSegmentedControl" class="bg-white mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<a class="mui-control-item mui-active" href="#item1mobile">支部</a>
					<a class="mui-control-item" href="#item2mobile">个人</a>
				</div>
				<div class="mui-slider-group">
					<div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
						<div id="scroll1" class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<ul class="mui-clearfix">
									<li v-for="(item, index) in 10">
										<div class="img-box">
											<img src="../../assets/images/my/avatar@3x.png" alt="" />
										</div>
										<span>教务部党支部</span>
										<button>投票</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div id="item2mobile" class="mui-slider-item mui-control-content">
						<div class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<ul class="mui-clearfix">
									<li v-for="(item, index) in 10">
										<div class="img-box">
											<img src="../../assets/images/my/header1.png" alt="" />
										</div>
										<span>陈孝成</span>
										<button>投票</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
export default {
  	name: 'vote',
  	data: function(){
      	return {
        	
      	};
   	},
  	mounted: function() {
  		//初始化轮播组件和滚动组件
		mui("#slider").slider();
   		mui('.mui-scroll-wrapper').scroll({deceleration:0.002});
   	},
   	methods: {
   		
   	}
}
</script>
<style lang="scss">
#vote{
	.mui-scroll{
		ul{
			background: #fff;
			li{
				float: left;
    			width: 100%;
    			position: relative;
				.img-box{
					padding: .4rem;
				    width: 22vw;
				    float: left;
				    position: relative;
					img{
						width: 1.386rem;
	    				height: 1.386rem;
						border-radius: 50%;
						border: .05rem solid #fed120;
						vertical-align: middle;
					}
				}
				span{
					font-size: 0.426rem;
					line-height: 2.05rem;
				}
				button{
					background-color: #e51c23;
					border: none;
					color: #fff;
				    border-radius: .8rem;
				    padding: .1rem .5rem;
				    font-size: .32rem;
				    position: absolute;
				    right: .5rem;
				    top: 50%;
				    -webkit-transform: translateY(-50%);
				    transform: translateY(-50%);
				}
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
				
			}
		}
	}
}	
</style>
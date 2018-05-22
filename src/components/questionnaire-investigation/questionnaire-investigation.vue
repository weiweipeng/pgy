<template>
	<div id="questionnaire-investigation">
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
										<div class="img-box" :attr-rankNum='index + 1'>
											<img src="../../assets/images/my/avatar@3x.png" alt="" />
										</div>
										<span>教务部党支部</span>
										<span>45票</span>
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
										<div class="img-box" :attr-rankNum='index + 1'>
											<img src="../../assets/images/my/header1.png" alt="" />
										</div>
										<span>陈孝成</span>
										<span>45票</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="btnBox">
			<router-link to="/vote">
				<button class="submit-btn">我要投票</button>
			</router-link>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
export default {
  	name: 'questionnaire-investigation',
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
#questionnaire-investigation{
	.mui-fullscreen{
		bottom: 1.6rem;
	}
	.mui-scroll{
		ul{
			background: #fff;
			li{
				float: left;
    			width: 100%;
    			position: relative;
				.img-box{
					padding: .4rem 0 .4rem 1.2rem;
				    width: 32vw;
				    float: left;
				    position: relative;
					img{
						width: 1.25rem;
	    				height: 1.25rem;
						border-radius: 50%;
						border: .05rem solid #fed120;
						vertical-align: middle;
					}
					&:after{
						position: absolute;
						content: attr(attr-rankNum);
						color: #666;
						border-radius: 50%;
						left: .5rem;
						top: 50%;
						font-size: 0.4rem;
						transform: translateY(-50%);
						-webkit-transform: translateY(-50%);
					}
				}
				span{
					font-size: 0.426rem;
					line-height: 2.05rem;
					&:last-child{
    					color: #e51c23;
    					float: right;
    					margin-right: .5rem;
					}
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
				&:first-child{
					position: absolute;
					width: 33.333%;
					left: 50%;
					transform: translateX(-50%);
					-webkit-transform: translateX(-50%);
					text-align: center;
					padding-bottom: .4rem;
					.img-box{
						position: relative;
						margin: .5rem 0;
						padding: 0;
						width: 100%;
						img{
							width: 2.24rem;
	    					height: 2.24rem;
	    					border: .1rem solid #fed120;
						}
						&:after{
							position: absolute;
							bottom: -.28rem;
							left: 50%;
							color: #fff;
							transform: translateX(-50%);
							-webkit-transform: translateX(-50%);
							width: .66rem;
							height: .66rem;
							background: #ffde5e;
							line-height: .66rem;
							font-size: .4rem;
							font-weight: 700;
							top: auto;
						}
					}
					span{
						display: block;
						line-height: 1.5;
						font-size: .4rem;
						&:last-child{
							font-size: 0.32rem;
	    					color: #e51c23;
	    					float: initial;
    						margin-right: 0;
						}
					}
				}
				&:nth-child(2){
					width: 33.333%;
					float: left;
					text-align: center;
					padding-bottom: .4rem;
					.img-box{
						position: relative;
						margin-bottom: .3rem;
						margin: .78rem 0;
						padding: 0;
						width: 100%;
						img{
							width: 1.68rem;
							height: 1.68rem;
							border: .1rem solid #ccc;
						}
						&:after{
							position: absolute;
							bottom: -.18rem;
							left: 50%;
							color: #fff;
							transform: translateX(-50%);
							-webkit-transform: translateX(-50%);
							width: .56rem;
							height: .56rem;
							background: #cbcfd0;
							line-height: .56rem;
							font-size: .34rem;
							font-weight: 700;
							top: auto;
						}
					}
					span{
						display: block;
						line-height: 1.5;
						font-size: .4rem;
						&:last-child{
							font-size: 0.32rem;
	    					color: #e51c23;
	    					float: initial;
    						margin-right: 0;
						}
					}
				}
				&:nth-child(3){
					width: 33.333%;
					float: right;
					text-align: center;
					padding-bottom: .4rem;
					.img-box{
						position: relative;
						margin-bottom: .3rem;
						margin: .78rem 0;
						padding: 0;
						width: 100%;
						img{
							width: 1.68rem;
							height: 1.68rem;
							border: .1rem solid #f98028;
						}
						&:after{
							position: absolute;
							bottom: -.18rem;
							left: 50%;
							color: #fff;
							transform: translateX(-50%);
							-webkit-transform: translateX(-50%);
							width: .56rem;
							height: .56rem;
							background: #f98028;
							line-height: .56rem;
							font-size: .34rem;
							font-weight: 700;
							top: auto;
						}
					}
					span{
						display: block;
						line-height: 1.5;
						font-size: .4rem;
						&:last-child{
							font-size: 0.32rem;
	    					color: #e51c23;
	    					float: initial;
    						margin-right: 0;
						}
					}
				}
				&:nth-child(4){
    				border-top: .15rem solid #f5f5f5;
				}
			}
		}
	}
}	
</style>
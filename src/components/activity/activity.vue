<template>
	<div id="activity">
		<!--banner-->
		<div class="banner">
			<img src="../../assets/images/train/hot-pic3.jpg"/>
		</div>
		<!--模块列表-->
		<div class="bg_white">
		    <ul class="modularList mui-row">
		        <!--<li class="mui-col-xs-6 borderR">
		            <router-link to="/threeM_oneC">
		            	<i class="iconfont icon-shouye_sanhuiyike"></i>
		            	<span class="iconSpan">三会一课</span>
		            </router-link>
		        </li>-->
		        <li class="mui-col-xs-6 borderR">
		            <router-link :to="{path:'/mienList',query: {category_id: 548}}">
		                <i class="iconfont icon-index_jhzj-"></i>
		            	<span class="iconSpan">计划总结</span>
		            </router-link>
		        </li>
		        <li class="mui-col-xs-6" @click="noAuthority">
		        	<a>
		               	<i class="iconfont icon-index_zbsh-"></i>
		            	<span class="iconSpan">支部任务</span>
		            </a>
		        </li>
		        <li class="mui-col-xs-6 borderR">
		        	<router-link :to="{path:'/mienList',query: {category_id: 542}}">
		            	<i class="iconfont icon-shouye_sanhuiyike"></i>
		            	<span class="iconSpan">党风廉政</span>
		            </router-link>
		        </li>
		        <li class="mui-col-xs-6">
		          	<router-link :to="{path:'/mienList',query: {category_id: 543}}">
		            	<i class="iconfont icon-shouye_zhibushenghuo"></i>
		            	<span class="iconSpan">支部生活</span>
		            </router-link>
		        </li>
		        <li class="mui-col-xs-6 borderR">
		            <router-link :to="{path:'/mienList',query: {category_id: 544}}">
		            	<i class="iconfont icon-shouye_minzhushenghuo"></i>
		            	<span class="iconSpan">党员风采</span>
		            </router-link>
		        </li>
		        <li class="mui-col-xs-6">
		            <router-link :to="{path:'/mienList',query: {category_id: 545}}">
		            	<i class="iconfont icon-liebiaodaohang_gongyi"></i>
		            	<span class="iconSpan">公益活动</span>
		            </router-link>
		        </li>
		        <!--<li class="mui-col-xs-6 borderR">
		        	<router-link to="/publicWelfare">
		                <i class="iconfont icon-dangzhiyuanzhefuwu"></i>
		            	<span class="iconSpan">公益活动</span>
		            </router-link>
		        </li>
		        <li class="mui-col-xs-6">
		            <router-link to="/loveDonation">
		                <i class="iconfont icon-aixin"></i>
		            	<span class="iconSpan">爱心捐赠</span>
		            </router-link>
		        </li>-->
		        <li class="mui-col-xs-6 borderR">
		            <router-link :to="{path:'/mienList',query: {category_id: 546}}">
		                <i class="iconfont icon-shouye_dangyuanzhengwen"></i>
		            	<span class="iconSpan">调查问卷</span>
		            </router-link>
		        </li>
		        <li class="mui-col-xs-6">
		            <router-link :to="{path:'/mienList',query: {category_id: 547}}">
		               	<i class="iconfont icon-fabuwenzhang"></i>
		            	<span class="iconSpan">征文活动</span>
		            </router-link>
		        </li>
		        
			 </ul>    
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
export default {
  	name: 'activity',
  	data: function() {
      	return {
        	
      	};
    },
    methods: {
    	noAuthority: function(){
    		mui.alert('您无权限，暂时无法访问');
    	}
    }
}
</script>
<style lang="scss">
#activity{
	.banner{
        height: 5.13rem;
        width: 100%;
        img{
            width: 100%;
            height: 100%;
        }
    }
    /*模块列表*/
   	.borderR {
	    border-right: 1px solid #f2f2f2;
	}
	.modularList {
		margin-bottom: 1.3rem;
		li{
			border-bottom: 1px solid #f2f2f2;
			a{
				display: block;
				height: 2rem;
				text-align: center;
				line-height: 2rem;
				color: #E51C23;
				.iconfont{
					font-size: .48rem;
					margin-right: .2rem;
				}
				.iconSpan{
					font-size: .38rem;
					color: #333;
				}
			}
		}
			
	}
   
}
</style>
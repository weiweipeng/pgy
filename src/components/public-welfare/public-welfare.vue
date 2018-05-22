<template>
	<div id="public-welfare">
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell mui-media" v-for="item in 15">
						<router-link to="/articleDetail">
							<img class="mui-media-object mui-pull-left lgImg" src="../../assets/images/train/banner2.jpg">
							<div class="mui-media-body">
								<span class="title mui-ellipsis-2">给流动儿童一个温馨的家</span>
								<p>
									<span>上海红十字会</span>
									<span class="mui-pull-right">2017-12-31</span>
								</p>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
  	name: 'public-welfare',
  	data: function(){
      	return {
        	
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
  /*@import "star.scss";*/
</style>
<template>
	<div id="submission">
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<form class="mui-input-group">
					<div class="mui-input-row mui-row">
						<input id="contact" type="text" class="contact mui-col-sm-10 mui-col-xs-10" placeholder="请编辑您的标题..." v-model="numOfWords"/>
						<span id="numOfWords" class="mui-badge mui-col-sm-2 mui-col-xs-2" :class="num <= 50 ? 'mui-badge-success' : 'mui-badge-danger'">{{num}}/50</span>
					</div>
				</form>
				
				<!--<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						<a class="mui-navigate-right" @click="picker">
							<span>征文类型</span>
							<span class="submissionType mui-pull-right"></span>
						</a>
					</li>
				</ul>-->
				
				<div class="textbox">
					<!--征文详情-->
					<textarea placeholder="正文..." name="content" v-model="content"></textarea>
				</div>
				
				<tinyImg :resImg="resImg" @load="onLoading"></tinyImg>
				
				<h5 class="tip">Tip：图片最多可上传9张</h5>
				
			</div>	
		</div>
		
		<div class="btnBox">
			<button class="submit-btn" @click="sendRes">提交</button>
		</div>
		
		<!--loading-->
		<loading v-show="loadShow"></loading>
	</div>
</template>

<script type="text/ecmascript-6">
import tinyImg from '../tiny-img/tiny-img.vue'
import loading from '../loading/loading.vue'
export default {
  	name: 'submission',
  	data: function(){
      	return {
        	numOfWords: '',
        	num: 0,
        	content: '',
        	resImg: {
        		imgList: []
        	},
        	loadShow: false
      	}
    },
    components: {
	  	tinyImg: tinyImg,
	  	loading: loading
	},
	activated: function(){
		this.resImg = {
			imgList: []
		}
		this.numOfWords = '';
		this.content = '';
	},
    mounted: function() {
    	//初始化滚动组件
   		mui('.mui-scroll-wrapper').scroll({deceleration:0.002});
   		
   	},
   	watch: {
   		numOfWords: function(curVal, oldVal){
   			var that = this;
   			var length = curVal.length;
   			that.num = length;
   		}
   	},
   	methods: {
   		onLoading: function(){
   			this.loadShow = !this.loadShow;
   		},
   		sendRes: function(){
   			var _this = this;
   			var data = {
   				essayId: _this.$route.query.essayId,
   				title: _this.numOfWords,
   				content: _this.content,
   				imgList: _this.resImg.imgList
   			}
   			if(data.title === ''){
   				mui.alert('请填写标题！');
   			}else if(_this.num > 50){
   				mui.alert('您的标题不能超过50个字哦！');
   			}else if(data.content === ''){
   				mui.alert('请填写内容！');
   			}else{
   				_this.loadShow = true;	
   				_this.$api.post('index.php/Home/Api/publishEssayInfo', data, function(res){
			    	console.log(res);
			    	if(res.code == '200'){
			    		var btnArray = ['继续发布', '返回列表'];
						mui.alert('点击确定返回列表', '发布成功', function() {
							_this.$router.back(-1);
							_this.numOfWords = '';
							_this.content = '';
							_this.resImg.imgList = [];
						});
			    	}else if(res.code == '300'){
			    		var btnArray = ['继续发布', '返回列表'];
						mui.alert('点击确定返回列表', '发布成功,已提交后台审核', function() {
							_this.$router.back(-1);
							_this.numOfWords = '';
							_this.content = '';
							_this.resImg.imgList = [];
						});
			    	}else if(res.code == '0'){
			    		mui.toast('提交失败，请稍后再试！');
			    	}else{
			    		return false;
			    	}
					_this.loadShow = false;
					
			    },function(err){
			    	if(err){
			    		mui.toast('提交失败，请稍后再试！');
			    	}
			    })
   			}
   			
   		},
   		picker: function(){
     		//var _this = ele.currentTarget;
			var picker = new mui.PopPicker();
   			picker.setData([
   				{value:'1',text:'理论研究'},
   				{value:'2',text:'观点研讨'},
   				{value:'3',text:'评论'},
   				{value:'4',text:'杂文'},
   				{value:'5',text:'经验交流'},
   				{value:'6',text:'通讯'},
   				{value:'7',text:'散文'},
   				{value:'8',text:'其他'}
   			]);
			picker.show(function(e) {
			    document.getElementsByClassName('submissionType')[0].innerHTML = e[0].text;
			});
   		}
   	}
}
</script>
<style lang="scss">
#submission{
	.mui-input-group .mui-input-row{
		height: auto;
	}
	.mui-scroll-wrapper{
		bottom: 1.6rem;
	}
	input{
		height: 1.2rem;
	    line-height: 1.2rem;
	    font-size: .4rem;
	}
	.mui-input-group{
		margin-top: .3rem;
	}
	.mui-col-sm-10.mui-col-xs-10{
		width: 83.33333333% !important;
	}
	#numOfWords{
		margin: .34rem 2%;
    	width: 12.66666667%;
	    font-size: .32rem;
	    padding: .1rem .2rem;
	    text-align: center;
	    display: block;
	}
	.mui-table-view{
		margin-top: .3rem;
		span.mui-pull-right{
			padding-right: .5rem;
			color: #999;
		}
	}
	.textbox{
		height: 50vh;
		margin-top: .3rem;
		textarea{
			width: 100%;
		    height: 100%;
		    border: 0px;
		    font-size: 0.4rem;
		    resize: none;
		    outline: none;
		    padding: .5rem;
		}
	}
	.tip{
		padding: .3rem;
		color: #fa6065;
	}
}
</style>
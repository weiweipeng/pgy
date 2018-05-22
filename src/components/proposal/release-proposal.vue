<template>
	<div id="release-proposal">
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<form class="mui-input-group">
					<div class="mui-input-row mui-row">
						<input id="contact" type="text" class="contact mui-col-sm-10 mui-col-xs-10" placeholder="请编辑您的标题..." v-model="numOfWords"/>
						<span id="numOfWords" class="mui-badge mui-col-sm-2 mui-col-xs-2" :class="num <= 50 ? 'mui-badge-success' : 'mui-badge-danger'">{{num}}/50</span>
					</div>
				</form>
				<div class="textbox">
					<textarea placeholder="请填写您的建言..." name="content" v-model="content"></textarea>
				</div>
				
				<tinyImg :resImg="resImg" @load="onLoading"></tinyImg>
				
				<h5 class="tip">Tip：图片最多可上传9张</h5>
				
				<div class="lineBox" @click="searchFun">
					<p class="mui-navigate-right">
						<i>@</i>提醒谁看
					</p>
					<p class="checkName" v-show="checkRemind.length != 0">
						<span>（</span>
						<span v-for="(remind, index) in checkRemind" v-text="(index + 1) === checkRemind.length ? remind.name : remind.name + '、'"></span>
						<span>）</span>
					</p>
				</div>
			</div>
		</div>
		<div class="btnBox">
			<button class="submit-btn" @click="sendRes">发布</button>
		</div>
		
		<div class="memberBoxBg" @click="remindShow = false" v-show="remindShow"></div>
		<div class="memberBox" :class="{'active': remindShow}">
			<div class="loading" v-show="loadIconShow"><i class="mui-spinner"></i></div>
			<div class="memberList">
				<div class="mui-scroll-wrapper" id="scroll2">
					<div class="mui-scroll">
						<input type="text" placeholder="输入您要搜索的人名..." v-model='search' class="search"/>
						<div class="mui-indexed-list-empty-alert" v-show="noMember">没有该用户</div>
						<form class="mui-input-group" v-for="remind in searchData">
							<p class="orgTitle" v-text="remind.name"></p>
							<div class="mui-input-row mui-checkbox mui-left" v-for="member in remind.memberList">
								<img :src="member.header_img != '' ? img_URL + member.header_img : img_URL + 'Public/images/header1.png'" />
								<span v-text="member.name"></span>
								<input name="checkbox" :value="member" type="checkbox" v-model="checkRemind">
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
			
		
		<!--loading-->
		<loading v-show="loadShow"></loading>
	</div>
</template>

<script type="text/ecmascript-6">
import store from '@/vuex/store'
import tinyImg from '../tiny-img/tiny-img.vue'
import loading from '../loading/loading.vue'

export default {
  	name: 'release-proposal',
  	data: function(){
      	return {
        	numOfWords: '',
        	num: 0,
        	content: '',
        	checkRemind: [],
        	resImg: {
        		imgList: []
        	},
        	loadShow: false,
        	remindShow: false,
        	remindList: [],
        	loadIconShow: true,
        	img_URL: 'http://dj.celap.cn/pgy/',
        	search: '',
        	searchData: [],
        	noMember: false
      	}
   	},
   	store,
   	components: {
	  	tinyImg: tinyImg,
	  	loading: loading
	},
   	watch: {
   		search: function(){
    		this.searchFun();
    	},
   		numOfWords: function(curVal, oldVal){
   			var length = curVal.length;
   			this.num = length;
   		}
   	},
   	activated: function(){
   		
   	},
   	mounted: function() {
        //初始化滚动组件
   		mui('.mui-scroll-wrapper').scroll({deceleration:0.002});
	},
   	methods: {
   		onLoading: function(){
   			this.loadShow = !this.loadShow;
   		},
   		sendRes: function(){
   			var _this = this;
   			var newCheckRemind = '';
   			_this.checkRemind.forEach(function(data, index){
   				if((index + 1) === _this.checkRemind.length){
   					newCheckRemind += data.ouid;
   				}else{
   					newCheckRemind += data.ouid + ',';
   				}
   					
   			})
   			var data = {
   				title: _this.numOfWords,
   				content: _this.content,
   				imgList: _this.resImg.imgList,
   				memberList: newCheckRemind
   			}
   			if(data.title === ''){
   				mui.alert('请填写标题！');
   			}else if(_this.num > 50){
   				mui.alert('您的标题不能超过50个字哦！');
   			}else if(data.content === ''){
   				mui.alert('请填写内容！');
   			}else{
   				_this.loadShow = true;	
   				_this.$api.post('index.php/Home/Api/publishPublicSuggest', data, function(res){
			    	console.log(res);
			    	if(res.code == "200"){
			    		var btnArray = ['继续发布', '返回列表'];
						mui.alert('点击确定返回列表', '发布成功', function() {
							//用vuex 告诉父页面 发布成功，刷新一下页面
							store.commit('submitProposalSuccess');
							_this.$router.back(-1);
							_this.numOfWords = '';
							_this.content = '';
							_this.resImg.imgList = [];
							_this.checkRemind = [];
						});
			    		
			    	}else if(res.code == "300"){
			    		var btnArray = ['继续发布', '返回列表'];
						mui.alert('点击确定返回列表', '发布成功，后台审核中...', function() {
							_this.$router.back(-1);
							_this.numOfWords = '';
							_this.content = '';
							_this.resImg.imgList = [];
						});
			    	}else{
			    		mui.alert('提交失败，请稍后再试！');
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
   		searchFun: function(){
   			var _this = this, search = _this.search, searchData = [];
   			_this.remindShow = true;
   			
   			console.log(search);
			if (search) {
		        _this.remindList.forEach(function(json,index,arr){
		        	var data = json.memberList;
		        	if(data){
		        		data.forEach(function(item,index,arr1){
			        		var newData = {
			        			memberList: []
			        		}
			        		if(String(item.name).toLowerCase().indexOf(search) > -1){
				        		newData.memberList.push(item);
				        		searchData.push(newData);
				        	}
			        	})
		        	}
			        	
		        })
		        if(searchData.length === 0){
		        	_this.noMember = true;
		        	_this.searchData = [];
		        }else{
		        	//重新定义滚动条
		        	_this.noMember = false;
		        	mui('#scroll2').scroll().scrollTo(0, 0);
		        	_this.searchData = searchData;
		        }
		    }else{
		    	_this.noMember = false;
		    	_this.resRemindList();
		    }
   		},
   		resRemindList: function(){
   			var _this = this;
   			
   			if(_this.remindList.length != 0){
   				_this.searchData = _this.remindList;
   				return false;
   			}
   			if(_this.remindList.length === 0){
   				_this.$api.get('index.php/Home/Api/getUserList', null, function(res){
			    	console.log(res);
			    	if(res.code == "200"){
			    		_this.remindList = res.data;
			    		_this.searchData = res.data;
			    		
			    		_this.loadIconShow = false;
			    	}else if(res.code == "101"){
			    		mui.alert('暂无联系人列表！');
			    	}else if(res.code == "100"){
			    		mui.alert('您还没有实名认证哦！');
			    	}else{
			    		mui.alert('数据列表请求失败，请稍后再试！');
			    		return false;
			    	}
			    },function(err){
			    	if(err){
			    		mui.alert('数据列表请求失败，请稍后再试！');
			    	}
			    })
   			}
	   			
   		}
   	}
}
</script>
<style lang="scss">
#release-proposal{
	.memberList{
		.mui-scroll-wrapper{
			bottom: 0;
		}
	}
	.mui-scroll-wrapper{
		bottom: 1.6rem;
	}
	.mui-input-group .mui-input-row{
		height: auto;
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
	.textbox{
		height: 40vh;
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
	.lineBox{
		position: relative;
	    line-height: 1.5;
	    background: #fff;
	    padding: .3rem .4rem;
	    margin-bottom: 1rem;
	    p{
	    	color: #333;
	    }
	    i{
	    	color: #999;
	    	padding-right: .4rem;
	    }
	    span{
	    	color: #999;
	    }
	}
	.checkName{
		padding-right: .3rem;
	}
	.memberBox{
		position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    z-index: 2;
	    -webkit-transition-duration: 400ms;
    	transition-duration: 400ms;
	    -webkit-transform: translate3d(100vw,0,0);
    	transform: translate3d(100vw,0,0);
    	&.active{
    		-webkit-transform: translate3d(30vw,0,0);
    		transform: translate3d(30vw,0,0);
    	}
    	.loading{
	    	position: absolute;
		    top: 50%;
		    left: 35vw;
		    z-index: 3;
		    -webkit-transform: translate3d(-50%, -50%, 0);
		    transform: translate3d(-50%, -50%, 0);
	    }
	}
	.memberBoxBg{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		z-index: 2;
		background: rgba(0,0,0,.4);
	}
	.memberList{
		position: absolute;
		top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    background: #fff;
	    
	    .mui-input-group .mui-input-row:after{
	    	left: .2rem;
	    }
	    .mui-checkbox input[type=checkbox]:checked:before, .mui-radio input[type=radio]:checked:before{
	    	color: #E51C23;
	    }
	    .mui-input-group{
	    	margin-top: 0;
	    	.mui-input-row{
	    		padding: .2rem 0;
	    	}
	    }
	    .orgTitle{
	    	color: #999;
		    padding: .2rem .3rem;
		    font-size: .36rem;
		    background: #f2f2f2;
		    width: 70%;
	    }
	    input[type="checkbox"]{
	    	top: 50%;
		    -webkit-transform: translate3d(-50%,-50%,0);
		    transform: translate3d(-50%,-50%,0);
	    }
	    img{
	    	width: 1.2rem;
		    height: 1.2rem;
		    margin: 0 .3rem 0 1.5rem;
		    vertical-align: text-bottom;
	    }
	    span{
	    	display: inline-block;
	    	height: 1.2rem;
		    line-height: 1.2rem;
		    vertical-align: text-bottom;
		    font-size: .4rem;
	    }
	    .search{
	    	margin: 0;
	    	border: none;
	    	border-radius: 0;
    		border-bottom: 1px solid #eee;
	    }
	}
	.mui-indexed-list-inner.empty .mui-indexed-list-empty-alert {
		display: block;
	}
	.mui-indexed-list-empty-alert {
		padding: 30px 15px !important;
		text-align: center;
		color: #ccc;
		font-size: 1rem;
		font-size: .7rem;
    	width: 70%;
	}
	.mui-indexed-list-group {
		padding-right: 1.1rem;
	}
	.mui-ios .mui-indexed-list-group,
	.mui-ios .mui-indexed-list-empty-alert {
		padding-right: 1.3rem;
	}
}
</style>
<template>
	<div id="my-information">
		<ul class="mui-table-view mui-table-view-chevron">
			<li class="mui-table-view-cell mui-media">
				<a class="mui-navigate-right">
					<img class="mui-media-object mui-pull-left head-img" id="head-img" :src="resImg">
					<input type="file" name="files" id="img-file-input" >
				</a>
			</li>
			<li class="mui-table-view-cell">
				<a class="mui-navigate-right" @click="changePhonePopShow = true">
					<span>电话号码</span>
					<span class="mui-pull-right" v-text="pohone"></span>
				</a>
			</li>
			<li class="mui-table-view-cell">
				<a>
					<span>姓名</span>
					<span class="mui-pull-right" v-text="userInfo.name"></span>
				</a>
			</li>
			<li class="mui-table-view-cell">
				<a>
					<span>所属组织</span>
					<span class="mui-pull-right" v-text="userInfo.fullname"></span>
				</a>
			</li>
			<!--<li class="mui-table-view-cell">
				<a>
					<span>出生日期</span>
					<span class="mui-pull-right" v-text="userInfo.birthday"></span>
				</a>
			</li>-->
			<li class="mui-table-view-cell">
				<a>
					<span>入党日期</span>
					<span class="mui-pull-right" v-text="userInfo.entry_date"></span>
				</a>
			</li>
			
		</ul>
		<ul class="mui-table-view mui-table-view-chevron mt015">
			<li class="mui-table-view-cell">
				<a>
					<span>荣誉称号：</span>
					<div class="honor mt015" v-html="userInfo.honor.replace(/\n/g, '<br>')"></div>
				</a>
			</li>
		</ul>
		
		<transition name="fade">
			<div class="popover-box" v-show="changePhonePopShow" transition="fade">
				<div class="msg-popover">
					<p class="msg-title">修改电话号码</p>
					<span class="mui-icon mui-icon-closeempty" @click="changePhonePopShow = false"></span>
						<div class="input-box mui-row">
							<input class="mui-col-sm-8 mui-col-xs-8" type="number" placeholder="请输入手机号码" v-model="tel">
							<button class="mui-pull-right mui-col-sm-4 mui-col-xs-4 sendCode" @click="countDown" v-text="countDownText"></button>
						</div>
						<div class="input-box">
							<input type="number" placeholder="请输入验证码" v-model="code">
						</div>
					<button class="submit-btn" @click="changePhone">提交修改</button>
				</div>
			</div>
		</transition>
		
		<!--头像裁剪-->
		<div ontouchstart="" class="photoClip" v-show="photoClipShow">
			<div id="clipArea"></div>
			<button id="cancel" @click="photoClipShow = false">取消</button>
			<button id="clipBtn">完成</button>
			<div id="view"></div>
		</div>
		<!--loading-->
		<loading v-show="loadShow"></loading>
	</div>
</template>
<script type="text/ecmascript-6">
import loading from '../loading/loading.vue'
export default {
  	name: 'my-information',
  	data:function() {
      	return {
      		userInfo: {},
      		resImg: '',
      		loadShow: true,
      		img_URL: 'http://dj.celap.cn/pgy/',
      		changePhonePopShow: false,
      		pohone: '',
      		tel: '',
      		code: '',
        	countDownText: '发送验证码',
        	photoClipShow: false
      	};
    },
    components: {
	  	loading: loading
	},
    activated: function(){
   		//vue会缓存组件，造成文章详情只请求一次之后不在重新请求
   		this.loadShow = true;
   		this.userInfo = {};
   		this.init();
   	},
    mounted: function() {
  		this.photoClip();
   	},
   	methods: {
   		init: function(){
   			var _this = this;
		    _this.$api.get('index.php/Home/ApiMy/get_User_Info', null, function(res){
		    	console.log(res);
		    	if(res.code == "200"){
		    		_this.userInfo = res.data;
		    		_this.resImg = _this.img_URL + res.data.header_img;
		    		_this.pohone = res.data.pohone;
		    	}else{
		    		return false;
		    	}
		    	_this.loadShow = false;
		    },function(err){
		    	if(err){
		    		_this.loadShow = false;
		    		console.log(err);
		    	}
		    })
		},
   		readFile: function(evt){
   			var _this = this, file = evt.target.files[0], fileType = file.type;
   			_this.loadShow = true;
          	if(!/image\/\w+/.test(fileType)){
              	mui.alert("文件必须为图片！");
              	return false;
          	}
          	
          	var reader = new FileReader();
          		reader.onload = function(){
          			var newImageData = '', sendData = '';
          			let cvs = document.createElement('canvas');
					let ctx = cvs.getContext('2d');
					let img = new window.Image();
					img.src = this.result;
					img.onload = function(){
					    cvs.width = img.width;
					    cvs.height = img.height;
					    ctx.fillStyle = "#fff";
					    ctx.fillRect(0, 0, cvs.width, cvs.height);   
        				ctx.drawImage(img, 0, 0);
        				//压缩质量
					    newImageData = cvs.toDataURL('image/jpeg', 0.3);
					    sendData = newImageData.replace("data:image/png;base64,",'');
//					    _this.photoClip(sendData);
					}
          		}
          	reader.readAsDataURL(file);
   		},
   		photoClip: function(){
   			var _this = this;
   			_this.loadShow = true;
   			var clipArea = new bjj.PhotoClip("#clipArea", {
				size: [260, 260],
				outputSize: [640, 640],
				file: "#img-file-input",
				view: "#view",
				ok: "#clipBtn",
				loadStart: function() {
					console.log("照片读取中");
				},
				loadComplete: function() {
					console.log("照片读取完成");
					_this.photoClipShow = true;
				},
				clipFinish: function(dataURL) {
					_this.uploadImg(dataURL);
				}
			});
   		},
   		uploadImg: function(imgBase){
   			var _this = this;
   			var data = {
   				headerImg: imgBase
   			}
		    _this.$api.post('index.php/Home/ApiMy/update_Headimg', data, function(res){
		    	console.log(res);
		    	if(res.code == "200"){
		    		_this.resImg = imgBase;
		    		_this.loadShow = false;
		    		_this.photoClipShow = false;
		    		mui.alert('头像修改成功！');
		    	}else{
		    		_this.loadShow = false;
		    		_this.photoClipShow = false;
		    		mui.alert('头像修改失败！');
		    		return false;
		    	}
		    },function(err){
		    	if(err){
		    		_this.loadShow = false;
		    		_this.photoClipShow = false;
		    		mui.alert('头像修改失败！');
		    		console.log(err);
		    	}
		    })
   		},
   		countDown: function(){
   			var _this = this;
   			if(_this.countDownText != 0 && _this.countDownText != '发送验证码'){
   				return false;
   			}else{
   				_this.sendCode();
   			}
   		},
   		sendCode: function(){
   			var _this = this;
   			var tel = _this.tel;
   			
   			if(tel == ''){
				mui.toast('请输入您的手机号！');
				return false;
			}else if(!(/^1[3|4|5|7|8][0-9]{9}$/.test(tel))){
				mui.toast('请输入正确的手机号！');
				return false;
			}else{
				var num = 60;
				_this.countDownText = num + ' S';
				var timer = setInterval(function(){
	   				if(num === 0){
		   				_this.countDownText = '发送验证码';
		   				window.clearInterval(timer);
		   			}else{
			   			num--;
			   			_this.countDownText = num + ' S';
		   			}
	   			},1000)
				
				var data = {
					memberPhone: tel,
					type: '1'
				}
			    _this.$api.post('index.php/Home/Sendphone/bindMemberSendPhoneCode', data, function(res){
			    	console.log(res);
			    	if(res.code == 200){
			    		mui.toast('验证码发送成功！');
			    	}else{
			    		mui.toast('验证码发送失败，请稍后再试！');
			    	}
			    	
			    },function(err){
			    	if(err){
			    		mui.toast('验证码发送失败，请稍后再试！');
			    	}
			    })
			}
   		},
   		changePhone: function(){
   			var _this = this, tel = this.tel;
   			if(tel == ''){
				mui.toast('请输入您的手机号！');
				return false;
			}else if(!(/^1[3|4|5|7|8][0-9]{9}$/.test(tel))){
				mui.toast('请输入正确的手机号！');
				return false;
			}else if(_this.code == ''){
				mui.toast('请输入验证码！');
				return false;
			}else if(_this.code.length < 6){
				mui.toast('请输入完整的验证码！');
			}
   			var data = {
   				memberPhone: tel,
   				verify: _this.code
   			}
		    _this.$api.post('index.php/Home/ApiMy/update_Phone', data, function(res){
		    	console.log(res);
		    	_this.changePhonePopShow = false;
		    	if(res.code == "200"){
		    		_this.pohone = tel;
		    		mui.alert('手机号码修改成功！');
		    	}else{
		    		_this.loadShow = false;
		    		mui.alert('手机号码修改失败！');
		    		return false;
		    	}
		    },function(err){
		    	if(err){
		    		_this.changePhonePopShow = false;
		    		_this.loadShow = false;
		    		mui.alert('手机号码修改失败！');
		    		console.log(err);
		    	}
		    })
   		}
   	}
}
</script>
<style lang="scss">
#my-information{
	.mui-table-view-cell:after{
		left: .3rem;
	}
	.mui-table-view .mui-media-object.mui-pull-left{
		margin-right: .3rem;
	    line-height: 1.24rem;
	    max-width: 1.24rem;
	    width: 1.24rem;
	    height: 1.24rem;
	    border-radius: 50%;
	}
	.mui-table-view-chevron .mui-table-view-cell{
		padding: .4rem .5rem;
		padding-right: 35px;
	}
	.mui-table-view-chevron .mui-table-view-cell>a:not(.mui-btn) {
		margin: -.4rem -.5rem;
	    margin-right: -35px;
	}
	.mui-table-view-chevron .mui-table-view-cell>a:not(.mui-btn)>span{
		color: #999;
		&.mui-pull-right{
			color: #333;
			width: 60%;
			text-align: right;
			white-space: initial;
		}
	}
	#img-file-input{
		position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    opacity: 0;
	}
	.popover-box{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.36);
        position: fixed;
        top: 0px;
        z-index: 100;
        .popover-title{
            width: 100%;
            height: 1.533rem;
            line-height: 1.533rem;
            background-color: #e51c23;
            color: #fff;
            font-size: 0.48rem;
            text-align: center;
        }
        .msg-title{
            color: #333;
            font-size: 0.4rem;
            border-bottom: 1px solid #fafafa;
            height: 1.226rem;
            line-height: 1.226rem;
            text-align: center;
        }
        .input-box{
        	margin: .6rem auto 0;
    		width: 80%;
		    border: 1px solid #ddd;
		    line-height: 1;
        }
        .msg-cont{
            font-size: 0.32rem;
            color: #999;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 6;
            overflow: hidden;
            text-indent: 2em;
            padding: 0 .5rem;
            p{
                display: -webkit-box;
                overflow: hidden;
                white-space: normal!important;
                text-overflow: ellipsis;
                word-wrap: break-word;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
            }
        }
        input[type=text],input[type=number]{
            line-height: 1;
            width: 100%;
            height: 100%;
            margin-bottom: 0;
            font-size: .4rem;
            border: none;
            border-radius: 0;
        }
        li{
            border-bottom: 1px solid #eee;
        }
        .tel{
            button{
                float: right;
                padding: 0;
                width: 1.8666rem;
                height: .8rem;
                text-align: center;
                font-size: .32rem;
                color: #e51c23;
                border: 1px solid #e51c23;
                border-radius: 3px;
                line-height: .74rem;
            }
        }
        .mui-table-view-cell:after{
            display: none;
        }
        .mui-col-sm-8,.mui-col-xs-8{
            width: 66.66666667% !important;
        }
        .submit-btn{
            margin: .9rem auto .5rem;
        }
        .icon-close-o{
            position: relative;
            top: 2rem;
            display: block;
            text-align: center;
            font-size: .86rem;
            color: #fff;
        }
        .mui-icon-closeempty{
            position: absolute;
            right: .133rem;
            top: 0;
            font-size: 1.226rem;
            color: #666;
        }
        button.sendCode{
        	border: none;
        	height: 37px;
        	color: #e51c23;
        	font-size: .32rem;
        }
    }
    .authentication-popover,.msg-popover{
        position: absolute;
        top: 45%;
        left: 50%;
        -webkit-transform: translate3d(-50%,-50%,0);
        transform: translate3d(-50%,-50%,0);
        margin: 0 auto;
        height: auto;
        width: 7.56rem;
        background-color: #fff;
        border-radius: .05rem;
    }
    /*裁剪*/
    .photoClip{
    	position: fixed;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    background: rgba(0,0,0,1);
    }
    #clipArea{
    	height: 100vh;
    	width: 100vw;
    }
    #cancel{
    	position: absolute;
    	bottom: 1rem;
    	left: 1rem;
    	background: #999;
    	border: none;
    	padding: .2rem 1rem;
    	color: #fff;
    }
    #clipBtn{
    	position: absolute;
    	bottom: 1rem;
    	right: 1rem;
    	background: #03a9f4;
    	border: none;
    	padding: .2rem 1rem;
    	color: #fff;
    }
    /*.honor{
    	padding-left: 2em;
    }*/
    .mt015{
    	margin-top: .15rem;
    }
}
</style>
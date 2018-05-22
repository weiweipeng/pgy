<template>
	<div id="authentication">
		<!--认证弹窗-->
		<transition name="fade">
			<div class="popover-box" v-show="authenticationPopoverShow" transition="fade">
				<div class="authentication-popover">
					<p class="popover-title">填写以下信息完成实名认证</p>
					<ul class="mui-table-view">
						<li class="mui-table-view-cell">
							<input type="text" placeholder="请输入姓名" v-model="userName">
						</li>
						<li class="mui-table-view-cell mui-row tel">
							<input class="mui-col-sm-8 mui-col-xs-8" type="number" placeholder="请输入手机号码" v-model="tel">
							<button class="mui-pull-right mui-col-sm-4 mui-col-xs-4" @click="countDown" v-text="countDownText"></button>
						</li>
						<li class="mui-table-view-cell">
							<input type="number" placeholder="请输入验证码" v-model="code">
						</li>
					</ul>
					<button class="submit-btn" @click="bindUser">提交信息</button>
					<!--<i class="icon-close iconfont" @click="authenticationPopoverShow = false"></i>-->
				</div>
			</div>
		</transition>
	</div>
</template>
<script type="text/ecmascript-6">
import store from '@/vuex/store'
export default {
  	name: 'authentication',
  	store,
  	data: function(){
      	return {
        	authenticationPopoverShow: false,
        	tel: '',
        	userName: '',
        	code: '',
        	countDownText: '发送验证码'
      	};
   },
   	mounted: function() {
		
	},
   	methods: {
   		authenticationShow: function(){
   			this.authenticationPopoverShow = true;
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
				mui.alert('请输入您的手机号！');
				return false;
			}else if(!(/^1[3|4|5|7|8][0-9]{9}$/.test(tel))){
				mui.toast('请输入正确的手机号！');
				return false;
			}else{
				_this.countDownText = 60;
				var timer = setInterval(function(){
	   				if(_this.countDownText === 0){
		   				_this.countDownText = '发送验证码';
		   				window.clearInterval(timer);
		   			}else{
			   			_this.countDownText--;
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
   		bindUser: function(){
   			var _this = this;
   			var userName = _this.userName;
   			var tel = _this.tel;
   			var code = _this.code;
   			if(userName == ''){
				mui.alert('请输您的姓名！');
				return false;
			}else if(tel == ''){
				mui.toast('请输入您的手机号！');
				return false;
			}else if(!(/^1[3|4|5|7|8][0-9]{9}$/.test(tel))){
				mui.toast('请输入正确的手机号！');
				return false;
			}else if(code == ''){
				mui.toast('请输入验证码！');
				return false;
			}else{
				var data = {
					memberName: userName,
					memberPhone: tel,
					verify: code
				}
				_this.$api.post('index.php/Home/User/bindMemberUserData', data, function(res){
			    	console.log(res);
			    	if(res.code == "200"){
			    		mui.alert('绑定成功！');
			    		store.commit('authenticationSuccess');
			    		_this.authenticationPopoverShow = false;
			    	}else if(res.code == "0"){
			    		mui.toast(res.msg);
			    		return false;
			    	}else{
			    		mui.toast('绑定失败，请联系管理员！');
			    		return false;
			    	}
			    	
			    },function(err){
			    	if(err){
			    		mui.toast('绑定失败，请联系管理员！');
			    	}
			    })
			}
   		}
   	}
}
</script>
<style lang="scss">
#authentication{
	.popover-box{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.36);
        position: fixed;
        top: 0px;
        z-index: 100;
        .popover-title{
            width: 100%;
            height: 1.933rem;
    		line-height: 1.933rem;
            background-color: #e51c23;
            color: #fff;
            font-size: 0.48rem;
            text-align: center;
        }
        .msg-title{
            color: #e51c23;
            font-size: 0.4rem;
            border-bottom: 1px solid #FBFBFB;
            height: 1.226rem;
            line-height: 1.226rem;
            text-align: center;
        }
        .article-title{
            font-size: 0.44rem;
            color: #333333;
            height: 1.333rem;
            line-height: 1.333rem;
            width: 6.266rem;
            margin: 0 auto;
            text-align: center;
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
            height: .8rem;
            margin-bottom: 0;
            font-size: .4rem;
            padding: .1rem 0;
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
            margin-top: .8rem;
            margin-bottom: .8rem;
        }
        .icon-close{
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
    }
    .authentication-popover,.msg-popover{
        position: absolute;
        top: 45%;
        left: 50%;
        -webkit-transform: translate3d(-50%,-50%,0);
        transform: translate3d(-50%,-50%,0);
        margin: 0 auto;
        height: auto;
        width: 8.56rem;
        background-color: #fff;
    }
}
</style>
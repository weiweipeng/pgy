<template>
	<div id="popup">
		<transition name="fade">
			<div v-if="popupShow" transition="fade">
				<div class="popup-backdrop" ></div>
				<div class="popup" >
					<div class="popup-inner">
						<div class="popup-title" v-text="title"></div>
						<div class="popup-input">
							<textarea id="comment" name="comment" rows="4" cols="1" :placeholder="'请填写您的'+ title +'...'" v-model="cont"></textarea>
							<p class="limitNum" :class="num <= 100 ? 'color_grey' : 'color_red'">{{num}}/100</p>
						</div>
					</div>
					<div class="popup-buttons">
						<span class="popup-button" @click="cancel">取消</span>
						<span class="popup-button popup-button-bold" @click="submit">发布</span>
					</div>
				</div>
			</div>
				
		</transition>
	</div>
</template>

<script>
export default {
  	name: 'popup',
   	watch: {
   		
   	},
   	props: {
      	title: {
        	type: String
      	}
   	},
  	data: function(){
      	return {
      		cont: '',
        	popupShow: false,
        	params: -1,
        	index: -1,
        	num: 0
      	}
   	},
   	watch: {
   		cont: function(curVal, oldVal){
   			var length = curVal.length;
   			this.num = length;
   		}
   	},
   	mounted: function() {
   		
   	},
   	methods: {
   		operationPopup: function(params, index){
   			var popupShow = this.popupShow;
   			this.cont = '';
   			if(popupShow === true){
   				this.popupShow = false;
   			}else{
   				if(params != -1 && index != -1){
   					this.params = params;
   					this.index = index;
   				}
   				this.popupShow = true;
   				setTimeout(function(){
   					document.getElementById('comment').autofocus = 'autofocus';
   				})
   			}
   		},
   		cancel: function(){
   			this.popupShow = false;
   		},
   		submit: function(){
   			var _this= this;
   			if(_this.num > 100){
   				mui.toast('您输入的字数不得多于100个哦！');
   				return false;
   			}
   			if(_this.title == '评论') {
   				_this.$emit("proposal-comment", this.params, this.index, this.cont);
   			}else if(_this.title == '心得'){
   				_this.$emit("experience", this.cont);
   			}else{
   				return false;
   			}
   			
   		}
   	}
}
</script>
<style lang="scss">
#popup{
	position: fixed;
    z-index: 998;
	.popup-backdrop.active {
	    opacity: 1;
	}
	.popup-backdrop{
		position: fixed;
	    z-index: 998;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    -webkit-transition-duration: 400ms;
	    transition-duration: 400ms;
	    opacity: 1;
	    background: rgba(0,0,0,.4);
	}
	
	.popup {
	    position: fixed;
	    z-index: 10000;
	    top: 50%;
	    left: 50%;
	    display: block;
	    overflow: hidden;
	    width: 270px;
	    -webkit-transition-property: -webkit-transform,opacity;
	    transition-property: transform,opacity;
	    -webkit-transform: translate3d(-50%,-50%,0);
	    transform: translate3d(-50%,-50%,0);
	    text-align: center;
	    color: #000;
	    border-radius: 13px;
	    -webkit-transition-duration: 400ms;
	    transition-duration: 400ms;
	}
	.popup-inner {
	    position: relative;
	    padding: 15px;
	    border-radius: 13px 13px 0 0;
	    background: rgba(255,255,255,.95);
	}
	.popup-title {
	    font-size: 18px;
	    font-weight: 500;
	    text-align: center;
	}
	.popup-title+.popup-text {
	    font-family: inherit;
	    font-size: 14px;
	    margin: 5px 0 0;
	}
	.popup-input textarea {
	    font-size: 14px;
	    width: 100%;
	    margin: 15px 0 0;
	    padding: 5px 5px 0 5px;
	    border: 1px solid rgba(0,0,0,.3);
	    border-radius: 0;
	    background: #fff;
	    border-bottom: none;
	}
	.popup-inner:after {
	    position: absolute;
	    z-index: 15;
	    top: auto;
	    right: auto;
	    bottom: 0;
	    left: 0;
	    display: block;
	    width: 100%;
	    height: 1px;
	    content: '';
	    -webkit-transform: scaleY(.5);
	    transform: scaleY(.5);
	    -webkit-transform-origin: 50% 100%;
	    transform-origin: 50% 100%;
	    background-color: rgba(0,0,0,.2);
	}
	.popup-buttons {
	    position: relative;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    height: 44px;
	    -webkit-box-pack: center;
	    -webkit-justify-content: center;
	    justify-content: center;
	}
	.popup-button:first-child {
	    border-radius: 0 0 0 13px;
	}
	.popup-button {
	    font-size: 17px;
	    line-height: 44px;
	    position: relative;
	    display: block;
	    overflow: hidden;
	    box-sizing: border-box;
	    width: 100%;
	    height: 44px;
	    padding: 0 5px;
	    cursor: pointer;
	    text-align: center;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    color: #007aff;
	    background: rgba(255,255,255,.95);
	    -webkit-box-flex: 1;
	}
	.popup-button:after {
	    position: absolute;
	    z-index: 15;
	    top: 0;
	    right: 0;
	    bottom: auto;
	    left: auto;
	    display: block;
	    width: 1px;
	    height: 100%;
	    content: '';
	    /*-webkit-transform: scaleX(.5);
	    transform: scaleX(.5);*/
	    -webkit-transform-origin: 100% 50%;
	    transform-origin: 100% 50%;
	    background-color: rgba(0,0,0,.2);
	}	
	.popup-button.popup-button-bold {
	    font-weight: 600;
	}
	.popup-button:last-child {
	    border-radius: 0 0 13px;
	}
	.color_grey{
		color: #333;
	}
	.color_red{
		color: #E51C23;
	}
	.limitNum{
		position: relative;
	    top: -.1rem;
	    text-align: right;
		border: 1px solid rgba(0,0,0,.3);
		background: #fff;
		border-top: none;
		padding: 5px;
	}
}

</style>
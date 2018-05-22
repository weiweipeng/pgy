<template>
	<div id="tiny-img">
		<div id="img-container">
			<div class="img-item" v-for="(img, index) in resImg.imgList">
				<img :src="img">
				<span class="img-remove" @click="removeImg(index)">x</span>
			</div>
			<div class="img-up-add  img-item" v-if="resImg.imgList.length < 9">
				<input type="file" name="files" id="img-file-input" multiple="" @change="readFile">
			</div>
			
		</div>
		<!--loading-->
		<loading v-show="loadShow"></loading>
	</div>
</template>


<script type="text/ecmascript-6">
import loading from '../loading/loading.vue'
import Vue from 'vue'
export default {
  	name: 'my-news',
  	props: {
      	resImg: {
        	type: Object
      	}
   	},
   	data: function(){
      	return {
        	ele: [],
        	loadShow: false
      	}
    },
    components: {
	  	loading: loading
	},
   	mounted: function() {
   		
   	},
   	methods: {
   		readFile: function(evt){
   			
   			if(!evt){
   				return false;
   			}
   			var _this = this;
			var files = evt.target.files;
			//规定用户选取不得超过9张
			_this.$emit('load');
			
			if(files.length > 9){
				mui.alert('单次选取的图片不得超过9张！');
				_this.$emit('load');
				return false;
			}
			//循环输出所选图片
			
			for(var i=0, f; f=files[i];i++){
				// 过滤掉非图片类型文件
	          	if(!/image\/\w+/.test(f.type)){
	              	continue;
	          	}
	          	// 过滤掉重复上传的图片(tip:有个小bug，如果过滤掉重复上传的图片，在拍照的时候，不管拍了几张都会被过滤，只会保留第一张)
	            var tip = true;
//	            for(var j=0; j < _this.ele.length; j++){
//	                if(_this.ele[j].name == f.name){
//	                    tip = true;
//	                    break;
//	                }
//	            }
          		if(tip){
          			// 图片文件绑定到容器元素上
                	_this.ele.push(f);
                	
	          		var reader = new FileReader();
	          		reader.onload = function(){
	          			var newImageData = '', sendData = '';
	          			let cvs = document.createElement('canvas');
						let ctx = cvs.getContext('2d');
						let img = new window.Image();
						img.src = this.result;
						//获取图片exif信息，获得摄像头拍摄角度
						var arrayBuffer = _this.base64ToArrayBuffer(this.result);
						var Orientation = _this.getOrientation(arrayBuffer)
						img.onload = function(){
						    cvs.width = img.width;
						    cvs.height = img.height;
						    ctx.fillStyle = "#fff";
						    ctx.fillRect(0, 0, cvs.width, cvs.height);   
	        				ctx.drawImage(img, 0, 0);
	        				//判断苹果手机
	        				if (navigator.userAgent.indexOf('iPhone') > -1 && Orientation != 1 && Orientation != undefined) {
	        					switch(Orientation){
	                                case 6:
	                                	//需要顺时针（向左）90度旋转
	                                    _this.rotateImg(this,'left',cvs);  
	                                    break;
	                                case 8:
	                                	//需要逆时针（向右）90度旋转
	                                    _thisrotateImg(this,'right',cvs);  
	                                    break;
	                                case 3:
	                                	//需要180度旋转
	                                    _thisrotateImg(this,'right',cvs);//转两次  
	                                    _thisrotateImg(this,'right',cvs);
	                                    break;
	                            }
	        				}
	        				
	        				//压缩质量
						    newImageData = cvs.toDataURL('image/jpeg', 0.3);
						    sendData = newImageData.replace("data:image/png;base64,",'');
						    if (!_this.resImg.imgList) {
					          	Vue.set(_this.resImg, 'imgList', [sendData]);
					        } else {
					          	_this.resImg.imgList.push(sendData);
					        }
						    
						}
	          		}
	          		reader.readAsDataURL(f);
	          	}
          		if(files.length === (i + 1)){
          			setTimeout(function(){
          				_this.$emit('load');
          			},1000)
          		}
          	}
   		},
   		removeImg: function(index){
   			this.resImg.imgList.splice(index, 1);
   		},
   		rotateImg: function(img, direction,canvas) {
	        var min_step = 0;    
	        var max_step = 3; 
	        if (img == null)return;
	        var height = img.height;    
	        var width = img.width;    
	        //var step = img.getAttribute('step');    
	        var step = 2;    
	        if (step == null) {    
	            step = min_step;    
	        }    
	        if (direction == 'right') {    
	            step++;    
	            //旋转到原位置，即超过最大值    
	            step > max_step && (step = min_step);    
	        } else {    
	            step--;    
	            step < min_step && (step = max_step);    
	        }
	        //旋转角度以弧度值为参数    
	        var degree = step * 90 * Math.PI / 180;    
	        var ctx = canvas.getContext('2d');    
	        switch (step) {    
	            case 0:    
	                canvas.width = width;    
	                canvas.height = height;    
	                ctx.drawImage(img, 0, 0);    
	                break;    
	            case 1:    
	                canvas.width = height;    
	                canvas.height = width;    
	                ctx.rotate(degree);    
	                ctx.drawImage(img, 0, -height);    
	                break;    
	            case 2:    
	                canvas.width = width;    
	                canvas.height = height;    
	                ctx.rotate(degree);    
	                ctx.drawImage(img, -width, -height);    
	                break;    
	            case 3:    
	                canvas.width = height;    
	                canvas.height = width;    
	                ctx.rotate(degree);    
	                ctx.drawImage(img, -width, 0);    
	                break;    
	        }    
	    },
	    //base64转ArrayBuffer对象
	    base64ToArrayBuffer: function(base64) {
		    base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
		    var binary = atob(base64);
		    var len = binary.length;
		    var buffer = new ArrayBuffer(len);
		    var view = new Uint8Array(buffer);
		    for (var i = 0; i < len; i++) {
		      view[i] = binary.charCodeAt(i);
		    }
		    return buffer;
		},
		// ArrayBuffer对象 Unicode码转字符串
		getStringFromCharCode: function(dataView, start, length) {
		    var str = '';
		    var i;
		    for (i = start, length += start; i < length; i++) {
		      str += String.fromCharCode(dataView.getUint8(i));
		    }
		    return str;
		},
		// 步骤三，获取jpg图片的exif的角度（在ios体现最明显）
		getOrientation: function(arrayBuffer) {
			var _this = this;
		    var dataView = new DataView(arrayBuffer);
		    var length = dataView.byteLength;
		    var orientation;
		    var exifIDCode;
		    var tiffOffset;
		    var firstIFDOffset;
		    var littleEndian;
		    var endianness;
		    var app1Start;
		    var ifdStart;
		    var offset;
		    var i;
		    // Only handle JPEG image (start by 0xFFD8)
		    if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
		      offset = 2;
		      while (offset < length) {
		        if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
		          app1Start = offset;
		          break;
		        }
		        offset++;
		      }
		    }
		    if (app1Start) {
		      exifIDCode = app1Start + 4;
		      tiffOffset = app1Start + 10;
		      if (_this.getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
		        endianness = dataView.getUint16(tiffOffset);
		        littleEndian = endianness === 0x4949;
		
		        if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
		          if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
		            firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
		
		            if (firstIFDOffset >= 0x00000008) {
		              ifdStart = tiffOffset + firstIFDOffset;
		            }
		          }
		        }
		      }
		    }
		    if (ifdStart) {
		      length = dataView.getUint16(ifdStart, littleEndian);
		
		      for (i = 0; i < length; i++) {
		        offset = ifdStart + i * 12 + 2;
		        if (dataView.getUint16(offset, littleEndian) === 0x0112 /* Orientation */) {
		
		          // 8 is the offset of the current tag's value
		          offset += 8;
		
		          // Get the original orientation value
		          orientation = dataView.getUint16(offset, littleEndian);
		
		          // Override the orientation with its default value for Safari (#120)
		          if (navigator.userAgent.indexOf('iPhone')) {
		            dataView.setUint16(offset, 1, littleEndian);
		          }
		          break;
		        }
		      }
		    }
		    return orientation;
		}
   	}
}
</script>
<style lang="scss">
#tiny-img{
	background: #fff;
	#img-container{
		padding: .3rem;
	}
	#img-container:after {
	    content: '.';
	    display: block;
	    height: 0;
	    visibility: hidden;
	    overflow: hidden;
	    clear: both;
	}
	.img-item {
	    position: relative;
	    float: left;
	    margin: 2vw 2vw 0 0;
	    width: 30vw;
	    height: 30vw;
	    box-sizing: border-box;
	    background: #eee;
	    border: 1px solid #ccc;
	    overflow: hidden;
	}
	.img-item:nth-child(3n){
		margin-right: 0;
	}
	.thumb-icon {
	    width: 30vw;
	    height: 30vw;
	}
	.img-item>img{
	    position: relative;
	    top: 50%;
	    -webkit-transform: translate3d(0,-50%,0);
	    transform: translate3d(0,-50%,0);
    	width: 100%;
	}
	.img-remove {
	    position: absolute;
	    display: inline-block;
	    right: 0;
	    top: 0;
	    width: .7rem;
	    padding-right: .15rem;
	    height: .7rem;
	    text-align: right;
	    border-radius: 0 0 0 .7rem;
	    background-color: #fa6065;
	    color: #fff;
	    font-size: .5rem;
	    font-weight: 100;
	    z-index: 1;
	}
	.img-up-add{
	    background: url(../../assets/images/add-photo@3x.png) no-repeat center center;
	    background-size: 30vw 30vw;
	    width: 30vw;
	    height: 30vw;
	    margin-right: 0;
    }
    #img-file-input{
    	filter:alpha(opacity=0);
    	opacity: 0;
    	width: 100%;
    	height: 100%;
    }
}
</style>
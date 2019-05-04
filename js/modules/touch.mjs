export function Slider(obj){
	this.touch='ontouchstart' in window;
	this.slider=obj;
/*	this.horizonalMoveCallback=undefined;
	this.horizonalEndCallback=undefined;
	this.verticalMoveCallback=undefined;
	this.verticalEndCallback=undefined;
*/
	var startPos,deltaPos={x:0,y:0,time:0},isScrolling,anc=this;
	this.events={
		slider:obj,
		handleEvent:function(event){
			var self=this;
			if(event.type=='touchstart'){
				self.start(event);
			}else if(event.type=='touchmove'){
				self.move(event);
			}else if(event.type=='touchend'){
				self.end(event);
			}
		},
		start:function(event){
			var touch=event.targetTouches[0];
			startPos={x:touch.pageX,y:touch.pageY,time:+new Date};
//			console.log('start',startPos);
			isScrolling=false;
			this.slider.addEventListener('touchmove',this,false);
			this.slider.addEventListener('touchend',this,false);
		},
		move:function(event){
			if(event.targetTouches.length>1)return ;
			var touch=event.targetTouches[0];
//			console.log('raw',touch);
			deltaPos={x:touch.pageX-startPos.x,y:touch.pageY-startPos.y};
//			console.log('move',deltaPos);
			isScrolling=Math.abs(deltaPos.x)<Math.abs(deltaPos.y)?1:0;	//isScrolling为1时，表示纵向滑动，0为横向滑动
			if(isScrolling===0&&anc.horizonalMoveCallback){
				event.preventDefault();
				anc.horizonalMoveCallback(deltaPos);
			}
			if(isScrolling===1&&anc.verticalMoveCallback){
				event.preventDefault();
				anc.verticalMoveCallback(deltaPos);
			}
		},
		end:function(event){
			deltaPos.time=startPos?+new Date - startPos.time:0;
//			console.log('end',deltaPos,isScrolling?'vertical':'horizonal');
			if(isScrolling===0&&anc.horizonalEndCallback){
				anc.horizonalEndCallback(deltaPos);
			}else if(isScrolling===1&&anc.verticalEndCallback){
				anc.verticalEndCallback(deltaPos);
			}
			this.slider.removeEventListener('touchmove',this,false);
			this.slider.removeEventListener('touchend',this,false);
		}
	};
	this.init=function(){
		if(!!this.touch)this.slider.addEventListener('touchstart',this.events,false);
	}
}
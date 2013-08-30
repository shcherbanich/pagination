(function($,undefined){
	var methods = {
		build:function(){
			var sep,o=this.data('pagination'),max=this.pagination('_getPage',o.items),l='</li>',d='class="disabled"',elements=(o.templatePrev?'<li id="prev"'+(o.active==1?d:'')+'>'+o.templatePrev+l:''),sep=o.active-o.show/2+1|0,start=(o.hideUn?sep<1?1:max-sep<o.show?max-o.show+1:sep:1)||1,stop=o.hideUn?o.show+start>max?max:o.show+start-1:max;o.useTplHidden&&start!=1?o.templateHidden?elements+='<li id="hiddenPrev"'+d+'>'+o.templateHidden+l:0:0;for(var i=start;i<=stop;i++)disabled=~o.disabled.indexOf(i)?1:0,elements+='<li class="act'+(o.active==i?' active':disabled?' disabled':'')+'"data-num="'+i+'">'+(o.active==i?o.templateActive.replace(/\$num/g,i):disabled?o.templateDisabled.replace(/\$num/g,i):o.templateLinks.replace(/\$num/g,i))+l;o.useTplHidden&&stop!=max?o.templateHidden?elements+='<li id="hiddenNext"'+d+'>'+o.templateHidden+l:0:0;o.templateNext?elements+='<li id="next"'+(o.active==max?d:'')+'>'+o.templateNext+l:0;return this.children('ul').empty().append(elements).parent().each(function(){var self=$(this),t=self.children();t.children('.act').bind('click',function(){o.activeAction(self,$(this).attr("data-num"))}).parent().children('#next').bind('click',function(){o.nextAction(self)}).parent().children('#prev').bind('click',function(){o.prevAction(self)}).parent().children('#hiddenPrev').bind('click',function(){o.hiddenPrevAction(self)});t.children('#hiddenNext').bind('click',function(){o.hiddenNextAction(self)})})
		}, 
		display:function(page){
			var o=this.data('pagination'),m=this.pagination('_getPage',o.items),max=o.pageItems*(page>m?m:page);return{min:o.pageItems?page?max-o.pageItems+1:0:0,max:o.pageItems?page<m?max:o.items:0}
		},
		disable:function(el){
			var o=this.data('pagination');el.length?0:el=[el];for(var i in el)~o.disabled.indexOf(el[i])?0:o.disabled.push(el[i]);return this.pagination('build')
		},
		enable:function(el){
			var o=this.data('pagination');el.length?0:el=[el];for(var i in el)~o.disabled.indexOf(el[i])?o.disabled.splice(o.disabled.indexOf(el[i]),1):0;return this.pagination('build')
		},
		active:function(num){
			var o=this.data('pagination');return o.disabledNoClick&&~o.disabled.indexOf(+num)?0:o.active=num,this.pagination('build')
		},
		setFirstPage:function(){
			return this.pagination('active',1)
		},
		setLastPage:function(){	
			return this.pagination('active',this.pagination('_getPage',this.pagination('display').max))
		},
		nextPage:function(){
			var o=this.data('pagination');++o.active>this.pagination('_getPage',o.items)?--o.active:0;return this.pagination('build')
		},
		prevPage:function(){
			var o=this.data('pagination');--o.active?0:++o.active;return this.pagination('build')
		},
		getActive:function(){
			return this.data('pagination').active
		},
		getDisabled:function(){
			return $.extend([],this.data('pagination').disabled)
		},
		theme:function(name){
			return this.data('pagination').theme=name,this.pagination('_setTheme')
		},
		_setTheme:function(){
			return this.children('ul').removeClass().addClass(this.data('pagination').theme).parent().pagination('build')
		},
		_getPage:function(number){
			var o=this.data('pagination');return(number/o.pageItems|0)+(number%o.pageItems?1:0)
		},
		init:function(object){
			var settings = $.extend({
										items:0,
										pageItems:10,
										active:1,
										disabled:[],
										hideUn:true,
										useTplHidden:false,
										disabledNoClick:true,
										show:5,
										templatePrev:'<a href="#0">«</a>',
										templateNext:'<a href="#0">»</a>',
										templateHidden:'<a>...</a>',
										templateActive : '<a href="#$num">$num</a>',
										templateLinks : '<a href="#$num">$num</a>',
										templateDisabled : '<a>$num</a>',
										activeAction:function(self,number){self.pagination('active',number)},
										prevAction:function(self){self.pagination('prevPage')},
										nextAction:function(self){self.pagination('nextPage')},
										hiddenPrevAction:function(self){self.pagination('setFirstPage')},
										hiddenNextAction:function(self){self.pagination('setLastPage')},
										theme:'default',
										onInit:function(self){}
							},object);this.data('pagination',settings).html('<ul></ul>'),this.length?(this.pagination('_setTheme'),settings.onInit.call(this)):0;return this
		} 
	}
	$.fn.pagination=function(name){
		return methods[name]?methods[name].apply(this,Array.prototype.slice.call(arguments,1)):typeof name=='object'||!name?methods.init.apply(this,arguments):0
	}
})(jQuery);

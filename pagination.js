(function($){
	methods = {
		build:function(){
			o=this.data('pagination'),elements='',max=this.pagination('_getPage',o.items),o.templatePrev?elements+='<li '+(o.active==1?'class="disabled"':'')+'>'+o.templatePrev+'</li>':0,start=(c=(sep=(o.active-o.show/2|0)+1,o.hideUn?(sep>=1?(max-sep<o.show?max-o.show+1:sep):1):1),c?c:1),stop=o.hideUn?(o.show+start<=max?o.show+start-1:max):max;o.useTplHidden&&start!=1?(o.templateHidden?elements+='<li class="disabled">'+o.templateHidden+'</li>':0):0;for(i=start;i<=stop;i++)disabled=o.disabled.indexOf(i)!=-1?1:0,elements+='<li'+(o.active==i?' class="active"':disabled?' class="disabled"':'')+'>'+(o.active==i?o.templateActive.replace(/\$num/g,i):(disabled?o.templateDisabled.replace(/\$num/g,i):o.templateLinks.replace(/\$num/g,i)))+'</li>';o.useTplHidden&&stop!=max?(o.templateHidden?elements+='<li class="disabled">'+o.templateHidden+'</li>':0):0;o.templateNext?elements+='<li '+(o.active==max?'class="disabled"':'')+'>'+o.templateNext+'</li>':0;return this.children('ul').empty().append(elements).parent();
		}, 
		display:function(page){
			return o=this.data('pagination'),m=this.pagination('_getPage',o.items),max=o.pageItems*(page<=m?page:m),{min:!o.pageItems?0:page?max-o.pageItems+1:0,max:!o.pageItems?0:(page>=m?o.items:max)} 
		},
		disable:function(el){
			o=this.data('pagination'),typeof el!="object"?el=[el]:0;for(var i in el)o.disabled.indexOf(el[i])==-1?o.disabled.push(el[i]):0;return this.data('pagination',o),this.pagination('build');
		},
		enable:function(el){
			o=this.data('pagination'),typeof el!="object"?el=[el]:0;for(var i in el)o.disabled.indexOf(el[i])!=-1?o.disabled.splice(o.disabled.indexOf(el[i]),1):0;return this.data('pagination',o),this.pagination('build');
		},
		active:function(num){
			return o=this.data('pagination'),o.active=num,this.data('pagination',o),this.pagination('build');
		},
		setFirstPage:function(){
			return this.pagination('active',1);
		},
		setLastPage:function(){	
			return o=this.pagination('display'),this.pagination('active',this.pagination('_getPage',o.max));
		},
		nextPage:function(){
			return o=this.data('pagination'),max=this.pagination('_getPage',o.items),act=(o.active+1<=max?++o.active:o.active),this.pagination('active',act);
		},
		prevPage:function(){
			return o=this.data('pagination'),max=this.pagination('_getPage',o.items),act=(o.active-1>=1?--o.active:o.active),this.pagination('active',act);
		},
		getActive:function(){
			return o=this.data('pagination'),o.active;
		},
		getDisabled:function(){
			return o=this.data('pagination'),arr=$.extend([],o.disabled),delete arr.pop(),arr;
		},
		theme:function(name){
			return o=this.data('pagination'),o.theme=name,this.data('pagination',o),this.pagination('_setTheme');
		},
		_setTheme:function(){
			return o=this.data('pagination'),this.children('ul').removeClass().addClass(o.theme).parent().pagination('build');
		},
		_getPage:function(number){
			return o=this.data('pagination'),(number/o.pageItems|0)+(!(number%o.pageItems)?0:1);
		},
		init:function(object){
			return settings = $.extend({
										items:0,
										pageItems:10,
										active:1,
										disabled:[],
										hideUn:true,
										useTplHidden:true,
										show:5,
										templatePrev:'<a>«</a>',
										templateNext:'<a>»</a>',
										templateHidden:'<a>...</a>',
										templateActive : '<a href="#$num">$num</a>',
										templateLinks : '<a href="#$num">$num</a>',
										templateDisabled : '<a>$num</a>',
										theme:'default',
										onChange:{
													'before':function(){},
													'after':function(){},
													'complete':function(){}
												},
										onInit:function(self){}
							},object),this.data('pagination',settings),this.html('<ul></ul>'),this.pagination('_setTheme'),settings.onInit.call(this),this;
		} 
	}
	$.fn.pagination = function(name){
		return methods[name]?methods[name].apply(this,Array.prototype.slice.call(arguments,1)):typeof name=='object'||!name?methods.init.apply(this,arguments):0;
	};
})(jQuery);

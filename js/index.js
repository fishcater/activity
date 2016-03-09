$(function(){
var online=$("#js_online");
var queslist=$("#js_question");
var nextPage=$('.js_nextPage');
var ends=$("#js_ends");
var showShare=$('.js_showShare');
function onContainer(){
	online.hide();
	$('#js_userShare').show().addClass('js_userShare');
}
function btnForever(){
	queslist.find('.lists').children('.items').removeClass('animateOutleft animateInRight');
	queslist.find('.lists').children('.items').eq(queslist.find('.lists').children('.items').length-1).addClass('animateOutleft');
	setTimeout(function(){
		queslist.find('.lists').children('.items').eq(queslist.find('.lists').children('.items').length-1).removeClass('animateOutleft');
	},1500);
	queslist.find('.lists').children('.items').eq(0).addClass('animateInRight');
}
$('#js_btnForever').on('click',function(){
	btnForever();
});
function onListContent(){
	online.addClass('animateOutleft').removeClass('animateInRight');
	queslist.addClass('animateOutleft').removeClass('animateInRight');
	ends.show().addClass('js_userShare').removeClass('animateOutleft');
}
online.on('click','#js_onlineBtn',function(){
	online.addClass('animateOutleft');
	queslist.show().addClass('animateInRight');
});
queslist.on('click','#js_sbmitBtn',function(){
	if(!confirm('提交后不能再改了哟！')){
		return;
	}
	question.send();
})
nextPage.on('click',function(){
	$(this).parents('.items').addClass('animateOutleft').next().addClass('animateInRight');
});
showShare.on('click',function(){
	$('body,html').css('overflow','hidden');
	$('#js_showShare').show().addClass('animateInRight');
});
$('#js_showShare').on('click',function(){
	$('#js_showShare').hide();
})
question=initChoosen();
$('.infos ul li').on('click',function(){
	question.choose($(this));
});
$('#musicPlay').on('click',function(){
	if($(this).hasClass('open')){
		$(this).removeClass('open');
		$(this).addClass('close');
		$('#musicMp3').get(0).pause();
	}else{
		$(this).removeClass('close');
		$(this).addClass('open');
		$('#musicMp3').get(0).play();
	}
})
function initChoosen(){
	var chosen=new Array(5);
	function init(){
		for(var i=0;i<chosen.length;i++){
			chosen[i]=0;
		}
	}
	function render(item){if(
		!item.hasClass('active')){
			item.siblings('.active').removeClass('active');
			item.addClass('active');
		}
	}
	init();
	return{
		choose:function(item){
			var question=item.parents('.items').index();
			chosen[question]=item.index();
			render(item);
		},
		send:function(isJump){
			if(!isJump){
				queslist.addClass('animateOutleft');
			}
			$('.endBox .hdInfos').hide();
			onContainer();
			if(!isJump){
				ends.show().addClass('animateInRight');
			}
			var copywrite=['友情就这样走到了尽头','推荐听《分开旅行》','友情尚未成功 你萌还需努力','不一致的那几道题是啥','亲人也不过如此吧！','在一起吧'];
			var html='';
/*
			for(var i in data.data[1]){
				var rate=data.data[1][i].rate;
				html+="<li>";
				html+='<img src="'+data.data[1][i].head+'" width="45" height="45" alt="" style="display: block;">';
				html+='<strong class="end">'+rate*20+'%</strong>';
				html+='<dl>';
				html+='<dt>'+data.data[1][i].name+'</dt>';
				html+='<dd>'+copywrite[rate]+'</dd>';
				html+='</dl>';
			}
*/
var html = "<img src='/img/code.jpg' />;
			$('.ppLists .lists ul').html(html)
		},
		printme:function(){
			console.log(chosen)
		},
		getChosen:function(){
			return chosen.slice(0)
		},
		onContainer:onContainer
	}
	}
});

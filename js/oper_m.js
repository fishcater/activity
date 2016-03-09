function addmsg(){require(['common/ui/editer1/editer1','common/ui/slidTip/slidTip'],function(d,slidTip){var username="";if($("#js_againusername").size()>0){username=$("#js_againusername").val();}
d.show({okText:"发布",okBtnIpg:'mnotice-sendmsg',cancelText:"取消",cancelBtnIpg:'mnotice-msg-cancel',title:"写私信",input1Placeholder:"收信人",input1TitleText:username,textarea1Placeholder:"私信正文",maxLength:500,onOK:function(){var username=arguments[0];var text=arguments[1];if(!username){slidTip.show({type:5,text:"请填写用户名！",delay:1});return false;}
if(!text||text.length>500){slidTip.show({type:5,text:"内容字数不合法！",delay:1});return false;}
username=encodeURIComponent(username);text=encodeURIComponent(text);$.ajax({type:"POST",async:false,url:"/api.php",data:"action=addmsg&username="+username+"&content="+text,dataType:"text",beforeSend:function(XMLHttpRequest){},success:function(txt){var ret;eval('ret='+txt);if('ok'==ret.result){window.location=window.location.href;}else{slidTip.show({type:5,text:ret.data.msg,delay:1});return false;}}});}});});}
function LoginAjax(okcb,errcb){require(['common/ui/slidTip/slidTip'],function(slidTip){var acc=$("#js_login_user").val();if(acc.length<=0){slidTip.show({type:5,text:"请输入登录账号！",delay:1});return false;}
var pwd=$("#js_login_pass").val();if(pwd.length<=0){slidTip.show({type:5,text:"请输入登录密码！",delay:1});return false;}
var rmeb=true;var refer=$("#js_login_refer").val();$.post("http://m.qyer.com/ajax.php?action=signin&_"+(+new Date()),{account:acc,password:pwd,remember:!rmeb,refer:refer},function(res){if('0'==res.error)
{}else{errcb&&errcb(res.data);slidTip.show({type:5,text:res.msg,delay:1});return false;}},"json");});}
function LoginForm(refer,isajax,okcb,errcb){var str_refer=window.location.href;if(typeof(refer)=="string"){str_refer=refer;}
location.href="/login/login.php?from_url="+encodeURIComponent(str_refer);}
$(function(){$('#js_addmsg').on(qyerUtil.EVENT.CLICK,addmsg);$("#js_login").on(qyerUtil.EVENT.CLICK,LoginForm);});
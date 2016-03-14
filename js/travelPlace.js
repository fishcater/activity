var place = ['芬兰.jpeg','巴黎.jpg','韩国.jpg','大堡礁.jpg','澳大利亚.jpeg','马尔代夫.jpg','朝鲜.jpeg','非洲.jpeg','日本.jpg','泰国.png','旧金山.jpg','贝加尔湖.jpeg','瑞士雪朗峰.jpg',
'清迈.jpeg','埃及.jpg','沙巴.jpg','蒙古.png','柬埔寨.png','毛里求斯.jpg','土耳其棉花堡.jpg'];
var getIdx = function(){
    var seed = 100000000,
    len = place.length,
    idx = parseInt(Math.random()*seed)%len;
    return idx;
};
var getPic =  function(idx){
    var fileName = place[idx].replace(/.*\./,parseInt(idx)+1+".");
    return "../img/" + fileName;
};
var bindEvent = function(){
    document.getElementById('btn1').onclick = function(){
        var pic = getPic();
        console.log(pic);
        document.querySelector('.pic').style.backgroundImage = "url('"+pic+"')";
    };
};
var setImg = function(pic){
    document.querySelector('.pic').style.backgroundImage = "url('"+pic+"')";
};
var setName = function(name){
    document.getElementById('name').innerHTML = name;
};
var setPlaceName = function(name){
    document.querySelector('.dest').innerHTML = name;
};
var getUrlParam = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"), 
        p= window.location.search,
        r = p && p.substr(1),
        m = r.match(reg);
    return m && m.length > 1 && decodeURI(unescape(m[2])) || '';
};
var getPlaceName = function(idx){
    var pic = place[idx];
    var arr = pic.match(/(.*)\./);
    return arr[1];
};
var setCookie = function(c_name,value,expiredays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
};
var getCookie = function(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        { 
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        } 
    }
    return ""
};
var base64Encode = function(str){
    return btoa(unescape(encodeURIComponent(str)));
};
var base64Decode = function(str){
    var re;
    try {
        re = decodeURIComponent(escape(atob(str)));
    } catch(e) {
        re = str;
    }
    return re;
};
var setTitle = function(title){
    document.title = title;
    var body = document.body;
    var iframe = document.createElement('iframe');
    iframe.src="../img/code.jpg";
    iframe.style.display = "none";
    iframe.addEventListener('load',function(){
        body.removeChild(iframe);
    });
    body.appendChild(iframe);
}
var init = function(){
    var name = base64Decode(getUrlParam('name')),
    idx = getUrlParam('idx'),
    placeName = getPlaceName(idx),
    imgUrl = getPic(idx);
    document.querySelector('.picture').src=imgUrl;
    setImg(imgUrl);
    setName(name);
    setPlaceName(placeName);
    var title = name + "的气质最适合去"+placeName;
    setTitle(title);
    if (getCookie("locale") && name==base64Decode(getCookie("myName"))){
        document.getElementById("btn2").innerHTML = "我要分享";
    }
    document.getElementById("btn2").onclick = function(){
        document.querySelector(".bg").style.display = "block";
    }
    document.querySelector(".bg").onclick = function(){
        document.querySelector(".bg").style.display = "none";
    };
};
var toResult = function(){
    var name = document.getElementById('name').value;
    if (/^\s*$/.test(name)){
        alert('姓名不能为空');
        return;
    }
    var idx = getIdx();
    setCookie("locale",true,1);
    setCookie("myName",base64Encode(name),1);
    location.href = "index.html?idx="+idx+"&name="+base64Encode(name);
};

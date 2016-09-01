$(function(){
	var id=getValue("id");
	if(id==undefined){
		id=0;
	}
	if(id!=0){
		$(".f_index").show();	
	}
	var arrCate=[];
	for(var i=0, len=cateJSON.length; i<len; i++){
		if(cateJSON[i].parentID==id){
			arrCate.push(cateJSON[i]);
		}	
	}
	ko.applyBindings({
		ko_array_url: arrCate				  
	});
	pageSize = getValue("pageSize"); //git pageSize
	c2_audio= getValue("c_audio");
	if(c2_audio == undefined){
		c_audio=0;
	}else{
		c_audio=1;
	}
	c2_mode= getValue("c_mode");
	if(c2_mode == undefined){
		c_mode=0;
	}else{
		c_mode=1;
	}
	if (pageSize == undefined){
		pageSize=11;
		$(".f_jumpWrap").hide();
	}else{
		$(".f_mail").attr("href","mailto:leeke.zhou@gmail.com?body=none&subject=Test pageSize:"+pageSize);
		//$(".f_cateList").hide();
		$(".f_mail").click(function() {
			$(".f_cateList").show();		
		});		
	}
	$(".f_index_li").click(function(){
		if(id==0){
			window.location="index.html?id="+$(this).attr("id");
		}else{
			mode="test";
			window.location=mode+".html?first=1&pageSize="+pageSize+"&id="+$(this).attr("id")+"&c_audio="+c_audio+"&c_mode="+c_mode;
		}							
	});
	
	$('ul.f_cateList li a').first().attr("accesskey","n");
//	firstUrl=$('ul.f_cateList li a').first().attr("href");
//	alert("test.html?pageSize="+pageSize+"&id="+$('ul.f_cateList li a').first().attr("id")+"&c_audio="+c_audio);
	$('ul.f_cateList li a').first().attr("data-target","#myModal");

});
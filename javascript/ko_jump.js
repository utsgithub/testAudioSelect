pid = getValue("id"); //git id

$(function(){
	ko.applyBindings({
		ko_array_url: [
			{ ko_value: 'Index', ko_href: 'index.html', ko_class:'', ko_type:'', ko_target:''},
			{ ko_value: 'Back Category', ko_href: '', ko_class:'f_nav_jump', ko_type:'',  ko_target:''},
			{ ko_value: 'Paractice Mode', ko_href: 'test_practice.html?id='+pid, ko_class:'', ko_type:'',  ko_target:''},
			{ ko_value: 'Normal Mode', ko_href: 'test.html?id='+pid, ko_class:'', ko_type:'',  ko_target:''},
			{ ko_value: 'Next', ko_href: '', ko_class:'btnNext', ko_type:'',  ko_target:''},
			//{ ko_value: 'Change123', ko_href: '', ko_class:'jsEdit', ko_type:'',  ko_target:'_blank'},
			
			//{ ko_value: 'Cn Mode', ko_href: 'javascript:void(0);', ko_class:'f_plus_id', ko_type:'testCn'},
//			{ ko_value: 'Select Mode', ko_href: 'javascript:void(0);', ko_class:'f_plus_id', ko_type:'testSelect'},
//			{ ko_value: 'Arr mode', ko_href: 'javascript:void(0);', ko_class:'f_plus_id', ko_type:'testArr'},
//			{ ko_value: 'Audio mode', ko_href: 'javascript:void(0);', ko_class:'f_plus_id', ko_type:'testAudio'},
		]				  
	});
	$(".f_nav_jump").attr("href", "index.html?id="+cateJSON[usual_search(cateJSON,pid)].parentId);	
	$(".f_plus_id").click(function(){
		window.location=$(this).attr("type")+".html?id="+pid;							   
	});
});	

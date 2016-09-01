		
	var dNum= 4000;	
	var testSize=15;
	var c_audio=1;
	var c_jump=0;
	var c_select=4;
	var c_page="testCn";
	//====================Begin Control pageSize
	var c_next=1; //往后跳的数量
	var c_size=1; //pageSize:0 none, 1 work
	//====================End Control pageSize
	var c_zoomMode=1;
	var c_zoomValue=125;
	var c_eNum=15;
	var c_level=0; //0 easy; 1 diff;

$(function() {
	if(c_zoomMode=0){
		$( ".container" ).css( "zoom", c_zoomValue+"%" );
		$( ".container" ).css( "width", "90%" );
	}
	if (window.navigator.userAgent.indexOf('Chrome') > -1 || window.navigator.userAgent.indexOf('Firefox') > -1) {		//判断是否为chrome浏览器；
		var f_chrome=1;
	    //alert('Chrome!');
	} else {
		var f_chrome=0;
		//alert('Not Chrome');
	}

	
	if(f_chrome==1){		//Chrome下添加按键特效；
		window.onload = function() {		
			document.body.onkeydown = function(e) {
				e = e || window.event;
				// 把键值转换成字母
				var key = String.fromCharCode(e.keyCode); 
				var dom = document.getElementById(key);
				if(document.getElementById(key).style.display=="block" || document.getElementById(key).style.display=="inline-block"){
					if(dom) {
						dom.click();
					}
				}else{
					//alert("error");	
				}
			}
		}
	}
	
	pid=getValue("id");	//git id
	//====================Begin Control pageSize
	pageSize = getValue("pageSize"); //git pageSize
	if (pageSize == undefined){
		pageSize=0;
	}
	if (c_size==1){
		testSize=pageSize;
	}
	//====================End Control pageSize
	
	
	var commentsAll= newsJSON;	
	console.log(commentsAll);

	
	if(pid==undefined){	//if id="" then jump to index
		window.location="index.html";
	}
	
	
	$(".f_getId").attr("id",pid);
	$(".f_jumpArr2").click(function(){
		window.location=$(this).attr("_href")+"&id="+$(this).attr("id");
	});
	var valueTitle=cateJSON[usual_search(cateJSON,pid)].title;
	$("title").html(valueTitle);	//change title
	$(".spTitle").html(valueTitle);
	$("span.spPageSize").html(pageSize);		//show pageSize
	/*自动向下跳转*/
	x=getValue("id");	//get id
	a=usual_search(cateJSON,x); //get num
	c=Number(a)+Number(1);
	var jumpUrl="";
	jumpIndex="index.html?pageSize="+(Number(pageSize)+Number(c_next))+"&id="+cateJSON[a].parentID+"&c_audio="+c_audio;
	//jumpIndex="index.html?id="+cateJSON[a].parentID+"&c_audio="+c_audio;
	if(cateJSON[c]!==undefined){
		if(cateJSON[a].parentID==cateJSON[c].parentID){
			//jumpUrl="test.html?id="+cateJSON[c].ID+"&pageSize="+pageSize+"&c_audio="+c_audio;
			//jumpUrl="test.html?id="+cateJSON[c].ID;
			jumpUrl="test.html?id="+cateJSON[c].ID+"&pageSize="+pageSize
		}else{
			//jumpUrl = "jump.html?id=" + pid;
			jumpUrl=jumpIndex;
		}
	}else{
		jumpUrl=jumpIndex;
	}
	idKey=usual_search(cateJSON,pid);
	
	var audioUrl="";
	var comments=[];
	console.log(pid);
	for(var i=0, len=commentsAll.length; i<len; i++){
		if(commentsAll[i].categoryID==pid){
			comments.push(commentsAll[i]);
		}	
	}
	console.log("comments");
	console.log(comments);
	
	//alert(print_array(comments));
	$(".f_jumpTest").attr("href","testArr.html?id="+pid); //page jump	
	var t1= new Date().getTime(); //初始化时间
    var index = 0;	//数组指针初始化；
	var getError="";
	var errors = [];	//错误返回按钮延时时间；
	var eNum = 0;	//错误计数初始化；
	$("#ul").show();	//显示全局
	//调试开关；
	var debug="0";
	if(debug=="1"){
		dNum=0;	
	}
	
	var org_comments=[];
	org_comments=comments;
	comments=randomOrder(comments);
	if(comments.length<testSize){ testSize=comments.length; }
	comments=f_control_num(testSize,comments);

	act(); //进入函数act
		
	function act() {
		//index=f_control_repeat(5,15,index);
		if(index==-1){
			alert("Repeat");
			errors = [];
			eNum = 0;
			index=0;
			$("span.sp3").html(eNum);
			act();
			return;
		}

		if (index<comments.length) {			//如果指针在范围内；
			$(".e_element").hide();				//隐藏所有元素；
			$(".en").html("");					//初始化英文部分；
			$(".cn").html("");					//初始化中文部分；
			$(".f_en").html("");				//例句初始化
			$(".f_cn").html("");				//例句初始化
			$("span.sp1").html(index+1);		//调整当前数值；
			$("span.sp2").html(comments.length);//显示总数；
			$("lib.b").show();					//输入框显示		
			$("textarea.b").val("");			//输入框清空			
			q=comments[index]['q'];
			q_en=comments[index]['q_en'];
			if(q_en==""){
				q_en=q;
			}
			btnQ="Submit";
			$(".f_img").attr("src",".."+comments[index]['image']); //图片区赋值
			$(".q_en").html(q_en);//问题区赋值
			var valueSubject=comments[index]['subject'];
			valueSubject=valueSubject.replace(/[(^*\n*)|(^*\r*)]/g,"");
			$(".f_subject").html(valueSubject);//问题区赋值
			$(".f_subTitle").html(comments[index]['subTitle']);//答案区赋值
			$(".sen .en").html(comments[index]['en']);//问题区赋值
			$(".sen .cn").html(comments[index]['cn']);//答案区赋值
			$(".btnQ").html(btnQ);
			$(".e_act1").show();				//显示：act1元素；
			$(".f_img").attr("src",".."+comments[index]['image']);
			$(".jsEdit").attr("href","http://localhost/git_test073_helper/newsEdit.php?cid="+comments[index]['categoryId']+"&id="+comments[index]['id']);
			//Cn
			f_select2(org_comments,c_select,f_chrome);
			
			if(c_audio==1){
				s_audio="";
				s_audio=comments[index]['subTitle']+".mp3";
				$("audio").attr({"src": ""});
				$("audio").attr({"src": "../audio/"+s_audio});
				audio=document.getElementById('player') //初始化音频路径
//				play(0,1);
			}	
			//End:Cn
//			$("textarea.b")[0].focus();			//输入框焦点
			
            index++;							//指针递进
        }
		else{
			if(errors.length > 0){				//数组【错误列表】不为空
				comments = errors;				//题库赋值错误列表
				if(c_jump==1){
					var arrErrors="";
					for(var iErrors=0, lenErrors=errors.length; iErrors<lenErrors; iErrors++){
						strID=errors[iErrors]['id'];
						if(arrErrors==""){
							arrErrors=strID;
						}else{
							arrErrors=arrErrors+","+strID;
						}
						
					}
	//				alert(arrErrors);
					window.location="testArr.html?id="+pid+"&arr="+arrErrors;
				}else{
					comments=randomOrder(comments);
					errors = [];					//清空：错误列表；
					index = 0;						//初始化：指针
					eNum = 0;						//初始化：错误计数
					$("span.sp3").html('');			//清空：页面错误计数
					act();							//运行函数；
				}
			}else{
				t2=new Date().getTime()-t1;
				//alert(MillisecondToDate(t2));
				//alert(jumpUrl);
				//window.location=jumpUrl+"&title="+MillisecondToDate(t2)+"&error="+getError+"&page="+c_page;
				window.location=jumpUrl;
			}
		}

    }
	
	$("a.btnCn").click(function(){
		$(".sharewith .q").parent().show();
	});
	
	$(".f_btnSelect").click(function() {
			$(".f_1st").hide();
			$(".f_slipt").hide();
			//if($(this).attr("f_a").indexOf()!=-1){
			if($(this).attr("f_a")==$(".f_subject").html().replace('\n')){
				act();
	        } else {
	        	$(this).children(".label").show();
				if(c_level==1){
					if(errors.length<c_eNum){
						errors.push(commentsAll[usual_search2(commentsAll,$(this).attr("f_id"))]);
					}
				}
//				s_audio=commentsAll[usual_search2(commentsAll,$(this).attr("f_id"))]['subTitle']+".mp3";
//				//alert (s_audio);
//				$("audio").attr({"src": "../audio/"+s_audio});
//				play(0,1);
				//错题重复练习数量
				errors.push(comments[index-1]);
				errors.push(comments[index-1]);
				eNum=errors.length;
	//			console.log(errors);
	//			if(index_==""){index_=comments[index-1]['id']}else{index_+=","+comments[index-1]['id']};
				$("span.sp3").html(eNum);
	        };
	});
	


	
	function Arrsplit(s) {
    //s1=0+(s-1)*10;
    //alert(s);
    var x = 5;
    var comments2 = [];
    for (var i = (s - 1) * x, len = s * x; i < len; i++) {
        comments2.push(comments[i]);
    }
    comments = comments2; //题库赋值错误列表
    errors = []; //清空：错误列表；
    index = 0; //初始化：指针
    eNum = 0; //初始化：错误计数
    $("span.sp3").html(''); //清空：页面错误计数	
    act(); //运行函数；	
    $(".f_slipt").hide();
}



//计算总时间
function MillisecondToDate(msd) {
    var time = parseFloat(msd) / 1000;
    if (null != time && "" != time) {
        if (time > 60 && time < 60 * 60) {
            time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) + "秒";
        } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
            time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) + "分钟" + parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) - parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
        } else {
            time = parseInt(time) + "秒";
        }
    }
    return time;
}

//随机改变数组的排序
function randomOrder(targetArray) {
    var arrayLength = targetArray.length
    var tempArray1 = new Array(); //先创建一个正常顺序的数组
    for (var i = 0; i < arrayLength; i++) {
        tempArray1[i] = i
    }
    var tempArray2 = new Array();	//再根据上一个数组创建一个随机乱序的数组
    for (var i = 0; i < arrayLength; i++) {
        tempArray2[i] = tempArray1.splice(Math.floor(Math.random() * tempArray1.length), 1)	//从正常顺序数组中随机抽出元素
    }
    var tempArray3 = new Array();	//最后创建一个临时数组存储 根据上一个乱序的数组从targetArray中取得数据
    for (var i = 0; i < arrayLength; i++) {
        tempArray3[i] = targetArray[tempArray2[i]]
    }
    return tempArray3	//返回最后得出的数组
    //使用实例
    // var tmp = ["1", "2", "3", "4"];
    // alert(randomOrder(tmp));
}

//打印数组
function print_array(arr) {
    var t = 'array(\n';
    for (var key in arr) {
        if (typeof(arr[key]) == 'array' || typeof(arr[key]) == 'object') {
            var t_tmp = key + ' = ' + print_array(arr[key]);
            t += '\t' + t_tmp + '\n';
        } else {
            var t_tmp = key + ' = ' + arr[key];
            t += '\t' + t_tmp + '\n';
        }
    }
    t = t + ')';
    return t;;
}

function f_control_num(num,comments){
	if(num>0){
		var comments2 = [];
		for(i=0;i<=testSize-1;i++){
			comments2.push(comments[i]);
		}
		comments = comments2;
	}
	return comments;
}

function f_control_repeat(num_base,num_max,index){
	if(index<=num_max){
		var r_n = num_base;
		var r_2 = eval((parseInt((index-1)/5)+1)*r_n)
		if(index <= r_2*1 && eNum==eval(r_2*0.4+1)){
			index = -1;
		}		
	}
	return index;
}

function f_select2(org_comments,s_num,f_chrome){
	var arrSelect=[];	//定义select数组；
	for(var i=0, len=org_comments.length; i<len; i++){	//取出当前指针的值。（同时取出与当前指正重复的值。）
		if(org_comments[i]['subTitle']!=comments[index]['subTitle']){
			arrSelect.push(org_comments[i]);
		}	
	}
	arrSelect=randomOrder(arrSelect);	//乱序数组
	
	
	var arrSelect2 = [];	//定时数组2
	
	//select num
	var s_num=s_num-2;
	for(i=0;i<=s_num;i++){	//获得目标数组-1的新数组
		arrSelect2.push(arrSelect[i]);
	}
	arrSelect2.push(comments[index]);	//新数组添加当前指针的值。
	arrSelect = randomOrder(arrSelect2);	//乱序数组。
	
	$(".f_btnSelect").hide();
	for(i=0;i<=s_num+1;i++){
		$(".f_btnNo"+(i+1)).html(arrSelect[i].subTitle); //赋值
		$(".f_btnNo"+(i+1)).attr("f_a",arrSelect[i].subject.replace(/[(^*\n*)|(^*\r*)]/g,""));
		$(".f_btnNo"+(i+1)).attr("f_id",arrSelect[i].id);
		$(".f_btnNo" + (i + 1)).prepend("<span class=\"label label-warning none\">"+arrSelect[i].subject+"</span>&nbsp;");
		if(f_chrome==1){
			$(".f_btnNo" + (i + 1)).prepend("<span class='label label-default' style='width:130px !important;'>[" + $(".f_btnNo" + (i + 1)).attr("id") + "]</span>&nbsp;");
		}
		$(".f_btnNo"+(i+1)).show();
	}	
}

})
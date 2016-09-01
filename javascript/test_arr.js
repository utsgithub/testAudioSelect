﻿var dNum = 0;
var testSize = 0;
var c_audio = 0;
var c_jump = 0;
var c_random = 0;
var c_paly = 2;
var c_size=1; //pageSize:0 none, 1 work
var c_nextSize=1;
var c_next=1;	//往后跳的数量
var c_group=0;
var c_mode=0; //0:lrc mode; 1:normal mode  ////url 选择测试的模式
$(function() {
	pid = getValue("id"); //git id
    if (pid == undefined) { //if id="" then jump to index
        window.location = "index.html";
    }
	
	//get Array
	var comments = [];
	var arr = getValue("arr");
    if (typeof(arr) != "undefined" && arr != "") {
        arr = arr.split(",");
        for (var iArr = 0,
        lenArr = arr.length; iArr < lenArr; iArr++) {
            for (var i = 0,
            len = newsJSON.length; i < len; i++) {
                if (newsJSON[i].id == arr[iArr]) {
                    comments.push(newsJSON[i]);
                }
            }
        }
    } else {
        for (var i = 0,
        len = newsJSON.length; i < len; i++) {
            if (newsJSON[i].categoryId == pid) {
                comments.push(newsJSON[i]);
            }
        }
    }

	pageSize = getValue("pageSize"); //git pageSize
	if (pageSize == undefined){
		pageSize=0;
	}
	c2_audio= getValue("c_audio");
	if(c2_audio == undefined || c2_audio == 0){
		c_audio=0;
	}else{
		c_audio=1;
	}
	//var c2_mode;
	c2_mode=getValue("c_mode");
	//url 选择测试的模式
	if(c2_mode != undefined){
		// c_mode=c2_mode;
	}
	if(c_mode==1 && pageSize==0){
		pageSize=1;
		//window.location=jumpUrl;
	}
//	 if($.browser.safari && navigator.userAgent.toLowerCase().match(/chrome/) != null) {
        c_audio=1;
//		$( ".container" ).css( "zoom", "250%" );
//		$( ".container" ).css( "width", "90%" );
//    }
	if (c_size==1){
		testSize=pageSize;
	}
	if(c_group==1){
		if(pageSize>5){
			c_jump=pageSize-5;
		}
	}
	if(c_group==2){
		if(pageSize>20){
			c_jump=pageSize-5;
		}else{
			c_jump=15;
		}
	}
	/*自动向下跳转*/
	x=getValue("id");	//get id
	a=usual_search(cateJSON,x); //get num
	c=Number(a)+Number(1);
	var jumpUrl="";
	jumpIndex="index.html?pageSize="+(Number(pageSize)+Number(c_next))+"&id="+cateJSON[a].parentId+"&c_audio="+c_audio;
	if(cateJSON[c]!==undefined){
		if(cateJSON[a].parentId==cateJSON[c].parentId){
			if(c_mode==1){
				if(pageSize>comments.length){
					//alert("1");
					jumpUrl="test.html?id="+cateJSON[c].ID+"&pageSize=1&c_audio="+c_audio+"&c_mode="+c_mode;
				}else{
					//alert("2");
					pageSize=Number(pageSize)+Number(c_nextSize);
					jumpUrl="test.html?id="+cateJSON[a].ID+"&pageSize="+pageSize+"&c_audio="+c_audio+"&c_mode="+c_mode; //jump to the beginning and pagesize+1
				}
			}
			if(c_mode==0){
				jumpUrl="test.html?id="+cateJSON[c].ID+"&pageSize="+pageSize+"&c_audio="+c_audio+"&c_mode="+c_mode; //jump to next question category
			}
			if(c_mode==2){
				jumpUrl="test.html?id="+cateJSON[c].ID+"&pageSize="+pageSize+"&c_audio="+c_audio+"&c_mode="+c_mode; //jump to next question catego	
			}
		}else{
			//jumpUrl = "jump.html?id=" + pid;
			jumpUrl=jumpIndex;
		}
	}else{
		jumpUrl=jumpIndex;
	}
	action=getValue("action");
	if(action==1){
		jumpUrl="test.html?id="+x+"&pageSize="+(Number(pageSize)+Number(c_next))+"&c_audio="+c_audio+"&action=1"+"&c_mode="+c_mode;
	}
	
	/*自动向下跳转 end*/
    var audioUrl = "";
    

    
//    $("title").html(cateJSON[usual_search(cateJSON, pid)].category); //change title
//	$("title").text(".brand"); //change title
	$("title").text(cateJSON[usual_search(cateJSON, pid)].category); //change title
	$(".spPageSize").html(pageSize);
//	$(".spTitle").html(cateJSON[usual_search(cateJSON, pid)].category); //change title
	

    var get_c_random = getValue("c_random");
    if ((typeof(get_c_random) != "undefined" && get_c_random != "")) {
        c_random = get_c_random;
    }

    //如果url有传递testsize
    var get_testSize = getValue("testSize");
    if ((typeof(get_testSize) != "undefined" || get_testSize != "")) {
        if (testSize < comments.length) {
            //testSize=get_testSize;	
        } else {
            testSize = comments.length;
        }
    }

    if (c_random == 1) {
        comments = randomOrder(comments)
    };
    comments = f_control_num2(testSize, comments, testSize);
    var t1 = new Date().getTime(); // 初始化时间
    // 数组指针初始化；
    // var index = 0;
	var index=c_jump; //为了可以设置起始的指针
    var index_ = "";

    var errors = []; // 错误返回按钮延时时间；
    var eNum = 0; // 错误计数初始化；
    // 显示全局
    $("#ul").show();

    // 调试开关；
    var debug = "0";
    if (debug == "1") {
        dNum = 0;
    }

    act(); // 进入函数act	
//=====================================================================================================
    
//================================================================================ function act()
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

	if (index<comments.length) {					//如果指针在范围内；
			$(".e_element").hide();				//隐藏所有元素；
			$(".en").html("");					//初始化英文部分；
			$(".cn").html("");					//初始化中文部分；
//			sen1(comments[index]['a']);			//调用句库函数；
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
			if(c_audio==1){
				s_audio="";
				//new edit 6/9/2013
				s_audio=comments[index]['subTitle']+".mp3";
				$("audio").attr({"src": ""});
				$("audio").attr({"src": "../audio/"+s_audio});
				audio=document.getElementById('player') //初始化音频路径
				//play(0,3);
			}	
//=================================================================================			
			var sen=comments[index]['sen'];
			var subject=comments[index]['subject']; //Question (Chinese)
			var subTitle=comments[index]['subTitle']; //Answer (English)
			var hint=comments[index]['hint'];
			if(sen=="" || sen==null){
				sen2=subject;
			}else{
				//sen2=sen;
				sen2=sen.replace(subTitle,'<span class="text-danger">'+subTitle+'</span>');
				//sen2=sen.replace(subTitle,'<span class="font_red">'+subject+'</span>');
			}
			$(".sen").html(sen2);//问题区赋值
//=================================================================================	

//=================================================================================	 BEGIN
			$(".jsEdit").attr("href","http://localhost/git_test073_helper/newsEdit.php?cid="+comments[index]['categoryId']+"&id="+comments[index]['id']);
			$(".f_img").attr("src",".."+comments[index]['image'])
			var lenMAX=subTitle.length;
			var $tex = $("#mainInput");  
			$("#btnPart").hide();
			$('#mainInput').bind('focus keyup input paste',function(){  //采用几个事件来触发（已增加鼠标粘贴事件）
				var lenNow=$(this).attr("value").length;
				if(lenNow>lenMAX){
					$("#lenChange").addClass("label-important");
					$("#btnPart").hide();
				}
				if(lenNow<lenMAX){
					$("#lenChange").attr("class","label label-default");
					$("#btnPart").hide();
				}
				if(lenNow==lenMAX){
					if ($("textarea.b").val().replace(/>/g, "&gt;").toLowerCase() == $(".a .a").html().toLowerCase()) {
						$("#lenChange").addClass("label-success");
						$("#btnPart").show();
						if($("#btnPart a:not(:hidden)").length==1){
							 $("#btnPart a:not(:hidden)").click();
						}
						$("#btnPart").hide();
					} else {
						$("#lenChange").addClass("label-warning");
						$("#btnPart").show();
					};
					
				}
				$('#lenChange').text(lenNow+","+lenMAX)  //获取评论框字符长度并添加到ID="num"元素上
			 
			});	
			$("#lenMax").html(lenMAX);
			
//=================================================================================	 END		
			
			$(".q_en").html(q_en);//问题区赋值
			
			$(".q").html(comments[index]['subject']);//问题区赋值
			//$("title").html(cateJSON[usual_search(cateJSON,pid)].category+'-'+comments[index]['subject']);	//change title
//			$("title").html($(".brand").text()); //change title
			$(".spTitle").html(cateJSON[usual_search(cateJSON,pid)].category);
			$(".a .a").html(comments[index]['subTitle']);//答案区赋值
			if(hint!=""&hint!=null){
				$(".hint").html(hint);//提示区赋值
			}else{
				//$(".hint").parents().hide();
				// $(".hint").html(comments[index]['subTitle']);//提示区赋值
			}
			$(".sen .en").html(comments[index]['en']);//句子问题区赋值
			$(".sen .cn").html(comments[index]['cn']);//句子答案区赋值
			$(".btnQ").html(btnQ);
			$(".e_act1").show();				//显示：act1元素；

			$("textarea.b")[0].focus();			//输入框焦点
//*************************************************************************************************			
			//$("textarea.b").val(comments[index]['subTitle']);
			
            index++;							//指针递进
        }
		else{
			if(errors.length > 0){				//数组【错误列表】不为空
				comments=errors;
				//comments = randomOrder(errors);				//题库赋值错误列表
				errors = [];					//清空：错误列表；
				index = 0;						//初始化：指针
				eNum = 0;						//初始化：错误计数
				$("span.sp3").html('');			//清空：页面错误计数
				act();							//运行函数；
			}else{
				$("textarea.b").val("");
				t2=new Date().getTime()-t1;
				$(".brand").html(MillisecondToDate(t2));
				window.onbeforeunload = ""; 
				window.location=jumpUrl;
				//window.location="index."+bothPage+"#pid"+pid;
			}
		}

    }
//================================================================================ function act()

	function changeNum(maxNum){  
				//汉字的个数  
				str = ($(".mainInput").val().replace(/\w/g,"")).length;  
				//非汉字的个数  
				abcnum = $(".mainInput").val().length-str;          
				total = str*2+abcnum;          
				if(str*2+abcnum<maxNum || str*2+abcnum == maxNum){  
						$but.removeClass()  
						$but.addClass("but");  
						texts =Math.ceil((maxNum - (str*2+abcnum))/2);  
						$("p").html("您还可以输入的字数<span>"+texts+"</span>").children().css({"color":"blue"});  
				}else if(str*2+abcnum>maxNum){  
						$but.removeClass("")  
						$but.addClass("grey");  
						texts =Math.ceil(((str*2+abcnum)-maxNum)/2);  
						$("p").html("您输入的字数超过了<span>"+texts+"</span>").children("span").css({"color":"red"});  
				}      
			}      
	function act2() {
        $(".e_element").hide(); //隐藏所有元素；
        $("textarea.b").val("");
		
        $(".e_act2").show(); //显示：act2元素；
		$("textarea.b").focus();
    }
    function act3() {
        $(".e_element").hide(); //隐藏所有元素；
        //$(".sharewith.a").show();
        $(".sharewith.e .e").html($("textarea.b").val());
        //		$(".sharewith.e").show();
        //		$(".sharewith.en").show();
        //		$(".sharewith.cn").show();
        $("textarea.b").val("");
        //		$("div.lib").hide();
        //		$("a.btn1").hide();
        $("a.btnP").show();
        if (c_audio == 1) {
            audio = document.getElementById('player');
            play(0, c_paly); //错误后重复3次
        }
        //audio.play();
        $(".e_act3").show(); //显示：act3元素；
        $("a.btn2").hide().delay(dNum).fadeIn();
        $("a.btn3").hide();

    }
    $("a.btnCn").click(function() {
        $(".sharewith .q").parent().show();

    });
    $("a.btn1").click(function() {
        $(".f_slipt").hide();
        if ($("textarea.b").val().replace(/>/g, "&gt;").toLowerCase() == $(".a .a").html().toLowerCase()) {
            act();
        } else {
            act3();
            eNum += 1;
            errors.push(comments[index - 1]);
//            eNum += 1;
//            errors.push(comments[index - 1]);
            //				eNum+=1
            //				errors.push(comments[index-1]);
            $("span.sp3").html(eNum);
            //			console.log(errors);
            //			if(index_==""){index_=comments[index-1]['id']}else{index_+=","+comments[index-1]['id']};
            $("span.sp3").html(eNum);

        };
    });
    $("a.btn2").click(function() {
        act2()
    });
    $("a.btn3").click(function() {
        if ($("textarea.b").val().replace(/>/g, "&gt;").toLowerCase() == $(".a .a").html().toLowerCase()) {
            act()
        } else {
            act3();
 //单词测试的时候，释放“注销”可以增加难度，但是测试句子的时候建议“注销”
 //           eNum += 1;
 //           errors.push(comments[index - 1]);
 //           $("span.sp3").html(eNum);
        };
    });
    function Arrsplit(s) {
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

    //function sen1(a) {
    //    for (x in senJSON) {
    //        if (senJSON[x].en != null) {
    //            if (a.toLowerCase().indexOf(senJSON[x].en.toLowerCase()) >= 0) {
    //            	$(".f_en").html(a.replace(senJSON[x].en,'<span class="font_red">'+senJSON[x].en+'</span>'));
    //                $(".f_cn").html(senJSON[x].cn);
    //                break;
    //            }
    //        }
    //    }
    //}
    function sen1(a) {
        for (x in senJSON) {
            if (senJSON[x].en != null) {
                //if (a.toLowerCase().indexOf(senJSON[x].en.toLowerCase()) >= 0) {
                if (senJSON[x].en.toLowerCase().indexOf(a.toLowerCase()) >= 0) {
                    $(".f_en").html(senJSON[x].en.replace(a, '<span class="font_red">' + a + '</span>'));
                    break;
                }
            }
        }
    }

    //计算总时间
    function MillisecondToDate(msd) {
        var time = parseFloat(msd) / 1000;
        if (null != time && "" != time) {
            if (time > 60 && time < 60 * 60) {
                time = parseInt(time / 60.0) + "min" + parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) + "sec";
            } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
                time = parseInt(time / 3600.0) + "hr" + parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) + "min" + parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) - parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "sec";
            } else {
                time = parseInt(time) + "sec";
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
        var tempArray2 = new Array(); //再根据上一个数组创建一个随机乱序的数组
        for (var i = 0; i < arrayLength; i++) {
            tempArray2[i] = tempArray1.splice(Math.floor(Math.random() * tempArray1.length), 1) //从正常顺序数组中随机抽出元素
        }
        var tempArray3 = new Array(); //最后创建一个临时数组存储 根据上一个乱序的数组从targetArray中取得数据
        for (var i = 0; i < arrayLength; i++) {
            tempArray3[i] = targetArray[tempArray2[i]]
        }
        return tempArray3 //返回最后得出的数组
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

    function f_control_num(num, comments) {
        if (num > 0) {
            var comments2 = [];
            for (i = 0; i <= testSize - 1; i++) {
                comments2.push(comments[i]);
            }
            comments = comments2;
        }
        return comments;
    }

    function f_control_repeat(num_base, num_max, index) {
        if (index <= num_max) {
            var r_n = num_base;
            var r_2 = eval((parseInt((index - 1) / 5) + 1) * r_n);
            if (index <= r_2 * 1 && eNum == eval(r_2 * 0.4 + 1)) {
                index = -1;
            }
        }
        return index;
    }

    function f_select(org_comments, s_num, f_chrome) {
        var arrSelect = []; //定义select数组；
        for (var i = 0,
        len = org_comments.length; i < len; i++) { //取出当前指针的值。（同时取出与当前指正重复的值。）
            if (org_comments[i]['subTitle'] != comments[index]['subTitle']) {
                arrSelect.push(org_comments[i]);
            }
        }
        arrSelect = randomOrder(arrSelect); //乱序数组

        var arrSelect2 = []; //定时数组2
        //select num
        var s_num = s_num - 2;
        for (i = 0; i <= s_num; i++) { //获得目标数组-1的新数组
            arrSelect2.push(arrSelect[i]);
        }
        arrSelect2.push(comments[index]); //新数组添加当前指针的值。
        arrSelect = randomOrder(arrSelect2); //乱序数组。
        $(".f_btnSelect").hide();
        for (i = 0; i <= s_num + 1; i++) {
            $(".f_btnNo" + (i + 1)).html(arrSelect[i].subject); //赋值
            $(".f_btnNo" + (i + 1)).attr("f_a", arrSelect[i].subTitle);
            $(".f_btnNo" + (i + 1)).attr("f_id", arrSelect[i].id);
            $(".f_btnNo" + (i + 1)).prepend("<span class=\"label label-warning none\">" + arrSelect[i].subTitle + "</span>&nbsp;");
            if (f_chrome == 1) {
                $(".f_btnNo" + (i + 1)).prepend("<span class='label' style='width:130px !important;'>[" + $(".f_btnNo" + (i + 1)).attr("id") + "]</span>&nbsp;");
            }
            $(".f_btnNo" + (i + 1)).show();
        }
    }
    function f_select2(org_comments, s_num, f_chrome) {
        var arrSelect = []; //定义select数组；
        for (var i = 0,
        len = org_comments.length; i < len; i++) { //取出当前指针的值。（同时取出与当前指正重复的值。）
            if (org_comments[i]['subTitle'] != comments[index]['subTitle']) {
                arrSelect.push(org_comments[i]);
            }
        }
        arrSelect = randomOrder(arrSelect); //乱序数组

        var arrSelect2 = []; //定时数组2
        //select num
        var s_num = s_num - 2;
        for (i = 0; i <= s_num; i++) { //获得目标数组-1的新数组
            arrSelect2.push(arrSelect[i]);
        }
        arrSelect2.push(comments[index]); //新数组添加当前指针的值。
        arrSelect = randomOrder(arrSelect2); //乱序数组。
        $(".f_btnSelect").hide();
        for (i = 0; i <= s_num + 1; i++) {
            $(".f_btnNo" + (i + 1)).html(arrSelect[i].subTitle); //赋值
            $(".f_btnNo" + (i + 1)).attr("f_a", arrSelect[i].subject);
            $(".f_btnNo" + (i + 1)).attr("f_id", arrSelect[i].id);
            $(".f_btnNo" + (i + 1)).prepend("<span class=\"label label-warning none\">" + arrSelect[i].subject + "</span>&nbsp;");
            if (f_chrome == 1) {
                $(".f_btnNo" + (i + 1)).prepend("<span class='label' style='width:130px !important;'>[" + $(".f_btnNo" + (i + 1)).attr("id") + "]</span>&nbsp;");
            }
            $(".f_btnNo" + (i + 1)).show();
        }
    }

})


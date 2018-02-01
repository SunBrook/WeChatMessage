/**关键词无效回复**/

//更新消息框的文本
function update_ErrorKey_text(textHtml) {
	$("#edit_area02").html(textHtml);
	//更新剩余还可以输入多少字
	update_wordcount02();
    //消息框获取焦点
	set_focus02();
	//更新光标位置
	update_cur();
}

//初始化关键字无效回复
function clear_ErrorKey_Msg() {
    //默认选中第一项文本，并清空文本内容
    $("#panel2").find(".wxface").find(".current").removeClass("current");
    $("#panel2").find(".wxface").find(".type_text").parent().addClass("current");
    $("#edit_area02").html("");
    //更新剩余还可以输入多少字
    update_wordcount02();
    //消息框获取焦点
    set_focus02();
    //更新光标位置
    update_cur();
}

//获取关键词无效回复 数据
function getErrorKeyMsg() {
    var testdata={
        "Id": 21,
        "SpecialType": "errorKey",
        "SpecialTypeTitle": "无效关键字",
        "ReturnMsgType": "text",
        "ReturnMsgTypeTitle": "文本",
        "TextContent": "您好，易易找不到您所要的答案[发抖][玫瑰][嘴唇][转圈]\n2g非凡哥[菜刀]€\n[憨笑][快哭了][跳跳][跳跳]   x\n&",
        "ImageMediaId": null,
        "VoiceMediaId": null,
        "VideoMediaId": null,
        "VideoThumbMediaId": null,
        "VideoTitle": null,
        "VideoDescription": null,
        "TextHtml": "您好，易易找不到您所要的答案<img class=\"edit_face\" style=\"background-position-y:-1500px\" data-key=\"[发抖]\" src=\"images/pic_blank.gif\"><img class=\"edit_face\" style=\"background-position-y:-1100px\" data-key=\"[玫瑰]\" src=\"images/pic_blank.gif\"><img class=\"edit_face\" style=\"background-position-y:-1140px\" data-key=\"[嘴唇]\" src=\"images/pic_blank.gif\"><img class=\"edit_face\" style=\"background-position-y:-1540px\" data-key=\"[转圈]\" src=\"images/pic_blank.gif\"><br>2g非凡哥<img class=\"edit_face\" style=\"background-position-y:-1000px\" data-key=\"[菜刀]\" src=\"images/pic_blank.gif\">€\n<img class=\"edit_face\" style=\"background-position-y:-520px\" data-key=\"[憨笑]\" src=\"images/pic_blank.gif\"><img class=\"edit_face\" style=\"background-position-y:-920px\" data-key=\"[快哭了]\" src=\"images/pic_blank.gif\"><img class=\"edit_face\" style=\"background-position-y:-1480px\" data-key=\"[跳跳]\" src=\"images/pic_blank.gif\"><img class=\"edit_face\" style=\"background-position-y:-1480px\" data-key=\"[跳跳]\" src=\"images/pic_blank.gif\">&nbsp;&nbsp; x<br>&amp;"
    };

	var data=testdata;//测试数据
    //添加数据
    switch (data.ReturnMsgType) {
        case "text"://文本
            update_ErrorKey_text(data.TextHtml);
            break;
        case "imgWordUrl"://图文（跳转到外链）
            break;
        case "imgWordMedia"://图文（跳转到图文消息页面）
            break;
        case "image"://图片
            break;
        case "voice"://语音
            break;
        case "video"://视频
            break;
    }
    if (data.Id > 0) {
        //启用删除回复按钮
        $("#panel2").find(".js_remove").removeClass("delBtn_disabled");
    } else {
        //禁用删除回复按钮
        $("#panel2").find(".js_remove").addClass("delBtn_disabled");
        //清空为初始状态
        clear_ErrorKey_Msg();
    }
	/*
	* $.ajax({
		url: '/WeChat/GetErrorKeyMsg',
		type: "post",
		dataType: "json",
		success: function (data) {
		    //添加数据
		    switch (data.ReturnMsgType) {
		        case "text"://文本
		            update_ErrorKey_text(data.TextHtml);
		            break;
		        case "imgWordUrl"://图文（跳转到外链）
		            break;
		        case "imgWordMedia"://图文（跳转到图文消息页面）
		            break;
		        case "image"://图片
		            break;
		        case "voice"://语音
		            break;
		        case "video"://视频
		            break;
		    }
			if (data.Id > 0) {
				//启用删除回复按钮
				$("#panel2").find(".js_remove").removeClass("delBtn_disabled");
			} else {
			    //禁用删除回复按钮
			    $("#panel2").find(".js_remove").addClass("delBtn_disabled");
			    //清空为初始状态
			    clear_ErrorKey_Msg();
			}
		},
		error: function (e, textStatus, errorThrown) {
			show_tip_error("加载信息失败", "请联系管理员：[error]" + errorThrown);
		}
	});
	* */

}

//回复消息长度检查
function edit_area_checkLength_02() {
	var edit_msg = getEditAreaMsg_02();
	if (edit_msg.length == 0) {
		show_tip_error("回复内容不能为空");
		return false;
	} else if (edit_msg.length > 600) {
		show_tip_error("回复内容不能超过600字");
		return false;
	}
	return true;
}

//新增关键字无效文本
function insert_ErrorKey_TextMsg() {
	//验证回复消息
	if (!edit_area_checkLength_02()) {
		//回复内容长度不对
		return;
	}
	//保存到数据库
	var textHtml = $("#edit_area02").html();
	var textMsg = getEditAreaMsg_02();
	$.ajax({
		url: '/WeChat/UpdateErrorKeyTextMsg',
		type: "post",
		dataType: "json",
		data: {textHtml: textHtml, textMsg: textMsg },
		success: function (response) {
			if (response.status) {
				//刷新消息列表
				show_tip_success("更新成功");
				//重新加载数据
				getErrorKeyMsg();

			} else {
				show_tip_error("更新失败，" + response.msg);
			}
		},
		error: function (e, textStatus, errorThrown) {
			//程序异常 弹窗提示
			show_tip_error("更新失败，[error]" + errorThrown);
		}
	});
}

//删除关键字无效文本
function delete_ErrorKey_TextMsg() {
    $.ajax({
        url: '/WeChat/DeleteErrorKeyTextMsg',
        type: "post",
        dataType: "json",
        success: function (response) {
            if (response.status) {
                //刷新消息列表
                show_tip_success("删除成功");
                //重新加载数据
                getErrorKeyMsg();

            } else {
                show_tip_error("删除失败，" + response.msg);
            }
        },
        error: function (e, textStatus, errorThrown) {
            //程序异常 弹窗提示
            show_tip_error("删除失败，[error]" + errorThrown);
        }
    });
}

$(function () {
	//加载数据
	getErrorKeyMsg();
	//保存按钮点击
	$("#panel2").find(".btn_save").click(function () {
		//判断类型,当前只考虑文本
		var msg_type = $(".cmm_02").find(".wxface").find(".current").find("i").attr("class");
		switch (msg_type) {
			case "type_text"://文字
				insert_ErrorKey_TextMsg();
				break;
			case "type_imgwordUrl"://图文（跳转到外链）
				break;
			case "type_imgwordMedia"://图文（跳转到图文消息页面）
				break;
			case "type_img"://图片
				break;
			case "type_voice"://语音
				break;
			case "type_video"://视频
				break;
		}
	});

    //删除回复按钮点击
	$("#panel2").find(".js_remove").click(function () {
	    //判断是否被禁用，如果被禁用就不触发
	    if ($(this).hasClass("delBtn_disabled")) return;
	    //判断类型,当前只考虑文本
	    var msg_type = $(".cmm_02").find(".wxface").find(".current").find("i").attr("class");
	    switch (msg_type) {
	        case "type_text"://文字
	            delete_ErrorKey_TextMsg();
	            break;
	        case "type_imgwordUrl"://图文（跳转到外链）
	            break;
	        case "type_imgwordMedia"://图文（跳转到图文消息页面）
	            break;
	        case "type_img"://图片
	            break;
	        case "type_voice"://语音
	            break;
	        case "type_video"://视频
	            break;
	    }
	});
});
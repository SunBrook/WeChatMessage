/**订阅回复消息**/

//更新消息框的文本
function update_Subscribe_text(textHtml) {
    $("#edit_area03").html(textHtml);
    //更新剩余还可以输入多少字
    update_wordcount03();
    //消息框获取焦点
    set_focus03();
    //更新光标位置
    update_cur();
}

//初始化关订阅消息回复
function clear_Subscribe_Msg() {
    //默认选中第一项文本，并清空文本内容
    $("#panel3").find(".wxface").find(".current").removeClass("current");
    $("#panel3").find(".wxface").find(".type_text").parent().addClass("current");
    $("#edit_area03").html("");
    //更新剩余还可以输入多少字
    update_wordcount03();
    //消息框获取焦点
    set_focus03();
    //更新光标位置
    update_cur();
}

//获取关键词无效回复 数据
function getSubscribeMsg() {
    var testdata={
        "Id": 21,
        "SpecialType": "subscribeMsg",
        "SpecialTypeTitle": "关注消息",
        "ReturnMsgType": "text",
        "ReturnMsgTypeTitle": "文本",
        "TextContent": "哈哈哈      终于等到你了，欧耶！123*&&…………\n感谢您的关注\n[悠闲]\n[悠闲][拥抱][捂脸][奸笑][机智][皱眉]\n[色][得意]\n[傲慢]\n[礼物][嘿哈]<,\n",
        "ImageMediaId": null,
        "VoiceMediaId": null,
        "VideoMediaId": null,
        "VideoThumbMediaId": null,
        "VideoTitle": null,
        "VideoDescription": null,
        "TextHtml": "哈哈哈&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 终于等到你了，欧耶！123*&amp;&amp;…………<br>感谢您的关注<br><img class=\"edit_face\" style=\"background-position-y:-540px\" data-key=\"[悠闲]\" src=\"images/pic_blank.gif\"><br><img class=\"edit_face\" style=\"background-position-y:-540px\" data-key=\"[悠闲]\" src=\"images/pic_blank.gif\"><img class=\"edit_face\" style=\"background-position-y:-1300px\" data-key=\"[拥抱]\" src=\"images/pic_blank.gif\"><img class=\"edit_face\" style=\"background-position-y:-1740px\" data-key=\"[捂脸]\" src=\"images/pic_blank.gif\"><img class=\"edit_face\" style=\"background-position-y:-1760px\" data-key=\"[奸笑]\" src=\"images/pic_blank.gif\"><img class=\"edit_face\" style=\"background-position-y:-1780px\" data-key=\"[机智]\" src=\"images/pic_blank.gif\"><img class=\"edit_face\" style=\"background-position-y:-1800px\" data-key=\"[皱眉]\" src=\"images/pic_blank.gif\"><br><img class=\"edit_face\" style=\"background-position-y:-40px\" data-key=\"[色]\" src=\"images/pic_blank.gif\"><img class=\"edit_face\" style=\"background-position-y:-80px\" data-key=\"[得意]\" src=\"images/pic_blank.gif\"><br><img class=\"edit_face\" style=\"background-position-y:-440px\" data-key=\"[傲慢]\" src=\"images/pic_blank.gif\"><br><img class=\"edit_face\" style=\"background-position-y:-1920px\" data-key=\"[礼物]\" src=\"images/pic_blank.gif\"><img class=\"edit_face\" style=\"background-position-y:-1720px\" data-key=\"[嘿哈]\" src=\"images/pic_blank.gif\">&gt;&gt;&lt;,<br>"
    };
    var data=testdata;//测试数据
    //添加数据
    switch (data.ReturnMsgType) {
        case "text"://文本
            update_Subscribe_text(data.TextHtml);
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
        $("#panel3").find(".js_remove").removeClass("delBtn_disabled");
    } else {
        //禁用删除回复按钮
        $("#panel3").find(".js_remove").addClass("delBtn_disabled");
        //清空为初始状态
        clear_Subscribe_Msg();
    }

    /*
    *  $.ajax({
        url: '/WeChat/GetSubscribeMsg',
        type: "post",
        dataType: "json",
        success: function (data) {
            //添加数据
            switch (data.ReturnMsgType) {
                case "text"://文本
                    update_Subscribe_text(data.TextHtml);
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
                $("#panel3").find(".js_remove").removeClass("delBtn_disabled");
            } else {
                //禁用删除回复按钮
                $("#panel3").find(".js_remove").addClass("delBtn_disabled");
                //清空为初始状态
                clear_Subscribe_Msg();
            }
        },
        error: function (e, textStatus, errorThrown) {
            show_tip_error("加载信息失败", "请联系管理员：[error]" + errorThrown);
        }
    });
    * */
}

//回复消息长度检查
function edit_area_checkLength_03() {
    var edit_msg = getEditAreaMsg_03();
    if (edit_msg.length == 0) {
        show_tip_error("回复内容不能为空");
        return false;
    } else if (edit_msg.length > 600) {
        show_tip_error("回复内容不能超过600字");
        return false;
    }
    return true;
}

//新增订阅文本
function insert_Subscribe_TextMsg() {
    //验证回复消息
    if (!edit_area_checkLength_03()) {
        //回复内容长度不对
        return;
    }
    //保存到数据库
    var textHtml = $("#edit_area03").html();
    var textMsg = getEditAreaMsg_03();
    $.ajax({
        url: '/WeChat/UpdateSubscribeTextMsg',
        type: "post",
        dataType: "json",
        data: { textHtml: textHtml, textMsg: textMsg },
        success: function (response) {
            if (response.status) {
                //刷新消息列表
                show_tip_success("更新成功");
                //重新加载数据
                getSubscribeMsg();

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

//删除订阅文本
function delete_Subscribe_TextMsg() {
    $.ajax({
        url: '/WeChat/DeleteSubscribeTextMsg',
        type: "post",
        dataType: "json",
        success: function (response) {
            if (response.status) {
                //刷新消息列表
                show_tip_success("删除成功");
                //重新加载数据
                getSubscribeMsg();

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
    getSubscribeMsg();
    //保存按钮点击
    $("#panel3").find(".btn_save").click(function () {
        //判断类型,当前只考虑文本
        var msg_type = $(".cmm_03").find(".wxface").find(".current").find("i").attr("class");
        switch (msg_type) {
            case "type_text"://文字
                insert_Subscribe_TextMsg();
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
    $("#panel3").find(".js_remove").click(function () {
        //判断是否被禁用，如果被禁用就不触发
        if ($(this).hasClass("delBtn_disabled")) return;
        //判断类型,当前只考虑文本
        var msg_type = $(".cmm_03").find(".wxface").find(".current").find("i").attr("class");
        switch (msg_type) {
            case "type_text"://文字
                delete_Subscribe_TextMsg();
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
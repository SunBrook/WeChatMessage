/**关键字选项卡逻辑**/

//字数不超过76字符
function isLength76(str) {
    return /^[a-zA-Z]{1,76}$/.test((str + '').replace(/[\u4e00-\u9fa5]/g, 'aa').replace(/./g, 'a'));
}

//table列是文本类型
function showTable_text(item) {
    var tbody = $("#panel1").find(".table_div").find("tbody");
    var status = item.Status ? "禁用" : "启用";
    //字数超过38个中文字符或者76个字符，文本向左对齐，其他的居中对齐
    var tr = '<tr>' +
                '<td class="serachKey_td">' + item.SearchKey + '</td>';
    if (isLength76(item.TextContent)) {
        tr += '<td class="second-child">' + item.TextHtml + '</td>';
    } else {
        tr += '<td class="second-child" style="text-align:left;">' + item.TextHtml + '</td>';
    }
    tr +=
                '<td class="third-child" data-type="' + item.ReturnMsgType + '">' + item.ReturnMsgTypeTitle + '</td>' +
                '<td>' +
                    '<div class="link-group">' +
                        '<a href="javascript:void(0);" class="group-link status_btn" data-id="' + item.Id + '" data-toStatus="' + !item.Status + '" onclick="update_status(this)">' + status + '</a>' +
                        '<a href="javascript:void(0);" class="group-link update_btn" data-id="' + item.Id + '" onclick="update_msg(this)">编辑</a>' +
                        '<a href="javascript:void(0);" class="group-link delete_btn" data-id="' + item.Id + '" onclick="delete_tr(this)">删除</a>' +
                    '</div>' +
                '</td>' +
            '</tr>';
    tbody.append(tr);
}

//判断是否有滚动条
function hasScrolled(obj, direction) {
    if (direction === 'vertical') {
        return obj[0].scrollHeight > obj.innerHeight();
    } else if (direction === 'horizontal') {
        return obj[0].scrollWidth > obj.innerWidth();
    }
}

//滚动条状态对应的样式修改
function updateStyleScroll() {
    if (hasScrolled($("#panel1").find(".table_div").find("tbody"), "vertical")) {
        $("#panel1").find(".table_div").find("th").last().addClass("paddingright37");
    } else {
        $("#panel1").find(".table_div").find("th").last().removeClass("paddingright37");
    }
}

//获取关键字回复信息
function getKeyMsg() {
    var testdata = [{
        "Id": 2,
        "SearchKey": "opt",
        "ReturnMsgType": "text",
        "ReturnMsgTypeTitle": "文本",
        "Status": true,
        "Deleted": false,
        "TextContent": "那些心灵鸡汤和成功学告诉我们，科比是凌[得意][害羞]晨四点钟起的，马云一天要飞几个国家，王健林一天只睡五个小时……[亲亲][呲牙][月亮]\\n那些心灵鸡汤和成功学告诉我们，科比是凌晨四点钟起的，[怄火][转圈]马云一天要飞几个国家，王健林一天只睡五个小时……[流泪]",
        "TextHtml": "那些心灵鸡汤和成功学告诉我们，科比是凌<img class=\"edit_face\" style=\"background-position-y:-80px\" data-key=\"[得意]\" src=\"images/pic_blank.gif\"><img class=\"edit_face\" style=\"background-position-y:-120px\" data-key=\"[害羞]\" src=\"images/pic_blank.gif\">晨四点钟起的，马云一天要飞几个国家，王健林一天只睡五个小时……<img class=\"edit_face\" style=\"background-position-y:-960px\" data-key=\"[亲亲]\" src=\"images/pic_blank.gif\"><img class=\"edit_face\" style=\"background-position-y:-260px\" data-key=\"[呲牙]\" src=\"images/pic_blank.gif\"><img class=\"edit_face\" style=\"background-position-y:-1260px\" data-key=\"[月亮]\" src=\"images/pic_blank.gif\"><div>那些心灵鸡汤和成功学告诉我们，科比是凌晨四点钟起的，<img class=\"edit_face\" data-key=\"[怄火]\" src=\"images/pic_blank.gif\" style=\"background-position-y: -1520px;\"><img class=\"edit_face\" data-key=\"[转圈]\" src=\"images/pic_blank.gif\" style=\"background-position-y: -1540px;\">马云一天要飞几个国家，王健林一天只睡五个小时……<img class=\"edit_face\" style=\"background-position-y:-100px\" data-key=\"[流泪]\" src=\"images/pic_blank.gif\"></div>",
        "ImgWordList": null,
        "ImgWordMediaId": null,
        "ImageMediaId": null,
        "VoiceMediaId": null,
        "VideoMediaId": null,
        "VideoThumbMediaId": null,
        "VideoTitle": null,
        "VideoDescription": null
    }, {
        "Id": 6,
        "SearchKey": "年度催泪",
        "ReturnMsgType": "text",
        "ReturnMsgTypeTitle": "文本",
        "Status": true,
        "Deleted": false,
        "TextContent": "22岁生日，一个人吃火锅，[咒骂][疑问]还好锅底可以点最辣的；\n187次路过的码头，4次遇到一对情侣，[蛋糕]两个人眼中的风景，也不见得更好看；????\n第6次一个人搬家，扔掉了3箱旧东西，很遗憾，好像连回忆也一并被丢弃了。",
        "TextHtml": "22岁生日，一个人吃火锅，<img class=\"edit_face\" style=\"background-position-y:-580px\" data-key=\"[咒骂]\" src=\"images/pic_blank.gif\"><img class=\"edit_face\" style=\"background-position-y:-600px\" data-key=\"[疑问]\" src=\"images/pic_blank.gif\">还好锅底可以点最辣的；<div>187次路过的码头，4次遇到一对情侣，<img class=\"edit_face\" style=\"background-position-y:-1200px\" data-key=\"[蛋糕]\" src=\"images/pic_blank.gif\">两个人眼中的风景，也不见得更好看；<img class=\"edit_face\" style=\"background-position-y:-1640px\" data-key=\"??\" src=\"images/pic_blank.gif\"><img class=\"edit_face\" style=\"background-position-y:-1640px\" data-key=\"??\" src=\"images/pic_blank.gif\"></div><div>第6次一个人搬家，扔掉了3箱旧东西，很遗憾，好像连回忆也一并被丢弃了。</div>",
        "ImgWordList": null,
        "ImgWordMediaId": null,
        "ImageMediaId": null,
        "VoiceMediaId": null,
        "VideoMediaId": null,
        "VideoThumbMediaId": null,
        "VideoTitle": null,
        "VideoDescription": null
    }, {
        "Id": 7,
        "SearchKey": "帮助时代",
        "ReturnMsgType": "text",
        "ReturnMsgTypeTitle": "文本",
        "Status": false,
        "Deleted": false,
        "TextContent": "《2017年抑郁症调研报告：仅10%抑郁症患者获系统治疗》这篇文章中提到，世界上约有3.5亿人患有抑郁症， \n瑞典的发病率为 6.16%，美国为4.45%，中国为3.02%。并且这一数字也有逐年增加的趋势。[玫瑰]jjjiiii",
        "TextHtml": "《2017年抑郁症调研报告：仅10%抑郁症患者获系统治疗》这篇文章中提到，世界上约有3.5亿人患有抑郁症，&nbsp;<div>瑞典的发病率为 6.16%，美国为4.45%，中国为3.02%。并且这一数字也有逐年增加的趋势。<img class=\"edit_face\" style=\"background-position-y:-1100px\" data-key=\"[玫瑰]\" src=\"images/pic_blank.gif\">jjjiiii</div>",
        "ImgWordList": null,
        "ImgWordMediaId": null,
        "ImageMediaId": null,
        "VoiceMediaId": null,
        "VideoMediaId": null,
        "VideoThumbMediaId": null,
        "VideoTitle": null,
        "VideoDescription": null
    }];
    var data = testdata;
    //清空列表
    var old_tr = $("#panel1").find(".table_div").find("tbody").find("tr");
    for (var i = 0; i < old_tr.length; i++) {
        if ($(old_tr[i]).hasClass("null_data_tr") || $(old_tr[i]).hasClass("showTip_data_tr")) continue;
        $(old_tr[i]).remove();
    }
        if (data.length > 0) {
            //隐藏无数据提示
            $("#panel1").find(".table_div").find(".null_data_tr").hide();
            //生成Table的列
            for (var i = 0; i < data.length; i++) {
                //根据类型不同而生成不同的列
                switch (data[i].ReturnMsgType) {
                    case "text"://文本
                        showTable_text(data[i]);
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
            }
            //统一表格表头的宽度，为了对齐
            setTimeout(function () {
                updateStyleScroll();
            }, 500);
        } else {
            //显示无数据提示
            $("#panel1").find(".table_div").find(".null_data_tr").show();
        }
        //显示全部的隐藏
        $("#panel1").find(".table_div").find(".showTip_data_tr").hide();
        //如果有筛选，那么需要筛选
        key_Filter();

        /*
        *  $.ajax({
            url: '/WeChat/GetSearchMsg',
            type: "post",
            dataType: "json",
            success: function (data) {
                //清空列表
                var old_tr = $("#panel1").find(".table_div").find("tbody").find("tr");
                for (var i = 0; i < old_tr.length; i++) {
                    if ($(old_tr[i]).hasClass("null_data_tr") || $(old_tr[i]).hasClass("showTip_data_tr")) continue;
                    $(old_tr[i]).remove();
                }
                if (data.length > 0) {
                    //隐藏无数据提示
                    $("#panel1").find(".table_div").find(".null_data_tr").hide();
                    //生成Table的列
                    for (var i = 0; i < data.length; i++) {
                        //根据类型不同而生成不同的列
                        switch (data[i].ReturnMsgType) {
                            case "text"://文本
                                showTable_text(data[i]);
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
                    }
                    //统一表格表头的宽度，为了对齐
                    setTimeout(function () {
                        updateStyleScroll();
                    }, 500);
                } else {
                    //显示无数据提示
                    $("#panel1").find(".table_div").find(".null_data_tr").show();
                }
                //显示全部的隐藏
                $("#panel1").find(".table_div").find(".showTip_data_tr").hide();
                //如果有筛选，那么需要筛选
                key_Filter();
            },
            error: function (e, textStatus, errorThrown) {
                popInit("warn", "加载信息列表失败", "请联系管理员：[error]" + errorThrown, null);
            }
        });
        * */



}

//启用回复
function status_On(id) {
    $.ajax({
        url: '/WeChat/UpdateKeyMsgStatus',
        type: "post",
        dataType: "json",
        data: { id: id, status: true },
        success: function (response) {
            if (response.status) {
                //刷新消息列表
                getKeyMsg();
                popInit("success", "启用成功", "更新了消息列表", null);

            } else {
                popInit("warn", "启用失败", response.msg, null);
            }
        },
        error: function (e, textStatus, errorThrown) {
            //程序异常 弹窗提示
            popInit("warn", "启用失败", "请联系管理员：[error]" + errorThrown, null);
        }
    });
}

//禁用回复
function status_Off(id) {
    $.ajax({
        url: '/WeChat/UpdateKeyMsgStatus',
        type: "post",
        dataType: "json",
        data: { id: id, status: false },
        success: function (response) {
            if (response.status) {
                //刷新消息列表
                getKeyMsg();
                popInit("success", "禁用成功", "更新了消息列表", null);

            } else {
                popInit("warn", "禁用失败", response.msg, null);
            }
        },
        error: function (e, textStatus, errorThrown) {
            //程序异常 弹窗提示
            popInit("warn", "禁用失败", "请联系管理员：[error]" + errorThrown, null);
        }
    });
}

//更新状态
function update_status(obj) {
    var to_status = $(obj).data("tostatus");
    var id = $(obj).data("id");
    if (to_status) {
        //启用
        popInit("tip", "启用回复", "用户回复关键字，可以得到相应的回复", "status_On", id);
    } else {
        //禁用
        popInit("tip", "禁用回复", "用户回复关键字，无法得到相应的回复", "status_Off", id);
    }
}

//编辑已有的信息
function update_msg(obj) {
    //清空编辑区
    clear_msg_edit();
    //搜集列表数据
    var id = $(obj).data("id");//id
    var par = $(obj).parent().parent().parent();
    var key = par.find(".serachKey_td").html();//关键字
    var msg = par.find(".second-child").html();//消息
    var typeName = par.find(".third-child").data("type");
    //赋值
    $(".cmm_01").find(".msg_id").val(id);
    $(".cmm_01").find(".key_input_cls").val(key);
    $(".cmm_01").find(".wxface").find(".current").removeClass("current");
    var cls = ".type_" + typeName;
    $(".cmm_01").find(cls).parent().addClass("current");
    $("#edit_area01").html(msg);
    //可编辑div将光标定位到最后
    set_focus01();
    //更新剩余还可以输入多少字
    update_wordcount01();
    //更新光标位置
    update_cur();
    //隐藏列表，显示编辑区
    showEdit_hideTable();
}

//删除数据
function delete_tr(obj) {
    var id = $(obj).data("id");
    popInit("tip", "删除数据", "用户回复关键字，不再得到相应的回复", "delete_tr", id);
}

//删除数据，调用方法
function deleteTr(id) {
    $.ajax({
        url: '/WeChat/DeleteKeyMsg',
        type: "post",
        dataType: "json",
        data: { id: id },
        success: function (response) {
            if (response.status) {
                //刷新消息列表
                getKeyMsg();
                popInit("success", "删除成功", "更新了消息列表", null);

            } else {
                popInit("warn", "删除失败", response.msg, null);
            }
        },
        error: function (e, textStatus, errorThrown) {
            //程序异常 弹窗提示
            popInit("warn", "删除失败", "请联系管理员：[error]" + errorThrown, null);
        }
    });
}

//关键字筛选
function key_Filter() {
    var searchStr = $("#panel1").find(".search_input").val().trim();
    //为空时显示提示
    if (searchStr.length == 0) {
        if ($("#panel1").find(".serachKey_td").length > 0) {
            $("#panel1").find(".serachKey_td").parent().show();
            $(".showTip_data_tr").hide();
        }
    } else {
        var serachKey_td_list = $("#panel1").find(".serachKey_td");
        var show_count = 0;//显示的个数
        for (var i = 0; i < serachKey_td_list.length; i++) {
            var td_key = $(serachKey_td_list[i]).html();
            var th = $(serachKey_td_list[i]).parent();
            if (td_key.indexOf(searchStr) > -1) {
                //存在对应字符串,如果隐藏就淡入
                if (th.is(":hidden")) {
                    th.fadeIn("1000");
                }
                show_count++;
            } else {
                //不存在，如果显示就淡出
                if (th.is(":visible")) {
                    th.fadeOut("1000");
                }
            }
        }
        //显示全部是否要显示
        if ($("#panel1").find(".serachKey_td").length > 0 && show_count == 0) {
            setTimeout(function () {
                $(".showTip_data_tr").show();
            }, 1000);
        } else {
            $(".showTip_data_tr").hide();
            setTimeout(function () {
                $(".showTip_data_tr").hide();
            }, 1000);
        }
    }
    //统一表格表头的宽度，为了对齐
    setTimeout(function () {
        updateStyleScroll();
    }, 500);
}

//关键字长度检查
function input_key_checkLength() {
    var txt_length = $("#panel1").find(".key_input_cls").val().length;
    if (txt_length == 0 || txt_length > 30) {
        $(".key_msg_tips").addClass("key_msg_warn");
        $(".key_input_cls").addClass("key_msg_warn_border");
        return false;
    } else {
        $(".key_msg_tips").removeClass("key_msg_warn");
        $(".key_input_cls").removeClass("key_msg_warn_border");
        return true;
    }
}

//回复消息长度检查
function edit_area_checkLength_01() {
    var edit_msg = getEditAreaMsg_01();
    if (edit_msg.length == 0) {
        show_tip_error("回复内容不能为空");
        return false;
    } else if (edit_msg.length > 600) {
        show_tip_error("回复内容不能超过600字");
        return false;
    }
    return true;
}

//清空关键字编辑区域
function clear_msg_edit() {
    $("#panel1").find(".cmm_01").find(".msg_id").val("");
    $("#panel1").find(".cmm_01").find(".key_input_cls").val("");
    $("#panel1").find(".cmm_01").find(".key_msg_tips").removeClass("key_msg_warn");
    $("#panel1").find(".cmm_01").find(".key_input_cls").removeClass("key_msg_warn_border");
    $("#edit_area01").html("");
}

//显示编辑区，隐藏消息列表
function showEdit_hideTable() {
    $("#panel1").find(".show_div").hide();
    $("#panel1").find(".table_div").hide();
    $("#panel1").find(".cmm_01").show();
}

//隐藏编辑区，显示消息列表
function showTable_hideEdit() {
    $("#panel1").find(".show_div").show();
    $("#panel1").find(".table_div").show();
    $("#panel1").find(".cmm_01").hide();
}

//新增关键字文本
function insert_key_TextMsg() {
    //验证关键字
    if (!input_key_checkLength()) {
        //关键字失败
        return;
    }
    //验证回复消息
    if (!edit_area_checkLength_01()) {
        //回复内容长度不对
        return;
    }
    //保存到数据库
    var key = $("#panel1").find(".cmm_01").find(".key_input_cls").val();
    var textHtml = $("#edit_area01").html();
    var textMsg = getEditAreaMsg_01();
    $.ajax({
        url: '/WeChat/InsertKeyTextMsg',
        type: "post",
        dataType: "json",
        data: { key: key, textHtml: textHtml, textMsg: textMsg },
        success: function (response) {
            if (response.status) {
                //刷新消息列表
                getKeyMsg();
                show_tip_success("添加成功，更新了消息列表");
                //隐藏编辑区，显示消息列表
                showTable_hideEdit();
                //清空编辑区
                clear_msg_edit();

            } else {
                show_tip_error("添加失败，" + response.msg);
            }
        },
        error: function (e, textStatus, errorThrown) {
            //程序异常 弹窗提示
            show_tip_error("添加失败，[error]" + errorThrown);
        }
    });
}

//更新关键字文本
function update_key_TextMsg() {
    //验证关键字
    if (!input_key_checkLength()) {
        //关键字失败
        return;
    }
    //验证回复消息
    if (!edit_area_checkLength_01()) {
        //回复内容长度不对
        return;
    }
    //保存到数据库
    var id = $("#panel1").find(".cmm_01").find(".msg_id").val();
    var key = $("#panel1").find(".cmm_01").find(".key_input_cls").val();
    var textHtml = $("#edit_area01").html();
    var textMsg = getEditAreaMsg_01();
    $.ajax({
        url: '/WeChat/UpdateKeyTextMsg',
        type: "post",
        dataType: "json",
        data: { id: id, key: key, textHtml: textHtml, textMsg: textMsg },
        success: function (response) {
            if (response.status) {
                //刷新消息列表
                getKeyMsg();
                show_tip_success("更新成功，更新了消息列表");
                //隐藏编辑区，显示消息列表
                showTable_hideEdit();
                //清空编辑区
                clear_msg_edit();

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


$(function () {

    //页面加载默认是选中关键字回复,可编辑div将光标定位到最后
    set_focus01();

    //获取表格信息并加载
    getKeyMsg();

    //关键词长度验证 - change事件
    $(".key_input_cls").on("input propertychange", function () {
        input_key_checkLength();
    });
    //关键词长度验证 - blur事件
    $(".key_input_cls").blur(function () {
        input_key_checkLength();
    });

    //显示全部
    $("#panel1").find(".showAll_btn").click(function () {
        $("#panel1").find(".search_input").val("");
        $("#panel1").find(".serachKey_td").parent().show();
        $("#panel1").find(".showTip_data_tr").hide();
    });

    //搜索关键字
    $("#panel1").find(".search_input").on("input propertychange", function () {
        key_Filter();
    });
    //弹窗确认
    $("#dialogOk").click(function () {
        var event_name = $("#dialogOk").data("event");
        var id = $("#dialogOk").data("id");
        switch (event_name) {
            case "status_On"://启用
                status_On(id);
                break;
            case "status_Off"://禁用
                status_Off(id);
                break;
            case "delete_tr"://删除
                deleteTr(id);
                break;
            case "leave_panel01"://离开选项卡
                if (id == 2) {
                    open_panel02();
                } else if (id == 3) {
                    open_panel03();
                }
                break;
        }
        //关闭弹窗
        popClose();
    });
    //添加关键字回复
    $("#panel1").find(".add_btn01").click(function () {
        //清空关键字编辑区
        clear_msg_edit();
        //显示编辑区，隐藏消息列表
        showEdit_hideTable();
        //更新剩余还可以输入多少字
        update_wordcount01();
        //更新光标位置
        update_cur();
    });
    //添加关键字回复 - 取消
    $("#panel1").find(".btn_cancel_01").click(function () {
        showTable_hideEdit();
    });
    //添加关键字回复 - 保存
    $("#panel1").find(".btn_save_01").click(function () {
        //判断类型,当前只考虑文本
        var msg_type = $(".cmm_01").find(".wxface").find(".current").find("i").attr("class");
        var msg_id = $(".cmm_01").find(".msg_id").val();
        if (msg_id > 0) {
            //编辑
            switch (msg_type) {
                case "type_text"://文字
                    update_key_TextMsg();
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
        } else {
            //新增
            switch (msg_type) {
                case "type_text"://文字
                    insert_key_TextMsg();
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
        }

    });
});
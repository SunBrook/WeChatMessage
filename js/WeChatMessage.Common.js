//微信表情字典
var facemap =
    [
        '[微笑]', '[撇嘴]', '[色]', '[发呆]', '[得意]', '[流泪]', '[害羞]', '[闭嘴]', '[睡]', '[大哭]', '[尴尬]', '[发怒]',
        '[调皮]', '[呲牙]', '[惊讶]', '[难过]', '[囧]', '[抓狂]', '[吐]', '[偷笑]', '[愉快]', '[白眼]', '[傲慢]',
        '[困]', '[惊恐]', '[流汗]', '[憨笑]', '[悠闲]', '[奋斗]', '[咒骂]', '[疑问]', '[嘘]', '[晕]', '[衰]', '[骷髅]',
        '[敲打]', '[再见]', '[擦汗]', '[抠鼻]', '[鼓掌]', '[坏笑]', '[左哼哼]', '[右哼哼]', '[哈欠]', '[鄙视]', '[委屈]',
        '[快哭了]', '[阴险]', '[亲亲]', '[可怜]', '[菜刀]', '[西瓜]', '[啤酒]', '[咖啡]', '[猪头]', '[玫瑰]', '[凋谢]',
        '[嘴唇]', '[爱心]', '[心碎]', '[蛋糕]', '[炸弹]', '[便便]', '[月亮]', '[太阳]', '[拥抱]', '[强]', '[弱]',
        '[握手]', '[胜利]', '[抱拳]', '[勾引]', '[拳头]', '[OK]', '[跳跳]', '[发抖]', '[怄火]', '[转圈]',
        '😄', '😷', '😂', '😝', '😳', '😱', '😔', '😒',
        '[嘿哈]', '[捂脸]', '[奸笑]', '[机智]', '[皱眉]', '[耶]',
        '👻', '🙏', '💪', '🎉',
        '[礼物]', '[红包]', '[鸡]'
    ];

//获取微信文本信息 - 关键词回复
function getEditAreaMsg_01() {
    //对应的key集合
    var img_list = $("#edit_area01").find(".edit_face");
    var img_keys = new Array();
    for (var i = 0; i < img_list.length; i++) {
        img_keys.push($(img_list[i]).data("key"));
    }
    //txt为整理过的值
    var txt = $("#edit_area01").html().trim();
    //去除<div></div>  微信换行是\n
    txt = txt.replace(/<div><\/div>/g, "");
    txt = txt.replace(/<div>/g, "\n").replace(/<\/div>/g, "");
    //去除<br/>
    txt = txt.replace(/<br>/g, "\n").replace(/<br\/>/g, "\n");
    //转义字符转化为特殊字符
    txt = tw2sw_string(txt);

    //img -> [data-key]
    var reg = /<img class=\"edit_face\"[\s\S]{0,100}>/i;
    for (var j = 0; j < img_keys.length; j++) {
        txt = txt.replace(reg, img_keys[j]);
    }
    return txt;
}
//获取微信文本信息 - 关键词无效回复
function getEditAreaMsg_02() {
    //对应的key集合
    var img_list = $("#edit_area02").find(".edit_face");
    var img_keys = new Array();
    for (var i = 0; i < img_list.length; i++) {
        img_keys.push($(img_list[i]).data("key"));
    }
    //txt为整理过的值
    var txt = $("#edit_area02").html().trim();
    //去除<div></div>  微信换行是<BR/ >
    txt = txt.replace(/<div><\/div>/g, "");
    txt = txt.replace(/<div>/g, "\n").replace(/<\/div>/g, "");
    //去除<br/>
    txt = txt.replace(/<br>/g, "\n").replace(/<br\/>/g, "\n");
    //转义字符转化为特殊字符
    txt = tw2sw_string(txt);
    //img -> [data-key]
    var reg = /<img class=\"edit_face\"[\s\S]{0,100}>/i;
    for (var j = 0; j < img_keys.length; j++) {
        txt = txt.replace(reg, img_keys[j]);
    }
    return txt;
}
//获取微信文本信息 - 被关注回复
function getEditAreaMsg_03() {
    //对应的key集合
    var img_list = $("#edit_area03").find(".edit_face");
    var img_keys = new Array();
    for (var i = 0; i < img_list.length; i++) {
        img_keys.push($(img_list[i]).data("key"));
    }
    //txt为整理过的值
    var txt = $("#edit_area03").html().trim();
    //去除<div></div>  微信换行是<BR/ >
    txt = txt.replace(/<div><\/div>/g, "");
    txt = txt.replace(/<div>/g, "\n").replace(/<\/div>/g, "");
    //去除<br/>
    txt = txt.replace(/<br>/g, "\n").replace(/<br\/>/g, "\n");
    //转义字符转化为特殊字符
    txt = tw2sw_string(txt);
    //img -> [data-key]
    var reg = /<img class=\"edit_face\"[\s\S]{0,100}>/i;
    for (var j = 0; j < img_keys.length; j++) {
        txt = txt.replace(reg, img_keys[j]);
    }
    return txt;
}

//光标位置
var cur_selection;
var cur_range;

//更新光标位置
function update_cur() {
    try {
        cur_selection = window.getSelection ? window.getSelection() : document.selection;
        cur_range = cur_selection.createRange ? cur_selection.createRange() : cur_selection.getRangeAt(0);
    } catch (e) {
        console.log(e);
    }

}

//可编辑div将光标定位到最后
function set_focus01() {
    var el = document.getElementById('edit_area01');
    el.focus();
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    cur_selection = sel;
    cur_range = range;
}
function set_focus02() {
    var el = document.getElementById('edit_area02');
    el.focus();
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    cur_selection = sel;
    cur_range = range;
}
function set_focus03() {
    var el = document.getElementById('edit_area03');
    el.focus();
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    cur_selection = sel;
    cur_range = range;
}

//插入表情方法
function insertImg01(obj_html) {
    var selection = cur_selection;
    var range = cur_range;

    if (!window.getSelection) {
        document.getElementById('edit_area01').focus();
        var selection = window.getSelection ? window.getSelection() : document.selection;
        var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
        range.pasteHTML(obj_html);
        range.collapse(false);
        range.select();
    } else {
        document.getElementById('edit_area01').focus();
        range.collapse(false);
        var hasR = range.createContextualFragment(obj_html);
        var hasR_lastChild = hasR.lastChild;
        while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
            var e = hasR_lastChild;
            hasR_lastChild = hasR_lastChild.previousSibling;
            hasR.removeChild(e)
        }
        range.insertNode(hasR);
        if (hasR_lastChild) {
            range.setEndAfter(hasR_lastChild);
            range.setStartAfter(hasR_lastChild)
        }
        selection.removeAllRanges();
        selection.addRange(range)
    }
}
function insertImg02(obj_html) {
    var selection = cur_selection;
    var range = cur_range;

    if (!window.getSelection) {
        document.getElementById('edit_area02').focus();
        var selection = window.getSelection ? window.getSelection() : document.selection;
        var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
        range.pasteHTML(obj_html);
        range.collapse(false);
        range.select();
    } else {
        document.getElementById('edit_area02').focus();
        range.collapse(false);
        var hasR = range.createContextualFragment(obj_html);
        var hasR_lastChild = hasR.lastChild;
        while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
            var e = hasR_lastChild;
            hasR_lastChild = hasR_lastChild.previousSibling;
            hasR.removeChild(e)
        }
        range.insertNode(hasR);
        if (hasR_lastChild) {
            range.setEndAfter(hasR_lastChild);
            range.setStartAfter(hasR_lastChild)
        }
        selection.removeAllRanges();
        selection.addRange(range)
    }
}
function insertImg03(obj_html) {
    var selection = cur_selection;
    var range = cur_range;

    if (!window.getSelection) {
        document.getElementById('edit_area03').focus();
        var selection = window.getSelection ? window.getSelection() : document.selection;
        var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
        range.pasteHTML(obj_html);
        range.collapse(false);
        range.select();
    } else {
        document.getElementById('edit_area03').focus();
        range.collapse(false);
        var hasR = range.createContextualFragment(obj_html);
        var hasR_lastChild = hasR.lastChild;
        while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
            var e = hasR_lastChild;
            hasR_lastChild = hasR_lastChild.previousSibling;
            hasR.removeChild(e)
        }
        range.insertNode(hasR);
        if (hasR_lastChild) {
            range.setEndAfter(hasR_lastChild);
            range.setStartAfter(hasR_lastChild)
        }
        selection.removeAllRanges();
        selection.addRange(range)
    }
}

//监控上下左右按键，如果用户有对应操作，那么对应光标位置也要修改
function enterkey() {
    e = event.keyCode;
    switch (e) {
        case 37:
        case 38:
        case 39:
        case 40:
            update_cur();
            break;
    }
}

//更新字数限制提示
function update_wordcount01() {
    var msg = getEditAreaMsg_01();
    if (msg.length > 600) {
        var over_count = msg.length - 600;
        var pt = '已超出<em>' + over_count + '</em>字';
        $("#panel1").find(".ed_count").html(pt);
        $("#panel1").find(".ed_count").addClass("warn_edit");

    } else {
        var last_count = 600 - msg.length;
        var pt = '还可以输入<em>' + last_count + '</em>字';
        $("#panel1").find(".ed_count").html(pt);
        $("#panel1").find(".ed_count").removeClass("warn_edit");
    }
}
function update_wordcount02() {
    var msg = getEditAreaMsg_02();
    if (msg.length > 600) {
        var over_count = msg.length - 600;
        var pt = '已超出<em>' + over_count + '</em>字';
        $("#panel2").find(".ed_count").html(pt);
        $("#panel2").find(".ed_count").addClass("warn_edit");

    } else {
        var last_count = 600 - msg.length;
        var pt = '还可以输入<em>' + last_count + '</em>字';
        $("#panel2").find(".ed_count").html(pt);
        $("#panel2").find(".ed_count").removeClass("warn_edit");
    }
}
function update_wordcount03() {
    var msg = getEditAreaMsg_03();
    if (msg.length > 600) {
        var over_count = msg.length - 600;
        var pt = '已超出<em>' + over_count + '</em>字';
        $("#panel3").find(".ed_count").html(pt);
        $("#panel3").find(".ed_count").addClass("warn_edit");

    } else {
        var last_count = 600 - msg.length;
        var pt = '还可以输入<em>' + last_count + '</em>字';
        $("#panel3").find(".ed_count").html(pt);
        $("#panel3").find(".ed_count").removeClass("warn_edit");
    }
}


//弹窗开启
function popOpen() {
    $(".fade").show();
    $(".dialog_wrp").show();
}
//弹窗关闭
function popClose() {
    $(".fade").hide();
    $(".dialog_wrp").hide();
}

//弹窗初始化,并打开弹窗
function popInit(picstyle, title, description, event, id) {
    $(".dialog_bd").find(".msg_icon_wrapper").find(".icon_msg").removeClass("tip").removeClass("warn").removeClass("success").addClass(picstyle);
    $(".msg_content").find("h4").text(title);
    $(".msg_content").find("p").text(description);
    $("#dialogOk").data("event", event);
    $("#dialogOk").data("id", id);
    if (event == null) {
        $("#dialogClose").hide();
    } else {
        $("#dialogClose").show();
    }
    popOpen();
}


//显示失败提示条
function show_tip_error(tipText) {
    $(".bar_content").html(tipText);
    $(".bar_content").removeClass("tipbar_success").addClass("tipbar_error");
    $(".tip_top_bar").show();
    //间隔3秒提示消失
    setTimeout(function () {
        $(".tip_top_bar").fadeOut("fast");
    }, 3000);
}
//显示成功显示条
function show_tip_success(tipText) {
    $(".bar_content").html(tipText);
    $(".bar_content").removeClass("tipbar_error").addClass("tipbar_success");
    $(".tip_top_bar").show();
    //间隔1.5秒提示消失
    setTimeout(function () {
        $(".tip_top_bar").fadeOut("fast");
    }, 1500);
}


//初始化所有表情面板 共3个
function initFaces() {
    var face_warpper = $(".face-warpper");
    facemap.forEach(function (value, index, array) {
        var img_height = -index * 20;
        var i = '<i style="background-position-y:' + img_height + 'px" data-key=' + value + ' data-h=' + img_height + '></i>';
        face_warpper.append(i);
    });
}

//只允许用户文本消息，其他提示不能用
function allowText_otherBan(obj) {
    var type = $(obj).find("i").attr("class");
    switch (type) {
        case "type_text":
            break;
        case "type_imgwordUrl":
        case "type_imgwordMedia":
        case "type_img":
        case "type_voice":
        case "type_video":
            show_tip_error("开发中，不支持该功能");
            break;
    }
}

//第一个消息编辑时，点击其他选项卡要提示是否保存提示框
function tip_Goto_otherPanel(panelId) {
    if ($(".cmm_01").is(":visible")) {
        //提示正在编辑，是否要离开, 交给弹窗来处理
        popInit("tip", "离开页面", "如果您离开, 您输入的数据不会被保存。", "leave_panel01", panelId);
        return false;
    }
    return true;
}

//打开第一个选项卡
function open_panel01() {
    var panel1 = $("#panel1");
    if (panel1.is(":hidden")) {
        panel1.show();
        $("#panel2").hide();
        $("#panel3").hide();
        $(".li_current").removeClass("li_current");
        $(".a_cmm01").parent().addClass("li_current");
        $(".show_div").show();
        $(".table_div").show();
        $(".table_div").show();
        $(".cmm_01").hide();
    }
    set_focus01();
}
//打开第二个选项卡
function open_panel02() {
    var panel2 = $("#panel2");
    if (panel2.is(":hidden")) {
        panel2.show();
        $("#panel1").hide();
        $("#panel3").hide();
        $(".li_current").removeClass("li_current");
        $(".a_cmm02").parent().addClass("li_current");
    }
    set_focus02();
}
//打开第二个选项卡
function open_panel03() {
    var panel3 = $("#panel3");
    if (panel3.is(":hidden")) {
        panel3.show();
        $("#panel1").hide();
        $("#panel2").hide();
        $(".li_current").removeClass("li_current");
        $(".a_cmm03").parent().addClass("li_current");
    }
    set_focus03();
}


$(function () {

    //初始化3组表情
    initFaces();

    // 消息框内容变化事件
    $("#edit_area01").on('input propertychange', function () {
        //隐藏输入法
        $("#panel1").find(".face-warpper").hide();
        update_wordcount01();
        //更新光标位置
        update_cur();
    });
    $("#edit_area02").on('input propertychange', function () {
        //隐藏输入法
        $("#panel2").find(".face-warpper").hide();
        update_wordcount02();
        //更新光标位置
        update_cur();
    });
    $("#edit_area03").on('input propertychange', function () {
        //隐藏输入法
        $("#panel3").find(".face-warpper").hide();
        update_wordcount03();
        //更新光标位置
        update_cur();
    });

    //点击消息框，记录光标位置
    $("#edit_area01").click(function () {
        //记录上次的光标位置
        update_cur();
    });
    $("#edit_area02").click(function () {
        //记录上次的光标位置
        update_cur();
    });
    $("#edit_area03").click(function () {
        //记录上次的光标位置
        update_cur();
    });

    //添加表情事件
    $("#panel1").find(".face-warpper").on("click", "i", function (e) {
        var obj = $(this);
        var obj_key = obj.data("key");
        var obj_h = obj.data("h");
        obj_html = '<img class="edit_face" style="background-position-y:' + obj_h + 'px" data-key=' + obj_key + ' src="images/pic_blank.gif">';
        insertImg01(obj_html);
        update_wordcount01();
    })
    $("#panel2").find(".face-warpper").on("click", "i", function (e) {
        var obj = $(this);
        var obj_key = obj.data("key");
        var obj_h = obj.data("h");
        obj_html = '<img class="edit_face" style="background-position-y:' + obj_h + 'px" data-key=' + obj_key + ' src="images/pic_blank.gif">';
        insertImg02(obj_html);
        update_wordcount02();
    })
    $("#panel3").find(".face-warpper").on("click", "i", function (e) {
        var obj = $(this);
        var obj_key = obj.data("key");
        var obj_h = obj.data("h");
        obj_html = '<img class="edit_face" style="background-position-y:' + obj_h + 'px" data-key=' + obj_key + ' src="images/pic_blank.gif">';
        insertImg03(obj_html);
        update_wordcount03();
    })

    //粘贴时，只粘贴文本
    $('[contenteditable]').each(function () {
        // 干掉IE http之类地址自动加链接
        try {
            document.execCommand("AutoUrlDetect", false, false);
        } catch (e) {
        }

        $(this).on('paste', function (e) {
            e.preventDefault();
            var text = null;

            if (window.clipboardData && clipboardData.setData) {
                // IE
                text = window.clipboardData.getData('text');
            } else {
                text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('在这里输入文本');
            }
            if (document.body.createTextRange) {
                if (document.selection) {
                    textRange = document.selection.createRange();
                } else if (window.getSelection) {
                    sel = window.getSelection();
                    var range = sel.getRangeAt(0);

                    // 创建临时元素，使得TextRange可以移动到正确的位置
                    var tempEl = document.createElement("span");
                    tempEl.innerHTML = "&#FEFF;";
                    range.deleteContents();
                    range.insertNode(tempEl);
                    textRange = document.body.createTextRange();
                    textRange.moveToElementText(tempEl);
                    tempEl.parentNode.removeChild(tempEl);
                }
                textRange.text = text;
                textRange.collapse(false);
                textRange.select();
            } else {
                // Chrome之类浏览器
                document.execCommand("insertText", false, text);
            }
        });
        // 去除Crtl+b/Ctrl+i/Ctrl+u等快捷键
        $(this).on('keydown', function (e) {
            // e.metaKey for mac
            if (e.ctrlKey || e.metaKey) {
                switch (e.keyCode) {
                    case 66: //ctrl+B or ctrl+b
                    case 98:
                    case 73: //ctrl+I or ctrl+i
                    case 105:
                    case 85: //ctrl+U or ctrl+u
                    case 117: {
                        e.preventDefault();
                        break;
                    }
                }
            }
        });
    });

    //表情按钮，展示或隐藏表情模块
    $("#panel1").find('.emotion_switch').click(function (e) {
        if ($($("#panel1").find(".face-warpper")[0]).is(":hidden")) {
            //显示
            $("#panel1").find(".face-warpper").fadeIn("1500");
        } else {
            //隐藏
            $("#panel1").find(".face-warpper").fadeOut("1500");
        }
        e.stopPropagation();//禁止父级冒泡
    });
    $("#panel2").find('.emotion_switch').click(function (e) {
        if ($($("#panel2").find(".face-warpper")[0]).is(":hidden")) {
            //显示
            $("#panel2").find(".face-warpper").fadeIn("1500");
        } else {
            //隐藏
            $("#panel2").find(".face-warpper").fadeOut("1500");
        }
        e.stopPropagation();//禁止父级冒泡
    });
    $("#panel3").find('.emotion_switch').click(function (e) {
        if ($($("#panel3").find(".face-warpper")[0]).is(":hidden")) {
            //显示
            $("#panel3").find(".face-warpper").fadeIn("1500");
        } else {
            //隐藏
            $("#panel3").find(".face-warpper").fadeOut("1500");
        }
        e.stopPropagation();//禁止父级冒泡
    });

    //点击表情模块之外的地方，隐藏表情模块
    $(document).click(function (e) {
        try {
            var e = event || window.event;//兼容ie和非ie的event
            var aim = e.srcElement || e.target; //兼容ie和非ie的事件源
            if (e.srcElement) {
                var aim = e.srcElement;
                //获取当前是哪个选项卡
                var cls = $(".title_ul").find(".li_current").find("a").attr("class");
                var par_panel;
                switch (cls) {
                    case "a_cmm01":
                        par_panel = $("#panel1");
                        break;
                    case "a_cmm02":
                        par_panel = $("#panel2");
                        break;
                    case "a_cmm03":
                        par_panel = $("#panel3");
                        break;

                }
                var face_div = par_panel.find(".face-warpper")[0];
                var face_btn = par_panel.find(".emotion_switch")[0];
                if ($(e.srcElement).data("key") != undefined && $(e.srcElement).data("key") != null) {
                    //表情，不隐藏
                }
                    //其他情况
                else if (aim != face_div && aim != face_btn && $(face_div).is(":visible") && $("")) {
                    par_panel.find(".face-warpper").hide();
                }
            }
        } catch (e) {
            console.log(e);
        }
    });


    //选项卡切换 
    $(".a_cmm01").click(function () {
        open_panel01();
    });
    $(".a_cmm02").click(function () {
        if (tip_Goto_otherPanel(2)) {
            open_panel02();
        }
    });
    $(".a_cmm03").click(function () {
        if (tip_Goto_otherPanel(3)) {
            open_panel03();
        }
    });


    //点击其他选项卡，提示开发中
    $("#panel1").find(".wxface").find(".type_li").click(function () {
        allowText_otherBan(this);
    });
    $("#panel2").find(".wxface").find(".type_li").click(function () {
        allowText_otherBan(this);
    });
    $("#panel3").find(".wxface").find(".type_li").click(function () {
        allowText_otherBan(this);
    });

});



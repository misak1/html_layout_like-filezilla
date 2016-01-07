$(function () {
    window.onresize = resize;
    resize();
});

var $content = $("#content");

var headerHeight = $('.content-header').height();
var content_margin_side = 30;
var footer_margin_bottom = 5;
var divHeight =  $("#div_left").height();
var winHeight;

function resize() {
    winHeight = (window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight));

    var ratio =  $content.height() / winHeight;
    var panelHeight = Math.ceil((winHeight - divHeight) * ratio);

    $("#content").css({ "min-height": panelHeight});
    $("#div_vertical").css({ "height": panelHeight});
    $("#LeftPanel").css({ "height": panelHeight - divHeight});

    var content_width = $("#content").width();
    var RightPanelWidth = content_width - $("#LeftPanel").width() - $("#div_vertical").width();
    $("#RightPanel").css({
        "height": panelHeight - divHeight,
        "width": RightPanelWidth
    });

    $(".content-footer").height(winHeight - (headerHeight + panelHeight + footer_margin_bottom));
}

$.resizable = function(resizerID, vOrH){
    $('#' + resizerID).bind("mousedown", function(e){

    var start = vOrH === 'v' ? e.pageX : e.pageY;
    var height = $content.height();
    var leftwidth = $('#' + resizerID).prev().width();
    var rightwidth = $('#' + resizerID).next().width();

    $('body').bind("mouseup", function(){
        $('body').unbind("mousemove");
        $('body').unbind("mouseup");
        
    });
    $('body').bind("mousemove", function(e){
        var end = vOrH === 'v' ? e.pageX : e.pageY;
        if(vOrH=='h'){
            // タテ
            var newHeight = height + (end - start);
            if(newHeight > content_margin_side ||  newHeight < 0){
                $content.height(newHeight);

                $("#content").css({ "min-height": newHeight});
                $("#div_vertical").css({ "height": newHeight});
                $("#LeftPanel, #RightPanel").css({ "height": newHeight - divHeight});
                $(".content-footer").height(winHeight - (headerHeight + newHeight + footer_margin_bottom));
            } 
        }
        else{
            // ヨコ
            var newLeftWidth = leftwidth + (end - start); 
            var newRightWidth = rightwidth - (end - start);

            // 段落ち対策
            if(content_margin_side < newLeftWidth && newRightWidth > content_margin_side){
                $('#' + resizerID).prev().width(newLeftWidth);
                $('#' + resizerID).next().width(newRightWidth);
            }
        }
    });
});
}
    
$.resizable('div_vertical', "v");
$.resizable('div_right', "h");
$.resizable('div_left', "h");
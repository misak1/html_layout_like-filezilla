$(function () {
    window.onresize = resize;
    resize();
});

function resize() {
    var h = (window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight));
    var divHight =  $("#div_left").height();//20=body padding:10px
    
    // $(#content).height() "%" style 
    // Math.floor($('#content').height() / $(window).height() * 100) + "%"

    var ratio =  ($('#content').height() / h * 100) / 100;
    // var HeaderFooter =  Math.floor($('.content-header').height() +  $('.content-footer').height());
    
    var panelHeight = Math.ceil((h - divHight) * ratio);
    // console.log('panelHeight', panelHeight);
    $("#content").css({ "min-height": panelHeight});
    // $("#content").css({ "height": panelHeight});
    $("#div_vertical").css({ "height": panelHeight});
    $("#LeftPanel").css({ "height": panelHeight});
    var content_width = $("#content").width();
    var RightPanelWidth = content_width - $("#LeftPanel").width() - $("#div_vertical").width();
    $("#RightPanel").css({
        "height": panelHeight,
        "width": RightPanelWidth
    });
    var footer_margin_bottom = 25;
    $(".content-footer").height(Math.ceil(h - ($('.content-header').height() +  panelHeight)) - footer_margin_bottom);
    // $("#content").css({ "height": panelHeight + divHight});
}

$.resizable = function(resizerID, vOrH){
    $('#' + resizerID).bind("mousedown", function(e){
    var start = e.pageY;
    if(vOrH=='v') start = e.pageX;
    $('body').bind("mouseup", function(){
        $('body').unbind("mousemove");
        $('body').unbind("mouseup");
        
    });
    $('body').bind("mousemove", function(e){
        var end = e.pageY;
        if(vOrH=='v') end = e.pageX;
        if(vOrH=='h'){
            // console.log('resizerID', resizerID);
            // タテ
            // console.log('end-start', end-start);
            var es = (end-start);
            if($('#editaria').height() > 30 ||  es < 0){
                $('#content').height($('#content').height()+ es);
                // $('#content').height($('#content').height()+ (end-start));
                // $("#content").css({ "min-height": $('#content').height()+ (end-start)});
                resize();
            }
            // $('#' + resizerID).prev().height($('#' + resizerID).prev().height()+ (end-start)); 
            // $('#' + resizerID).next().height($('#' + resizerID).next().height()- (end-start)); 
        }
        else{
            // ヨコ
            var leftwidth = $('#' + resizerID).prev().width()+ (end-start); 
            var rightWidth = $('#' + resizerID).next().width()- (end-start);

            // 段落ち対策
            if(30 < leftwidth && rightWidth > 30){
                $('#' + resizerID).prev().width(leftwidth);
                $('#' + resizerID).next().width(rightWidth);
            }
        }
        start = end;
    });
});
}
    
$.resizable('div_vertical', "v");
$.resizable('div_right', "h");
$.resizable('div_left', "h");
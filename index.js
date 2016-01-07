$(function () {
    window.onresize = resize;
    resize();
});

function resize() {
    var h = (window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight));
    var divHight = 20 + $("#div_left").height();//20=body padding:10px
    $("#content").css({ "min-height": (h - divHight) * 0.6 + "px" });
    $("#div_vertical").css({ "height": (h - divHight) * 0.6 + "px" });
    $("#LeftPanel").css({ "height": (h - divHight) * 0.6 + "px" });
    var content_width = $("#content").width();
    var RightPanelWidth = content_width - $("#LeftPanel").width() - $("#div_vertical").width();
    $("#RightPanel").css({
        "height": (h - divHight) * 0.6 + "px",
        "width": RightPanelWidth + "px"
    });
}

jQuery.resizable = function(resizerID, vOrH){
    jQuery('#' + resizerID).bind("mousedown", function(e){
    var start = e.pageY;
    if(vOrH=='v') start = e.pageX;
    jQuery('body').bind("mouseup", function(){
        jQuery('body').unbind("mousemove");
        jQuery('body').unbind("mouseup");
        
    });
    jQuery('body').bind("mousemove", function(e){
        var end = e.pageY;
        if(vOrH=='v') end = e.pageX;
        
        if(vOrH=='h'){
            // jQuery('#' + resizerID).prev().height(jQuery('#' + resizerID).prev().height()+ (end-start)); 
            // jQuery('#' + resizerID).next().height(jQuery('#' + resizerID).next().height()- (end-start)); 
        }
        else{
            var leftwidth = jQuery('#' + resizerID).prev().width()+ (end-start); 
            var rightWidth = jQuery('#' + resizerID).next().width()- (end-start);

            if(30 < leftwidth && rightWidth > 30){
                jQuery('#' + resizerID).prev().width(leftwidth);
                jQuery('#' + resizerID).next().width(rightWidth);
            }else{
                console.log("E");
            }
        }
        start = end;
    });
});
}
    
jQuery.resizable('div_vertical', "v");
jQuery.resizable('div_right', "h");
jQuery.resizable('div_left', "h");
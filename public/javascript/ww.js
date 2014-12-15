/**
 * Created with JetBrains WebStorm.
 * User: bli111
 * Date: 12/15/14
 * Time: 4:24 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: bli111
 * Date: 12/8/14
 * Time: 4:03 PM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function(){


    $('img').each(function(){
        if($(this).attr('data-original-value')){
            $(this).attr('src', $(this).attr('data-original-value'));
        }
    })


    var maxWidth = 1920,
        snapshotHeight = 515,
        len = $('.snapshots img').length;

    var currentWindow = $(window).width(),
        currentHeight = $(window).height();

//    var percent = currentWindow/maxWidth;
//    console.log(0.2088*770*0.658) ;
//    console.log(((0.2088*currentWindow/444)*770)*0.658) ;
//    var scrollHeight = snapshotHeight*percent;

    var scrollHeight = ((0.2088*currentWindow/444)*770)*0.658;

    console.log(scrollHeight);

    function InitScroll(height, windowHeight){
        var bodyHeight =  (len+1)*height+40;
        var actualHeight = parseInt(height);
        if(bodyHeight<200){
            bodyHeight = 768;
        }

        $('body').css('height',bodyHeight);

        windowHeight = windowHeight ? windowHeight : $(window).height();
        //获取真实的大小
        // scorllHeight = $('.snapshots img').height();
        //  console.log(scorllHeight);

        $('.snapshots img').each(function(i){

            $(this).css('top',i*actualHeight);

            $(this).attr('data-'+i*actualHeight,'top:0px');
            if(i>=1)
                $(this).attr('data-'+(i-1)*actualHeight,'top:'+actualHeight+'px');
            if(i<len-1)
                $(this).attr('data-'+(i+1)*actualHeight,'top:'+(0-actualHeight)+'px');
        })

        $('.desBox div').each(function(i,item){

            $(this).css('top',i*windowHeight);

            $(this).attr('data-'+i*actualHeight,'top:0px');
            if(i>=1)
                $(this).attr('data-'+(i-1)*actualHeight,'top:'+windowHeight+'px');
            if(i<len-1)
                $(this).attr('data-'+(i+1)*actualHeight,'top:'+(0-windowHeight)+'px;');
        })

        $('.imageBox div').each(function(i, item){

            $(this).attr('data-'+i*actualHeight,'display:block');
            if(i>=1)
                $(this).attr('data-'+(i-1)*actualHeight,'display:none');
            if(i<len-1)
                $(this).attr('data-'+(i+1)*actualHeight,'display:none');
        })

        $('.circle').each(function(i, item){

            $(this).attr('data-'+i*actualHeight,'background-color:white');
            if(i>=1)
                $(this).attr('data-'+(i-1)*actualHeight,'background-color:transparent');
            if(i<len-1)
                $(this).attr('data-'+(i+1)*actualHeight,'background-color:transparent');
        })
        skrollr.init();
    }


    function InitWXPopUp(){
        var support3DTransform = false;
        var attribute;
        for (attribute in $("body")[0].style) {
            if (attribute.toLowerCase().indexOf("perspective") !== -1 && attribute.toLowerCase().indexOf("webkit") === -1) {
                support3DTransform = true;
                $(".js-popup-box").addClass("popup-rotate-init");
                break;
            }
        }

        $(".js-popup, .js-popup-close").on("click", function(event) {
            var target = event.target || event.srcElement;
            if (target !== $(this)[0]){ return false;}

            var self = $(this);
            if ($(this).parents(".js-popup").length !== 0) {self = $(this).parents(".js-popup");}

            if (support3DTransform) {
                self.children(".js-popup-box").addClass("popup-rotate-out");
                self.delay(500).fadeOut("fast", function() {
                    self.children(".js-popup-box").removeClass("popup-rotate-in popup-rotate-out");
                });
            } else {
                self.fadeOut("fast");
            }

            location.hash = "";
        });

        $(".weixin").on("click", function() {
            var self = $(".js-popup.erweima");
            if (support3DTransform) {
                self.fadeIn("fast", function() {
                    self.children(".js-popup-box").addClass("popup-rotate-in");
                });
            } else {
                self.fadeIn("fast");
            }
        });
    }

    InitScroll(scrollHeight, currentHeight);

    InitWXPopUp();

//    var config = {
//        title:{
//            width:292,
//            heig

})
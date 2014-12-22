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
    var isMobile = (function() {
        return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
    })();
    if(isMobile || currentWindow < 768){
        var scrollHeight = ((0.65*currentWindow/444)*770)*0.658;
    }else{
        var scrollHeight = ((0.2088*currentWindow/444)*770)*0.658;
    }


//    console.log(scrollHeight);

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

    if(isMobile){
        InitScroll(scrollHeight, currentHeight);
    }else{
        InitPositionForMobile(scrollHeight, currentHeight);
        InitSwipe();
    }

    function InitPositionForMobile(height, viewHeight){

        //iphone中的小图片
        $('.snapshots img').each(function(i){
            if(i==0){
                $(this).css('top','0px')
            }else if($(this).hasClass('last')){
                $(this).css('top',(-height)+'px');
            }else{
                $(this).css('top',(height)+'px');
            }
        })

        //描述文字
        $('.desBox div').each(function(i){
            if(i==0){
                $(this).css('top','0px')
            }else if($(this).hasClass('last')){
                $(this).css('top',(-viewHeight)+'px');
            }else{
                $(this).css('top',(viewHeight)+'px');
            }
        })
    }


    function InitSwipe(){
        $(window).on('swipeup',function(){
            var activeEle = $('.imageBox .active');
            var nextEle = activeEle.next();
            activeEle.removeClass('active');
            activeEle.fadeOut();
            if(activeEle.hasClass('last')){
                $('.imageBox .first').fadeIn();
                $('.imageBox .first').addClass('active');
            }else{
                nextEle.fadeIn();
                nextEle.addClass('active');
            }

            /************************************/
            var beforeActive  = $('.snapshots .beforeActive');
            var activeSnapshot = $('.snapshots .active');
            var nextSnapshot  = activeSnapshot.next();
            if(nextSnapshot.length == 0){
                nextSnapshot = $('.snapshots img').first();
            }
            beforeActive.css('top', scrollHeight+'px').removeClass('beforeActive');
            activeSnapshot.animate({top:(-scrollHeight)+'px'});
            activeSnapshot.removeClass('active').addClass('beforeActive');
            nextSnapshot.animate({top:'0px'});
            nextSnapshot.addClass('active');

            /************************************/
            var beforeActiveDesc  = $('.desBox .beforeActive');
            var activeDesc = $('.desBox .active');
            var nextDesc  = activeDesc.next();
            if(nextDesc.length == 0){
                nextDesc = $('.desBox div').first();
            }
            beforeActiveDesc.css('top', currentHeight+'px').removeClass('beforeActive');
            activeDesc.animate({top:(-currentHeight)+'px'});
            activeDesc.removeClass('active').addClass('beforeActive');
            nextDesc.animate({top:'0px'});
            nextDesc.addClass('active');

            /****************************/
            var activeBtn = $('.rightBtn .active');
            var nextBtn = activeBtn.prev();
            if(nextBtn.length == 0){
                nextBtn = $('.circle').last();
            }
            activeBtn.removeClass('active');
            nextBtn.addClass('active');

        })

        $(window).on('swipedown', function(){
            var activeEle = $('.imageBox .active');
            var prevEle = activeEle.prev();
            activeEle.removeClass('active');
            activeEle.fadeOut();
            if(activeEle.hasClass('first')){
                $('.imageBox .last').fadeIn();
                $('.imageBox .last').addClass('active');
            }else{
                prevEle.fadeIn();
                prevEle.addClass('active');
            }

            /****************************/
            var beforeActive  = $('.snapshots .beforeActive');
            var activeSnapshot = $('.snapshots .active');
            var prevSnapshot  = beforeActive.prev();
            if(prevSnapshot.length == 0){
                prevSnapshot = $('.snapshots img').last();
            }

            beforeActive.removeClass('beforeActive').addClass('active').animate({top:'0px'});
            activeSnapshot.removeClass('active').animate({top:scrollHeight+'px'});
            prevSnapshot.addClass('beforeActive').css('top',(-scrollHeight)+'px');

            /****************************/
            var beforeActiveDesc  = $('.desBox .beforeActive');
            var activeDesc = $('.desBox .active');
            var prevDesc  = beforeActiveDesc.prev();
            if(prevDesc.length == 0){
                prevDesc = $('.desBox div').last();
            }

            beforeActiveDesc.removeClass('beforeActive').addClass('active').animate({top:'0px'});
            activeDesc.removeClass('active').animate({top:currentHeight+'px'});
            prevDesc.addClass('beforeActive').css('top',(-currentHeight)+'px');

            /*************************/
            var activeBtn = $('.rightBtn .active');
            var prevBtn = activeBtn.next();
            if(prevBtn.length == 0){
                prevBtn = $('.circle').first();
            }
            activeBtn.removeClass('active');
            prevBtn.addClass('active');

        })
    }

    InitWXPopUp();

//    var config = {
//        title:{
//            width:292,
//            heig
});
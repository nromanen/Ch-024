$.fn.ownpopover = function(params) {
    var timer = null;

    function showPopover(el, content, evt) {
        $('body').find('.own-popover').remove();
        $('body').append(content);
        $('body').find('.own-popover').css('top', evt.clientY + 'px').css('left', evt.clientX + 'px');
        $('body').find('.remove-popover').off('click').on('click', function(){
            $(this).closest('.own-popover').remove();
        });
    }

    $(this).off(params.showEvent).on(params.showEvent, function(evt) {
        var html = $.parseHTML(params.html(params.content));
        timer = setTimeout(_.bind(showPopover, this, $(this), html, evt), 500);
    });
    $(this).off(params.hideEvent).on(params.hideEvent, function() {
        clearTimeout(timer);
    });
};
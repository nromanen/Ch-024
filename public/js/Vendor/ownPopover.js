$.fn.ownpopover = function(action, params) {
    var $this = $(this);

    function hideAllPopovers() {
        $('body').find('.own-popover').remove();
    }

    function show(content) {
        var top = $this.offset().top - 20 + 'px';
        var left = $this.offset().left + 150 + 'px';
        if ($this.offset().left > ($(document).width() / 2)) {
            left = $this.offset().left - 235 + 'px';
        }

        hideAllPopovers();
        $('body').append(content);
        $('body').find('.own-popover').css('top', top).css('left', left);
        $('body').find('.remove-popover').off('click').on('click', function() {
            $(this).closest('.own-popover').remove();
        });
        $('body').find('.own-popover').hover(function() {}, function() {
            $(this).delay(3000).fadeOut('fast');
        });
        $('.fc-button').off('click', hideAllPopovers).on('click', hideAllPopovers);
    }

    function showPopover() {
        var html;
        html = $.parseHTML(params.html(params.content));
        show(html);
    }

    switch (action) {
        case 'show':
            {
                showPopover();
            }
    }
};

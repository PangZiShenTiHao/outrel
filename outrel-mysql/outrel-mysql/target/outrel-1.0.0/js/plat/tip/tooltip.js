function Tooltip(tooltipStructure, container) {
    this.tooltipStructure = tooltipStructure;
    this.container = container;
    this.init();
}
Tooltip.prototype = {
    init: function () {

        this.position = this.tooltipStructure.position||"bottom";
        this.width = this.tooltipStructure.width ;
        this.height = this.tooltipStructure.height ;
        this.content = this.tooltipStructure.content;
        this.css = this.tooltipStructure.css;
        this.create();


    },


    create: function () {

        var that = this;
        if (!$(that.container).attr("title")) {
            $(that.container).attr("title", "");
        }

        var pos_my = {
            "top": "center bottom-10",
            "bottom": "center top+20",
            "left": "right top",
            "right": "left top"

        };
        var pos_at = {
            "top": "center top",
            "bottom": "center bottom",
            "left": "left-5 top-5",
            "right": "right+5 top-5"

        };

        $(that.container).tooltip({
            content: that.content,
            tooltipClass: that.css,
            position: {
                my: pos_my[that.position],
                at: pos_at[that.position],

                using: function (position, feedback) {
                   /* if(that.width)
                    {
                        position["width"]=that.width;
                    }
                   if(that.height)
                   {
                       position["height"]=that.height;
                       if(that.position=="top")
                       {
                           position["top"]=position.top-that.height+20;
                       }
                   }*/
                    position["border-width"]=1;
                    $(this).css(position);
                    if (that.position == "top" || that.position == "bottom") {

                        $("<div>")
                            .addClass("tp_arrow")
                            .addClass(feedback.vertical)
                            .addClass(feedback.horizontal)
                            .appendTo(this);
                    }
                }

            }
        });


    }

};
(function ($) {
    $.fn.newTooltip = function (tooltipStructure) {

        return new Tooltip(tooltipStructure, $(this)[0]);
    };
})(jQuery);



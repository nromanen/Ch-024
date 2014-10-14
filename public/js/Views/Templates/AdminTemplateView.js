define('AdminTemplateView', ['jquery', 'underscore', 'backbone', 'text', 'text!adminTemplate'],
    function($, _, Backbone, text, adminTemplate) {

<<<<<<< HEAD
        var AdminTemplateView = Backbone.View.extend({

            template: _.template(adminTemplate),

            selectors: {
                mainTag: 'main'
            },

            render: function() {
                $(this.selectors.mainTag).html(this.template());
                return this;
            }
        });
        return AdminTemplateView;
    });
=======
    var AdminTemplateView = Backbone.View.extend({
        
        template: _.template(adminTemplate),

        selectors: {
            mainTag: 'main'
        },

        render: function() {
            $(this.selectors.mainTag).html(this.template());
            return this;
        }
    });
    return AdminTemplateView;
});
>>>>>>> b787ac029d513919e2640b1172be47451dacb698

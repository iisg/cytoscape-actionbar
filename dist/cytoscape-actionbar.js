(function($) {
  var CytoscapeActionbar;
  CytoscapeActionbar = (function() {
    CytoscapeActionbar.prototype.defaults = {
      items: [],
      appendTools: false,
      actionbarClass: 'ui-cytoscape-actionbar',
      multipleToolsClass: 'action-item-list',
      actionItemClass: 'action-item'
    };

    function CytoscapeActionbar(cy, options) {
      var $actionbar;
      options = $.extend(true, {}, this.defaults, options);
      $actionbar = $("<div class='" + options.actionbarClass + "'></div>");
      $actionbar.appendTo($(cy.container()));
      $.each(options.items, function(itemIndex, element) {
        var $element, clazz;
        clazz = options.actionItemClass + ' icon ' + element.icon;
        $element = $("<span id='action-" + itemIndex + "' class='" + clazz + "' title='" + element.tooltip + "'></span>");
        $actionbar.append($element);
        return $element.on('click', function() {
          return element.action(cy, element);
        }).hover(function(e) {
          return $(e.target).css('color', '#000');
        }, function(e) {
          return $(e.target).css('color', '#aaa');
        });
      });
    }

    return CytoscapeActionbar;

  })();
  return cytoscape('core', 'actionbar', function(options) {
    new CytoscapeActionbar(this, options);
    return this;
  });
})(jQuery);

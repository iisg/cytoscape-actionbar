angular.module('cytoscape.actionbar', []).directive('cytoscapeActionbar', function() {
  return {
    template: "<div ng-class='options.actionbarClass' style=\"position: absolute; z-index: 1000\">\n    <span ng-repeat=\"item in options.items\" ng-click='item.action(cy, item)' ng-if='item.condition()'\n    ng-class='[options.actionItemClass, icon, item.icon]' bs-tooltip='item.tooltip'></span>\n</div>",
    link: function(scope) {
      return cytoscape('core', 'actionbar', function(options) {
        var defaults;
        defaults = {
          items: [],
          appendTools: false,
          actionbarClass: 'ui-cytoscape-actionbar',
          actionItemClass: 'action-item'
        };
        angular.extend(defaults, options);
        angular.forEach(options.items, function(item) {
          if (!item.condition) {
            return item.condition = function() {
              return true;
            };
          }
        });
        return scope.options = options;
      });
    }
  };
});

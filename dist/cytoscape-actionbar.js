angular.module('cytoscape.actionbar', []).directive('cytoscapeActionbar', ["$rootScope", function($rootScope) {
  return {
    template: "<div ng-class='options.actionbarClass' style=\"position: absolute; z-index: 1000\">\n    <span ng-repeat=\"item in options.items\" ng-click='item.action(cy, item)' ng-if='item.condition()'\n    ng-class='[options.actionItemClass, icon, item.icon]' data-container='body' bs-tooltip='item.tooltip'></span>\n</div>",
    link: function(scope) {
      return cytoscape('core', 'actionbar', function(options) {
        var defaults, digestEvent, i, len, ref;
        defaults = {
          items: [],
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
        ref = ['zoom', 'pan'];
        for (i = 0, len = ref.length; i < len; i++) {
          digestEvent = ref[i];
          this.on(digestEvent, function() {
            return $rootScope.$apply();
          });
        }
        return scope.options = options;
      });
    }
  };
}]);

angular.module('cytoscape.actionbar', []).directive('cytoscapeActionbar', ["$timeout", function($timeout) {
  return {
    template: "<div ng-class='options.actionbarClass' style=\"position: absolute; z-index: 1000\">\n    <span ng-repeat=\"item in options.items\" ng-click='item.action(cy, item)' ng-if='item.condition()'\n    ng-class='[options.actionItemClass, icon, item.icon]' data-container='body' bs-tooltip='item.tooltip'></span>\n</div>",
    link: function(scope) {
      return cytoscape('core', 'actionbar', function(options) {
        var defaults, digestEvent, digestTimeout, i, len, ref, runDigestAfterEvent;
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
        digestTimeout = null;
        runDigestAfterEvent = function() {
          if (digestTimeout) {
            $timeout.cancel(digestTimeout);
          }
          return digestTimeout = $timeout((function() {
            return digestTimeout = null;
          }), 100);
        };
        ref = ['zoom', 'pan'];
        for (i = 0, len = ref.length; i < len; i++) {
          digestEvent = ref[i];
          this.on(digestEvent, runDigestAfterEvent);
        }
        return scope.options = options;
      });
    }
  };
}]);

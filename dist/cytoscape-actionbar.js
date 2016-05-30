angular.module('cytoscape.actionbar', []).directive('cytoscapeActionbar', ["$timeout", function($timeout) {
  return {
    template: "<div ng-class='options.actionbarClass' style=\"position: absolute; z-index: 1000\">\n    <button ng-repeat=\"item in options.items\" ng-click='item.action(cy, item)'\n    ng-disabled='!item.enabled()' ng-if='item.visible()'\n    ng-class='[options.actionItemClass, icon, item.icon]' data-container='body' bs-tooltip='item.tooltip'></button>\n</div>",
    link: function(scope) {
      return cytoscape('core', 'actionbar', function(options) {
        var defaults, digestEvent, digestTimeout, i, item, j, len, len1, ref, ref1, runDigestAfterEvent;
        defaults = {
          items: [],
          actionbarClass: 'ui-cytoscape-actionbar',
          actionItemClass: 'action-item'
        };
        angular.extend(defaults, options);
        ref = options.items;
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          if (item.visible == null) {
            item.visible = function() {
              return true;
            };
          }
          if (item.enabled == null) {
            item.enabled = function() {
              return true;
            };
          }
        }
        digestTimeout = null;
        runDigestAfterEvent = function() {
          if (digestTimeout) {
            $timeout.cancel(digestTimeout);
          }
          return digestTimeout = $timeout((function() {
            return digestTimeout = null;
          }), 100);
        };
        ref1 = ['zoom', 'pan'];
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          digestEvent = ref1[j];
          this.on(digestEvent, runDigestAfterEvent);
        }
        return scope.options = options;
      });
    }
  };
}]);

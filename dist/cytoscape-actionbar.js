angular.module('cytoscape.actionbar', []).directive('cytoscapeActionbar', ["$timeout", function($timeout) {
  return {
    template: "<div class=\"cytoscape-graph-actionbar\" style=\"right: 0; left: 0; position: absolute; z-index: 1000\">\n  <div ng-repeat=\"group in options.itemGroups\" ng-class=\"group.itemGroupClass\">\n      <button ng-repeat=\"item in group.items\" ng-click='item.action(cy, item)'\n        ng-disabled='!item.enabled()' ng-if='item.visible()'\n        ng-class='[options.actionItemClass, icon, item.icon]' data-container='body' bs-tooltip='item.tooltip'>\n      </button>\n  </div>\n</div>",
    link: function(scope) {
      return cytoscape('core', 'actionbar', function(options) {
        var defaults, digestEvent, digestTimeout, group, i, item, j, k, len, len1, len2, ref, ref1, ref2, runDigestAfterEvent;
        defaults = {
          itemGroups: [],
          actionItemClass: 'action-item'
        };
        angular.extend(defaults, options);
        ref = options.itemGroups;
        for (i = 0, len = ref.length; i < len; i++) {
          group = ref[i];
          ref1 = group.items;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            item = ref1[j];
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
        ref2 = ['zoom', 'pan'];
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          digestEvent = ref2[k];
          this.on(digestEvent, runDigestAfterEvent);
        }
        return scope.options = options;
      });
    }
  };
}]);

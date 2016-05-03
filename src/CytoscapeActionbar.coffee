angular.module('cytoscape.actionbar', []).directive 'cytoscapeActionbar', ($timeout) ->
  template: """
    <div ng-class='options.actionbarClass' style="position: absolute; z-index: 1000">
        <span ng-repeat="item in options.items" ng-click='item.action(cy, item)' ng-if='item.condition()'
        ng-class='[options.actionItemClass, icon, item.icon]' data-container='body' bs-tooltip='item.tooltip'></span>
    </div>
  """
  link: (scope) ->
    cytoscape(
      'core',
      'actionbar',
      (options) ->
        defaults =
          items: []
          actionbarClass: 'ui-cytoscape-actionbar' # set a class name for the toolbar to help with styling
          actionItemClass: 'action-item' # set a class name for a toolbar item to help with styling
        angular.extend(defaults, options)
        angular.forEach(options.items, (item) ->
          if not item.condition then item.condition = -> true)

        # run digest cycle on graph's zoom and pan events
        digestTimeout = null
        runDigestAfterEvent = ->
          $timeout.cancel(digestTimeout) if digestTimeout
          digestTimeout = $timeout((-> digestTimeout = null), 100)
        @on(digestEvent, runDigestAfterEvent) for digestEvent in ['zoom', 'pan']
        scope.options = options
    )

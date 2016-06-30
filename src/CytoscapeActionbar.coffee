angular.module('cytoscape.actionbar', []).directive 'cytoscapeActionbar', ($timeout) ->
  template: """
    <div class="cytoscape-graph-actionbar" style="right: 20px; position: absolute; z-index: 1000">
      <div ng-class="options.actionbarClass" ng-repeat="group in options.items">
          <button ng-repeat="item in group" ng-click='item.action(cy, item)'
            ng-disabled='!item.enabled()' ng-if='item.visible()'
            ng-class='[options.actionItemClass, icon, item.icon]' data-container='body' bs-tooltip='item.tooltip'>
          </button>
      </div>
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

        if options.items[0].action
          options.items = [options.items]

        for group in options.items
          for item in group
            item.visible ?= -> true
            item.enabled ?= -> true

        # run digest cycle on graph's zoom and pan events
        digestTimeout = null
        runDigestAfterEvent = ->
          $timeout.cancel(digestTimeout) if digestTimeout
          digestTimeout = $timeout((-> digestTimeout = null), 100)
        @on(digestEvent, runDigestAfterEvent) for digestEvent in ['zoom', 'pan']
        scope.options = options
    )

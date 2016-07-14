angular.module('cytoscape.actionbar', []).directive 'cytoscapeActionbar', ($timeout) ->
  template: """
    <div class="cytoscape-graph-actionbar" style="right: 1.5%; left: 1.5%; position: absolute; z-index: 1000">
      <div ng-repeat="group in options.itemGroups" ng-class="group.itemsClass">
          <button ng-repeat="item in group.items" ng-click='item.action(cy, item)'
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
          itemGroups: {}
          actionItemClass: 'action-item' # set a class name for a toolbar item to help with styling
        angular.extend(defaults, options)

        if options.itemGroups.itemsClass
          options.itemGroups = [options.itemGroups]

        for group in options.itemGroups
          for item in group.items
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

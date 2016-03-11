angular.module('cytoscape.actionbar', []).directive 'cytoscapeActionbar', ->
  template: """
    <div ng-class='options.actionbarClass' style="position: absolute; z-index: 1000">
        <span ng-repeat="item in options.items" ng-click='item.action(cy, item)' ng-if='item.condition()'
        ng-class='[options.actionItemClass, icon, item.icon]' bs-tooltip='item.tooltip'></span>
    </div>
  """
  link: (scope) ->
    cytoscape(
      'core',
      'actionbar',
      (options) ->
        defaults =
          items: []
          appendTools: no # set whether or not to append your custom tools list to the default tools list
          actionbarClass: 'ui-cytoscape-actionbar' # set a class name for the toolbar to help with styling
          actionItemClass: 'action-item' # set a class name for a toolbar item to help with styling
        angular.extend(defaults, options)
        angular.forEach(options.items, (item) ->
          if not item.condition then item.condition = -> true)
        scope.options = options
    )

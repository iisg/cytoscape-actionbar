(($) ->
  class CytoscapeActionbar
    defaults:
      items: []
      appendTools: false # set whether or not to append your custom tools list to the default tools list
      actionbarClass: 'ui-cytoscape-actionbar' # set a class name for the toolbar to help with styling
      multipleToolsClass: 'action-item-list' # set a class name for the tools that should be shown in the same position
      actionItemClass: 'action-item' # set a class name for a toolbar item to help with styling

    constructor: (cy, options) ->
      options = $.extend(true, {}, @defaults, options)

      $actionbar = $("<div class='#{options.actionbarClass}'></div>")
      $actionbar.appendTo($(cy.container()))

      $.each(options.items, (itemIndex, element) ->
        clazz = options.actionItemClass + ' icon ' + element.icon
        $element = $("<span id='action-#{itemIndex}' class='#{clazz}' title='#{element.tooltip}'></span>")
        $actionbar.append($element)

        $element
        .on('click', ->
          element.action(cy, element)
        )
        .hover(
          (e) ->
            $(e.target).css('color', '#000')
          (e) ->
            $(e.target).css('color', '#aaa')
        )
      )

  cytoscape(
    'core',
    'actionbar',
    (options) ->
      new CytoscapeActionbar(@, options)
      return @
  )
)(jQuery)

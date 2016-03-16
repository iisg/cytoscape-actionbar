# CytoscapeActionbar

## Description
Actionbar for Cytoscape.js

Allows to define and style graph buttons with action and angular conditions for each of them.

![cytoscape actionbar](https://raw.githubusercontent.com/iisg/cytoscape-actionbar/angularized/images/cytoscape-actionbar.png)

## Dependencies
 * Cytoscape.js >= 2.2
 * jQuery >= 1.4
 
## Installation
Require package using bower:

```
bower install iisg/cytoscape-actionbar --save
```

## Usage

```
<div id="cy">
  <cytoscape-actionbar></cytoscape-actionbar>
</div>
```

put tags inside cytoscape div and initialize plugin with:


```
  cy = cytoscape(
    container: ..
  )
  cy.actionbar(
    items: [
      {
        icon: 'fa fa-search-minus'      	# class for actionbar button
        tooltip: 'Zoom out'             	# button tooltip message
        action: (cy) ->                 	# function to call
	condition: -> isVisible			# optional expression to put in 'ng-if' condition
          ...
      },
      ..
    ]
    actionbarClass: 'ui-cytoscape-actionbar' 	# set a class name for the toolbar to help with styling
    actionItemClass: 'action-item' 		# set a class name for a toolbar item to help with styling
  )
```

## Example

Example with defined (bootstrap) classes:

```
actionbarClass: 'btn-group'
actionItemClass: 'btn btn-default btn-sm'
```


![cytoscape actionbar](https://raw.githubusercontent.com/iisg/cytoscape-actionbar/angularized/images/cytoscape-actionbar.png)

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
    itemGroups: 
      itemsClass: 'item-group' #set a class name for item group to help with styling
      items: [{
        icon: 'fa fa-search-minus'      	# class for actionbar button
        tooltip: 'Zoom out'             	# button tooltip message
        action: (cy) ->                 	# function to call
        visible: -> isVisible			# optional expression to put in 'ng-if' condition
        enabled: -> isEnabled			# optional expression to put in 'ng-disabled' condition (negation)
          ...
      },
      ..
      ]
    actionItemClass: 'action-item' 		# set a class name for a toolbar item to help with styling
  )
```

## Example

Example with defined (bootstrap) classes:

```
itemsClass: 'btn-group'
actionItemClass: 'btn btn-default btn-sm'
```


![cytoscape actionbar](https://raw.githubusercontent.com/iisg/cytoscape-actionbar/angularized/images/cytoscape-actionbar.png)

## Divide buttons into groups

If you want to divide buttons into groups, just specify `itemGroups` as a nested array, i.e.:

```
itemGroups: [
  {
  itemsClass: 'btn-group'
  items: [{ ### item 1, group 1 ### }, { ### item 2, group 1 ###} ]
  }
  {
  itemsClass: 'btn-group items-pulled-right'
  items: [{ ### item 1, group 2 ### }]
  }
]
```

The result:

![cytoscape actionbar](https://raw.githubusercontent.com/iisg/cytoscape-actionbar/angularized/images/cytoscape-actionbar-groups.png)

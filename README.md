# CytoscapeActionbar

## Description
Actionbar for Cytoscape.js

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
  cy = cytoscape(
    container: ..
  )
  cy.actionbar(
    items: [
      {
        icon: 'fa fa-search-minus'      # class for actionbar button
        tooltip: 'Zoom out'             # button tooltip message
        action: (cy) ->                 # function to call
		condition: $compile("<span ng-show='isVisible'></span>")($scope) # optional compiled angular expression which wraps button
          ...
      },
      ..
    ]
  )
```
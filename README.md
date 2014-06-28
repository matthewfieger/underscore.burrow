Underscore.burrow
=================

Underscore.burrow is an extenstion for converting flat data into nested tree structures based on an arbitrary number of nodes meaning that you can have a leaf or a branch at arbitrary depths.

For example, if your data looks like this:

```javascript
var data = [
    {nodes : ['tag-a', 'tag-b', 'tag-c']},
    {nodes : ['tag-a', 'tag-c', 'tag-b']},
    {nodes : ['tag-c']}
  ];
```

And you want it to look like this:

```javascript
{
  "name": "Root Node",
  "children": [
    {
      "name": "tag-a",
      "children": [
        {
          "name": "tag-b",
          "children": [
            {
              "name": "tag-c",
              "value": 1
            }
          ]
        },
        {
          "name": "tag-c",
          "children": [
            {
              "name": "tag-b",
              "value": 1
            }
          ]
        }
      ]
    },
    {
      "name": "tag-c",
      "value": 1
    }
  ]
}
```

You can accomplish that by using underscore.burrow like so:

```javascript
  _.burrow(data);
```
# API:

```javascript
_.nest(data, rootNodeName);
```

* `data` - An array of objects, or an array of arrays.  If you pass an array of objects, each object must have a `nodes` property whose value is an array of nodes.  Optionally, if you pass an array of objects, each object can have a `leafData` property, whose value is either a string or an object.  The `leadData` will be included in the leaf nodes.
* `rootNodeName` - an optional name for the root node.


# Examples:

## Nest an array of objects:

```javascript

var data = [
    {nodes : ['tag-a', 'tag-b', 'tag-c'], leafData : {name : 'Post 1'} },
    {nodes : ['tag-a', 'tag-c', 'tag-b'], leafData : {name : 'Post 2'} },
    {nodes : ['tag-c'], leafData : {name : 'Post 3'} }
  ];

_.nest(data);
```

Results in:

```javascript
{
  "name": "Root Node",
  "children": [
    {
      "name": "tag-a",
      "children": [
        {
          "name": "tag-b",
          "children": [
            {
              "name": "Post 1",
              "value": 1
            }
          ]
        },
        {
          "name": "tag-c",
          "children": [
            {
              "name": "Post 2",
              "value": 1
            }
          ]
        }
      ]
    },
    {
      "name": "tag-c",
      "value": 1
    }
  ]
}
```

## Nest an array of arrays:

```javascript

var data = [
    ['tag-a', 'tag-b', 'tag-c'],
    ['tag-a', 'tag-c', 'tag-b'],
    ['tag-c']
  ];

_.nest(data);
```

Results in:

```javascript
{
  "name": "Root Node",
  "children": [
    {
      "name": "tag-a",
      "children": [
        {
          "name": "tag-b",
          "children": [
            {
              "name": "tag-c",
              "value": 1
            }
          ]
        },
        {
          "name": "tag-c",
          "children": [
            {
              "name": "tag-b",
              "value": 1
            }
          ]
        }
      ]
    },
    {
      "name": "tag-c",
      "value": 1
    }
  ]
}
```
## Credits

* [Burrow.js](https://gist.github.com/syntagmatic/4076122#file_burrow.js)
* [Underscore.nest](https://github.com/iros/underscore.nest)

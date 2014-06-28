// nest data based on nodes of arbitrary depth
// requires Underscore.js

// 'burrow' can take an array of objects,
// with each object item having a 'nodes' property,
// and with the 'nodes' property containing
// an array of node items of arbitray number.
// or 'burrow' can take an array of arrays,
// with each arrary containing an arbtitary number of node items.
// 'burrow' can also take an optional,
// root node name.
// optionally, if you are passing an array of objects,
// each object can also have a 'leafData' property,
// that contains either a string or an object
// of data to be included in the leaf nodes.
var burrow = function (data, root) {
  // start with a simple nested object
  var object = {};

  _(data).each(function(d) {
    var _object = object;
    //console.log(d);
    // nest based on an array of nodes,
    // with arbitray length,
    // meaning that we could have a branch,
    // or a leaf node at any depth
    var nodes;
    if ( _.isObject(d) && !!d.nodes ) {
      // if d is an object,
      // and d has nodes property,
      // consider this the nodes
      d['leafData'] = (!!d['leafData']) ? d['leafData'] : {};
      nodes = d.nodes;
    }
    else if ( _.isArray(d) ) {
      // if d is an array,
      // consider this the nodes
      d = {'nodes' : d, 'leafData' : {} };
      nodes = d.nodes;
    } else {
      // else the data is invalid
      throw new TypeError("invalid data");
    }

    _(nodes).each(function(element,index) {
      _object[element] = _object[element] || {'leafData' : d.leafData};
      _object = _object[element];
    }); // _.each(d.nodes)
  }); // _.each(data)
 
  // recursively create children array
  var descend = function (object, leafData) {
    if (!!object.leafData) {
      // if there is leafData,
      // let's set it aside,
      // and delete this property from the object
      var leafData = object.leafData;
      delete object['leafData']; 
    } else if ( !!leafData ) {
      // if there is data that has already been set aside,
      // let's keep that with us as we descend
      var leafData = leafData;
    }

    // check if there are nodes at the current level,
    // by checking if the 'object' argument is empty
    if (!_.isEmpty(object)) {  
      // if there are nodes at this level,
      // then create them and add them to the array
      var array = [];
        _(object).each(function(value, key) {
          if (key !== 'leafData') { 
          // check if there are any nodes,
          // at the next level, and also
          // pass the leafData down to the next level
          var children = descend(value, leafData);
          if (!!children) {
            // if there are nodes at the next level,
            // then this is a branch node,
            // and we want to recusively call the descend function again
            var node = {
              name: key,
              children: children
            }; // node
          } else {
            // if there are no nodes at the next level,
            // then this is a leaf node,
            // and so it doesn't have any children,
            // and we don't have to descend anymore
            var node = {
              name: key,
              value: 1
            }; // node
            // and we want to include the leaf data
            // at the leaf node
            if ( !!leafData && _.isObject(leafData) ) { _.extend(node, leafData) }
            else if (!!leafData) { node['leafData'] = leafData };
          } // else
          array.push(node)
        } // if key
        }); // _.each
      return array;
    } // if
    // else if there are no nodes at this level,
    // then we want to return false,
    // so that the previous level knows,
    // that there are no nodes at this level
    else return false;
  }; // descend
  
  // nested objectect
  return {
    name: root || 'Root Node', // name of the root node
    children: descend(object)
  }; // return
}; // burrow


// Exports
if (!!_) {
  _.mixin({"burrow" : burrow});
} else {
  Burrow = burrow;
}

//var test_08a = testburrow([{nodes : ['a', 'b', 'c']}, {leafData: 'foobar', nodes : ['a', 'b', 'c']}, {leafData: {bar: 'foo'}, nodes : ['a', 'c', 'b']}], 'Observations');

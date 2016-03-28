/**
 * Counter.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var async = require('async');

module.exports = {

  attributes: {
      id: {
          type: 'string'
      },
      seq: {
          type: 'integer',
          defaultsTo: 0
      }
  },

    getNextSequence: function(name, cb) {

        Counter.findOne({ id: name})
            .then(
            function CounterFound(counter){
                if(!counter || (!counter.seq && counter.seq !== 0)){
                    console.log("Create!");
                    return Counter.create({ id: name, seq: 0});
                } else {
                    console.log("Update!");
                    return Counter.update({id: name}, {seq: counter.seq + 1});
                }
            },
            function CounterFindError(err) {
                console.log("CounterFindError: ");
                console.log(err);
            }
        )
            .then(function(entity){
                console.log(entity);
                if (entity) {
                    cb(null, entity);
                } else {
                    cb("Counter creation/update failed");
                }
            });
    }

};


/**
 * Counter.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var async = require('async');
//var Promise = require('bluebird');

module.exports = {

  attributes: {
      id: {
          type: 'string'
      },
      seq: {
          type: 'integer',
          defaultsTo: 1
      }
  },

    getNextSequence: function(name) {

        var initialSeq = 1;

        return Counter.findOne({ id: name})
            .then(function CounterFound(counter){
                if(!counter || (!counter.seq && counter.seq !== 0)){
                    return Counter.create({ id: name, seq: initialSeq});
                } else {
                    return Counter.update({id: name}, {seq: counter.seq + 1});
                }
            },
            function CounterFindError(err) {
                console.log("Counter [", name, "] error:", err);
                return new Promise(function(resolve, reject) {
                    reject(err);
                });
            }
        )
            .then(function(entity){
                return new Promise(function(resolve, reject){
                    if (entity) {
                        //update operation
                        if(Array.isArray(entity)) {
                            if (entity.length > 0) {
                                resolve(entity[0].seq);
                            } else {
                                reject("Counter update failed!");
                            }
                        //create operation
                        } else {
                            resolve(entity.seq);
                        }
                    }
                    else {
                        reject("Counter creation/update failed");
                    }
                });
            });
    }

};


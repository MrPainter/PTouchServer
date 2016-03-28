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

    getNextSequence: function(name, callback) {
        async.waterfall([
            function(cb) {
                Counter.findOne({ id: name}, function(err, counter) { cb(err, counter, cb); });
            },
            function(err, counter, cb) {
                console.log(err);
                if (!counter.seq) {
                    Counter.create({ id: name, seq: 0}, function(err, entity){
                        if(err) {
                            console.log("Error during creating counter for:", name, ". Error:", err);
                        }
                    });
                    callback(null, 0);
                }
                console.log("Seq:", counter.seq);
                Counter.update({id: name}, {seq: counter.seq + 1}, function(err, entity){
                    if (err) {
                        console.log("Error during counter update! Counter:", name);
                    }
                });
                callback(null, counter.seq + 1);
            }
        ]);

//        Counter.findOne({ id: name}, function(err, counter){
//            if (!counter) { //.seq && model.seq != 0
//                Counter.create({ id: name, seq: 0}, function(err, entity){
//                    if(err) {
//                        console.log("Error during creating counter for:", name, ". Error:", err);
//                    }
//                });
//                return 0;
//            }
//            console.log("Seq:", counter.seq);
//            Counter.update({id: name}, {seq: counter.seq + 1}, function(err, entity){
//                if (err) {
//                    console.log("Error during counter update! Counter:", name);
//                }
//            });
//            return counter.seq + 1;
//        });
    }

};


/**
 * Photo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      uid: {
          type: 'integer',
          unique: true,
          required: true,
          defaultsTo:0
      },
      name: {
          type: 'string'
      }
//      ,
//      createdAt: {
//          type: 'datetime',
//          defaultsTo: new Date().toISOString()//moment.format('')
//      }
  },

  sequenceId: 'photo',

    beforeCreate : function (values, cb) {

        // add seq number, use
        Counter.next("photo", function(err, num) {

            if (err) return cb(err);

            values.uid = num;

            cb();
        });
    }

};


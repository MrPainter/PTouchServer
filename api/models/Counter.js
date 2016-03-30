/**
 * Counter.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


module.exports = {
    attributes : {
        num : {
            type : "integer"
        }
    },

    next : function (id, cb) {

        Counter.native(function (err, col) {

            col.findAndModify(
                { _id: id },
                [['_id', 'asc']],
                {$inc: { num : 1 }},
                { new: true, upsert : true}
                , function(err, data) {

                    cb(err, data.value.num);
                });

        });

    }
};


/**
 * Settings.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        id: {
            type: 'number',
            required: true,
            unique: true
        },
        photos_selectable: {
            type: 'integer',
            defaultsTo: 3
        }

        //as example
//        email: {
//            type: 'email',
//            required: true,
//            unique: true
//        },
//        first_name: {
//            type: 'string',
//            required: true
//        },
//        message_count: {
//            type: 'number'
//        },
//        // A User can have many messages
//        messages: {
//            collection: 'message',
//            via: 'user'
//        },
//        passports: { collection: 'Passport', via: 'user' }
    }
};


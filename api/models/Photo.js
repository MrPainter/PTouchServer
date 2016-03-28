/**
 * Photo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var moment = require('moment');

module.exports = {

  attributes: {
      id: {
          type: 'number',
          unique: true,
          required: true
      },
      name: {
          type: 'string'
      },
      createdAt: {
          type: 'datetime',
          defaultsTo: new Date().toISOString()//moment.format('')
      }

  }
};


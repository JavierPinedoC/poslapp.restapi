'use strict';

var _ = require('lodash');
const { Roles } = require('../models'); // Sequelize

var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
//var Roleservice = require('../services/Roles.service');

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

// Module Name
const MODULE_NAME = '[Roles Controller]';

// Error Messages
const GS_CT_ERR_Roles_NOT_FOUND = 'Roles not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Roles deleted successfully';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

function getRoles(req, res) {
    try {
        console.log("Roles...");
        console.log(Roles);
        Roles.findAll({
                /*include: [{
                model: orderstatus
                }]
                include: [{ all: true, nested: true }]*/
            })
            .then((consoles) => {
                console.log(consoles);
                res.status(200).send(consoles);
                //utils.writeJson(res, consoles);
            }, (error) => {
                res.status(500).send(error);
            });
    } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, getRoles.nombreRol, error, res);
    }
}

// function getRolesById(req, res) {

//     try {
//         // Receiving parameters
//         var params = {
//             id: req.swagger.params.id.value
//         };

//         // Call to service
//         var result = Roleservice.getRolesById(params.id);

//         // Returning the result
//         if (!_.isUndefined(result)) {
//             res.json(result);
//         } else {
//             res.status(404).json(messageHelper.buildMessage(GS_CT_ERR_Roles_NOT_FOUND))
//         }
//     } catch (error) {
//         controllerHelper.handleErrorResponse(MODULE_NAME, getRolesById.name, error, res);
//     }
// }

// function createRoles(req, res) {

//     try {
//         // Receiving parameters
//         var params = req.body;

//         // Call to service
//         var result = Roleservice.createRoles(params);

//         // Returning the result
//         if (!_.isUndefined(result) && _.isUndefined(result.error)) {
//             res.status(201).json(result);
//         } else {
//             res.status(409).json(messageHelper.buildMessage(result.error));
//         }
//     } catch (error) {
//         controllerHelper.handleErrorResponse(MODULE_NAME, createRoles.name, error, res);
//     }
// }

// function updateRoles(req, res) {

//     try {
//         // Receiving parameters
//         var params = {
//             id: req.swagger.params.id.value
//         };
//         _.assign(params, req.body);

//         // Call to service
//         var result = Roleservice.updateRoles(params);

//         // Returning the result
//         if (!_.isUndefined(result) && _.isUndefined(result.error)) {
//             res.json(result);
//         } else {
//             res.status(409).json(messageHelper.buildMessage(result.error));
//         }
//     } catch (error) {
//         controllerHelper.handleErrorResponse(MODULE_NAME, updateRoles.name, error, res);
//     }
// }

// function deleteRoles(req, res) {

//     try {
//         // Receiving parameters
//         var params = {
//             id: req.swagger.params.id.value
//         };

//         // Call to service
//         var result = Roleservice.deleteRoles(params.id);

//         // Returning the result
//         if (!_.isUndefined(result) && _.isUndefined(result.error)) {
//             res.json(messageHelper.buildMessage(GS_CT_DELETED_SUCCESSFULLY));
//         } else {
//             res.status(404).json(messageHelper.buildMessage(result.error));
//         }
//     } catch (error) {
//         controllerHelper.handleErrorResponse(MODULE_NAME, createRoles.name, error, res);
//     }
// }

module.exports = {
    getRoles,
    // getRolesById,
    // createRoles,
    // updateRoles,
    // deleteRoles,
    GS_CT_ERR_Roles_NOT_FOUND,
    GS_CT_DELETED_SUCCESSFULLY,
    MODULE_NAME
}
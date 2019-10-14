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

function addRol(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    try {
        console.log("params : ");
        var myrol = req.body;
        console.log("Roles ... " + myrol);
        return Roles
            .create({
                nombreRol: myrol.nombreRol,
            }, {
                /* include: [{
                model: order_detail,
                as: 'orderdetail'
                }] */
            })
            .then((myrol) => {
                res.status(201).send(myrol);
            })
            .catch((error) => res.status(400).send(error));
    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, addRol.nombreRol, error, res);
    }
}

function getRolesbyPk(req, res) {
    //console.log("operadores.controller getOperadorById");
    try {
        console.log(req.swagger.params.id.value);
        var id = req.swagger.params.id.value;
        console.log("Roles by id..." + id);
        //console.log(Roles);
        Roles.findByPk(id)
            .then(myRole => {
                console.log(myRole);
                res.status(200).send(myRole);
            })
    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getRolesbyPk.id, error,
            res);
    }
}

function updateRoles(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //console.log("operadores.controller getOperadorById");
    try {
        var id = req.swagger.params.id.value;
        console.log("params : " + id);
        var myupdateRol = req.body;
        console.log("update Rols ... " + myupdateRol.name);
        Roles.findByPk(id)
            .then(myRol => {
                console.log("Result of findById: " + myRol);
                if (!myRol) {
                    res.status(401).send(({}));
                }
                return myRol
                    .update({
                        nombreRol: myupdateRol.nombreRol

                    })
                    .then(() => res.status(200).send(myRol))
                    .catch(error => res.status(403).send(myRol));
            })
            .catch(error => {
                console.log("There was an error: " + error);
                //resolve(error);
            });
    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, updateRol.nombreRol, error, res);
    }
}

function deleteRoles(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log(req.swagger.params.id.value);
    var id = req.swagger.params.id.value;
    Roles.findByPk(id)
        .then(myroles => {
            console.log("Result of findById: " + myroles);
            if (!myroles) {
                res.status(200).send({ "success": 0, "description": "not found !" });
            } else {
                return myroles
                    .destroy()
                    .then(() => res.status(200).send({ "success": 1, "description": "deleted!" }))
                    .catch(error => res.status(403).send({ "success": 0, "description": "error !" }))
            }
        })
        .catch(error => {
            console.log("There was an error: " + error);
        });
}

module.exports = {
    getRoles,
    addRol,
    getRolesbyPk,
    updateRoles,
    deleteRoles,
    GS_CT_ERR_Roles_NOT_FOUND,
    GS_CT_DELETED_SUCCESSFULLY,
    MODULE_NAME
}
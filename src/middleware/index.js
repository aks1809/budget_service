import express from "express";
import bodyParser from "body-parser";

export default (app) => {
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 500000}));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 500000}));
};
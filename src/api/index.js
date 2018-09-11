'use strict';
import {Router, NextFunction, Request, Response} from 'express';
import { generateResponse } from '../utilites/';

const router = Router();

router.get('/', (req, res) => {
    generateResponse(true, "APIs Working fine", null, res);
});

module.exports = router;
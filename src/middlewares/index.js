'use strict';

import {verify} from "jsonwebtoken";
import config from "../config";


export function log(req, res, next){
    console.log(req.originalUrl);
    // let whitelist = Object.keys(config.whitelist).map(k => config.whitelist[k]);
    // let origin = req.ip;
    // console.log(origin);
    // let originIsWhitelisted = whitelist.indexOf(origin) !== -1 || typeof origin === "undefined";
    // if(originIsWhitelisted){
    next();
    // } else {
    //     res.status(400).json({message: 'Unauthorized Access'});
    // }
}

export function loggedIn(req, res, next) {
    decodeToken(req).then(data => {
        req.user = data.user;
        next();
    }).catch(ex => {
        // let error = {type: ERROR_TYPE.FORCE_UPDATE, message: 'Update your application.'};
        // let error = {type: ERROR_TYPE.DEACTIVATE_USER, message: 'User is deactivated.'};
        // let error = {type: ERROR_TYPE.CUSTOM, message: 'Oops something went wrong..'};
        res.status(400).json({success: false, error: ["Unauthenticated request"]});
        /* console.error(ex); */
    });
}

export function decodeToken(req) {
    return new Promise((resolve, reject) => {
        let {token} = req.headers;
        verify(token, config.jwtsecret, (err, decoded) => {
            if (err === null) {
                resolve(decoded);
            } else {
                reject(err);
            }
        });
    });
}

// export function decodeToken(req) {
//     return new Promise((resolve, reject) => {
//         let {token} = req.headers;
//         verify(token, `${config.app['jwtsecret']}`, (err, decoded) => {
//             if (err === null) {
//                 resolve(decoded);
//             } else {
//                 reject(err);
//             }
//         });
//     });
// }

// export function loggedIn(req, res, next) {
//     decodeToken(req).then(data => {
//         req.user = data;

//         new Member({id: req.user.id}).find().then(m => {
//             if(!m.active){
//                 let flag = isRouteAccessible(req.originalUrl, ERROR_TYPE.DEACTIVATE_USER);
//                 if(flag){
//                     next();
//                 } else {
//                     let error = {type: ERROR_TYPE.DEACTIVATE_USER, message: 'You have been deactivated from the service.'};
//                     res.status(403).json({success: false, error: error});
//                 }
//             } else {
//                 next();
//             }
//         }).catch(ex => {
//             res.status(400).json({success: false, error: ["Unauthenticated request"]});
//             console.error(ex);
//         });
//     }).catch(ex => {
//         // let error = {type: ERROR_TYPE.FORCE_UPDATE, message: 'Update your application.'};
//         // let error = {type: ERROR_TYPE.DEACTIVATE_USER, message: 'User is deactivated.'};
//         // let error = {type: ERROR_TYPE.CUSTOM, message: 'Oops something went wrong..'};
//         res.status(400).json({success: false, error: ["Unauthenticated request"]});
//         console.error(ex);
//     });
// }

// export function admin(req, res, next) {
//     decodeToken(req).then(data => {
//         if (data.isAdmin == true) {
//             next();
//         } else {
//             res.status(400).json({success: false, error: ["Unauthorized request"]});
//         }
//     }).catch(ex => {
//         res.status(400).json({success: false, error: ["Unauthenticated request"]});
//         console.error(ex);
//     });
// }


// function isRouteAccessible(path, errorType){
//     let paths = {
//         'deactivate_user' : {
//             allowed_path: [
//                 '/api/settings',
//                 '/api/settings/calc_route',
//                 '/api/settings/update',
//                 '/api/reports'
//             ]
//         }
//     };
//     return paths[errorType].allowed_path.includes(path);
// }
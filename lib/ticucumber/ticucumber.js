/*
 * ticucumber
 * https://github.com/codexlabs/TiCucumber
 *
 * Copyright (c) 2013 Andrew McElroy
 * License: MIT
 */

exports.version = '1.3.0';

'use strict';

exports.test = function(string) {
    if (typeof string !== 'string') {
        return false;
    }

    string = string.match(/[a-z0-9]/gi).join('').toLowerCase();
    return string === string.split('').reverse().join('');
};

exports.fail = function(){};

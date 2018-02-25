'use strict';

define([], function() {
    var lf = window.lf;

    var Schema = {
        'id': lf.Type.INTEGER
    };
    Schema.description = lf.Type.STRING;

    return Schema;
});

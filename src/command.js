// @flow

/**
 * A simple command class that gets deserialized when it is sent to phantom
 */
export default class Command {
    id: string;
    target: string;
    name: string;
    params: mixed[];
    deferred: ?{resolve: Function, reject: Function};

    constructor(id: ?string, target: string, name: string, params:mixed[] = []) {
        this.id = id || randId(16);
        this.target = target;
        this.name = name;
        this.params = params;
        this.deferred = null;
    }
}

/**
 * Generate an ascii random ID
 * 
 * @param  {Number} bytes number of bytes the ID should contain
 * @return {String} a textual ID of `bytes` entropy
 */
function randId(bytes) {
    var ret = [];
    for( ; bytes > 0 ; bytes -= 4 ) {
        // Make a unique string of pow(2, 32) entropy.
        ret.push(((Math.random()*(-1>>>0))>>>0).toString(36)); // number in base 36 (to save space)
    }
    return ret.join('');
}

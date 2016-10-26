// @flow
import Phantom from './phantom';

export default class OutObject {
    _phantom: Phantom;
    target: string;

    constructor(phantom:Phantom) {
        this._phantom = phantom;
        this.target = 'OutObject$' + randId(16);
    }

    property(name: string) {
        return this._phantom.execute(this.target, 'property', [name]);
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

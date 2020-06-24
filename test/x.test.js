var expect = require('chai').expect;
var x = require('../functions/x.js');
require('dotenv').config();

describe('Use Case 1', () => {     
    it('should pass all tests', async () => {       
        const res = await x.x()
        expect(res).to.equal(null)
    })
})
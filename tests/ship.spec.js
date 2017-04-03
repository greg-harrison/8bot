'use strict'

const Ship = require('../actions/ship')  
const expect = require('chai').expect

describe('Ship module', () => {  
  describe('ship.ship', () => {
    it('should export a function', () => {
      expect(Ship.ship).to.be.a('function')
    })
  })
})


'use strict'

const ConsoleResponses = require('../actions/consoleResponses')  
const expect = require('chai').expect

describe('ConsoleResponses module', () => {  
  describe('consoleResponses.awake', () => {
    it('should export a function', () => {
      expect(ConsoleResponses.awake).to.be.a('function')
    })
  })
  describe('consoleResponses.disconnected', () => {
    it('should export a function', () => {
      expect(ConsoleResponses.disconnected).to.be.a('function')
    })
  })
})


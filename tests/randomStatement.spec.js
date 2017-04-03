'use strict'

const RandomStatement = require('../actions/randomStatement')  
const expect = require('chai').expect

describe('RandomStatement module', () => {  
  describe('randomStatement.motivation', () => {
    it('should export a function', () => {
      expect(RandomStatement.motivation).to.be.a('function')
    })
  })
  describe('randomStatement.quotes', () => {
    it('should export a function', () => {
      expect(RandomStatement.quotes).to.be.a('function')
    })
  })
})


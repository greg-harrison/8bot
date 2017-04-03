'use strict'

const Responses = require('../actions/responses')  
const expect = require('chai').expect

describe('Responses module', () => {  
  describe('responses.helloWorld', () => {
    it('should export a function', () => {
      expect(Responses.helloWorld).to.be.a('function')
    })
  })
  describe('responses.whatAStory', () => {
    it('should export a function', () => {
      expect(Responses.whatAStory).to.be.a('function')
    })
  })
  describe('responses.test', () => {
    it('should export a function', () => {
      expect(Responses.test).to.be.a('function')
    })
  })
})

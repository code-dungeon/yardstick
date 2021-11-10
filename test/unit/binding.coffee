describe 'global bindings', ->

  describe 'chai', ->
    Given -> @value = 'chai'
    Then -> @value.should.equal('chai')  
  
  describe 'chai-as-promised', ->
    Given -> @value = 'chai-as-promised'
    When -> @promise = Promise.resolve('chai-as-promised')
    Then -> @promise.should.eventually.equal(@value)

  describe 'chai-properties', ->
    Given -> @value = {a:1,b:2}
    Then -> @value.should.have.properties({b:2})
    
  describe 'sinon', ->
    Given -> @spy = spy
    Then -> @spy.should.not.be.undefined

  describe 'sinon-chai', ->
    Given -> @spy = spy()
    When -> @spy()
    Then -> @spy.should.been.calledOnce
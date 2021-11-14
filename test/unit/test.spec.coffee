{Test} = importModule('test')

describe 'Test', ->
  Given -> @instance = new Test()
  Then -> @instance.should.not.be.undefined
  
  describe '#get', ->  
    When -> @value = @instance.get()
    Then -> @value.should.equal('Hello World!')

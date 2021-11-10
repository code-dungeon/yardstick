{Test} = importModule('test')

describe 'Test', ->
  Given -> @instance = new Test()
  
  describe '#get', ->  
    When -> @value = @instance.get()
    Then -> @value.should.equal('Hello World!')

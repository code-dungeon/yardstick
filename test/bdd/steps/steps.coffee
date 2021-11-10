{ Given, When, Then } = require('@cucumber/cucumber')
{ Test } = importModule('test')

Given /^I initialize test$/, -> @test = new Test()
When /^I call get$/, -> @result = @test.get()
Then /^I should get hello world$/, -> @result.should.equal('Hello World!')

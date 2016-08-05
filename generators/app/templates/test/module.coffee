<%= className %> = require '../src/<%= name %>'
expect = chai.expect

describe '<%= className %>', ->

  $el = null
  <%= variableName %> = null

  before ->
    $el = $('<div class="test-el"></div>').appendTo 'body'

  after ->
    $el.remove()
    $el = null

  beforeEach ->
    sample = new <%= className %>
      el: '.test-el'

  afterEach ->
    <%= variableName %>.destroy()
    <%= variableName %> = null

  it 'should inherit from QingModule', ->
    expect(sample).to.be.instanceof QingModule
    expect(sample).to.be.instanceof <%= className %>

  it 'should throw error when element not found', ->
    spy = sinon.spy <%= className %>
    try
      new spy
        el: '.not-exists'
    catch e

    expect(spy.calledWithNew()).to.be.true
    expect(spy.threw()).to.be.true

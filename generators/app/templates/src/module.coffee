class <%= className %> extends QingModule

  @name: '<%= className %>'

  @opts:
    el: null

  constructor: (opts) ->
    super

    @el = $ @opts.el
    unless @el.length > 0
      throw new Error '<%= className %>: option el is required'

    @opts = $.extend {}, <%= className %>.opts, @opts
    @_render()
    @trigger 'ready'

  _render: ->
    @el.append """
      <p>This is a sample component.</p>
    """
    @el.addClass ' <%= name %>'
      .data '<%= variableName %>', @

  destroy: ->
    @el.empty()
      .removeData '<%= variableName %>'

module.exports = <%= className %>

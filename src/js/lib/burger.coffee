class Burger
  constructor: ->
    @el = document.querySelector '.navbar-burger'
    # @el.removeEventListener('click',@bind)
    @el.addEventListener 'click', (e) =>
      e.preventDefault()
      target = @el.dataset.target
      # console.log target
      $target = document.getElementById(target)
      @el.classList.toggle('is-active')
      $target.classList.toggle('is-active')
      $target.classList.toggle('fadeInDown')
      if $nav = document.getElementById('nav')
        $nav.classList.toggle('active') if !$nav.classList.contains('scroll-active')
document.addEventListener 'DOMContentLoaded', ->
  new Burger()
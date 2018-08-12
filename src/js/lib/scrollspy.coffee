import { throttle } from 'throttle-debounce'
import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()
# import './scrollspy.styl'
export default class ScrollSpy
	constructor: (options)->
		defaults =
			selector: "h1", 
			linkSelector: 'nav a[href*="#"]', 
			throttle: 100,
			offset: 200,
			classActive: 'is-active',
			autoinit: true
		@options =  if options then Object.assign(defaults,options) else options
		if @options.autoinit
			@init()
		@title = document.title
		# @ruler = document.createElement 'div'
		# @ruler.id = 'ruler'
		# document.body.appendChild(@ruler)
		@stopSpy = false
	init: ->
		@items = document.querySelectorAll(@options.selector)
		@links = document.querySelectorAll(@options.linkSelector)
		@selected = 0
		@current = @items[@selected]
		@smoothScroll()
		window.addEventListener 'load', => @spy()
		window.addEventListener 'scroll',throttle(@options.throttle,()=>@spy())
	smoothScroll: ->
		@links.forEach (link) =>
			link.addEventListener 'click',(e)=>
				@stopSpy = true
				e.preventDefault()
				targetId = link.href.split('#')[1]
				target = document.getElementById targetId
				top = (document.scrollingElement || document.documentElement).scrollTop
				# @ruler.style.top = top + 'px'
				# window.scroll 
				# 	top: target.offsetTop,
				# 	behavior: 'smooth'
				target.scrollIntoView({behavior: 'smooth'})
				link.classList.add @options.classActive
				document.title = link.innerText + ' | ' + @title
				@links.forEach (l) =>
					if l.href != link.href
						l.classList.remove @options.classActive
				setTimeout () =>
					@stopSpy = false
				, 2000
	setCurrent: ->
		@links.forEach (link)=>
			if link.href.indexOf('#'+@current.id) != -1
				link.classList.add @options.classActive
				document.title = @current.innerText + ' | ' + @title
			else
				link.classList.remove(@options.classActive)	
	spy: ->
		unless @stopSpy
			selected = 0
			@lastTop = 0
			direction = if top > @lastTop then "down" else "up"
			@current = @items[0]
			@items.forEach (item,index,all) =>
				top = (document.scrollingElement || document.documentElement).scrollTop
				delta = (((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) || 0) * 100)
				gamma = Math.floor(delta*0.01*window.innerHeight)
				top += gamma
				itemTop = item.offsetTop
				@selected = index if itemTop < top
			@current = @items[@selected]
			@setCurrent()
			@lastTop = top
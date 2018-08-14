export default class Anchors
	constructor: (options) ->
		defaults =
			selector: "h1,h2,h3"
		@options = if options then Object.assign(defaults,options) else defaults
	init: ->
		new Promise (resolve,reject) =>
			@items = document.querySelectorAll(@options.selector)
			@items.forEach (h)=>
				anchor = document.createElement 'a'
				anchor.innerHTML = '<i class="fas fa-link"></i>'
				anchor.href = '#' + h.id
				anchor.classList.add 'link'
				h.appendChild(anchor)
			resolve()
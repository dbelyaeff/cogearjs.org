export default class Anchors
	constructor: (options) ->
		defaults =
			selector: "h1,h2,h3"
		@options = if options then Object.assign(defaults,options) else defaults
	init: ->
		new Promise (resolve,reject) =>
			@items = document.querySelectorAll(@options.selector)
			@items.forEach (h)=>
				title =  document.createElement 'a'
				title.innerText = h.innerText
				title.href = '#' + h.id
				anchor = document.createElement 'i'
				anchor.classList.add('fas')
				anchor.classList.add('fa-link')
				title.appendChild(anchor)
				h.innerHTML = ''
				h.appendChild(title)
			resolve()
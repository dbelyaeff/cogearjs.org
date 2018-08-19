export default class AutoSubmenu {
	constructor(options){
		let defaults = {
			activeLinkSelector: "aside.menu a.is-active",
			headersSelector: "section > h1"
		}
		this.options = options ? Object.assign(defaults,options) : defaults
		this.build()
	}
	build(){
		let activeLink = document.querySelector(this.options.activeLinkSelector)
		if(activeLink.parentElement.querySelector('ul')){
			return
		}
		let headers = document.querySelectorAll(this.options.headersSelector)
		let ul = document.createElement("ul")
		ul.classList.add('animated')
		ul.classList.add('fadeInLeft')
		headers.forEach((header)=>{
			let li = document.createElement("li")
			let a = document.createElement("a")
			a.href = "#" + header.id
			a.innerText = header.innerText
			li.appendChild(a)
			ul.appendChild(li)
		})
		activeLink.parentElement.appendChild(ul)
	}
}
import '../css/bulma.sass'
import 'github-markdown-css/github-markdown.css'
import '../css/docs.styl'
import 'animate.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import 'https://use.fontawesome.com/releases/v5.2.0/js/all.js'
import ScrollSpy from './lib/scrollspy'
import AutoSubmenu from './lib/autosubmenu'
import NavButtons from './lib/navbuttons'
import Anchors from './lib/anchors'
import SmoothScroll from 'smooth-scroll'
import './lib/burger.js'
window.addEventListener('load',()=>{
	hljs.initHighlightingOnLoad()
	document.querySelectorAll("pre code").forEach(block=>{
		hljs.highlightBlock(block)
	})
  new NavButtons()  
  new AutoSubmenu()
  const anchors = new Anchors()
  anchors.init().then(()=>{
    new SmoothScroll('main > section a[href*="#"]')
  })
	new ScrollSpy({
		selector: "main > section > h1",
		linkSelector: "aside.menu a[href*='#']",	
		offset: 100,
		throttle: 50
	})
})


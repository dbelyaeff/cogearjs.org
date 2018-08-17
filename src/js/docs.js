import '../fonts/google-fonts-1534515193737.css'
import '../fonts/google-fonts-1534515231222.css'
import '../css/bulma.sass'
import 'github-markdown-css/github-markdown.css'
import '../css/docs.styl'
import 'animate.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
// import 'https://use.fontawesome.com/releases/v5.2.0/css/solid.css'
// import 'https://use.fontawesome.com/releases/v5.2.0/css/fontawesome.css'
import ScrollSpy from './lib/scrollspy'
import AutoSubmenu from './lib/autosubmenu'
import NavButtons from './lib/navbuttons'
import Anchors from './lib/anchors'
import SmoothScroll from 'smooth-scroll'
import './lib/burger.js'
import './lib/version.js'
import fitVids from 'fitvids'
document.addEventListener('DOMContentLoaded',()=>{
	fitVids()
	hljs.initHighlightingOnLoad()
	document.querySelectorAll("pre code").forEach(block=>{
		hljs.highlightBlock(block)
	})
  new NavButtons()  
  new AutoSubmenu()
  const anchors = new Anchors()
  anchors.init().then(()=>{
    new SmoothScroll('section a[href*="#"]')
  })
	new ScrollSpy({
		selector: "section > h1",
		linkSelector: "aside.menu a[href*='#']",	
		offset: 100,
		throttle: 50
	})
})


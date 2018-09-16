import '../fonts/google-fonts-1534515193737.css';
import '../fonts/google-fonts-1534515231222.css';
import 'github-markdown-css/github-markdown.css';
import '../css/bulma.sass';
import '../css/docs.styl';
import '../css/blog.styl';
import 'animate.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SmoothScroll from 'smooth-scroll';
import './lib/burger';
import './lib/version.js';
// import fitVids from 'fitvids';
// import Turbolinks from 'turbolinks'
// import 'turbolinks-animate';
let init = ()=>{	
  // fitVids();
  hljs.initHighlightingOnLoad();
  document.querySelectorAll('pre code').forEach(block=>{
    hljs.highlightBlock(block);
  });
  document.querySelectorAll('a.back').forEach(link=>{
    link.addEventListener('click',e=>{
      e.preventDefault();
      window.history.back();
    });
  });
};

document.addEventListener('DOMContentLoaded',()=>{
  init();
  // let scripts = document.querySelectorAll('script')
  // let styles = document.querySelectorAll('link[rel="stylesheet"]')
  // scripts.forEach((script)=>{
  // 	script.dataset.turbolinksTrack = "true"
  // 	script.dataset.turbolinksPermanent = "true"
  // })
  // styles.forEach((style)=>{
  // 	style.dataset.turbolinksTrack = "true"
  // 	style.dataset.turbolinksPermanent = "true"
  // })
});
// document.addEventListener('turbolinks:load',init)
// window.Turbolinks = Turbolinks
// window.Turbolinks.start()


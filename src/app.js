import './fonts/google-fonts-1534515193737.css';
import './fonts/google-fonts-1534515231222.css';
import './css/bulma.sass';
import './css/app.styl';
import 'animate.css';
// import 'https://use.fontawesome.com/releases/v5.2.0/css/solid.css'
// import 'https://use.fontawesome.com/releases/v5.2.0/css/fontawesome.css'
// import 'https://use.fontawesome.com/releases/v5.2.0/css/brands.css'
import '@fortawesome/fontawesome-free/css/solid.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/brands.css';
import Typed from 'typed.js';
import { throttle } from 'throttle-debounce';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './js/lib/burger';
import './js/lib/version.js';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import fitVids from 'fitvids';
import Splitting from 'splitting';
// import './images/cogearjs.jpg'
document.addEventListener('DOMContentLoaded',()=>{
  Splitting();
  fitVids();
  setTimeout(()=>{
    document.querySelector('.navbar-menu').classList.toggle('loaded');
  },50);
  AOS.init();
  new Typed('.description span', {
    strings: ['','modern ^500 static ^400 websites ^300  generator^4000', 'built with ^1000 Node.JS ^1000 and ^1000 Webpack^4000'],
    typeSpeed: 50,
    // startDelay: 3000,
    loop: true
  });
  let s1 = document.getElementById('s1');
  let s1Bottom = s1.offsetTop + s1.offsetHeight - document.getElementById('nav').offsetHeight*1.5;
	
  window.addEventListener('scroll',throttle(100,()=>{
    let top = (document.scrollingElement || document.documentElement).scrollTop;
    let nav = document.getElementById('nav');
    if(document.getElementById('menu').classList.contains('is-active')){
      return;
    }
    if(top > s1Bottom){
      if(!nav.classList.contains('scroll-active')) nav.classList.add('scroll-active');
    } else  {
      if(nav.classList.contains('scroll-active')) nav.classList.remove('scroll-active');
    }
  }));
});
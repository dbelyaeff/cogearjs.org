import axios from 'axios'

window.addEventListener('load',()=>{
	axios.get('https://raw.githubusercontent.com/codemotion/cogear.js/master/package.json')
	.then( ({data})=>{
		document.getElementById('version').innerText = 'v' + data.version
	})
})

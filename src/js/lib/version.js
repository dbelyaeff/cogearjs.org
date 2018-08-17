import axios from 'axios'

window.addEventListener('load',()=>{
	let version = sessionStorage.getItem('version')
	if(null === version){
		axios.get('https://raw.githubusercontent.com/codemotion/cogear.js/master/package.json')
		.then( ({data})=>{
			version = data.version
			sessionStorage.setItem('version', data.version);
			document.getElementById('version').innerText = 'v' + version
		})
	}
	document.getElementById('version').innerText = 'v' + version
})

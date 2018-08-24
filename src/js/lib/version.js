let version = ()=>{
	if(!document.getElementById('version')) return
	let version = sessionStorage.getItem('version')
	if(null === version){
		fetch('https://raw.githubusercontent.com/codemotion/cogear.js/master/package.json')
		.then(response=>{
			return response.json()
		})
		.then(data=>{
			version = data.version
			sessionStorage.setItem('version', data.version);
			document.getElementById('version').innerText = 'v' + version
		})
		.catch(err => console.error(err))
	}
	if(version){
		document.getElementById('version').innerText = 'v' + version
	}
}
document.addEventListener('DOMContentLoaded',version)
document.addEventListener('turbolinks:load',version)

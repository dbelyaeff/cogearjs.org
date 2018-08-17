document.addEventListener('DOMContentLoaded',()=>{
	let version = sessionStorage.getItem('version')
	if(null === version){
		fetch('https://raw.githubusercontent.com/codemotion/cogear.js/master/package.json')
		.then(response=>{
			return response.json()
		})
		.then(data=>{
			console.log(data)
			version = data.version
			sessionStorage.setItem('version', data.version);
			document.getElementById('version').innerText = 'v' + version
		})
	}
	if(version){
		document.getElementById('version').innerText = 'v' + version
	}
})

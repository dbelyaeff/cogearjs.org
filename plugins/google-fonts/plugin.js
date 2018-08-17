module.exports = {
		apply(cogear){
			// Process hooks here
			cogear.hooks.init.tap('google-fonts',(cogear)=>{
				// Do something
			})
		}
}
import Vue from 'vue/dist/vue.esm.js'
Vue.config.devtools = true
Vue.config.debug = true
import hljs from 'highlight.js'
window.addEventListener('load',()=>{
	new Vue({
		el: "#help",
		data(){
			return {
				help: require('../../lib/help.js')
			}
		},
		mounted(){
			this.$refs.code.classList.add('language-shell')
			this.$refs.code.classList.remove('nohighlight')
			hljs.highlightBlock(this.$el)
		}
	})
})
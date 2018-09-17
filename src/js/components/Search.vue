<template lang="pug">
div.navbar-item
	i.icon.fa.search
	input(type="search" placeholder="Type to search…")
</template>
<script lang="coffee">
export default
	name: "search"
	data: ->
		{}
</script>
<style lang="stylus" scoped>
input
	background none
	border 	none
	position relative
	font-size 1em
	color #FFF
	&:after
		content ' '
		position absolute
		bottom 2px
		left 0px
		background-color #FFF
		height 1px
		width 100%
</style>
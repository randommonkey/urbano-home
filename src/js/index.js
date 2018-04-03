const app = new Vue({
	el: '#app',
	data: {
		articles: [],
		loading: true
	},
	created () {
		const self = this
		Tabletop.init({
			key: 'https://docs.google.com/spreadsheets/d/10VWGypyA2XhR_ENu4Cf9pnZk9rgfrZF2Zp3dHE6G7Fg/edit?usp=sharing',
			callback: function (data, tabletop) {
				const articles = tabletop.sheets('articulos').all()
				self.articles = articles
				self.loading = false
			}
		})
	}
})
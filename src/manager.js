import Vue from 'vue'
import Store from './store'

Vue.use(Store)

const state = {
	username: '',
	repo: '',
	path: '/',
	files: []
}

const actions = {
	changeRepo(state, username, repo) {
		state.username = username
		state.repo = repo
		console.group('state in Manager')
		console.log(state.username)
		console.log(state.repo)
		console.groupEnd('state in Manager')
	},
	getFiles(state,req) {
		if (state.username && state.repo) {
			req.get('https://api.github.com/repos/'
				+ state.username + '/' + state.repo
				+ '/contents' + state.path).then(
				(response) => {
					state.files = response.data
				})
		}
	},
	changePath(state, path) {
		state.path = '/' + path
	},
	goBack(state, path) {
		state.path = state.path.split('/').slice(0, -1).join('/')
		if (state.path === '') {
			state.path = '/'
		}
	}
}

export default new Store.Store({
	state,
	actions
})
import * as types from '../mutation-types'

const state = {
	username: '',
	repo: '',
	files: [],
	path: '/'
}

const mutations = {
	[types.CHANGE_REPO] (state, { username, repo }) {
		state.username = username
		state.repo = repo
		state.path = '/'
		console.group('state in Manager')
		console.log(state.username)
		console.log(state.repo)
		console.groupEnd('state in Manager')
	},
	[types.GET_FILES] (state,req) {
		if (state.username && state.repo) {
			req.get('https://api.github.com/repos/'
				+ state.username + '/' + state.repo
				+ '/contents' + state.path).then(
				(response) => {
					state.files = response.data
			})
		}
	},
	[types.CHANGE_PATH] (state, path) {
		state.path = '/' + path
	},
	[types.GO_BACK] (state, path) {
		state.path = state.path.split('/').slice(0, -1).join('/')
		if (state.path === '') {
			state.path = '/'
		}
	}
}

export default {
	state,
	mutations
}
import * as types from './mutation-types'

export const changeRepo = ({ commit }, { username, repo}) => {
	commit(types.CHANGE_REPO, { username, repo })
}

export const getFiles = ({ commit }, req) => {
	commit(types.GET_FILES, req)
}

export const changePath = ({ commit }, path) => {
	commit(types.CHANGE_PATH, path)
}

export const goBack =({ commit }, path) => {
	commit(types.GO_BACK, path)
}
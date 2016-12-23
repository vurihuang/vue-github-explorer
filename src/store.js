let Vue
class Store {
	constructor (opts = {}) {
		const {
			state,
			actions
		} = opts
		const dispatch = this.dispatch
		this.dispatch = (...args) => {
			dispatch.apply(this, args)
		}
		bindVM(this, state)
		this.actions = Object.create(null)
		this._setupActions(actions)
	}

	/*
	dispatch (type, ...payload) {
		const action = this._actions[type]
		const state = this.state
		if (action) {
			action(state, ...payload)
		} else {
			console.warn(`unknow action: ${ type }`)
		}
	}
	*/

	get state () {
		return this._vm._data
	}

	set state (v) {
		throw new Error('unsupport set state by this way')
	}

	_setupActions (actions) {
		this._actions = Object.create(null)
		Object.keys(actions).forEach(name => {
			this._actions[name] = createAction(actions[name], this)
			if (!this.actions[name]) {
				this.actions[name] = (...args) => {
					this._actions[name](...args)
				}
			}
		})
	}
}

/**
 * binding state data into Vue
 * @param  {[type]} store [description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function bindVM (store, state) {
	store._vm = new Vue({
		data: state
	})
}

function createAction (action, store) {
	return (...payload) => action(store.state, ...payload)
}

/**
 * install plugin into Vue
 * @param  {[type]} _Vue [description]
 * @return {[type]}      [description]
 */
function install(_Vue) {
	Vue = _Vue
	const _init = Vue.prototype._init
	Vue.prototype._init = function (options) {
		options = options || {}
		if (options.store) {
			this.$store = options.store
		} else if (options.parent && options.parent.$store) {
			this.$store = options.parent.$store
		}
		_init.call(this, options)
	}
}

export default {
	Store,
	install
}
<template>
	<div class="row">
    <div class="col-md-6 col-md-offset-3">
      <form class="form-inline" @submit.prevent="changeRepo()">
        <div class="form-group">
        	<label for="fullRepoName">Full Repo Name</label>
        	<input class="form-control"
        	  type="text"
        	  name="fullRepoName"
        	  v-model="repoName"
        	  placeholder="enter username/repo">
        </div>
        <input class="btn btn-default" type="submit" value="Get repo filesystem!">
      </form>
      <hr>
    </div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex'
	export default {
		name: 'up-explorer-header',

		data() {
			return {
				repoName: ''
			}
		},

		methods: {
			changeRepo() {
				let username = this.repoName.split('/')[0]
				let repo = this.repoName.split('/')[1]
				this.$store.dispatch('changeRepo', { username, repo })
				this.$store.dispatch('getFiles', this.$http)
    	}
		}
	}
</script>
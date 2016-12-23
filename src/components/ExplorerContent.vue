<template>
	<div class="row">
    <dir class="col-md-6 col-md-offset-3">
      <table class="table">
        <caption>{{ path }}</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th class="text-right">
              <button class="btn btn-default btn-xs"
                @click="goBack()"
                v-if="path !== '/'">
                Go Back
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in sortedFiles">
            <td>
              <div class="file" v-if="file.type === 'file'">
                <i class="fa fa-file-o"></i>
                {{ file.name }}
              </div>
              <div class="directory" v-if="file.type === 'dir'">
                <i class="fa fa-folder-o"></i>
                <a @click="changePath(file.path)">{{ file.name }}</a>
              </div>
            </td>
            <td class="text-right">
              <a
                :href="file.download_url"
                v-if="file.type === 'file'"
                download>
                <i class="fa fa-cloud-download"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </dir>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
	export default {
		name: 'up-explorer-content',

		computed: {
      ...mapGetters([
        'username',
        'repo',
        'files',
        'path'
      ]),
			fullRepoUrl() {
				return this.username + '/' + this.repo
			},
			sortedFiles() {
      	return this.files.slice(0).sort((a, b) => {
        	if (a.type !== b.type) {
          	return (a.type === 'dir') ? -1 : 1
        	} else {
          	return (a.name < b.name) ? -1 : 1
        	}
      	})
    	},
		},

		methods: {
    	changePath(path) {
        this.$store.dispatch('changePath', path)
        this.$store.dispatch('getFiles', this.$http)
    	},
    	goBack() {
        this.$store.dispatch('goBack', this.path)
        this.$store.dispatch('getFiles', this.$http)
    	}
		}
	}
</script>
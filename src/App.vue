<template>
  <div id="app">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <form class="form-inline" @submit.prevent="changeRepo()">
          <div class="form-group">
            <label for="fullRepoName">Full Repo Name</label>
            <input class="form-control"
              type="text"
              name="fullRepoName"
              v-model="fullRepoName">
          </div>
          <input class="btn btn-default"
            type="submit"
            value="Get repo filesystem!">
        </form>
        <hr>
      </div>
    </div>
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
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'app',

  data() {
    return {
      fullRepoName: 'upeoe/vue-github-explorer',
      username: 'upeoe',
      repo: 'vue-github-explorer',
      path: '/',
      files: []
    }
  },

  computed: {
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
    }
  },

  watch: {
    repo(newVal, oldVal) {
      this.path = '/'
      this.getFiles()
    }
  },

  methods: {
    changeRepo() {
      let splitData = this.fullRepoName.split('/')
      this.username = splitData[0]
      this.repo = splitData[1]
      if (!this.username) {
        this.username = ''
      }
      if (!this.repo) {
        this.repo = ''
      }
      console.group('Vue Explorer data')
      console.log('fullRepoName: ', this.fullRepoName)
      console.log('username: ', this.username)
      console.log('repo: ', this.repo)
      console.groupEnd('Vue Explorer data')
    },
    getFiles() {
      if (this.checkField()) {
        this.$http.get('https://api.github.com/repos/'
          + this.fullRepoUrl
          + '/contents'
          + this.path).then(
          (response) => {
            this.files = response.data
          },
          (response) => {
            alert('Not Found')
          })
      }
    },
    checkField() {
      if (!this.username) {
        alert('username can not be empty')
        return false
      }
      if (!this.repo) {
        alert('repo can not be empty')
        return false
      }
      return true
    },
    changePath(path) {
      this.path = '/' + path
      this.getFiles()
    },
    goBack() {
      this.path = this.path.split('/').slice(0, -1).join('/')
      if (this.path === '') {
        this.path = '/'
      }
      this.getFiles()
    }
  }
}
</script>

<style>
  #app {
    font-family: Helvetica, 'Avenir', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>

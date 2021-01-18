const axios = require('axios')
const bodyParser = require('body-parser')

module.exports = {
  devServer: {
    before (app) {
      app.post('/api/user/login', bodyParser.json(), function (req, res) {
        const url = 'http://api.vikingship.xyz/api/user/login'
        axios.post(url, req.body, {
          headers: {
            referer: 'http://api.vikingship.xyz/public/swagger/index.html',
            origin: 'http://api.vikingship.xyz',
            host: 'api.vikingship.xyz'
          }
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
      // 新建用户
      app.post('/api/users', bodyParser.json(), function (req, res) {
        const url = 'http://api.vikingship.xyz/api/users'
        axios.post(url, req.body, {
          headers: {
            referer: 'http://api.vikingship.xyz/public/swagger/index.html',
            origin: 'http://api.vikingship.xyz',
            host: 'api.vikingship.xyz'
          }
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
      app.get('/api/user/current', function (req, res) {
        const url = 'http://api.vikingship.xyz/api/user/current'
        axios.get(url, {
          headers: {
            referer: 'http://api.vikingship.xyz/public/swagger/index.html',
            host: 'api.vikingship.xyz',
            authorization: req.headers.authorization
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
      app.get('/api/columns', function (req, res) {
        const url = 'http://api.vikingship.xyz/api/columns'
        axios.get(url, {
          headers: {
            referer: 'http://api.vikingship.xyz/public/swagger/index.html',
            host: 'api.vikingship.xyz'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
      app.get('/api/columns/:cid', function (req, res) {
        const url = `http://api.vikingship.xyz${req.path}`
        axios.get(url, {
          headers: {
            referer: 'http://api.vikingship.xyz/public/swagger/index.html',
            host: 'api.vikingship.xyz'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
      app.get('/api/columns/:cid/posts', function (req, res) {
        const url = `http://api.vikingship.xyz${req.path}`
        axios.get(url, {
          headers: {
            referer: 'http://api.vikingship.xyz/public/swagger/index.html',
            host: 'api.vikingship.xyz'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
      // 获取某个post
      app.get('/api/posts/:id', function (req, res) {
        const url = `http://api.vikingship.xyz${req.path}`
        axios.get(url, {
          headers: {
            referer: 'http://api.vikingship.xyz/public/swagger/index.html',
            host: 'api.vikingship.xyz'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
      // 上传文件
      app.post('/api/upload', bodyParser.json(), function (req, res) {
        const url = 'http://api.vikingship.xyz/api/upload'
        axios.post(url, req.body, {
          headers: {
            referer: 'http://api.vikingship.xyz/public/swagger/index.html',
            host: 'api.vikingship.xyz',
            authorization: req.headers.authorization,
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
      // 删除某个post
      app.delete('/api/posts/:id', function (req, res) {
        const url = `http://api.vikingship.xyz${req.path}`
        axios.delete(url, {
          headers: {
            referer: 'http://api.vikingship.xyz/public/swagger/index.html',
            host: 'api.vikingship.xyz'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
    }
  },
  publicPath: ''
}

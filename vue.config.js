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
        console.log(url)
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
        console.log(url)
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
    }
  },
  publicPath: ''
}

const axios = require('axios')

module.exports = {
  devServer: {
    before (app) {
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

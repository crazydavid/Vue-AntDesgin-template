// eslint-disable-next-line
import { AxiosResponse } from 'axios'
const bodyParser = require('body-parser')
const Mock = require('mockjs')

interface ResponseFake{(
    url:string,
    type:string,
    respond:AxiosResponse
):void}

const responseFake:ResponseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    type: type || 'get',
    response(req:any, res:any) {
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

function registerRoutes(app:any) {
  const { mocks } = require('./modules/index')
  const mocksForServer = mocks.map((route:any) => {
    return responseFake(route.url, route.type, route.response)
  })
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response)
  }
}

module.exports = (app:any) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  registerRoutes(app)
}

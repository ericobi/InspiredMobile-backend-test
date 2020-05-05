  import App from './app'

  import * as bodyParser from 'body-parser'
  import * as cors from 'cors'
  import config from './configuration/appConfig'
  
  import UserRouter from  './routes/user.router'
  
  let mongoConnectionStr: string = "mongodb://localhost/mydb"

  const app = new App(
    process.env.PORT || config.PORT,
    [
      new UserRouter()
    ],
    [
      bodyParser.json(),
      bodyParser.urlencoded({ extended: true }),
      cors()
    ]
  )

  app.listen();
  app.createDbConnection(mongoConnectionStr);
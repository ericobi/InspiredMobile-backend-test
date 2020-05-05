import * as express from 'express'
import * as mongoose from 'mongoose'

import {
  Application
} from 'express'

class App {
  public app: Application
  public port: number

  constructor(port: number, routes: any, middleWares: any) {
    this.app = express()
    this.port = port

    this.middlewares(middleWares)
    this.routes(routes)
    this.initGlobalErrorHandler();
  }

  private initGlobalErrorHandler() {
    this.app.use((error, req, res, next) => {
      console.log(error); //-- use during development stage

      return res.status(500).send('Oops!! something went wrong');
    });
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare)
    })
  }

  private routes(routes) {
    routes.forEach(route => {
      this.app.use(route.basePath, route.router)
    })
    this.app.use('*', (req, res, next) => {
      res.send("SERVER WORKING...");
    })
  }

  public createDbConnection(connStr: string) {
    mongoose.connect(connStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      console.log("Database connected");
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`)
    })
  }
}

export default App
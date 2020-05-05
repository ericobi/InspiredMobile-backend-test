import * as express from 'express'
import UserController from '../controllers/user.controller'

let userController = new UserController();

class TestRouter {
  
  private _router = express.Router() //-- creating router
  basePath = '/api/v1/users' //-- base path for router
  
  constructor() {
    this.init();
  }

  private init() {
    //============================= BASE CALLS
    this._router.route('/')
      .post( userController.create )
      .get( userController.getAll )

    //============================= BASE CALLS by ID
    this._router.route('/:id')
      .put( userController.update )
      .delete( userController.delete )
      .get( userController.getById )
  }

  get router() {
    return this._router;
  }
}

export default TestRouter;
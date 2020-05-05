import User from '../models/user.model';
import appConfig from '../configuration/appConfig';
import alerts from '../configuration/alerts'

class UserController {

  constructor() {
  }

  public create = async (req, res, next) => {
    try {
      const user = await User.create(req.body)
      return res.send(user)
    }
    catch(err) {
      next(err)
    }
  }

  public getAll = async (req, res, next) => {
    try {
      const users = await User.find();
      return res.send(users);
    }
    catch(err) {
      next(err)
    }
  }

  public getById = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user)
        return res
          .status(appConfig.STATUS_CODES.NOT_FOUND)
          .send("User " + alerts.errors.NOT_FOUND);

      res.send(user);
    } catch (error) {
      next(error);
    }
  }

  public update = async (req, res, next) => {
    try {
      const user = await User.findByIdAndUpdate({
        _id: req.params.id
      }, req.body, {new: true})

      if (!user)
        return res
          .status(appConfig.STATUS_CODES.NOT_FOUND)
          .send("User " + alerts.errors.NOT_FOUND);
      
      return res.send(user);
    }
    catch(err) {
      next(err);
    }
  }

  public delete = async (req, res, next) => {
    try {
      const result = await User.findByIdAndDelete({
        _id: req.params.id
      })

      if (!result)
        return res
          .status(appConfig.STATUS_CODES.NOT_FOUND)
          .send("User " + alerts.errors.NOT_FOUND);
      
      return res.send('user deleted successfully');
    }
    catch(err) {
      next(err);
    }
  }

}

export default UserController;
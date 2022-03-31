import user from '../model/user';
import orderService from '../service/order';
import { v4 as uuidv4 } from 'uuid';

class UserService {
  createUser(userDto) {
    const { firstName, lastName, age, active } = userDto;

    return user.createUser(firstName, lastName, age, active);
  }

  async getUsers() {
    const usersDB = await user.getUsers();

    console.log('usersDB', usersDB.id);
    // userDB.orders = await user.getUserOrders(userDB.id);

    return usersDB;
  }

  async getUser(id) {
    const userDB = await user.getUser(id);

    console.log('userDB', userDB);
    // userDB.orders = await orderService.getOrdersByUser(userDB.id);

    return userDB;
  }

  async getUserOrders(id) {
    const userDB = await user.getUser(id);

    console.log('userDB', userDB);
    userDB.orders = await orderService.getOrdersByUser(userDB.id);

    return userDB;
  }

  async checkInactive(id) {
    const userDB = await user.getUser(id);
    const orders = await orderService.getOrdersByUser(userDB.id);
    console.log('userDB', userDB);
    console.log('orders', orders);

    userDB.active = orders && orders.length > 0;
    const { firstName, lastName, age, active } = userDB;

    console.log('user >> active:', userDB.active);

    const result = await user.updateUser(id, firstName, lastName, age, active);

    // if(!orders || orders.length === 0) {
    //   userDB.active(false);
    //   user.updateUser()
    // }

    return await this.getUserOrders(id);
  }

  async checkUserToken(id, token) {
    const result = await user.checkUserToken(id, token);

    console.log('result', result);

    return result;
  }

  async createUserToken(id) {
    // const userDB = await user.getUser(id);
    const result = await user.createUserToken(id, uuidv4());

    console.log('result', result);

    return await this.getUser(id);
  }

  async editUser(id, userDto) {
    const { firstName, lastName, age, active } = userDto;
    const userDB = await user.updateUser(id, firstName, lastName, age, active);

    console.log('userDB', userDB);
    // userDB.orders = await user.getUserOrders(userDB.id);

    return userDB;
  }

  async deleteUser(id) {
    const userDB = await user.deleteUser(id);

    console.log('userDB', userDB);
    // userDB.orders = await user.getUserOrders(userDB.id);

    return userDB;
  }
}

export default new UserService();

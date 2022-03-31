import db from '../db/db';

class User {
  async createUser(firstName, lastName, age, active = false, tokenId) {
    const [id] = await db('users')
      .insert({
        first_name: firstName,
        last_name: lastName,
        age: age,
        active: active,
        token_id: tokenId,
      })
      .returning('id');

    return id.id;
  }

  async getUsers() {
    const result = await db('users').select({
      id: 'id',
      firstName: 'first_name',
      lastName: 'last_name',
      age: 'age',
      active: 'active',
      tokenId: 'token_id',
    });

    return result;
  }

  async getUser(id) {
    const [result] = await db('users')
      .select({
        id: 'id',
        firstName: 'first_name',
        lastName: 'last_name',
        age: 'age',
        active: 'active',
        tokenId: 'token_id',
      })
      .where({ id: id });

    return result;
  }

  async updateUser(id, firstName, lastName, age, active, tokenId) {
    const result = await db('users')
      .update({
        first_name: firstName,
        last_name: lastName,
        age: age,
        active: active,
        token_id: tokenId,
      })
      .where({ id: id });

    return result;
  }

  async deleteUser(id) {
    const result = await db('users').delete().where({ id: id });

    return result;
  }

  async checkInactive(id) {
    const [result] = await db('users')
      .select({
        id: 'id',
        firstName: 'first_name',
        lastName: 'last_name',
        age: 'age',
        active: 'active',
      })
      .where({ id: id });

    return result;
  }

  async checkUserToken(id, token) {
    const [result] = await db('users')
      .select({
        id: 'token.id',
        token: 'token',
      })
      .join('token', 'token.id', 'users.token_id')
      .where({ 'users.id': id, 'token.token': token });

    return result;
  }

  async createUserToken(userId, token) {
    const [id] = await db('token')
      .insert({
        token: token,
      })
      .returning('id');

    console.log(`userId: ${userId} - tokenId: ${id.id}`);

    const result = await db('users')
      .update({
        token_id: id.id,
      })
      .where({ id: userId });

    return id.id;
  }
}

export default new User();

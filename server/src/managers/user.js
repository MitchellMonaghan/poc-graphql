
import User from '@models/user'
import crypto from 'crypto'

export default {
  async createUser (args) {
    const user = new User(args)
    user.email = user.email.toLowerCase().trim()

    if (user.username) {
      user.username = user.username.trim()
    } else {
      user.username = user.email
    }

    user.confirmed = false

    // TODO: This token could be a jwt like object that has the confirmation date sent in it
    user.confirmationToken = crypto.randomBytes(10).toString('hex')

    const newUser = await user.save()

    // TODO: Send verify email
    return newUser
  }
}

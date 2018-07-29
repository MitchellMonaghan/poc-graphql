import User from '@models/user'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { pick } from 'lodash'

function generateJWT (user) {
  const props = Object.assign({}, {
    user: pick(user, ['id'])
  })

  // TODO: Customize token expiration
  const expiresIn = moment().add(100, 'year').format('X')

  return jwt.sign(props, process.env.AUTH_SECRET, { expiresIn })
}

export const authenticateUser = async (username, password) => {
  username = username.toLowerCase().trim()

  // To lowercase stored username in query
  const user = await User.findOne({
    $or: [
      { username: { $regex: new RegExp(`^${username}`, 'i') } },
      { email: username }
    ]
  }).exec()

  if (!user) {
    // TODO: User not found, return proper http status code
    throw new Error('No user with that username')
  }

  // TODO: Invalid password, return proper http status code
  const isValid = await user.verifyPassword(password)

  if (!isValid) {
    throw new Error('Incorrect password')
  }

  return generateJWT(user)
}

export const authorizeUser = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET)
    return await User.findById(decoded.user.id)
  } catch (error) {
    return null
  }
}

export default {
  authenticateUser,
  authorizeUser
}

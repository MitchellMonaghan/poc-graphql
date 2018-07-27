import serverError from './validators/serverError'
import errorHelper from './errorHelper'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.prototype.$serverError = serverError
  Vue.prototype.$displayError = errorHelper
}

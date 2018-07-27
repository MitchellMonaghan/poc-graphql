import { withParams } from 'vuelidate/lib'

export default (serverErrors, propertyName) =>
  withParams({type: 'serverError', serverErrors, propertyName}, value => {
    return !serverErrors[propertyName]
  })

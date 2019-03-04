import fetch from '../utils/fetch'
import SvgIcon from '../../common/components/svg-icon'

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('../../assets/images/svg', false, /\.svg$/)
requireAll(req)

export default {
  install(Vue) {
    Vue.prototype.fetch = fetch

    Vue.component(SvgIcon.name, SvgIcon)
  }
}
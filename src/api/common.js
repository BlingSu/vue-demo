import fetch from '../common/utils/fetch'

export const getData = body => fetch('/api/v1/example.do', {body})
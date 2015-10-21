import Rx from 'rx'
import { makeRouter } from 'cycle-route'

export default function vtreeSwitcher (routes, path$, responses) {
  const routeHandlers = Object.keys(routes).reduce((m, route) => {
    const handler = routes[route]
    m[handler.name] = handler
    return m
  }, {})
  const routeNames = Object.keys(routes).reduce((m, route) => {
    const handler = routes[route]
    m[route] = handler.name
    return m
  }, {})

  const names = Object.keys(routeHandlers)
  const nameIdx = names.reduce((m, name, i) => {
    m[name] = i
    return m
  }, {})

  const matchRoute = makeRouter(routeNames)
  const route$ = path$
    .map(matchRoute)

  const responsesWithRoute = { ...responses, route: route$ }
  const requestsMap = names.reduce((m, name) => {
    const handler = routeHandlers[name]
    m[name] = handler(responsesWithRoute)
    return m
  }, {})

  const driverNames = Object.keys(responsesWithRoute)
  const requests = driverNames.reduce((m, driver) => {
    m[driver] = route$
      .flatMapLatest(({ name }) => requestsMap[name][driver] || Rx.Observable.never())
    return m
  }, {})

  return requests
}

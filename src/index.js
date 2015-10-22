import Rx from 'rx'
import { makeRouter } from 'cycle-route'

export default function vtreeSwitcher (
  routes, responses, { pathDriver = 'path', domDriver = 'dom' } = {}
) {
  const path$ = responses[pathDriver]

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
  const route$ = path$.map(matchRoute)

  const requests = names.reduce((m, name) => {
    const handler = routeHandlers[name]
    m[name] = handler(route$, responses)
    return m
  }, {})

  const vtree$s = names.map(name => requests[name][domDriver])
  const vtree$ = Rx.Observable.combineLatest(
    route$, ...vtree$s,
    (route, ...vtrees) => vtrees[nameIdx[route.name]]
  )

  return [vtree$, requests]
}

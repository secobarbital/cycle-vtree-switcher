import homePage from './homePage'
import fooPage from './fooPage'
import barPage from './barPage'
import noPage from './noPage'

export default {
  '': homePage,
  'foo/:id': fooPage,
  'bar/:id': barPage,
  '*': noPage
}

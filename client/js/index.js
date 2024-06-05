import { App } from './components/app.js'
import { } from './render/state.js'
import { render} from './render/elements.js'
import { LocalStorageTaskRepository, RemoteTaskRepository } from './repositories.js'
import { createElement } from './render/elements.js'
import { UserInfo } from './auth.js'
import { APIClient } from './requests.js'


function taskRepositoryFactory(userInfo) {
  if (userInfo) {
    const taskApi = new APIClient('/api', { 'x-auth-token': userInfo.token })
    return new RemoteTaskRepository(taskApi)
  }
  
  return new LocalStorageTaskRepository()
}

const userApi = new APIClient('/api')
const userInfo = new UserInfo(userApi)


const root = document.body


render(createElement(App, { taskRepositoryFactory, userInfo }), root)

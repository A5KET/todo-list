import { App } from './components/app.js'
import { } from './render/state.js'
import { render} from './render/elements.js'
import { LocalStorageTaskRepository } from './repositories.js'
import { createElement } from './render/elements.js'


const taskRepository = new LocalStorageTaskRepository()
const root = document.body

render(createElement(App, { repository: taskRepository }), root)

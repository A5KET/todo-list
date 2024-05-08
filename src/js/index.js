import { App } from './components/app.js'
import { } from './render/state.js'
import { render} from './render/elements.js'
import { LocalTaskRepository } from './repositories.js'
import { createElement } from './render/elements.js'


const taskRepository = new LocalTaskRepository()
const root = document.body

render(createElement(App, { repository: taskRepository }), root)

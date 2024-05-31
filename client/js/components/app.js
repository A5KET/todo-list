import { createElement } from '../render/elements.js'
import { TaskList } from './tasks.js'


export function App({ repository }) {
  return createElement(
    'main',
    { },
    [
      createElement('h1', { className: 'header' }, ['TODO LIST']), 
      createElement(TaskList, { repository })
    ]
  )
}
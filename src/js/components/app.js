import { createElement } from '../render/elements.js'
import { TaskList } from './tasks.js'
import { useState, useEffect } from '../render/hooks.js'


export function App({ repository }) {
  const [tasks, setTasks] = useState([])
  
  return createElement(
    'main',
    { },
    [
      createElement('h1', { className: 'header' }, ['TODO LIST']), 
      TaskList(tasks)
    ]
  )
}
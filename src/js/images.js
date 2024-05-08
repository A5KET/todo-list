import { createElementFromHTML } from './utils.js'


export const addTaskImage = createElementFromHTML(`
<svg width="29" height="29" viewBox="0 0 29 29" xmlns="http://www.w3.org/2000/svg">
<path d="M14.728 2L14.7279 27.4559M27.4559 14.7279L2.00003 14.7279" stroke="#535C91" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`)

export const removeTaskImage = createElementFromHTML(`
<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 2L12 12M12 2L2 12" stroke="#535C91" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`)


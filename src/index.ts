console.log('===== ====== ====== ======')
console.log('ťahať a púšťať')
console.log('(c) 2021 andrej sýkora')
console.log('===== ====== ====== ======')

import { SVG } from '@svgdotjs/svg.js'

import '../vendor/css/reset.css'
import './gfx/styles.scss'  

/**
 * Main function initializes the game
 */
function main () {
    const WINDOW_WIDTH = window.innerWidth
    const WINDOW_HEIGHT = window.innerHeight

    const root = document.createElement('div')
    root.id = 'dd-root'
    root.style.width = '100vw'
    root.style.height = '100vh'

    const svg = SVG().addTo(root).size(WINDOW_WIDTH, WINDOW_HEIGHT)
    svg.rect(200, 110).move(100, 100).fill({
        color: 'transparent'
    }).stroke({
        color: '#B2B2B2'
    }).radius(5, 5)

    document.body.appendChild(root)
}

// ===
// Run the main function
// ===
main()
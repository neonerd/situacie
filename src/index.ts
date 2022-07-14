console.log('===== ====== ====== ======')
console.log('ťahať a púšťať')
console.log('(c) 2022 andrej sýkora')
console.log('===== ====== ====== ======')

//
// START HERE
//



//
// CSS
//

import '../vendor/css/reset.css'
import './gfx/styles.scss'

import { World } from './engine/World'

/**
 * Main function initializes the game
 */
function main () {
    // Main HTML element
    const root = document.createElement('div')
    root.id = 'dd-root'
    root.style.width = '100vw'
    root.style.height = '100vh'
    document.body.appendChild(root)

    // Initialize world
    const world = new World(root)
    
    // svg.rect(200, 110).move(100, 100).fill({
    //    color: 'transparent'
    // }).stroke({
    //    color: '#B2B2B2'
    // }).radius(10, 10)
}

// ===
// Run the main function
// ===
main()
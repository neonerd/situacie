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

//
// DEPENDENCIES
//

import { World } from './engine/World'

//
// MAIN
//

/**
 * Main function initializes the game
 */
function main () {
    // Main HTML element
    const root = document.createElement('div')
    root.id = 'dd-root'
    root.style.width = '100vw'
    root.style.height = '100vh'
    root.style.overflow = 'hidden'
    document.body.appendChild(root)

    // Initialize world
    const world = new World(root, window)
}

// ===
// Run the main function
// ===
main()
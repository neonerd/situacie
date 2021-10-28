console.log('===== ====== ====== ======')
console.log('ťahať a púšťať')
console.log('(c) 2021 andrej sýkora')
console.log('===== ====== ====== ======')

import '../vendor/css/reset.css'
import './gfx/styles.scss'

/**
 * Main function initializes the game
 */
function main () {
    const root = document.createElement('div')
    root.id = 'dd-root'
    root.style.width = '100vw'
    root.style.height = '100vh'

    document.body.appendChild(root)
}

// ===
// Run the main function
// ===
main()
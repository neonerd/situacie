import { Box } from "@svgdotjs/svg.js"

export class WindowSettings {
    width: number
    height: number

    constructor (window: Window) {
        this.width = window.innerWidth
        this.height = window.innerHeight
    }
}

//
// GFXs
//

export function doBboxesOverlap (b1: Box, b2: Box) {
    return !(b1.x2 < b2.x || 
        b1.x > b2.x2 || 
        b1.y2 < b2.y || 
        b1.y > b2.y2)
}

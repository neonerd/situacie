import { Entity } from "./Entity"

import { SVG } from '@svgdotjs/svg.js'

export class World extends Entity {
    entities: Entity[]

    constructor (public domRoot: HTMLElement) {
        super()
    }

    awake () {
        const WINDOW_WIDTH = window.innerWidth
        const WINDOW_HEIGHT = window.innerHeight
        
        const svg = SVG().addTo(this.domRoot).size(WINDOW_WIDTH, WINDOW_HEIGHT)
    }
}
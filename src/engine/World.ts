import { Entity } from "./Entity"

import { Svg, SVG } from '@svgdotjs/svg.js'

export class World extends Entity {
    entities: Entity[] = []
    svg: Svg

    constructor (public domRoot: HTMLElement) {
        super()

        const WINDOW_WIDTH = window.innerWidth
        const WINDOW_HEIGHT = window.innerHeight

        this.svg = SVG().addTo(this.domRoot).size(WINDOW_WIDTH, WINDOW_HEIGHT)
    }

    awake () {
    }
}
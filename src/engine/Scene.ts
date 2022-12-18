import { Svg } from "@svgdotjs/svg.js"

import { Entity } from "./Entity"

export class Scene extends Entity {
    entities: Entity[] = []

    constructor (public svg: Svg) {
        super()
    }

    awake () {
    }
}
import { Svg } from "@svgdotjs/svg.js"
import { IMouseMoveListener, IMouseUpListener } from "./interfaces"

import { Objekt } from './Objekt'
import { doBboxesOverlap, WindowSettings } from "./utility"

export class Scene implements IMouseMoveListener, IMouseUpListener  {
    objects: Objekt[] = []

    constructor (public svg: Svg, public windowSettings: WindowSettings) {
    }

    awake () {
        this.objects.push(new Objekt(this.svg, this.windowSettings, {
            label: 'Petra'
        }))
        this.objects.push(new Objekt(this.svg, this.windowSettings, {
            numberOfSlots: 2,
            startingX: 500,
            startingY: 200,
            label: 'Autobus'
        }))

        for (const o of this.objects) {
            o.awake()
        }
    }

    handleMouseMove(e: MouseEvent): void {
        for (const o of this.objects) {
            o.handleMouseMove(e)
        }
    }

    handleMouseUp(e: MouseEvent): void {
        // Handle mouse ups on objects
        for (const o of this.objects) {
            const wasDragged = o.isDragging

            o.handleMouseUp(e)

            if (wasDragged) {
                // Handle drops
                for (const ob of this.objects) {
                    if (o.id != ob.id) {
                        if (ob.rectEl && o.rectEl) {
                            if (doBboxesOverlap(o.rectEl.bbox(), ob.rectEl.bbox())) {
                                ob.handleDrop(o)
                            }
                        }
                    }
                }
            }
        }
    }
}
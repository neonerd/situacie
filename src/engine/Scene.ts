import { Svg } from "@svgdotjs/svg.js"
import { IMouseMoveListener, IMouseUpListener } from "./interfaces"

import { Objekt } from './Objekt'
import { doBboxesOverlap, WindowSettings } from "./utility"

export class Scene implements IMouseMoveListener, IMouseUpListener  {
    objects: Objekt[] = []

    constructor (public svg: Svg, public windowSettings: WindowSettings) {
    }

    awake () {
        for (const o of this.objects) {
            o.awake()
        }
    }

    addObjekt (o: Objekt) {
        this.objects.push(o)
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
            let wasAccepted = false

            if (wasDragged) {
                // Handle drops
                for (const ob of this.objects) {
                    if (o.id != ob.id) {
                        if (ob.rectEl && o.rectEl) {
                            if (doBboxesOverlap(o.rectEl.bbox(), ob.rectEl.bbox())) {
                                wasAccepted = ob.handleDrop(o)
                            }
                        }
                    }
                }
            }

            o.handleMouseUp(e, wasAccepted)
        }
    }
}
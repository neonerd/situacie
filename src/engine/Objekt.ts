import { Box, G, Point, Rect, Svg, Text } from "@svgdotjs/svg.js"

import { OBJEKT_MEDIUM_H, OBJEKT_MEDIUM_W, OBJEKT_SMALL_H, OBJEKT_SMALL_W } from "./constants"
import { IAwake, IPosition, IRectangle, IRadius, IMouseMoveListener, IMouseUpListener, IDropListener } from './interfaces'
import { WindowSettings } from "./utility"

let objektId = 1;

const getCoordsFromEvent = (ev: MouseEvent) => {
    // if (ev.changedTouches) {
    //     ev = ev.changedTouches[0]
    // }
    return { x: ev.clientX, y: ev.clientY }
}

interface ObjektSlot {
    objekt?: Objekt
    placeholder: Rect
}

interface ObjektSettings {
    numberOfSlots?: number

    // Starting Position
    startingX?: number
    startingY?: number

    // Label
    label?: string
}

export class Objekt implements IPosition, IRectangle, IRadius, IMouseMoveListener, IMouseUpListener, IDropListener, IAwake {
    id: number

    // Box properties
    positionX: number = 200
    positionY: number = 200
    width: number = 150
    height: number = 100
    radiusX: number = 5
    radiusY: number = 5

    // Label
    label: string = 'N/A'

    // Settings
    isDraggable: boolean = true

    // Dragging
    isDragging: boolean = false
    draggingLastClick: Point
    draggingBbox: Box

    // Slots
    slots: ObjektSlot[] = []
    isAcceptingChildren: boolean = false

    // Timer

    // Own instances
    groupEl: G
    rectEl?: Rect
    textEl?: Text

    constructor (public svg: Svg, public windowSettings: WindowSettings, public settings: ObjektSettings) {
        this.id = objektId
        objektId++

        this.draggingLastClick = svg.point()
        this.draggingBbox = svg.bbox()
        this.groupEl = this.svg.group()

        // Create slots, if any
        if (this.settings.numberOfSlots) {
            for (let i = 0; i< this.settings.numberOfSlots; i++) {
                this.slots.push({
                    placeholder: this.svg.rect(OBJEKT_SMALL_W, OBJEKT_SMALL_H)
                })
            }
        }

        // Set Y / X
        if (this.settings.startingX) {
            this.positionX = this.settings.startingX
        }
        if (this.settings.startingY) {
            this.positionY = this.settings.startingY    
        }

        // Set label
        if (this.settings.label) {
            this.label = this.settings.label
        }
    }
    
    /**
     * Reconfigures Objekt's properties bassed on settings
     */
    reconfigure () {
        if (!this.slots.length) {
            this.width = OBJEKT_SMALL_W
            this.height = OBJEKT_SMALL_H
        } else {
            this.width = OBJEKT_MEDIUM_W
            this.height = OBJEKT_MEDIUM_H
        }
    }

    awake () {
        this.reconfigure()
        this.render()
    }

    render () {
        console.log('render')

        this.rectEl = this.svg.rect(this.width, this.height).move(this.positionX, this.positionY).fill({
           color: 'transparent'
        }).stroke({
           color: '#B3B3B3'
        }).radius(this.radiusX, this.radiusY)

        this.textEl = this.svg.text(this.label).move(this.positionX, this.positionY - 30).font({
            family: 'Noto Sans',
            size: 15
        }).fill('#ffffff')

        this.groupEl.add(this.rectEl).add(this.textEl)

        if (this.slots.length) {
            const bbox = this.rectEl.bbox()

            for (const idx in this.slots) {
                const s = this.slots[idx]
                s.placeholder = this.svg.rect(OBJEKT_SMALL_W, OBJEKT_SMALL_H)
                .opacity(0.2)
                .fill({color: 'transparent'})
                 .stroke({color: '#B3B3B3'})
                 .radius(this.radiusX, this.radiusY)
                 .move(bbox.x + 20 + (+idx*20) + (+idx * OBJEKT_SMALL_W), bbox.y2 - OBJEKT_SMALL_H - 20)
                 this.groupEl.add(s.placeholder)
            }           
        }        
    
        // Handlers

        // This handler is local as we only want dragging to trigger on the group
        this.groupEl.mousedown((e: MouseEvent) => {
            this.handleMouseDown(e)
        })
    }

    // ===
    // === DRAGGING AND DROPPING
    // ===

    startDragging (e: MouseEvent) {
        this.isDragging = true
        this.draggingLastClick = this.svg.point(getCoordsFromEvent(e))
        this.draggingBbox = this.groupEl.bbox()
    }

    stopDragging () {
        this.isDragging = false
    }

    handleMouseDown (e: MouseEvent) {
        e.preventDefault()
        e.stopPropagation()

        if (this.isDraggable) {
            this.startDragging(e)
        }
    }

    handleMouseUp (e: MouseEvent) {
        e.preventDefault()
        e.stopPropagation()

        if (this.isDraggable) {
            this.stopDragging()
        }
    }

    handleMouseMove(e: MouseEvent): void {
        if (this.isDragging) {
            const currentClick = this.svg.point(getCoordsFromEvent(e))

            const dx = currentClick.x - this.draggingLastClick?.x
            const dy = currentClick.y - this.draggingLastClick?.y

            let x = this.draggingBbox.x + dx
            let y = this.draggingBbox.y + dy            

            // Don't allow to move the object outside of window
            if (x < 0) x = 0;
            if (y < 0) y = 0;
            if ((x + this.draggingBbox.width) > this.windowSettings.width) x = this.draggingBbox.x;
            if ((y + this.draggingBbox.height) > this.windowSettings.height) y = this.draggingBbox.y;
            
            // Create new references to box and click event
            this.draggingBbox = new Box(x, y, this.draggingBbox.w, this.draggingBbox.h)
            this.draggingLastClick = currentClick

            // Move
            this.groupEl.move(x, y)
        }
    }

    //
    // === DROPPING
    // 
    getNextFreeSlot (): ObjektSlot | null {
        for (const s of this.slots) {
            if (!s.objekt) {
                return s
            }
        }

        return null
    }

    handleDrop(o: Objekt): void {
        if (this.slots.length) {
            const availableSlot = this.getNextFreeSlot()
            if (availableSlot) {
                availableSlot.objekt = o
                o.groupEl.move(availableSlot.placeholder?.bbox().x, availableSlot.placeholder?.bbox().y - OBJEKT_SMALL_H)
                this.groupEl.add(o.groupEl)
            }
        }
    }
}
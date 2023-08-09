import { Svg, SVG } from '@svgdotjs/svg.js'
import { Scene } from './Scene'
import { WindowSettings } from './utility'
import town from '../scenes/1_town'

export class World {
    svg: Svg

    windowSettings: WindowSettings

    scenes: Scene[] = []
    activeScene?: Scene

    constructor (public domRoot: HTMLElement, public window: Window) {
        this.windowSettings = new WindowSettings(this.window)

        this.svg = SVG().addTo(this.domRoot).size(this.windowSettings.width, this.windowSettings.height)

        this.awake()
    }

    awake () {
        this.init()
    }

    init () {
        // Handlers
        this.window.addEventListener('mousemove', (e) => {
            this.activeScene?.handleMouseMove(e)
        })
        this.window.addEventListener('mouseup', (e) => {
            this.activeScene?.handleMouseUp(e)
        })

        this.activeScene = town(this.svg, this.windowSettings)
        this.activeScene.awake()
    }
}
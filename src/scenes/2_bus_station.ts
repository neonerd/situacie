import { Scene } from "../engine/Scene"
import { Objekt } from "../engine/Objekt"
import { Svg } from "@svgdotjs/svg.js"
import { WindowSettings } from "../engine/utility"

const sceneFactory = (svg: Svg, windowSettings: WindowSettings) => {
    const s = new Scene(svg, windowSettings)

    // const petra = new Objekt(svg, windowSettings, {
    //     label: 'Petra',
    //     isFixed: true
    // })
    // s.addObjekt(petra)

    const autobus = new Objekt(svg, windowSettings, {
        numberOfSlots: 2,
        startingX: 500,
        startingY: 200,
        label: 'Autobus',

        hasTimer: true
    })
    s.addObjekt(autobus)

    // s.onAwakeEnd.on(() => {
    //     autobus.addObjectToFreeSlot(petra)
    // })

    return s
}

export default sceneFactory
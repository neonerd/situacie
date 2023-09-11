import { Scene } from "../engine/Scene"
import { Objekt } from "../engine/Objekt"
import { Svg } from "@svgdotjs/svg.js"
import { WindowSettings } from "../engine/utility"

const sceneFactory = (svg: Svg, windowSettings: WindowSettings) => {
    const s = new Scene(svg, windowSettings)

    s.addObjekt(new Objekt(svg, windowSettings, {
        label: 'Petra',
        isFixed: true
    }))
    s.addObjekt(new Objekt(svg, windowSettings, {
        numberOfSlots: 2,
        startingX: 500,
        startingY: 200,
        label: 'Autobus'
    }))

    return s
}

export default sceneFactory
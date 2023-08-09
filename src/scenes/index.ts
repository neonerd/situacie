import { Svg } from "@svgdotjs/svg.js"
import { WindowSettings } from "../engine/utility"
import { Scene } from "../engine/Scene"

interface SceneFactory{
    (svg: Svg, windowSettings: WindowSettings): Scene
}

const sceneMap: Record<string, SceneFactory> = {
    '1': require('./1_town').default,
    '2': require('./2_bus_station').default
}

export default sceneMap
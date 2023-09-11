import { Svg } from "@svgdotjs/svg.js"
import { WindowSettings } from "../engine/utility"
import { Scene } from "../engine/Scene"

import scene1 from './1_town'
import scene2 from './2_bus_station'

interface SceneFactory{
    (svg: Svg, windowSettings: WindowSettings): Scene
}

const sceneMap: Record<string, SceneFactory> = {
    '1': scene1,
    '2': scene2
}

export default sceneMap
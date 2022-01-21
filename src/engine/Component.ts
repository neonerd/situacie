import { Entity } from "./Entity"

export interface IAwake {
    awake (): void
}

export interface IComponent extends IAwake {
    Entity: Entity | null
}

export class PositionComponent implements IComponent {
    Entity: Entity | null

    constructor (public x: number, public y: number) {}

    awake () {}
}

export class SizeComponent implements IComponent {
    Entity: Entity | null

    constructor (public w: number, public h: number) {}

    awake () {}
}

export class RadiusComponent implements IComponent {
    Entity: Entity | null

    x: number
    y: number

    awake () {}
}
import { Objekt } from "./Objekt"

export interface ILiteEvent<T> {
    on(handler: { (data?: T): void }) : void;
    off(handler: { (data?: T): void }) : void;
}

export interface IAwake {
    awake (): void
}

export interface IPosition {
    positionX: number
    positionY: number
}

export interface IRectangle {
    width: number
    height: number
}

export interface IRadius {
    radiusX: number
    radiusY: number
}

export interface IMouseMoveListener {
    handleMouseMove (e: MouseEvent): void
}

export interface IMouseUpListener {
    handleMouseUp (e: MouseEvent): void
}

export interface IDropListener {
    handleDrop (o: Objekt): void
}
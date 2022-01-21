import { IAwake, IComponent } from "./Component";

export abstract class Entity implements IAwake {
    components: IComponent[]

    abstract awake ()

    addComponent (c: IComponent) {
        this.components.push(c)
        c.Entity = this
    }

    getComponent <C extends IComponent> (constr: { new(...args: any[]): C }) : C {
        for (const component of this.components) {
            if (component instanceof constr) {
                return component as C
            }
        }

        throw new Error(`Component ${constr.name} not found on Entity ${this.constructor.name}`)
    }

    removeComponent <C extends IComponent> (constr: { new(...args: any[]): C }) : void {
        let toRemove: IComponent | undefined
        let index: number | undefined

        for (let i = 0; i < this.components.length; i++) {
            const component = this.components[i]
            if (component instanceof constr) {
                toRemove = component
                index = i
                break
            }
        }

        if (toRemove && index) {
            toRemove.Entity = null
            this.components.splice(index, 1)
        }
    }
}
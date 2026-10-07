import { input_controller } from "./controller.js";

export default class Keyboard {
    constructor() {

    }

    attach() {
        document.addEventListener('keydown', this.#handleKeyDown.bind(this));
        document.addEventListener('keyup', this.#handleKeyUp.bind(this));
    }

    detach() {
        document.removeEventListener('keydown', this.#handleKeyDown.bind(this));
        document.removeEventListener('keyup', this.#handleKeyUp.bind(this));
    }

    isKeyPressed(key){
        return (this.pressed.has(key));
    }

    checkActionUsed(action) {
        if (input_controller.actions.hasOwn(action)) {
            for (let key of input_controller.actions[action].keys) {
                if(this.isKeyPressed(key)) {
                    return true;
                }
            }
        }
    }

    #handleKeyDown(e) {
        for (const [name, prop] of Object.entries(input_controller.actions)) {
            if (prop.keys.includes(e.key)) {
                for (let key_low of prop.keys) {
                    if(this.isKeyPressed(key_low) && key_low != e.key) {
                        return;
                    };
                }
                this.pressed.add(e.key);
                console.log(e.key + 'added');
                if (!input_controller.checkPluginsActivityPressed(this, name)) {
                    let event = new CustomEvent(input_controller.ACTION_ACTIVATED, {detail: {name: name}});
                    document.dispatchEvent(event);
                }
            }
        }
    } 

    #handleKeyUp(e) {
        for (const [name, prop] of Object.entries(input_controller.actions)) {
            if (prop.keys.includes(e.key)) {
                for (let key_low of prop.keys) {
                    if(this.isKeyPressed(key_low) && key_low != e.key) {
                        return;
                    };
                }
                this.pressed.delete(e.key);
                console.log(e.key + 'deleted');
                if (!input_controller.checkPluginsActivityPressed(this, name)) {
                    let event = new CustomEvent(input_controller.ACTION_DEACTIVATED, {detail: {name: name}});
                    document.dispatchEvent(event);
                }
            }
        }
    }

    pressed = new Set;
}
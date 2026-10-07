import { input_controller } from "./controller.js";

export default class Mouse {
    construct() {

    }

    attach() {
        document.addEventListener('mouseup', this.#handleKeyDown.bind(this));
        document.addEventListener('mousedown', this.#handleKeyUp.bind(this));
    }

    detach() {
        document.removeEventListener('mouseup', this.#handleKeyDown.bind(this));
        document.removeEventListener('mousedown', this.#handleKeyUp.bind(this));
    }

    isKeyPressed(key){
        return (this.pressed.has(key));
    }

    checkActionUsed(action) {
        if (allActions.hasOwnProperty(action)) {
            for (let key of allActions[action].keys) {
                if(this.isKeyPressed(key)) {
                    return true;
                }
            }
        }
        return false;
    }

    #handleKeyDown(e) {
        for (const [activitylist, obj] of Object.entries(allActions)) {
            for (const [name, prop] of Object.entries(obj)) {
                if (prop.keys.includes(e.key)) {
                    for (let key_low of prop.keys) {
                        if(this.isKeyPressed(key_low) && key_low != e.key) {
                            return;
                        };
                    }
                    this.pressed.add(e.key);
                    console.log(e.key + 'added');
                    let event = new CustomEvent(inputController.PLUGIN_PRESS, {detail: {plugin: this, action: name}});
                    document.dispatchEvent(event);
                }
            }
        }
    } 

    #handleKeyUp(e) {
        for (const [activitylist, obj] of Object.entries(allActions)) {
            for (const [name, prop] of Object.entries(obj)) {
                if (prop.keys.includes(e.key)) {
                    for (let key_low of prop.keys) {
                        if(this.isKeyPressed(key_low) && key_low != e.key) {
                            return;
                        };
                    }
                    this.pressed.delete(e.key);
                    console.log(e.key + 'deleted');
                    let event = new CustomEvent(inputController.PLUGIN_RELEASE, {detail: {plugin: this, action: name}});
                    document.dispatchEvent(event);
                }
            }
        }
    }

    pressed = new Set;
}
import inputController from "./controller.js";

export default class Mouse {
    construct() {

    }

    attach(controller) {
        document.addEventListener('click', this.#handleKeyDown.bind(this));
        document.addEventListener('mousemove', this.#handleKeyUp.bind(this));
        this.#controller = controller;
    }

    detach() {
        document.removeEventListener('mouseclick', this.#handleKeyDown.bind(this));
        document.removeEventListener('mousemove', this.#handleKeyUp.bind(this));
        this.#controller = null;
    }

    isKeyPressed(key){
        return (this.#pressed.has(key));
    }

    #handleKeyDown(e) {
        for (const [name, prop] of Object.entries(this.#controller.actions)) {
            for (let key_high of prop.keys) {
                if (e.key === key_high){
                    for (let key_low of prop.keys) {
                        if((this.isKeyPressed(key_low) &&  key_low != e.key) || prop.enabled === false) {
                            return;
                        };
                    }
                    this.#pressed.add(e.key);
                    console.log(e.key + 'added');
                    let event = new CustomEvent(this.#controller.ACTION_ACTIVATED, {detail: {name: prop.name}});
                    document.dispatchEvent(event);
                }
            }
        }  
    }

    #handleKeyUp(e) {
        for (const [name, prop] of Object.entries(this.#controller.actions)) {
            for (let key_high of prop.keys) {
                if (e.key === key_high) {
                    for (let key_low of prop.keys) {
                        if(this.isKeyPressed(key_low) && key_low != e.key) {
                            return;
                        };
                    }
                    this.#pressed.delete(e.key);
                    console.log(e.key + 'deleted');
                    let event = new CustomEvent(this.#controller.ACTION_DEACTIVATED, {detail: {name: prop.name}});
                    document.dispatchEvent(event);
                }
            }
        }
    }

    #controller;
    #pressed = new Set;
}
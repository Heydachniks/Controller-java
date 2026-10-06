export default class inputController {
    constructor(actionsToBind, target) {
        this.bindActions(actionsToBind);
        this.attach(target);
        document.addEventListener('keydown', this.#handleKeyDown.bind(this));
        document.addEventListener('keyup', this.#handleKeyUp.bind(this));
        window.addEventListener('focus', this.#handleFocus.bind(this));
        window.addEventListener('blur', this.#handleBlur.bind(this));
    }

    bindActions(actionsToBind){
        this.#actions = actionsToBind;
    }

    enableAction(actionName){
        for (let action_cur of this.#actions) {
            if (action_cur.name === actionName) {
                action_cur.enabled = true;
            }
        }
    }

    disableAction(actionName){
        for (let action_cur of this.#actions) {
            if (action_cur.name === actionName) {
                action_cur.enabled = false;
            }
        }
    }

    attach(target, dontEnable){
        this.#target = target; 
        if(dontEnable){
            return;
        }
        this.enabled = true;
    }

    detach(){
        this.#target = "";
        this.enabled = false
    }

    isActionActive(action){
        if(this.enabled) {
            for (let action_cur of this.#actions) {
                if(action_cur.enabled){
                    if (action_cur.name === action) {
                        for (let key_high of action_cur.keys) {
                            for (let key_low of this.#pressed) {
                                if (key_high === key_low) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    isKeyPressed(key){
        let condition = false
        for (let key_low of this.#pressed) {
            if (key_low === key) {
                condition = true;
                
            }
        }
        return condition;
    }

    #handleKeyDown(e) {
        for (let action_cur of this.#actions) {
            for (let key_high of action_cur.keys) {
                if (e.key === key_high){
                    for (let key_low of action_cur.keys) {
                        if(this.isKeyPressed(key_low)) {
                            return;
                        };
                    }
                    this.#pressed.add(e.key);
                    let event = new Event(this.ACTION_ACTIVATED + action_cur.name);
                    this.#target.dispatchEvent(event);
                }
            }
        }   
    }

    #handleKeyUp(e) {
        for (let action_cur of this.#actions) {
            for (let key_high of action_cur.keys) {
                if (e.key === key_high) {
                    this.#pressed.delete(e.key);
                    let event = new Event(this.ACTION_DEACTIVATED + action_cur.name);
                    this.#target.dispatchEvent(event);
                }
            }
        }  
    }

    #handleFocus(e) {
        this.focused = true;
        this.enabled = true;
        console.log('in');
    }

    #handleBlur(e) {
        this.focused = false;
        this.enabled = false;
        console.log('out');
    }

    enabled = true;
    focused = true;
    ACTION_ACTIVATED = "input-controller:action-activated";
    ACTION_DEACTIVATED = "input-controller:action-deactivated";

    #target;
    #actions;
    #pressed = new Set;
}
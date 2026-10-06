export default class inputController {
    constructor(actionsToBind, target) {
        this.bindActions(actionsToBind);
        this.attach(target);
        document.addEventListener('keydown', this.#handleKeyDown.bind(this));
        document.addEventListener('keyup', this.#handleKeyUp.bind(this));
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

    isKeyPressed(key){
        let condition = false
        for (let key_low of this.#pressed) {
            if (key_low === key) {
                condition = true;
                
            }
        }
        console.log(condition);
        return condition;
    }

    #handleKeyDown(e) {
        this.#pressed.add(e.key);
        let action = '';
        for (let action_cur of this.#actions) {
            for (let key_high of action_cur.keys) {
                if (e.key === key_high) {
                    console.log(this.ACTION_ACTIVATED, action_cur.name);
                }
            }
        }
        
    }

    #handleKeyUp(e) {
        let action = '';
        for (let action_cur of this.#actions) {
            for (let key_high of action_cur.keys) {
                if (e.key === key_high) {
                    console.log(this.ACTION_DEACTIVATED, action_cur.name);
                }
            }
        }
        this.#pressed.delete(e.key);
        
    }

    enabled = true;
    focused = true;
    ACTION_ACTIVATED = "action activated";
    ACTION_DEACTIVATED = "action deactivated";

    #target;
    #actions;
    #pressed = new Set;
}
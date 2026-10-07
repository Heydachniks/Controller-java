export default class inputController {
    constructor(actionsToBind, target) {
        this.bindActions(actionsToBind);
        this.attach(target);
        window.addEventListener('focus', this.#handleFocus.bind(this));
        window.addEventListener('blur', this.#handleBlur.bind(this));
    }

    bindActions(actionsToBind){
        this.actions = Object.assign({}, this.actions, actionsToBind);
    }

    attach(target, dontEnable){
        this.target = target; 
        if(dontEnable){
            return;
        }
        this.enabled = true;
    }

    enableAction(actionName){
        if (this.actions.hasOwn(actionName)) {
            this.actions[actionName].enabled = true;
        }
    }

    disableAction(actionName){
        if (this.actions.hasOwn(actionName)) {
            this.actions[actionName].enabled = false;
        }
    }

    detach(){
        this.target = "";
        this.enabled = false
    }

    attach_plugin(plugin) {
        this.plugins.add(plugin);
        plugin.attach(this);
    }

    detach_plugin(plugin) {
        if (this.plugins[plugin]) {
            this.plugins.delete(plugin);
            plugin.detach();
        }
    }

    isActionActive(action){
        if(this.enabled) {
            if (this.actions.hasOwn(action)) {
                return (this.actions[action].enabled);
            }
        }
    }

    checkPluginsActivityPressed(plugin, action) {
        for (let plugin_dif of this.plugins) {
            if (plugin_dif != plugin && plugin_dif.checkActionUsed(action)) {
                return true;
            }
        }
        return false;
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

    plugins = new Set;
    target;
    actions = {};
}
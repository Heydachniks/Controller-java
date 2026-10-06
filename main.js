import inputController from "./controller.js"

class Action{
    constructor (name, keys, enabled){
        this.name = name, this.keys = keys, this.enabled = enabled;
    }
    
    name = "";
    keys = [];
    enabled = false;
};

let actions = new Set([new Action("left", ['a', 'ArrowLeft'], true),
                new Action("right", ['d', 'ArrowRight'], true), 
                new Action("down", ['s', 'ArrowDown'], true), 
                new Action("up", ['w', 'ArrowUp'], true)]
                )

const bluebox = document.getElementById("bluebox");
const redbox = document.getElementById("redbox");
const activate_btn = document.getElementById("activate_btn");
const deactivate_btn = document.getElementById("deactivate_btn");
const attach_btn_blue = document.getElementById("attach_btn_blue");
const attach_btn_red = document.getElementById("attach_btn_red");
const detach_btn = document.getElementById("detach_btn");
const jump_btn = document.getElementById("jump_btn");
const disable_left_btn = document.getElementById("disable_left_btn");
const enable_left_btn = document.getElementById("enable_left_btn");
const isPressed_left_btn = document.getElementById("isPressed_left_btn");
const controller = new inputController(actions, bluebox);
let target = bluebox;
let y = 0;
let x = 0;
const movement = 10;

let holded_down = false;

activate_btn.onclick = function(){controller.enabled = true};
deactivate_btn.onclick = function(){controller.enabled = false};
attach_btn_blue.onclick = function(){target = bluebox; controller.attach(target)};
attach_btn_red.onclick = function(){target = redbox; controller.attach(target)};
detach_btn.onclick = function(){controller.detach()};
jump_btn.onclick = function(){actions.add(new Action("jump", [" "], true)); controller.bindActions(actions)};
disable_left_btn.onclick = function(){controller.disableAction("left")};
enable_left_btn.onclick = function(){controller.enableAction("left")};
isPressed_left_btn.onclick = function(){return(controller.isKeyPressed('ArrowLeft'))};

document.addEventListener("keydown", event => {
    if(controller.enabled) {
        if (controller.isActionActive('left')) {
            x -= movement;
        }
        if (controller.isActionActive('right')) {
            x += movement;
        }
        if (controller.isActionActive('up')) {
            y -= movement;
        }
        if (controller.isActionActive('down')) {
            y += movement;
        }
        if (controller.isActionActive('jump')) {
            y = y - movement - 50;
        }
        target.style.top = `${y}px`;
        target.style.left = `${x}px`;
    }
});
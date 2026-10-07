import { input_controller } from "./controller.js"
import Keyboard from "./keyboardPlugin.js";
import { Actions, newActions } from "./actions.js";

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
const controller = input_controller;
controller.attach_plugin(new Keyboard);
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
jump_btn.onclick = function(){controller.bindActions(newActions)};
disable_left_btn.onclick = function(){controller.disableAction("left")};
enable_left_btn.onclick = function(){controller.enableAction("left")};
isPressed_left_btn.onclick = function(){return(controller.isKeyPressed('ArrowLeft'))};

document.addEventListener(controller.ACTION_ACTIVATED, event => { 
    if(controller.enabled) {
        if (event.detail.name === 'left') {
            x -= movement;
        }
        if (event.detail.name === 'right') {
            x += movement;
        }
        if (event.detail.name === 'up') {
            y -= movement;
        }
        if (event.detail.name === 'down') {
            y += movement;
        }
        if (event.detail.name === 'jump') {
            y = y - movement - 50;
        }
        target.style.top = `${y}px`;
        target.style.left = `${x}px`;
    }
});
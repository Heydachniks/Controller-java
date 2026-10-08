import inputController from "./controller.js"
import Keyboard from "./keyboardPlugin.js";
import { Actions, newActions } from "./actions.js";

const blue = document.getElementById("blue");
const red = document.getElementById("red");
const activate_btn = document.getElementById("activate_btn");
const deactivate_btn = document.getElementById("deactivate_btn");
const attach_btn_blue = document.getElementById("attach_btn_blue");
const attach_btn_red = document.getElementById("attach_btn_red");
const detach_btn = document.getElementById("detach_btn");
const jump_btn = document.getElementById("jump_btn");
const disable_left_btn = document.getElementById("disable_left_btn");
const enable_left_btn = document.getElementById("enable_left_btn");
const controller = new inputController(Actions, blue);
const platform = document.getElementById("platform");
controller.attach_plugin(new Keyboard);
let target = blue;
let x = parseInt(window.getComputedStyle(target).left, 10);
const movement = 10;

CustomBounce.create("myBounce", {strength:0.7, squash:3});
let tl;

activate_btn.onclick = function(){controller.enabled = true};
deactivate_btn.onclick = function(){controller.enabled = false};
attach_btn_blue.onclick = function(){target = blue; controller.attach(target)};
attach_btn_red.onclick = function(){target = red; controller.attach(target)};
detach_btn.onclick = function(){controller.detach()};
jump_btn.onclick = function(){controller.bindActions(newActions)};
disable_left_btn.onclick = function(){controller.disableAction("left")};
enable_left_btn.onclick = function(){controller.enableAction("left")};

document.addEventListener(controller.ACTION_ACTIVATED, event => { 
    x = parseInt(window.getComputedStyle(target).left, 10);

    if(controller.enabled) {
        if (event.detail.name === 'left') {
            x -= movement;
        }
        if (event.detail.name === 'right') {
            x += movement;
        }
        if (event.detail.name === 'jump') {
            if (tl && tl.isActive()) {
                return;
            }
            tl = gsap.timeline();
            tl.to(target, { duration: 0.2, scaleY: 0.5, scaleX: 1.7, duration: 0.2, transformOrigin: "bottom", ease: 'power2.out'})
                .to(target, { scaleY: 1, scaleX: 1, duration: 0.1, transformOrigin: "bottom", ease: 'power2.out'})
                .to(target, { duration: 1, y: '-200%', ease: 'power2' }, '<')
                .to(target, { y: 0, duration: 1, ease: 'power2.in' })
                .to(target, { scaleY: 1.5, scaleX: 0.7, duration: 1, ease: 'power2.in' }, '<')
                .to(target, { scaleY: 0.5, scaleX: 1.7, duration: 0.2, transformOrigin: "bottom", ease: 'power2.out' })
                .to(target, { scaleY: 1, scaleX: 1, duration: 0.1, transformOrigin: "bottom", ease: 'power2.out' })
                .to(target, { duration: 1, y: '-100%', ease: 'power2' })
                .to(target, {y: 0, duration: 3, ease:"myBounce"})
                .to(target, {scaleY:0.5, duration: 3, scaleX:1.3, ease:"myBounce-squash", transformOrigin:"bottom"}, '<')
        }
        target.style.left = `${x}px`;
    }
    
});
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group,
  keyframes
} from "@angular/animations";
export const JSONCSS = {
  class: {
    "height-100": style({ height: "*" }),
    "height-0": style({ height: 0 })
  },
  Animations: {
    slideInDown: keyframes([
      style({
        transform: "translate3d(0, -100%, 0)",
        visibility: "visible",
        height: 0,
        offset: 0
      }),
      style({ transform: "translate3d(0, 0, 0)", height: "*", offset: 1 })
    ]),
    slideInup: keyframes([
      style({
        transform: "translate3d(0, -100%, 0)",
        visibility: "visible",
        height: 0,
        offset: 0
      }),
      style({ transform: "translate3d(0, 0, 0)", height: "*", offset: 1 })
    ]),
    increaseHeight: keyframes([
      style({
        transform: "translateY(100%) scale(0)",
        opacity: 0,
        height: 0,
        offset: 0
      }),
      style({
        transform: "translateY(0%) scale(1)",
        opacity: 1,
        height: "*",
        offset: 1
      })
    ]),
    FadeIn_IncreaseHeight: keyframes([
      style({ opacity: 0, height: 0, offset: 0 }),
      style({ height: "*", opacity: 1, offset: 1 })
    ]),
    FadeOut_DecreaseHeight: keyframes([
      style({ opacity: 1, height: "*", offset: 0 }),
      style({ height: 0, opacity: 0, offset: 1 })
    ]),
    decreaseHeight: keyframes([
      style({
        transform: "translateY(0%) scale(1)",
        opacity: 1,
        height: "*",
        offset: 0
      }),
      style({
        transform: "translateY(100%) scale(0)",
        opacity: 0,
        height: 0,
        offset: 1
      })
    ]),
    fadeIn: keyframes([
      style({ opacity: 0, offset: 0 }),
      style({ opacity: 1, offset: 1 })
    ]),
    fadeOut: keyframes([
      style({ opacity: 1, offset: 0 }),
      style({ opacity: 0, offset: 1 })
    ])
  }
};

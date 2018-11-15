import {
  trigger,
  state,
  style,
  animate,
  transition,
  group,
  keyframes,
  query,
  animateChild,
  stagger
} from "@angular/animations";
import { JSONCSS } from "../animations/test-Keyframes";
export const plusToCross = [
  trigger("plussToCross", [
    state("true", style({ transform: "rotate(45deg) scale(1.2)" })), //when showcard is true
    state("false", style({ transform: "rotate(0deg) scale(1)" })),
    transition("true<=>false", [animate("200ms")])
  ])
];
export const CardAnimation = [
  trigger("ycard", [
    state("void", JSONCSS.class["height-0"]),
    state("*", JSONCSS.class["height-100"]),
    transition(`void=>*`, [
      animate("500ms ease", JSONCSS.Animations.slideInDown)
    ]),
    transition(`*=>void`, [
      animate("350ms ease", JSONCSS.Animations.decreaseHeight)
    ])
  ])
];

export const EditAnimation = [
  trigger("EditAnimation", [
    //state("void",JSONCSS.class["height-0"] ),
    //state("*",  JSONCSS.class["height-100"] ),
    transition(`void=>*`, [animate("500ms ease", JSONCSS.Animations.fadeIn)])
    //transition(`*=>void`, [animate("350ms ease",JSONCSS.Animations.fadeOut)])
  ])
];
export const ListAnimation = [
  trigger("ListAnimation", [
    //state("void",JSONCSS.class["height-0"] ),
    state("*", JSONCSS.class["height-100"]),
    transition(`false=>*`, [
      animate("500ms ease", JSONCSS.Animations.FadeIn_IncreaseHeight)
    ])
    //transition(`*=>void`, [animate("350ms ease",JSONCSS.Animations.FadeOut_DecreaseHeight)])
  ])
];

export const FadeAnimationIn = [
  trigger("FadeAnimationIn", [
    transition(`void=>*`, 
    query(".FadeAnimationIn:enter",[animate("500ms ease", JSONCSS.Animations.fadeIn)], { optional: true })
    
    )
    //transition(`*=>void`, [animate("100ms ease",JSONCSS.Animations.fadeOut)])
  ])
];

export const GListAnimation = [
  trigger("GListAnimation", [
    //--enter
    transition(":enter", [
      style({ transition: "scale(0.5)", opacity: 0, height: 0 }), //initial
      animate(
        "1s cubic-bezier(.8, -0.6, 0.2, 1.5)",
        style({ transition: "scale(1)", opacity: 1, height: "*" }) //final
      )
    ]),
    //--leave
    transition(":leave", [
      style({ transition: "scale(1)", opacity: 1, height: "*" }), //initial
      animate(
        "1s cubic-bezier(.8, -0.6, 0.2, 1.5)",
        style({ transition: "scale(0.5)", opacity: 0 }) //final
      )
    ])
  ])
];
export const GListItemAnimation = [
  trigger("GListItemAnimation", [
    transition(":enter", [
      query("@GListAnimation", stagger(300, animateChild()))
    ])
    /*transition(":leave", [
      query("@GListAnimation", stagger(300, animateChild()))
    ])*/
  ])
];

export const list = [
  // nice stagger effect when showing existing elements
  trigger("list", [
    transition(":enter", [
      // child animation selector + stagger
      query("@items", stagger("3000ms", animateChild()), { optional: true })
    ]),
    transition(":leave", [
      // child animation selector + stagger
      query("@items", stagger("3000ms", animateChild()), { optional: true })
    ])
  ]),
  trigger("items", [
    // cubic-bezier for a tiny bouncing feel
    transition(":enter", [
      style({ transform: "scale(0.5)", opacity: 0 }),
      animate(
        "1s cubic-bezier(.8,-0.6,0.2,1.5)",
        style({ transform: "scale(1)", opacity: 1 })
      )
    ]),
    transition(":leave", [
      style({ transform: "scale(1)", opacity: 1, height: "*" }),
      animate(
        "1s cubic-bezier(.8,-0.6,0.2,1.5)",
        style({
          transform: "scale(0.5)",
          opacity: 0,
          height: "0px",
          margin: "0px"
        })
      )
    ])
  ])
];
[
  query(
    ":enter",
    stagger(
      "1000ms",
      animate(
        "1000ms",
        keyframes([
          style({ opacity: 0, offset: 0 }),
          style({ opacity: 1, offset: 1 })
        ])
      )
    ),
    { optional: true }
  ),
  query(
    ":leave",
    stagger(
      "1000ms",
      animate(
        "1000ms",
        keyframes([
          style({ opacity: 1, offset: 0 }),
          style({ opacity: 0, offset: 1 })
        ])
      )
    ),
    { optional: true }
  )
];
export const Mylist = [
  trigger("Mylist", [
    transition("* => *", [
      query(":enter", style({ opacity: 0 }), { optional: true }),
      query(
        ":enter",
        animate(
          "2000ms ease",
          keyframes([
            style({ opacity: 0, transform: "translateY(-75px)", offset: 0 }),
            style({ opacity: 1, transform: "translateY(0)", offset: 1 })
          ])
        ),
        { optional: true }
      )
    ])
  ])
];

export const simp = [
  trigger("simp", [
    transition("* => *", [
      // each time the binding value changes
      query(
        ":leave",
        [stagger("1s", [animate("0.5s", style({ opacity: 0 }))])],
        { optional: true }
      ),
      query(
        ":enter",
        [
          style({ opacity: 0 }),
          stagger("1s", [animate("0.5s", style({ opacity: 1 }))])
        ],
        { optional: true }
      )
    ])
  ])
];

export const List_Card_Animation = [
  trigger("ycardlist", [
    state("void", JSONCSS.class["height-0"]),
    state("*", JSONCSS.class["height-100"]),
    transition(`void=>*`, [
      animate("500ms ease", JSONCSS.Animations.slideInDown)
    ]),
    transition(`*=>void`, [
      animate("350ms ease", JSONCSS.Animations.decreaseHeight)
    ])
  ])
];

export const working = [
  trigger("listAnimate", [
    transition("* => *", [
      query(".card_item:enter", JSONCSS.class["height-0"], { optional: true } ),
      query(".card_item:leave", JSONCSS.class["height-100"] , { optional: true }),

      query(
        ".card_item:enter",
        stagger( "200ms ease",animate("300ms ease", JSONCSS.Animations.slideInDown)
        ),{ optional: true }
      ),
      query(
        ".card_item:leave",
        stagger("100ms ease",animate("500ms ease", JSONCSS.Animations.FadeOut_DecreaseHeight)
        ),{ optional: true }
      )
    ])
  ]),
  trigger("neededAnimation", [
    transition("* => *", [
      query(".card_item:enter", JSONCSS.class["height-0"], { optional: true } ),
      query(".card_item:leave", JSONCSS.class["height-100"] , { optional: true }),

      query(
        ".card_item:enter",
        stagger( "200ms ease",animate("300ms ease", JSONCSS.Animations.slideInDown)
        ),{ optional: true }
      ),
      query(
        ".card_item:leave",
        stagger("100ms ease",animate("500ms ease", JSONCSS.Animations.FadeOut_DecreaseHeight)
        ),{ optional: true }
      )
    ])
  ])
];

/*export const working = [
  trigger("listAnimate", [
    transition("* => *", [
      query(":enter", style({ opacity: 0, height: 0 }), { optional: true }),

      query(
        ".card_item:enter",
        stagger(
          "400ms ease",
          animate(
            "300ms",
            keyframes([
              style({
                opacity: 0,
                transform: "translateY(-75px)",
                height: 0,
                offset: 0
              }),
              style({
                opacity: 0.5,
                transform: "translateY(35px)",
                offset: 0.5
              }),
              style({
                opacity: 1,
                transform: "translateY(0)",
                height: "*",
                offset: 1
              })
            ])
          )
        ),
        { optional: true }
      ),
      query(
        ".card_item:leave",
        stagger(
          "100ms ease",
          animate(
            "300ms",
            keyframes([
              style({ opacity: 0,transform: "translateY(0)",height: "*", offset: 0}),
              style({opacity: 0.5,transform: "translateY(35px)",offset: 0.5}),
              style({opacity: 1,transform: "translateY(-75px)", height: 0,offset: 1 })
            ])
          )
        ),
        { optional: true }
      )
    ])
  ])
];
*/
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'As you slowly wake up, your head hurts for a reason that you dont know, you find yourself in the middle of a scorching desert. The blazing sun beats down on the vast expanse of golden sand that stretches out before you. To your relief, theres a bottle of water lying right next to you, offering a welcome despite in this harsh and dry environment.',
    options: [
      {
        text: 'Drink the water',
        setState: { water: false },
        nextText: 2
      },
      {
        text: 'Leave the water alone',
        setState: { water: false },
        nextText: 2
      },
      {
        text: 'Save the water for later',
        setState: { water: true },
        nextText: 2
      }
    ]
    },
    // {
    //     id: 2.5,
    //     text: 'You died of thirst',
    //     options: [
    //       {
    //         text: 'Trade the goo for a sword',
    //         // requiredState: (currentState) => currentState.blueGoo,
    //         // setState: { blueGoo: false, sword: true },
    //         nextText: 3
    //         },
    //         {
    //             text: 'Restart',
    //             nextText: -1
    //         }
    //     ]
    //   },
  {
    id: 2,
    text: 'Embarking on a journey across the scorching desert, you begin to walk with no clear direction in mind. After meandering through the vast expanse for several minutes, you suddenly spot the distant silhouette of a village on the horizon, offering a beacon of hope in the midst of the arid landscape.',
    options: [
      {
        text: 'Go to the village ',
        // requiredState: (currentState) => currentState.water,
        // setState: { water: false, village: true },
        nextText: 3
      },
      {
        text: 'Avoid the village',
        setState: { poison: true},
        // requiredState: (currentState) => currentState.water,
        //   setState: { water: false, village: false },
        nextText: 3.5
      },
    ]
    },
    {
        id: 3.5,
        text: 'Having deliberately steered clear of the village, you continue your journey through the desert. However, as time elapses, an unfortunate turn of events unfolds , you find yourself bitten by a scorpion, a sudden and unexpected encounter with the death lurking in the unforgiving wilderness.',
        options: [
          {
            text: 'Head back to the village',
            nextText: 3
          },
          {
            text: 'Continue walking',
            nextText: 5.7
          },
          {
            text: 'lay down and go to sleep',
            nextText: 6.5
          }
        ]
    },
    {
        id: 5.7,
        text: 'While persisting on your journey, the venom from the scorpion bite courses through your veins, gradually reaching your heart. In a swift and unfortunate turn of events, the toxic effects quickly overwhelm your body, leading to your untimely demise.',
        options: [
          {
            text: 'restart',
            nextText: -1
          },
          
        ]
    },
    { 
        id: 6.5,
        text: 'As the sun rises, you open your eyes to a startling scene: a group of hungry hyenas surrounds you, their eager eyes fixed upon you as they wait for any opportunity to satisfy their relentless hunger.',
        options: [
          {
            text: 'Give up',
            nextText: 4.5
          },
          {
            text: 'Fight',
            nextText: 5.5
          },
          {
            text: 'Kiss them',
            nextText: 6.7
          },
          {
            text: 'Throw the bottle of water at them',
            requiredState: (currentState) => currentState.water,
            setState: {water: false},
            nextText: 6.777
          }
        ]
    },
    {
      id: 6.777,
      text: 'They get distracted and you get a chance to escape',
      options: [
          {
              text: 'Run back to the village',
              nextText: 3
          },
      ]
  },
    
    
    {
        id: 4.5,
        text: 'You slowly got torn to pieces',
        options: [
            {
                text: 'Restart',
                nextText: -1
            },
        ]
    },
    {
        id: 5.5,
        text: 'You failed miserably and got mauled to death',
        options: [
            {
                text: 'Restart',
                nextText: -1
            },  
        ]
    },
    {
        id: 6.7,
        text: 'The hyenas suddenly stopped attacking and they helped you escape the desert, Good job (good ending)',
        options: [
            {
                text: 'Replay',
                nextText: -1
            },
        ]
      },
  {
    id: 3,
    text: 'Upon entering the small village, you discover that you are now surrounded by approximately 30 tribal warriors. The air becomes charged with a mix of curiosity and uncertainty, leaving you to navigate this unexpected encounter with a sizable group of inhabitants.',
    options: [
      {
        text: 'Try To Communicate with them',
        nextText: 4.8
      },
      {
        text: 'Run for your life',
        nextText: 5.9
      },
      {
        text: 'Try to snatch one of their weapons and fight them',
        nextText: 6.10
      }
    ]
  },
  {
    id: 4.8,
    text: 'Despite your efforts to initiate a conversation with the tribal warriors, they remain silent, their unwavering gaze offering no indication of their thoughts or intentions. It leaves you in a state of uncertainty, as the atmosphere around you brims with an unspoken tension.',
    options: [
      {
        text: 'Try to scare them',
        nextText: 4.88
      },
      {
        text: 'show them the scorpion bite mark',
        requiredState: (currentState) => currentState.poison,
        setState: { poison: false},
        nextText: 5.88
      },
      {
        requiredState: (currentState) => currentState.water,
        setState: { water: false,},
        text: 'offer them water',
        nextText: 6.88
      }
    ]
  },
  {
    id: 5.88,
    text: 'Upon revealing the scorpion bite mark on your body, the tribal warriors undergo a perceptible shift in their demeanor. Recognizing your vulnerability and the absence of threat you pose to their village, they decide to show compassion. Instead of hostility, they usher you into one of their huts, where they skillfully employ ancient methods to treat the wound, symbolizing an unexpected turn from confrontation to care.',
    options: [
      {
        text: 'continue',
        nextText: 10
      },
      
    ]
  },
  {
    id: 10,
    text: 'Despite their offer of shelter, a lingering suspicion clouds your thoughts. Uncertain about the true intentions of the tribal warriors, you contemplate staying vigilant and decide not to fully let your guard down, thinking of remaining cautious throughout the night.',
    options: [
      {
        text: 'Go to sleep',
        nextText: 11
      },
      {
        text: 'Stay up',
        nextText: 12
      }
      
    ]
  },
  {
    id: 11,
    text: 'Having decided to trust the tribal warriors, you choose to sleep through the night in the safety of their hut. To your relief, the hours pass uneventfully, and the morning sunlight finds you unharmed, signaling a peaceful and uneventful night in the midst of the unfamiliar village.',
    options: [
      {
        text: 'continue',
        nextText: 13
      },
      
    ]
  },
  {
    id: 12,
    text: 'Opting for caution, you remain vigilant throughout the night, staying awake until the first light of morning. Despite the prolonged watchfulness, nothing untoward occurs, and the village remains tranquil. Your sleepless night results in a sense of reassurance, even though the reasons for your initial suspicion still linger in the back of your mind.',
    options: [
      {
        text: 'continue',
        nextText: 13
      },
      
    ]
  },
  {
    id: 13,
    text: 'Embracing the newfound hospitality, you find yourself gradually becoming a part of the tribal villages daily life. As each day unfolds, you observe their customs, partake in shared meals, and witness the vibrant rhythm of their community.',
    options: [
      {
        text: 'continue',
        nextText: 14
      },
      
    ]
  },
  {
    id: 14,
    text: 'After a small period of time, the tribes leader gestures for you to follow, leading you towards their sacred place. There, under the scorching desert sun, you witness a majestic golden statue standing as the focal point of reverence. Suddenly, a flash of memory strikes you — the reason you found yourself in this unfamiliar desert in the first place was that you are a seasoned treasure hunter.',
    options: [
      {
        text: 'ohhh....',
        nextText: 15
      },
      
    ]
  },
  {
    id: 15,
    text: 'The revelation adds a layer of complexity to your situation, as you grapple with the intersection of your personal quest for treasure and the newfound connection with the tribe. The golden statue, gleaming in the sunlight, beckons you with promises of untold secrets and potential riches, intertwining your destiny with the enigmatic history of the tribal community.',
    options: [
      {
        text: 'wow',
        nextText: 16
      },
      {
        text: 'ok',
        nextText: 16
      },
      
    ]
  },
  {
    id: 16,
    text: 'you contemplate the daring idea of stealing the golden statue for your collection, do you steal the golden statue right now or wait for the night?',
    options: [
      {
        text: 'Steal the statue right now',
        nextText: 17
      },
      {
        text: 'Wait for the night',
        nextText: 18
      },
      
    ]
  },
  {
    id: 17,
    text: 'As the impulse to seize the golden statue overwhelms you, you make a swift and determined run towards it. The group leader, unable to match your speed, hastily calls two agile tribe members to intercept you. As you sprint away from the village, the rhythmic pounding of footsteps behind you intensifies. In the midst of the chase, a fleeting thought crosses your mind  the possibility of retracing your steps and returning to the spot where your desert journey began.',
    options: [
      {
        text: 'Go to the starting spot',
        nextText: 17.1
      },
      {
        text: 'hope for a better outcome',
        nextText: 17.2
      },
      
    ]
  },
  {
    id: 17.1,
    text: 'Running back to the starting point, your stamina dwindles. Realizing you cant outrun the tribesmen, you contemplate facing the 2 on 1 confrontation, acknowledging the imminent showdown in the desert landscape.',
    options: [
      {
        text: 'Fight',
        nextText: 17.11
      },
      {
        text: 'Continue running',
        nextText: 17.22
      },
      
    ]
  },
  {
    id: 17.11,
    text: 'you chose to fight but you need to think how to aproach this fight',
    options: [
      {
        text: 'challange them 1 on 1',
        nextText: 17.91
      },
      {
        text: 'charge at them bare handed',
        nextText: 17.92
      },
      {
        text: 'try to grab one of their weapons',  
        nextText: 17.93
      },
      {
        text: 'throw a bottle of water at them',
        requiredState: (currentState) => currentState.water,
        setState: { water: false,},
        nextText: 17.94
      }, 
    ]
  },
  {
    id: 20,
    text: 'Upon defeating the warriors, you decide to return to your starting point, intent on devising an escape plan. To your surprise, you stumble upon a backpack hidden nearby. Opening it, you discover a trove of resources including food, water, and equipment like a walkie-talkie. This unexpected find presents a ray of hope, offering you the means to survive and potentially communicate for assistance in the challenging desert environment.',
    options: [
      {
        text: 'Continue',
        nextText: 21
      },
    ]
  },
  {
    id: 21,
    text: 'Using the equipment from the found backpack, you successfully navigate your way out of the desert and reach nearby cities. Relieved to be back in familiar territory, you resume your journey for work, grateful for the unexpected resources that enabled your escape from the harsh desert landscape.',
    options: [
      {
        text: 'Continue',
        nextText: 22
      },
    ]
  },
  {
    id: 22,
    text: 'The End (good ending)',
    options: [
      {
        text: 'Replay',
        nextText: -1
      },
    ]
  },
  // Right Choice In The Fight
  {
    id: 17.93,
    text: 'Skillfully sidestepping the incoming spear, you quickly seize it with both hands. With surprising ease, you wield the weapon to swiftly defeat both warriors, turning the tables in your favor despite the dire situation.',
    options: [
      {
        text: 'Continue',
        nextText: 20
      },
    ]
  },
  // Wrong Choices In The Fight
  {
    id: 17.91,
    text: 'challenging them did not turn out to be a good idea , they didnt understand what were you saying and they finished you on the spot',
    options: [
      {
        text: 'Restart',
        nextText: -1
      },
    ]
  },
  {
    id: 17.92,
    text: 'Initially intimidated by your display of bravery, you manage to inflict harm on one of the two warriors. However, the odds prove insurmountable, and with your stamina depleted, your efforts are in vain. The inevitable confrontation concludes with your demise, the harsh reality of the desert claiming its toll on your ill-fated attempt to escape.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      },
    ]
  },
  {
    id: 17.94,
    text: 'they did not get fooled by your tricks and killed you right on the spot, with a precise shot of an arrow',
    options: [
      {
        text: 'Restart',
        nextText: -1
      },
    ]
  },
  {
    id: 17.22,
    text: 'Exhausted from running, you come to a halt, realizing you lack the stamina to engage in a fight with the pursuing tribesmen. The inevitable confrontation looms as your energy wanes, leaving you vulnerable in the unforgiving desert.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      },
    ]
  },
  {
    id: 17.2,
    text: 'Exhausted from the chase, the tribesmen catch up and apprehend you. In retribution for your thievery, they administer a harsh punishment, leaving you wounded. The severity of your actions leads to a grim fate as you find yourself fed to the hungry hyenas, the ultimate consequence for betraying the trust of the tribal community.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      },
    ]
  },
  {
    id: 18,
    text: 'Choosing to act under the cover of night, you patiently waited until everyone retreated to their huts. Sneaking out of your own shelter, you stealthily approached the location of the golden statue. However, your plans hit a snag as you discovered two guards and the leader diligently protecting the sacred artifact, posing a formidable obstacle to your thieving ambitions.',
    options: [
      {
        text: 'Quickly grab the sacred artifact and run',
        nextText: 17
      },
      {
        text: 'Try to stealthly eliminate them',
        nextText: 18.2
      },
      
    ]
  },
  {
    id: 18.2,
    text: 'Opting for stealthy elimination, your attempt to incapacitate the guards turns disastrous. Instead, they catch you in the act, leading to your imprisonment. After a period of confinement, the tribe decides on a harsh punishment, ultimately executing you on a fireplace as a consequence for your actions. The pursuit of personal gain takes a tragic turn, with dire consequences in the heart of the tribal village.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      },
    ]
  },
  {
    id: 6.88,
    text: 'Recognizing your friendly gesture of providing water, the tribal warriors reassess their initial impression. Convinced of your goodwill and understanding that you pose no threat to their village, they decide to extend hospitality. Taking you into one of their huts, they provide you with shelter, marking a significant shift from initial tension to a newfound sense of acceptance and understanding.',
    options: [
      {
        text: 'continue',
        nextText: 10
      },
      
    ]
  },
  {
    id: 4.88,
    text: 'In an attempt to ward off the silent tribal warriors, you decide to employ a tactic of intimidation, but unfortunately, it backfires. Instead of retreating or showing fear, their neutral expressions transform into visible anger. The situation takes a dark turn as the enraged warriors decide to take matters into their own hands, leading to a grim outcome – you find yourself being placed on a bonfire, the flames engulfing you in an unsettling turn of events.',
    options: [
      {
        text: 'restart',
        nextText: -1
      },
      
    ]
  },
  {
    id: 6.10,
    text: 'You succefully killed one of the warriors, but the rest got angry and now theyre preparing you for soup ',
    options: [
      {
        text: 'restart',
        nextText: -1
      },
    ]
  },
  {
    id: 5.9,
    text: 'You started running,they shot an arrow through your leg and now youre bleeding ',
    options: [
      {
        text: 'Give up',
        nextText: 4.99
      },
      {
        text: 'Beg for your life',
        nextText: 5.99
      },
      {
        text: 'Offer them water',
        requiredState: (currentState) => currentState.water,
        setState: { water: false,},
        nextText: 6.99
      }
    ]
  },
  {
    id: 4.99,
    text: 'They cooked you on a fire',
    options: [
      {
        text: 'restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5.99,
    text: 'They did not listen and cooked you on a fire',
    options: [
      {
        text: 'restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6.99,
    text: 'By offering them a bottle of water, you successfully conveyed your friendly intentions, prompting the tribal warriors to perceive you in a positive light. In a show of reciprocal goodwill, they escort you back to their village, where they graciously provide you with shelter in one of their huts. This act of hospitality signifies a bond of trust and understanding between you and the inhabitants of the village.',
    options: [
      {
        text: 'continue',
        nextText: 10
      }
    ]
  },
  
]

startGame()
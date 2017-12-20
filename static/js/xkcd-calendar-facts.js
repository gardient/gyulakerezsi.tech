let generateXkcdCalendarFact = (function () { // eslint-disable-line no-unused-vars
  let first = [
    [
      'the ',
      [
        'fall ',
        'spring '
      ],
      'equinox '
    ],
    [
      'the ',
      [
        'winter ',
        'summer '
      ],
      [
        'solistice ',
        'olympics '
      ]
    ],
    [
      'the ',
      [
        'earliest ',
        'latest '
      ],
      [
        'sunrise ',
        'sunset '
      ]
    ],
    [
      'daylight ',
      [
        'saving ',
        'savings '
      ],
      'time '
    ],
    [
      'leap ',
      [
        'day ',
        'year '
      ]
    ],
    'easter ',
    [
      'the ',
      [
        'harvest ',
        'super ',
        'blood '
      ],
      'moon '
    ],
    'Toyota truck month ',
    'shark week '
  ]

  let second = [
    [
      'happens ',
      [
        'earlier ',
        'later ',
        'at the wrong time '
      ],
      'every year'
    ],
    [
      'drifts out of sync with the ',
      [
        'sun ',
        'moon ',
        'zodiac ',
        [
          [
            'gregorian ',
            'mayan ',
            'lunar ',
            'iPhone '
          ],
          'calendar'
        ],
        'atomic clock in Colorado'
      ]
    ],
    [
      'might ',
      [
        'not happen ',
        'happen twice '
      ],
      'this year'
    ]
  ]

  let third = [
    [
      'time zone legislation in ',
      [
        'Indiana',
        'Arizona',
        'Russia'
      ]
    ],
    'a decree by the Pope in the 1500s',
    [
      [
        'precession ',
        'libration ',
        'nutation ',
        'libation ',
        'eccentricity ',
        'obliquity'
      ],
      'of the ',
      [
        'moon',
        'sun',
        'earth\'s axis',
        'equator',
        'prime meridian',
        [
          [
            'international date ',
            'Mason-Dixon '
          ],
          'line'
        ]
      ]
    ],
    'magnetic field reversal',
    [
      'an arbitrary decision by ',
      [
        'Benjamin Franklin',
        'Isaac Newton',
        'FDR'
      ]
    ]
  ]

  let fourth = [
    'it causes a predictable increase in car accidents.',
    'that\'s why we have leap seconds.',
    'scientists are really worried.',
    [
      'it was even more extreme during the ',
      [
        [
          [
            'bronze ',
            'ice '
          ],
          'age.'
        ],
        'cretaceus.',
        '1990s.'
      ]
    ],
    [
      'there is a proposal to fix it, but it ',
      [
        'will never happen.',
        'actually makes things worse.',
        'is stalled in congress.',
        'might be unconstitutional.'
      ]
    ],
    'it\'s getting worse and no one knows why.'
  ]

  let actualDataStructure = [ // pick one of each
    'Did you know that <u>',
    first,
    second,
    '</u> because of <u>',
    third,
    '</u>? Apparently <u>',
    fourth,
    '</u>'
  ]

  function pickRandom (arr) {
    let rnd = arr[(Math.floor(Math.random() * arr.length))]

    if (Array.isArray(rnd)) return pickOneOfEach(rnd)
    else return rnd
  }

  function pickOneOfEach (arr) {
    let result = ''

    for (let el of arr) {
      if (Array.isArray(el)) {
        result += pickRandom(el)
      } else {
        result += String(el)
      }
    }

    return result
  }

  return function generateFact () {
    return pickOneOfEach(actualDataStructure)
  }
})()

let factDisplay = document.getElementById('xkcd-calendar-fact')
let generateBtn = document.getElementById('generate-xkcd-calendar-fact')

function generateAndDisplayFact () {
  factDisplay.innerHTML = generateXkcdCalendarFact()
}

generateBtn.addEventListener('click', generateAndDisplayFact)
generateAndDisplayFact()

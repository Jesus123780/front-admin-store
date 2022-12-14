import React, { useState, useMemo } from 'react'

export const useCountLetters = () => {
  // State for our counter
  // State to keep track of current word in array we want to show
  const [wordIndex, setWordIndex] = useState(0)

  // Words we can flip through and view letter count
  const words = ['hey', 'this', 'is', '89472394879234792387493287498729873298798']
  const word = words[wordIndex]

  // Returns number of letters in a word
  // We make it slow by including a large and completely unnecessary loop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const computeLetterCount = () => {
    let i = 0
    while (i < 1000000000) i++
    return word.length
  }

  // Memoize computeLetterCount so it uses cached return value if input array ...
  // ... values are the same as last time the function was run.
  const letterCount = useMemo(() => {return computeLetterCount()}, [computeLetterCount])

  // This would result in lag when incrementing the counter because ...
  // ... we'd have to wait for expensive function when re-rendering.

  return (
    <div style={{ padding: '15px' }}>
      <h2>Compute number of letters (slow 🐌)</h2>
      <p>
        {word} has {letterCount} letters
      </p>
      <button
        onClick={() => {
          const next = wordIndex + 1 === words.length ? 0 : wordIndex + 1
          setWordIndex(next)
        }}
      >
                Next word
      </button>
    </div>
  )
}
const effects = require('redux-saga/effects')
const saga = require('redux-saga')


// IO that'll be injected in our test
// ---------------------------------------------------------------------------

const _say = number => {
  console.log(number) // this should be injected

  return number
}

// Test this
// ---------------------------------------------------------------------------

function createGenerator (say) {
  return function * (action) {
    try {
      const num = yield effects.call(say, action.payload)

      const next = num + 1

      yield effects.call(say, next)
    } catch (err) {
      console.error('Something went wrong:', err)
    }
  }
}

// Don't test watchers
// ---------------------------------------------------------------------------

function * watch (say) {
  yield * saga.takeEvery('ACTION', createGenerator(say))
}

// Add to redux, etc.
function * rootSaga () {
  yield saga.fork(watch, say)
}

// export
// ---------------------------------------------------------------------------
module.exports = {
  default: rootSaga,
  Test: {
    createGenerator
  }
}

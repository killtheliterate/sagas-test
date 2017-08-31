const Test = require('../index').Test
const effects = require('redux-saga/effects')

const _say = number => {
  console.log(number) // this should be injected

  return number
}

describe('Some tests', () => {
  const iterator = Test.createGenerator(_say)({ type: 'ACTION', payload: 1 })

  it('should yield the first effect', () => {
    expect(iterator.next().value)
      .toEqual(effects.call(_say, 1))
  })

  it('should yield the second effect', () => {
    expect(iterator.next(1).value) // inject the yielded value
      .toEqual(effects.call(_say, 2))
  })
})

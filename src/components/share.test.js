import React from 'react'
import Share from './share'
import renderer from 'react-test-renderer'
/* global test, expect */
test('Share component exists', () => {
  const component = renderer.create(
    <Share url="http://frontendweekend.ml" t={() => {}} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

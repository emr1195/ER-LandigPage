import React from 'react'
import {act, cleanup, fireEvent, render, screen} from '@testing-library/react'
import {ExpeditionGroup} from './ExpeditionGroup'
jest.mock('./groupTransitions.css', () => ({}))
jest.mock('../common', () => ({SectionContainer: ({children}) => <section>{children}</section>}))
jest.mock('./sections', () => ({
  ImageSection: ({group, expeditionGroups, selectedGroupIndex, setSelectedGroupIndex}) => <div>{expeditionGroups.map((item, index) => <button key={item.id} aria-pressed={selectedGroupIndex === index} onClick={() => setSelectedGroupIndex(index)}>{item.title}</button>)}<span>{group.emblema}</span></div>,
  TextSection: ({group}) => <h2>{group.title}</h2>,
}))
const groups = ['Navegantes', 'Pioneros', 'Exploradores'].map((title, id) => ({id, title, emblema: `emblema-${id}`, colors: {secondary: '#fff'}}))
beforeEach(() => jest.useFakeTimers())
afterEach(() => { cleanup(); jest.useRealTimers(); jest.restoreAllMocks() })

test('desvanece antes de cambiar el contenido sin desmontar los controles', () => {
  const {container} = render(<ExpeditionGroup expeditionGroupInfo={{expeditionGroups: groups}} />)
  const button = screen.getByRole('button', {name: 'Pioneros'})
  button.focus()
  fireEvent.click(button)
  expect(container.querySelector('[data-transition]').dataset.transition).toBe('leaving')
  expect(screen.getByRole('heading').textContent).toBe('Navegantes')
  act(() => jest.advanceTimersByTime(450))
  expect(screen.getByRole('heading').textContent).toBe('Pioneros')
  expect(container.querySelector('[data-transition]').dataset.transition).toBe('visible')
  expect(document.activeElement).toBe(button)
})

test('los clics rápidos muestran el último grupo elegido sin cambios atrasados', () => {
  const {unmount} = render(<ExpeditionGroup expeditionGroupInfo={{expeditionGroups: groups}} />)
  fireEvent.click(screen.getByRole('button', {name: 'Pioneros'}))
  act(() => jest.advanceTimersByTime(90))
  fireEvent.click(screen.getByRole('button', {name: 'Exploradores'}))
  act(() => jest.advanceTimersByTime(450))
  expect(screen.getByRole('heading').textContent).toBe('Exploradores')
  unmount()
  expect(jest.getTimerCount()).toBe(0)
})

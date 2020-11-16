import React from 'react'
import { render, fireEvent,act } from '@testing-library/react'
var sinon = require('sinon');
import App from '../components/App'

describe('Test working of Timer', () => {

    it('The functional component returned by App.js should not break when mounted.', () => {
        render(<App />)
    })

    it('On enter keyboard-event in the input field the current-time(div), should be updated.', () => {
        render(<App />)
        act(() => {

            fireEvent.change(document.getElementById('timeCount'), { target: { value: '12' } })
            fireEvent.keyDown(document.getElementById('timeCount'), { key: 'Enter', code: 'Enter', keyCode: 13 })
        })
        expect(document.getElementById('current-time').innerHTML).toBe('12')
    })

    it('The timer should decrement time after 1 sec and update current-time(div).', () => {
        render(<App />)
        let clock = sinon.useFakeTimers();
        act(() => {
            fireEvent.change(document.getElementById('timeCount'), { target: { value: '12' } })
            fireEvent.keyDown(document.getElementById('timeCount'), { key: 'Enter', code: 'Enter', keyCode: 13 })
        })

        expect(document.getElementById('current-time').innerHTML).toBe('12')
        act(() => {
            clock.tick(1000);
        })
        expect(document.getElementById('current-time').innerHTML).toBe('11')
        act(() => {
            clock.tick(1000);
        })

        clock.restore();
    })

    it('The timer should stop at zero (should not count -1,-2,-3...).', () => {
        render(<App />)
        let clock = sinon.useFakeTimers();
        act(() => {
            fireEvent.change(document.getElementById('timeCount'), { target: { value: '12' } })
            fireEvent.keyDown(document.getElementById('timeCount'), { key: 'Enter', code: 'Enter', keyCode: 13 })
        })

        expect(document.getElementById('current-time').innerHTML).toBe('12')
        act(() => {
            clock.tick(1000);
        })
        expect(document.getElementById('current-time').innerHTML).toBe('11')
        act(() => {
            clock.tick(1000);
        })

        expect(document.getElementById('current-time').innerHTML).toBe('10')
        for (let i = 0; i < 20; i++) {
            act(() => {
                clock.tick(1000);
            })
        }
        expect(document.getElementById('current-time').innerHTML).toBe('0')
        clock.restore();
    })

    it('If a new timer is started before the last timer is finished then our code should terminate the previous timer and start a new one.', () => {
        render(<App />)
        let clock = sinon.useFakeTimers();
        act(() => {
            fireEvent.change(document.getElementById('timeCount'), { target: { value: '12' } })
            fireEvent.keyDown(document.getElementById('timeCount'), { key: 'Enter', code: 'Enter', keyCode: 13 })
        })

        expect(document.getElementById('current-time').innerHTML).toBe('12')
        act(() => {
            clock.tick(1000);
        })
        expect(document.getElementById('current-time').innerHTML).toBe('11')
        act(() => {
            fireEvent.change(document.getElementById('timeCount'), { target: { value: '112' } })
            fireEvent.keyDown(document.getElementById('timeCount'), { key: 'Enter', code: 'Enter', keyCode: 13 })
        })
        expect(document.getElementById('current-time').innerHTML).toBe('112')
        act(() => {
            clock.tick(250);
        })
        expect(document.getElementById('current-time').innerHTML).toBe('112')
        act(() => {
            clock.tick(250);
        })
        expect(document.getElementById('current-time').innerHTML).toBe('112')
        act(() => {
            clock.tick(250);
        })
        expect(document.getElementById('current-time').innerHTML).toBe('112')


        act(() => {
            clock.tick(250);
        })
        expect(document.getElementById('current-time').innerHTML).toBe('111')
        for (let i = 0; i < 111; i++) {
            act(() => {
                clock.tick(1000);
            })
        }
        expect(document.getElementById('current-time').innerHTML).toBe('0')
        clock.restore();
    })

    it('If 0 is entered in the input field then timer should terminate the last timer and show zero on current-time(div).', () => {
        render(<App />)
        let clock = sinon.useFakeTimers();
        act(() => {
            fireEvent.change(document.getElementById('timeCount'), { target: { value: '50' } })
            fireEvent.keyDown(document.getElementById('timeCount'), { key: 'Enter', code: 'Enter', keyCode: 13 })
        })

        expect(document.getElementById('current-time').innerHTML).toBe('50')
        act(() => {
            clock.tick(1000);
        })
        act(() => {
            fireEvent.change(document.getElementById('timeCount'), { target: { value: '0' } })
            fireEvent.keyDown(document.getElementById('timeCount'), { key: 'Enter', code: 'Enter', keyCode: 13 })
        })
        expect(document.getElementById('current-time').innerHTML).toBe('0')
        act(() => {
            clock.tick(250);
        })
        expect(document.getElementById('current-time').innerHTML).toBe('0')
        act(() => {
            clock.tick(250);
        })
        expect(document.getElementById('current-time').innerHTML).toBe('0')
        act(() => {
            clock.tick(250);
        })
        expect(document.getElementById('current-time').innerHTML).toBe('0')
        act(() => {
            clock.tick(250);
        })
        expect(document.getElementById('current-time').innerHTML).toBe('0')
        for (let i = 0; i < 10; i++) {
            act(() => {
                clock.tick(1000);
            })
        }
        expect(document.getElementById('current-time').innerHTML).toBe('0')
        clock.restore();
    })

    it('If invalid input is entered then timer should show zero in current-time(div).', () => {
        render(<App />)
        let clock = sinon.useFakeTimers();
        act(() => {
            fireEvent.change(document.getElementById('timeCount'), { target: { value: '50' } })
            fireEvent.keyDown(document.getElementById('timeCount'), { key: 'Enter', code: 'Enter', keyCode: 13 })
        })

        expect(document.getElementById('current-time').innerHTML).toBe('50')
        act(() => {
            clock.tick(1000);
        })
        act(() => {
            fireEvent.change(document.getElementById('timeCount'), { target: { value: 'A41' } })
            fireEvent.keyDown(document.getElementById('timeCount'), { key: 'Enter', code: 'Enter', keyCode: 13 })
        })
        expect(document.getElementById('current-time').innerHTML).toBe('0')
        act(() => {
            clock.tick(1000);
        })
        expect(document.getElementById('current-time').innerHTML).toBe('0')

        act(() => {
            fireEvent.change(document.getElementById('timeCount'), { target: { value: '78M' } })
            fireEvent.keyDown(document.getElementById('timeCount'), { key: 'Enter', code: 'Enter', keyCode: 13 })
        })
        expect(document.getElementById('current-time').innerHTML).toBe('0')
        act(() => {
            clock.tick(1000);
        })
        expect(document.getElementById('current-time').innerHTML).toBe('0')


    })
})

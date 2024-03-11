//src: https://github.com/fullstack-hy2020/part2-notes-frontend/blob/part5-6/src/components/Togglable.jsx

import './Togglable.css'

import { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button className='okBtn' onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>

                {props.children}
                <button className='cancelBtn' onClick={toggleVisibility}>{props.hasOwnProperty("cancel") ? props.cancel : "Cancel"}</button>
                <br />
                <br />
            </div>
        </div>
    )
})

export default Togglable
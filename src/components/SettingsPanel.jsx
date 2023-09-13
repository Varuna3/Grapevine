import { useEffect, useState } from 'react'
import '../styles/settings-panel.scss'

export default function SettingsPanel({ showSettings }) {
    const [marginLeft, setMarginLeft] = useState('100vw')

    useEffect(() => {
        console.log(showSettings)
        showSettings
            ? () => {
                  setMarginLeft('60vw')
              }
            : () => {
                  setMarginLeft('100vw')
              }
    }, [showSettings])

    return (
        <>
            <div
                className="settings-panel"
                style={
                    showSettings
                        ? { marginLeft: 'calc(100vw - 320px)' }
                        : { marginLeft: '100vw' }
                }
            ></div>
        </>
    )
}

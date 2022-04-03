import React from 'react'
import './PlayButton.scss'

function PlayButton({ onClick, active }) {
  const hanleOnClick = () => {
    if (active === false) return
    onClick()
  }
  return (
    <button onClick={hanleOnClick} className={`playButton ${active === false ? 'disable' : ''}`} type="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 238 53.35"
      >
        <defs>
          <style />
          <clipPath id="clip-path"><path className="cls-1" d="M210.3,52.85H27A25.61,25.61,0,0,1,1.5,27.35h0A25.61,25.61,0,0,1,27,1.85H210.3a25.61,25.61,0,0,1,25.5,25.5h0A25.61,25.61,0,0,1,210.3,52.85Z" /></clipPath>

        </defs>
        <path className="cls-2" d="M211.5,52.35H26.5A25.61,25.61,0,0,1,1,26.85H1A25.61,25.61,0,0,1,26.5,1.35h185A25.61,25.61,0,0,1,237,26.85h0A25.61,25.61,0,0,1,211.5,52.35Z" />
        <g id="Calque_3" data-name="Calque 3">
          <g className="cls-3"><path className="cls-4" d="M.5,7a346.75,346.75,0,0,1,45-2.69c41.48,0,75.1,6,75.1,13.5S87,31.35,45.5,31.35A348.3,348.3,0,0,1,1,28.73" /></g>
          <g className="cls-3"><path className="cls-5" d="M13.9,30.15s26.6-10.8,82.9-8.8h12.8l-2.7,4.3S76.2,34.85,13.9,30.15Z" /></g>
          <g className="cls-3"><path className="cls-6" d="M17.1,2.84A430.55,430.55,0,0,1,66.2.35c39.27,0,71.1,4,71.1,9s-31.83,9-71.1,9c-26.32,0-49.31-1.81-61.6-4.5" /></g>
          <path className="cls-5" d="M119.4,16.35l115.4,10s2,19-19.9,24C214.9,50.35,137.3,44.35,119.4,16.35Z" />
        </g>
        <ellipse className="cls-6" cx="200" cy="46.85" rx="4" ry="2.5" />
        <ellipse className="cls-6" cx="49.8" cy="39.85" rx="8" ry="5.5" />
        <ellipse className="cls-6" cx="66.7" cy="42.85" rx="5" ry="3.5" />
        <path className="cls-6" d="M223.4,20.35H148.8a2.48,2.48,0,0,1-2.5-2.5v-1a2.48,2.48,0,0,1,2.5-2.5h74.6a2.48,2.48,0,0,1,2.5,2.5v1A2.54,2.54,0,0,1,223.4,20.35Z" />
        <ellipse className="cls-6" cx="196.5" cy="5.85" rx="3.5" ry="2.5" />
        <ellipse className="cls-6" cx="205" cy="10.85" rx="2" ry="1.5" />
        <ellipse className="cls-6" cx="8.5" cy="19.85" rx="3.5" ry="2.5" />
        <ellipse className="cls-6" cx="214.4" cy="34.35" rx="10.4" ry="7" />
        <path className="cls-7" d="M142.6,31.05l-37.4,17.1a4.5,4.5,0,0,1-6.4-4.1V9.85a4.5,4.5,0,0,1,6.4-4.1l37.4,17.1A4.51,4.51,0,0,1,142.6,31.05Z" />
        <path className="cls-8" d="M142.8,31.55l-38.4,17.6a4.5,4.5,0,0,1-6.4-4.1V9.85a4.5,4.5,0,0,1,6.4-4.1l38.4,17.6A4.51,4.51,0,0,1,142.8,31.55Z" />
        <path className="cls-9" d="M141.7,30.05l-37.4,17.1a4.5,4.5,0,0,1-6.4-4.1V8.85a4.5,4.5,0,0,1,6.4-4.1l37.4,17.1A4.51,4.51,0,0,1,141.7,30.05Z" />
        <circle className="cls-6" cx="182.1" cy="46.35" r="4.5" />
        <path className="cls-10" d="M211.5,51.35H26A25.61,25.61,0,0,1,.5,25.85h0A25.61,25.61,0,0,1,26,.35H211.5A25.61,25.61,0,0,1,237,25.85h0A25.61,25.61,0,0,1,211.5,51.35Z" />

      </svg>
    </button>
  )
}
export default PlayButton

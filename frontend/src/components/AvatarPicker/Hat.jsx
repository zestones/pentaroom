import React from 'react'

function Hat({ hatColor }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 640 508"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs />
      <path fill={hatColor} d="M71.5 502.6c-3.8-1.6-14.6-15.8-20.3-26.5C46 466.3 28 426.5 23.1 414c-6.4-16.4-13.6-42.5-14.7-53.3-.7-7.4-.6-7.8 7.4-17.6l4.5-5.6-.6-34c-.6-35-.1-45 3.3-68.5 3.3-22.8 4.9-36 6-48.5.6-6.6 2-17.8 3.1-25 3.6-24.8 7.3-35.2 16.9-47.5 2.8-3.6 9.9-13.2 15.8-21.4C84.3 65.5 92.4 58.7 110 54.5c5.2-1.2 13.8-2.7 19-3.3 15.7-1.9 20.1-4.1 40-20.1 13.3-10.7 21.5-15 30.8-16.1 6.7-.9 21.1.2 26.7 2 3.3 1 19.4 3.9 26.5 4.7 5.4.6 18.5-2.4 32-7.1 17.9-6.4 20.2-7 31.5-7.4 16.4-.6 24.4 1.4 50 12.3 24.1 10.3 27.7 11.1 43 9.5 26.1-2.7 42.9 2.8 71 23.1 19.5 14 24.1 16.2 40 18.4 2.8.4 6.4 1.5 8.1 2.6 5.5 3.4 13.2 12.5 22.8 27.1 14.3 21.9 24.6 40.4 30 54 .9 2.4 3.2 5 6 7 5.1 3.5 7.8 8.4 18.6 33.8 7.9 18.5 11.4 31.3 19.6 72.8l6.8 33.7v20.1c.1 21.9-.2 23.4-5.4 23.4-1.5 0-4.1-.7-5.6-1.5-1.6-.8-3.7-1.5-4.6-1.5-1 0-4.1-.9-7-2-10.8-4-49.4-12.7-59.8-13.4-2-.2-4.5-.8-5.5-1.3-2.3-1.2-13.7-3.5-30-6-14-2.2-60.2-2.4-81.5-.5l-29 2.8c-45 4.2-84.8 13-119.3 26.6-27 10.6-76.5 37.3-98.3 53.1-39.8 28.8-71.9 57.9-93.6 85.2-6.6 8.3-12.7 15.6-13.6 16.3-2 1.5-3.9 1.5-7.7-.2zm11.1-29.3c12.5-15.7 36.4-39.4 58.2-57.5l3.2-2.6-3.7-7.9c-2-4.3-5.1-10.3-6.9-13.3-1.7-3-6.2-11.3-9.9-18.5-9.7-18.5-15-27.8-21.5-37.5-6.8-10.1-16.9-23-18.1-23-1.8 0-28.8 17.9-42.4 28.1-5 3.7-11.2 9.4-13.8 12.7l-4.7 6 2.1 8.4c5.3 21.5 11.6 39.7 19.1 55.1 2.6 5.4 4.8 10 4.8 10.4 0 1.1 9.4 21.8 13.8 30.2 3.9 7.6 10.9 19.1 11.7 19.1.1 0 3.8-4.4 8.1-9.7zm89.5-81.5c12.6-9 18.5-12.8 35.1-22.8 7.4-4.5 12.4-8.1 11.9-8.6s-4.6-8.3-9.3-17.4c-4.6-9.1-10.6-20-13.3-24.3-14.2-22.2-19.7-30.2-27-39.5l-7.9-10.1-17.6 9.1c-9.6 5-20.6 11-24.5 13.3-3.8 2.3-9.4 5.5-12.2 7.1-2.9 1.6-5.3 3.1-5.3 3.4s3.3 5 7.4 10.5c8.8 11.8 19.6 29.6 29.7 49l11.3 21.6 6.6 12.2c1.4 2.6 3 4.5 3.6 4.3s5.7-3.7 11.5-7.8zm88.4-50.4c9.6-4.5 22.1-9.6 31.3-12.6 6.8-2.3 9.2-3.5 9.2-4.8 0-9.8-10.5-41.9-19.5-59.5-10.1-19.9-21.8-37.5-24.9-37.5-1 0-11.9 4.2-18.1 7-1.1.5-4.9 2.1-8.5 3.6-3.6 1.4-8.1 3.3-10 4.1l-5.5 2.4c-7.1 3-24.9 11.1-29.6 13.4l-5.6 2.8 9.6 12.7c5.3 7 11.3 15.6 13.4 19.1l8.9 14.4c2.9 4.4 8.3 14.1 12.1 21.5l10 19.1 3 5.7 9.6-4.5 14.6-6.9zm357.2-26.1C617 300.9 606.4 246 600 224c-2.3-8.1-11-29.6-17.6-43.5-2.3-4.7-4.5-5.4-19.6-5.4-7.7-.1-9.8.2-9.8 1.3 0 .7 1.1 4.7 2.4 8.7 4.8 14.8 6.3 20.7 11.7 45.9 1.9 8.8 2.3 13.7 2.3 30 .1 19.6-.5 25-5 43.6-.7 3.3-1.4 6.5-1.4 7.1 0 1 3.6 1.9 18 4.8 8.5 1.7 34.2 8.3 34.9 9 1.9 1.9 2.3-.6 1.8-10.2zm-569.7-3c13.2-8.9 26.6-17 65-39.2 19.1-11.1 58.8-30.9 83.5-41.6l15-6.6c26.5-11.8 61.3-24.6 86-31.7l24.5-6.8c5.4-1.3 10.9-2.7 24.5-6.6 23.5-6.6 35.4-9.1 57.5-12.3 5.8-.8 13.1-1.9 16.2-2.5s12.3-1.7 20.5-2.6l23.8-2.5c5-.5 30-1.2 55.6-1.5l46.7-.7-5.2-10.1c-5.1-9.8-11.2-20.2-18.5-31.6-2-3-4-6.3-4.6-7.2-3.8-6.5-11.4-16.4-15.4-20.1-4.3-4.1-5.3-4.5-11.6-5.2-14.4-1.5-20.2-4.4-44.9-22.2-9.9-7.2-21.5-13.4-30.7-16.4-5.9-1.9-7.8-2-24.4-1.4-12.2.5-20.1.3-24.4-.5-6.3-1.1-19.4-6-33.6-12.5-14.7-6.7-29.9-10.2-38.8-9.1-2.9.4-13.2 3.4-23 6.7-26.9 9.1-38.5 9.7-69.2 3.4-22.5-4.6-25.3-3.7-48 15.1-16.3 13.5-24.5 16.8-48.3 19.9-18 2.3-23.6 4.9-33.7 15.7-3.3 3.5-7.8 9-10 12.3-2.2 3.2-6.7 9.4-10 13.8l-7 9.6c-.5.8-2.9 4-5.3 7-10.6 13.4-12.8 23.3-19.3 86.6-.5 5-1.3 11.3-1.9 14-.5 2.8-2.1 14.7-3.6 26.5-2.5 20.7-2.6 22.2-1.5 42l1.1 23.9c0 3.3 0 3.3 2.3 1.7l10.7-7.3zm290.5 3.9c15.8-3.3 35.1-6.6 44.8-7.7l5.9-.7-.6-3.1c-.3-1.8-.8-8.1-1.1-14.2-1.3-23.5-4.4-38-14.8-69.5-6.1-18.3-9.3-26-11.1-26-.6 0-4.3.9-8.1 2-3.9 1.2-13.5 3.8-21.5 6-23.2 6.1-25.7 6.9-40.7 11.6-9.8 3.2-14.1 5-13.5 5.8l5.3 8.1c15.9 24.5 27.6 52.2 32.9 78 2.9 13.9 2.8 13.8 5.3 13.2 1.2-.2 9-1.8 17.2-3.5zm207.2-12.7c2.2-8.6 5-23.6 6.3-32.9 1.6-11.5.5-20.2-6-49.6-1.8-8.4-2.7-11.6-8.9-31.9-5-16.1-1.7-14.5-27.5-13.7l-28.9 1.3-6.7.6.6 3.6c.4 2 2.9 10.6 5.6 19.1 7.5 23.3 11.6 39.1 15.6 60.6 1.4 7.3 1.6 33.6.3 38.2-1.2 4-2.1 3.7 13.6 5.1 12 1.1 30.4 3.9 31.3 4.7 1.5 1.6 3.6-.7 4.7-5.1zm-106.2 0l30.5-1.8 6.5-.2 1.3-5c1.7-6.6 1-31.7-1.1-40-.9-3.3-2.6-10-3.8-15-2.1-8.9-5.4-19.9-10.9-36.5-1.6-4.7-3.6-12.3-4.6-16.9-1.1-5-2.4-8.5-3.2-8.9-1.5-.5-23.1 1.9-34.2 3.9l-20.9 3.4c-8.5 1.4-15.9 2.9-16.3 3.3-.5.5.2 3.7 1.6 7.3 4.3 11.5 8.4 24.2 11.6 35.9l4 14c1.8 5 5 31.3 5 41.3 0 5.6.3 11.9.6 14l.7 3.7 4.6-.5c2.5-.3 15.4-1.2 28.6-2z" />
      <path fill={hatColor} d="M70.4 484.7c-4.3-5.9-9.8-15.6-14-24.5C51.6 450 46 437.3 46 436.6c0-.3-2.2-4.9-4.8-10.3-7.5-15.4-13.8-33.6-19.1-55.2-3-12.1-2.8-13.3 2.6-20.3 5-6.3 15.4-14.5 34.8-27.5 17.9-11.9 24.3-15.6 25.8-15 1.9.7 12.6 14.2 19.6 24.6 6.6 9.8 11.9 19 21.6 37.6 3.7 7.2 8.2 15.5 9.9 18.5s5.3 9.9 8 15.3c4.1 8.3 4.7 10 3.5 11.1-.8.7-6.1 5.2-11.9 10.1-16.9 14.4-38.4 36-49.7 50-5.8 7.2-11 13.1-11.7 13.2-.6.2-2.5-1.6-4.2-4zm84.1-85c-1.6-3.4-4.8-9.6-7.1-13.7l-11.9-22.5c-13.1-25.1-24.8-43.6-36.2-57.2l-4.4-5.2 7.3-4.2 14.3-8.5c3.9-2.3 15.9-8.7 26.7-14.3l19.6-10.2 9.2 11.7c8.4 10.6 12.3 16.4 27.5 40.1 2.7 4.3 7.8 13.4 11.3 20.3l10.3 19.7c2.9 5.3 3.5 7.3 2.6 8-.7.6-6.4 4-12.7 7.8-13.9 8.2-32.7 20.6-43.3 28.6-4.3 3.3-8.4 5.9-9 5.8-.7 0-2.5-2.8-4.2-6.2zm78-45.7c-1.4-2.2-5.3-9.5-8.6-16.2-12-23.8-26.9-47.7-41.8-66.8-4.4-5.7-8.1-10.9-8.1-11.5 0-1 19.5-10.9 29.9-15.2 2-.8 5.1-2.1 6.9-2.9 1.7-.8 4.7-2 6.5-2.8 1.7-.8 6.1-2.6 9.7-4l8.5-3.6c1.1-.5 6.7-2.8 12.4-5.1l10.4-4.3 4 4.5c11.2 12.5 27 42.1 34.1 63.9 5.6 17.4 9.7 36.7 8.1 38-.5.5-5.1 2.2-10 3.8-9 3-21.6 8.1-31 12.6l-16.8 8-11.7 5.5-2.5-3.9zm382.7-24.6c-4.1-1.8-26.8-7.8-37.2-9.9-19-3.8-19-3.8-19-5.8 0-1 .9-5.5 1.9-10 4.8-20.1 5.6-25.9 5.5-42.7-.1-17.1-.5-20.1-6.8-47-2.3-10.1-3.8-15.1-8.6-30.5-1.2-3.8-2.4-8.1-2.7-9.3l-.6-2.4 16.9.3c9.3.1 17.5.7 18.2 1.2 1.3 1 2 2.5 11.4 24.2 8.9 20.6 11.1 28.7 20.4 75.5 4.9 24.5 5.7 30.6 6.2 43.3.5 16.2.6 15.8-5.6 13.1zM31.9 319.3l-.4-9.5c-.2-.9-.6-10.4-1-21-.6-18-.5-20.9 2.4-43.5l3.6-25.5c.2-.7.9-5.8 1.4-11.3 4.3-43 6.7-59.2 10.3-70 2.7-8 3.9-10.2 9-16.6 2.4-3 4.8-6.2 5.3-7 .6-.9 3.7-5.2 7-9.6s7.8-10.6 10-13.8c2.2-3.3 6.7-8.8 10-12.3 10.1-10.8 15.7-13.4 33.7-15.7 23.8-3.1 32-6.4 48.3-19.9 6.1-5.1 12.8-10.4 15-11.8 9.8-6.6 19-7.4 38.6-3.4 29.5 6 37.4 5.6 64.1-3.5 13.7-4.6 20-6.2 25.8-6.6 12.2-.9 26.1 2.2 41.5 9.2 13.7 6.3 27.2 11.3 32.9 12.4 3.6.7 12.5.8 24 .4 15.9-.5 19-.4 24.2 1.2 8.9 2.7 22.3 9.7 32 16.7 24.7 17.9 30.5 20.8 44.9 22.3 6.3.7 7.3 1.1 11.6 5.2 4 3.7 11.6 13.6 15.4 20.1.6.9 2.6 4.2 4.6 7.2 12 18.5 23.6 40.2 24.1 45l.3 2.5-46.5.7-56 1.7-24.3 2.5c-8.2.9-17.4 2-20.5 2.6s-10.4 1.7-16.2 2.5c-22.1 3.2-34 5.7-57.5 12.3-13.6 3.9-19.1 5.3-24.5 6.6-5.3 1.3-9.1 2.3-24.5 6.8-24.7 7.1-59.5 19.9-86 31.7l-15 6.6c-21.4 9.3-49.2 22.9-74 36.3-8.5 4.6-42 24-50 28.9-12 7.5-28.8 18.4-34.6 22.6-3.7 2.6-7.2 4.7-7.8 4.7-.7 0-1.1-2.7-1.2-7.7zm284.6 4.6c-.3-.4-1.7-6.1-3-12.6-5.3-25.2-15.7-51.1-29.9-74.3-3.2-5.2-7.3-11.4-9.2-13.7s-3.4-4.6-3.4-5.1c0-.6 7.1-3.3 15.8-6.1 16.4-5.2 18.6-5.9 42.2-12.2l23.5-6.4c4.9-1.4 9.9-2.5 11-2.5 2.6 0 5 5.4 12.2 27 10.8 32.6 12.9 42.8 15.3 75 1.5 19.6 1.9 17.7-4.7 18.5-14.5 1.7-48.5 7.9-62.1 11.4-3.9 1.1-7.4 1.5-7.7 1zM541 312c-13.2-2.8-36.4-6-43.5-6-6.2 0-6.6-.6-5-7.5s2-27.1.5-34.2c-3.1-15.6-7.4-34.4-8.7-38.3-.8-2.5-1.6-5.2-1.8-6s-2.6-8.5-5.3-17c-5-15.7-7.9-27.6-7-28.5.7-.7 38.4-2.5 53-2.5 13.7 0 12.2-1.3 16.9 14.1 6.2 20.3 7.1 23.5 8.9 31.9 6.9 31.2 8.1 42.1 6 55.9-2.4 15.7-6 33.3-7.7 37.6-.6 1.6-1 1.7-6.3.5zm-137-3c-1-.6-1.5-5.2-2.1-18.2-.7-16.6-3-35.6-4.9-40.8l-4-14c-3.5-12.7-8.7-28.6-13.1-39.8-1.6-4-2.9-7.7-2.9-8.1 0-.5 3-1.6 6.8-2.5 10.4-2.3 54.8-8.8 67.9-9.9l6.3-.5.9 3.6 2.1 9.2c.7 3 2.5 9.3 4 14 5.8 17.6 8.8 27.8 10.9 36.5l3.8 15c2.1 8.2 2.9 39.1 1.1 46l-1.3 5-7.5.3c-12 .4-65.1 4.1-65.9 4.6-.4.3-1.3.1-2.1-.4z" />
    </svg>
  )
}
export default Hat

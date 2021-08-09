import React, {useEffect} from 'react'

import img1 from './assets/img/1.png'
import img2 from './assets/img/2.png'

function App () {
  useEffect(() => {
    console.log(process.env.NODE_ENV)
  }, [])
  return (
    <>
      <h2>app</h2>
      <img src={img1} />
      <img src={img2} />
    </>
  )
}

export default App
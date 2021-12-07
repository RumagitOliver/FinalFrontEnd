import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { HashRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'
import About from './About'
import Home from './Home'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("http://api.anidb.net:9001/httpapi?client=jsapi&clientver=9&protover=1&request=randomrecommendation")
      .then(resp => resp.text())
      .then(r => {
        let parser = new DOMParser()

        setData(parser.parseFromString(r, 'text/xml'))
      })
  }, [])

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: window.innerHeight}}>
      <HashRouter>
        <div style={{height: '5em', backgroundColor: 'rgba(240, 240, 240, 1.0)', display: 'flex', flexDirection: 'row', padding: '1em 0em 1em 0em'}}>
          <h2>AnimeDatabase</h2>
          <Link to='/'><Button variant='outline-primary' style={{marginLeft: '1em'}} >Home</Button></Link>
          <Link to='/about'><Button variant='outline-primary' style={{marginLeft: '1em'}} >About</Button></Link>
        </div>
        <Routes>
          <Route exact path='/' element={<Home data={data}/>}/>
          <Route exact path='/about' element={<About/>}/>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App

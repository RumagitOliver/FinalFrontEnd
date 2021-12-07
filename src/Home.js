import React, { useState } from 'react'
import { Accordion, Card, Form, ListGroup, ListGroupItem } from 'react-bootstrap'

function Home({data}) {
    const [query, setQuery] = useState('')
    const [searchField, setSearchField] = useState('')

    const daftar = data ? Array.from(data.children[0].children).map(el => {
        let dict = {}

        Array.from(el.children[0].children).map(e => dict[e.tagName] = e.textContent)
        return dict
    }) : ["no data"]

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
        {
            !data ? 
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                sedang memuat data
            </div>
            :
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '50em'
            }}>
                <Form.Label style={{marginTop: '1em'}}>Search Data</Form.Label>
                <Form.Control style={{width: '100%', margin: '0em 0em 1em 0em'}} type="text" placeholder="masukkan data..." value={searchField} onChange={e => setSearchField(e.target.value)} onKeyDown={e => e.code === 'Enter' && setQuery(searchField)}/>
   
                {
                    daftar.filter(el => query.length > 0 ? el.title.toLowerCase().includes(query.toLowerCase()) : true).map((el, idx) =>
                        <Accordion style={{width: '100%', marginBottom: '1em'}} key={idx}>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>{el.title}</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup>
                                        <ListGroupItem>
                                            <h3>{el.title}</h3>
                                            <h4>{el.type}</h4>
                                        </ListGroupItem> 
                                        <ListGroupItem>
                                            <p>Number of episodes: {el.episodecount}</p>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <p>Start Date: {el.startdate}</p>
                                            <p>End Date: {el.enddate ? el.enddate : 'Hasn\'t ended'}</p>
                                        </ListGroupItem>
                                    </ListGroup> 
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion> 
                    )
                }
            </div>
        }
        </div>
    )
}

export default Home

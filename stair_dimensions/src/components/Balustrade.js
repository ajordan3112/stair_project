import React from 'react'
import { Form, Button, Card } from 'react-bootstrap'

const Balustrade = ({ changeNewelPosts, newelPostsSide }) => {
  return (
    <div>
      <Card className='mb-2' bg='light'>
        {' '}
        <div style={style}>
          <Card.Title>
            {' '}
            <h3>Balustrade</h3>
          </Card.Title>
          <Form.Group style={selectStyle}>
            <Form.Label>Newel Posts Required</Form.Label>
            <Form.Control
              as='select'
              className='select'
              onChange={(e) => changeNewelPosts(e.target.value)}
              value={newelPostsSide}
            >
              <option value='none'>None</option>
              <option value='left'>Left Only</option>
              <option value='right'>Right Only</option>
              <option value='both'>Both</option>
            </Form.Control>
          </Form.Group>
        </div>
      </Card>
    </div>
  )
}

const style = {
  padding: '15px',
  marginBottom: '50px',
}

const selectStyle = {
  margin: '4px',
}

export default Balustrade

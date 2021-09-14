;<div>
  <hr></hr>
  <Form.Group>
    <Form.Label>Width (flight 2)</Form.Label>
    <Form.Control as='select' className='select'>
      {widthOps.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </Form.Control>
    <Form.Group />
    <Card
      style={{
        margin: '15px 0px',
        padding: '5px',
        backgroundColor: '#d6e2ff',
      }}
    >
      <p>
        <strong>Turn 1</strong>
        <span style={{ float: 'right' }}>
          Remove <i class='fas fa-trash'></i>
        </span>
      </p>
      <Form>
        <Form.Group as={Row} controlId='formPlaintextEmail'>
          <Form.Label column sm='6'>
            Turn Type
          </Form.Label>
          <Col sm='6'>
            <Form.Control as='select' className='select'>
              {turnTypes.map((turn) => (
                <option key={turn.id}>{turn.type}</option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='formPlaintextPassword'>
          <Form.Label column sm='6'>
            Treads Before Turn
          </Form.Label>
          <Col sm='6'>
            <Form.Control as='select' className='select'>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </Form.Control>
          </Col>
        </Form.Group>
      </Form>
    </Card>
  </Form.Group>
  <hr></hr>
</div>

//   as='select'
//   className='select'
//   value={oaRise}
//   onChange={(e) => setRise(e.target.value)}
// >
//   {riseOps.map((option) => (
//     <option key={option}>{option}</option>
//   ))}

const turnTypes = [
  {
    id: 1,
    type: '3 Winders',
    numberOfTreads: 3,
  },
  {
    id: 2,
    type: '2 Winders',
    numberOfTreads: 2,
  },
  {
    id: 3,
    type: 'Quarter Landing',
    numberOfTreads: 1,
  },
  {
    id: 4,
    type: 'Half Landing',
    numberOfTreads: 1,
  },
]

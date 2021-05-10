import React, { Component } from 'react';
import './List.css';

// Bootstrap for react
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: '',
      list: [],
    };

    this.inputRef = React.createRef();
  }

  updateInput(value) {
    this.setState({ textInput: value });
  }

  addItem() {
    if (this.state.textInput !== '') {
      const textInput = {
        id: Math.random(),
        value: this.state.textInput,
      };

      const list = [...this.state.list];
      list.push(textInput);

      this.setState({
        list,
        textInput: '',
      });

      this.inputRef.current.focus();
    }
  }

  deleteItem(key) {
    const list = [...this.state.list];
    const updateList = list.filter((item) => item.id !== key);
    this.setState({ list: updateList });
  }

  render() {
    return (
      <Container>
        <h1 className="title">REACT TODO</h1>
        <hr />
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Adicione uma tarefa"
                size="lg"
                value={this.state.textInput}
                onChange={(item) => this.updateInput(item.target.value)}
                aria-label="Adicione uma tarefa"
                aria-describedby="basic-addon2"
                onKeyPress={(event) => event.key === 'Enter' && this.addItem()}
                ref={this.inputRef}
              />
              <InputGroup.Append>
                <Button variant="info" size="lg" onClick={() => this.addItem()}>
                  +
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <ListGroup>
              {this.state.list.map((item) => {
                return (
                  <ListGroup.Item
                    variant="light"
                    action
                    onClick={() => this.deleteItem(item.id)}
                    className="list-group-item-action"
                  >
                    {item.value}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default List;

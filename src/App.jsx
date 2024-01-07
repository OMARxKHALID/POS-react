import React, { useState } from 'react';
import { Container, Navbar, Nav, Row, Col, Button } from 'react-bootstrap';
import InputItem from './components/InputItem';
import ItemsList from './components/ItemsList';

export default function App() {
  const [items, setItems] = useState([]);

  const deleteItem = (index) => {
    const copyItems = [...items];
    copyItems.splice(index, 1);
    setItems(copyItems);
  };

  const addItem = (input) => {
    const existingIndex = items.findIndex((item) => item.product === input.product);

    if (existingIndex !== -1) {
      const copyItems = [...items];
      copyItems[existingIndex].quantity += +input.quantity;
      setItems(copyItems);
    } else {
      setItems([...items, { ...input, quantity: +input.quantity }]);
    }
  };

  const clearAllItems = () => {
    setItems([]);
  };

  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const products = [
    { id: 1, name: 'Elegant Chair', price: 120 },
    { id: 2, name: 'Stylish Lamp', price: 80 },
    { id: 3, name: 'Modern Table', price: 250 },
    { id: 4, name: 'Premium Sofa', price: 350 },
    { id: 5, name: 'Deluxe Bookshelf', price: 180 },
    { id: 6, name: 'Elegant Table', price: 200 },
    { id: 7, name: 'Stylish Lamp', price: 90 },
    { id: 8, name: 'Premium Chair', price: 150 },
    { id: 9, name: 'Modern Bookshelf', price: 300 },
    { id: 10, name: 'Deluxe Sofa', price: 400 }
  ];
  return (
    <Container className='container mt-4' style={{ backgroundColor: '#f8f9fa', justifyContent: 'center' }}>
      <Navbar bg="light" variant="light" className="mb-4">
        <Navbar.Brand href="#" className="font-weight-bold">
          POS System
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#" className="text-dark">
            Home
          </Nav.Link>
          <Nav.Link href="#" className="text-dark">
            Products
          </Nav.Link>
        </Nav>
      </Navbar>

      <Row>
        <Col md={12} className="mx-auto text-center">
          <InputItem addItem={addItem} products={products} clearAllItems={clearAllItems} />
          <ItemsList items={items} deleteItem={deleteItem} />
          <Row className="mt-3">
            <Col md={6} className="mx-auto">
              <p className="h5">Total Price: ${calculateTotalPrice()}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

import React, { useState } from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';

const InputItem = ({ addItem, products, clearAllItems }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedProductData, setSelectedProductData] = useState(null);

  const handleSelect = (event) => {
    const selectedProductName = event.target.value;
    setSelectedProduct(selectedProductName);
    setErrorMessage("");

    const productData = products.find((product) => product.name === selectedProductName);
    setSelectedProductData(productData);
  };

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
    setErrorMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedProduct || selectedProduct === "Select a product") {
      setErrorMessage("Please select a valid product.");
      return;
    }

    const newItem = {
      product: selectedProduct,
      quantity,
      price: selectedProductData ? selectedProductData.price : 0
    };

    addItem(newItem);
    setSelectedProduct("");
    setQuantity(1);
    setErrorMessage("");
    setSelectedProductData(null);
  };

  return (
    <Container className="mt-3">
      <h1>POINT OF SALE</h1>
      <Row>
        <Col md={8} className="mx-auto">
          <div className="input-bar p-4 rounded shadow">
            <Form onSubmit={handleSubmit} className="input-form">
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              <Row className="input-fields">
                <Col>
                  <Form.Group controlId="productSelect">
                    <Form.Control
                      as="select"
                      value={selectedProduct}
                      onChange={handleSelect}
                      style={{ padding: '9px' }}
                    >
                      <option>Select a product</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="quantityInput">
                    <Form.Control
                      type="number"
                      value={quantity}
                      onChange={handleQuantity}
                      min={1}
                      placeholder="Quantity"
                      style={{ backgroundColor: '#f2f2f2', padding: '8px' }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="priceDisplay">
                    <Form.Control
                      type="text"
                      value={selectedProductData ? `$${selectedProductData.price}` : ""}
                      readOnly
                      placeholder="Price"
                      style={{ backgroundColor: '#f2f2f2', padding: '8px' }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button variant="primary" type="submit" style={{ padding: '10px' }}
                  >
                    Add Product
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
      <div className="mt-3">
        <Button variant="danger" onClick={clearAllItems}>
          Clear All Items
        </Button>
      </div>
    </Container>
  );
};

export default InputItem;

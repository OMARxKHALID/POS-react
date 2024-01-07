import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

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
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="input-item-container shadow p-4 rounded">
            <h2 className="text-center mb-4">POINT OF SALE</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="productSelect" className="mb-3">
                <Form.Label className="mb-2">Product</Form.Label>
                <Form.Select
                  value={selectedProduct}
                  onChange={handleSelect}
                >
                  <option>Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="quantityInput" className="mb-3">
                <Form.Label className="mb-2">Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={handleQuantity}
                  min={1}
                  placeholder="Enter quantity"
                />
              </Form.Group>

              <Form.Group controlId="priceDisplay" className="mb-3">
                <Form.Label className="mb-2">Price</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedProductData ? `$${selectedProductData.price}` : ""}
                  readOnly
                  placeholder="Price"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3">
                Add Product
              </Button>

            </Form>
          </div>
        </Col>
      </Row>
      <Row className="mt-3 justify-content-center">
        <Col xs={8} sm={6} md={3}>
          <Button variant="danger" onClick={clearAllItems} className="w-100">
            Clear All Items
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default InputItem;

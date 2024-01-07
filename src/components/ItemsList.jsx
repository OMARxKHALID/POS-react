import React from 'react';
import { Table, Button } from 'react-bootstrap';

export default function ItemsList({ items, deleteItem }) {
  return (
    <div className="table-responsive">
      <Table striped bordered hover responsive className='mt-3'>
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {items.length > 0 ? (
            items.map((item, i) => (
              <tr key={item.id} className={i % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{i + 1}</td>
                <td>{item.product}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>${item.quantity * item.price}</td>
                <td>
                  <Button variant="outline-danger" size="sm" onClick={() => deleteItem(i)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No items available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

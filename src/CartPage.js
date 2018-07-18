import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import './CartPage.css';

const EmptyCart = () => (
  <div className="cartPage-empty">
    Your Cart is Empty.
    <br />
    Why not add some items to it?
  </div>
);

function CartPage({ items, onAddOne, onRemoveOne, onRemoveAll }) {
  return items.length === 0 ? (
    <EmptyCart />
  ) : (
    <ul className="cartPage-items">
      {items.map(item => (
        <li key={item.id} className="cartPage-item">
          <Item item={item}>
            <div className="cartItem-controls">
              <button className="cartItem-removeOne" onClick={() => onRemoveOne(item)}>
                &ndash;
              </button>
              <span className="cartItem-count">{item.count}</span>
              <button className="cartItem-addOne" onClick={() => onAddOne(item)}>
                +
              </button>
            </div>
          </Item>
        </li>
      ))}
      <li>
        <button className="cartPage-removeAll" onClick={() => onRemoveAll(items)}>
          Remove All
        </button>
      </li>
      <li className="cartPage-items cartPage-total">
        Total: ${items.reduce((sum, item) => sum + item.price * item.count, 0)}
      </li>
    </ul>
  );
}

CartPage.propTypes = {
  items: PropTypes.array.isRequired,
  onAddOne: PropTypes.func.isRequired,
  onRemoveOne: PropTypes.func.isRequired
};

export default CartPage;

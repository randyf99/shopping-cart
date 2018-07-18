import React, { Component } from 'react';
import Nav from './Nav';
import ItemPage from './ItemPage';
import CartPage from './CartPage';
import { items } from './static-data';
import './App.css';

class App extends Component {
  state = {
    activeTab: 0,
    cart: []
  };

  handleRemoveAll = () => {
    this.setState({
      cart: []
    });
  };

  handleRemoveOne = item => {
    let index = this.state.cart.indexOf(item.id);

    this.setState({
      cart: [...this.state.cart.slice(0, index), ...this.state.cart.slice(index + 1)]
    });
  };

  handleAddToCart = item => {
    this.setState({
      cart: [...this.state.cart, item.id]
    });
  };

  handleTabChange = index => {
    this.setState({
      activeTab: index
    });
  };

  renderContent() {
    switch (this.state.activeTab) {
      default:
      case 0:
        return <ItemPage items={items} onAddToCart={this.handleAddToCart} />;
      case 1:
        return this.renderCart();
    }
  }

  renderCart() {
    // Count how many of each item is in the cart
    let itemCount = this.state.cart.reduce((itemCount, itemId) => {
      itemCount[itemId] = itemCount[itemId] || 0;
      itemCount[itemId]++;
      return itemCount;
    }, {});

    //Create an array of items
    let cartItems = Object.keys(itemCount).map(itemId => {
      // find the item by its id
      var item = items.find(item => item.id === parseInt(itemId, 10));

      // Create a new "item" and add the count property
      return {
        ...item,
        count: itemCount[itemId]
      };
    });

    return (
      <CartPage
        items={cartItems}
        onAddOne={this.handleAddToCart}
        onRemoveOne={this.handleRemoveOne}
        onRemoveAll={this.handleRemoveAll}
      />
    );
  }

  render() {
    let { activeTab } = this.state;
    return (
      <div className="app">
        <Nav activeTab={activeTab} onTabChange={this.handleTabChange} />
        <main className="app-content">{this.renderContent()}</main>
      </div>
    );
  }
}

export default App;

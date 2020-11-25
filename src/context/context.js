import React, { Component } from 'react';
import { linkItems } from './linkItems';
import { socialIcons } from './socialIcons';
//import { items } from './productData';
import { client } from './contentful';


//Provider
//Consumer
const ProductContext = React.createContext();

 class ProductProvider extends Component {
    state = {

       sidebarOpen: false,
       cartOpen: false,
       cartItems: 0,
       loading: true,
       links: linkItems,
       icons: socialIcons,
       cart: [],
       cartSubTotal: 0,
       cartTax: 0,
       cartTotal: 0,
       storeProducts: [],
       featuredProducts: [],
       singleProduct: {},
       filteredProducts: [],
       search: '',
       price: 0,
       min: 0,
       max: 0,
       company: 'all',
       shipping: false


    }

    componentDidMount() {

      client.getEntries({

        content_type: 'ecommerceStore'
      })
     .then((response) => this.setProducts(response.items))
      .catch(console.error)

      //this.setProducts(items);
    }

    setProducts = products => {

      let storeProducts = products.map(item => {

        const  { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        const product = { id, ...item.fields, image };

        return product;

    });

    //featured products
    let featuredProducts = storeProducts.filter(item => item.featured === true);

    //max price
    let maxPrice = Math.max(...storeProducts.map(item => item.price));

    this.setState({

      storeProducts, 
      filteredProducts: storeProducts,
      featuredProducts,
      cart: this.getStorageCart(),
      singleProduct: this.getStorageProduct(),
      loading: false,
      price: maxPrice,
      max: maxPrice

    }, () => {this.addTotals();})

      
    }
    
    //cart local storage
    getStorageCart = () => {
      let cart;

      if(localStorage.getItem('cart')) {

        cart = JSON.parse(localStorage.getItem('cart'))
      }
      else {

        cart = [];

      }

      return cart;
    }
    //product local storage
    getStorageProduct = () => {
       
     return localStorage.getItem('singleProduct') ? JSON.parse(localStorage.getItem('singleProduct')) : {};
    }

    //get id from local storage
    syncStorage = () => {

      localStorage.setItem('cart', JSON.stringify(this.state.cart));
    }

  
//get totals
    getTotals = () => {
       
      let subTotal = 0;
      let cartItems = 0;

      {this.state.cart.forEach(item => {
        
        subTotal += item.total;
        cartItems += item.count;
      })};

      subTotal = parseFloat(subTotal.toFixed(2));
     
      let tax = subTotal * 0.2;
      tax= parseFloat(tax.toFixed(2));

      let total = subTotal + tax;
      total = parseFloat(total.toFixed(2));

      return {
        subTotal,
        cartItems,
        tax,
        total
      }
    }
//add totals
    addTotals = () => {
      
      const totals = this.getTotals();

      this.setState({
        cartSubTotal: totals.subTotal,
        cartItems: totals.cartItems,
        cartTax: totals.tax,
        cartTotal: totals.total
      });
    }
//add to cart
    addToCart = (id) => {

      let tempCart = [...this.state.cart];
      let tempProducts = [...this.state.storeProducts];
      let tempItem = tempCart.find(item => item.id === id);
      if(!tempItem) {

        let tempItem = tempProducts.find(item => item.id === id);
        let total = tempItem.price;
        let cartItem = {...tempItem, count: 1, total};
        tempCart = [...tempCart,cartItem];

      }
      else {
          
        tempItem.count++;
        tempItem.total = tempItem.count * tempItem.price;
        tempItem.total = parseFloat(tempItem.total.toFixed(2));

      }

     this.setState({

      cart: tempCart

     }, () => {
        
       this.addTotals();
       this.syncStorage();
       this.openCart();
     });

      
      
    }

     //set single product
     getSingleProduct = (id) => {
      
      let product = this.state.storeProducts.find(item => item.id === id);

      localStorage.setItem('singleProduct', JSON.stringify(product));

      this.setState({

        singleProduct: {...product},
        loading: false
      })
    }

     handleSidebar = () => {

      this.setState({sidebarOpen: !this.state.sidebarOpen})
    }

    handleCart = () => {

        this.setState({cartOpen: !this.state.cartOpen})
    }

    openCart = () => {

        this.setState({cartOpen: true})
    }

    closeCart = () => {

        this.setState({cartOpen: false})
    }

    //cart functionality

    //increment
    increment = (id) => {

      let tempCart = [...this.state.cart];
      const cartItem = tempCart.find(item => item.id === id);
      cartItem.count++;
      cartItem.total = cartItem.price * cartItem.count;
      cartItem.total = parseFloat(cartItem.total.toFixed(2));

      this.setState({

        cart: [...tempCart]

      }, () => {
          
        this.addTotals();
        this.syncStorage();

      })
    }

    //decrement
    decrement = (id) => {

      let tempCart = [...this.state.cart];
      const cartItem = tempCart.find(item => item.id === id);

      cartItem.count = cartItem.count - 1;

      if(cartItem.count === 0) {

        this.removeItem(id);
      }
      else {

        cartItem.total = cartItem.price * cartItem.count;
        cartItem.total = parseFloat(cartItem.total.toFixed(2));

        this.setState({

          cart: [...tempCart]
  
        }, () => {
  
          this.addTotals();
          this.syncStorage();
        })
      }

     
    }

    //removeItem
    removeItem = (id) => {

      let tempCart = [...this.state.cart];
      tempCart = tempCart.filter(item => item.id!== id);

      this.setState({

        cart: [...tempCart]

      }, () => {

        this.addTotals();
        this.syncStorage();
      })
    }

    clearCart = () => {

      this.setState({

        cart: []

      }, () => {

        this.addTotals();
        this.syncStorage();
      })
    }

    // filtering the products
    handleChange = (event) => {
      
       const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
       const name = event.target.name;

       this.setState({

        [name]: value

       }, this.sortData)
    }

    sortData = () => {

      const { storeProducts,search,price,company,shipping } = this.state;

      let tempProducts = [...storeProducts];

       //price filter
       let tempPrice = parseInt(price);
       tempProducts = tempProducts.filter(item => item.price <= tempPrice);
   //company filter
      if(company !== 'all') {

        tempProducts = tempProducts.filter(item => item.company === company);
      }

     //shipping filter
     if(shipping) {
      tempProducts = tempProducts.filter(item => item.freeShipping === true);
     }

     //search filter
     if(search.length > 0) {

      tempProducts = tempProducts.filter(item => {

        let tempSearch = search.toLowerCase();
        let tempTitle = item.title.toLowerCase().slice(0, search.length);

        if(tempSearch === tempTitle) {

          return item;
        }
      })
     }
      

      this.setState({

        filteredProducts: tempProducts
      })

    }
  render() {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        handleSidebar: this.handleSidebar,
        handleCart: this.handleCart,
        openCart: this.openCart,
       closeCart: this.closeCart,
       addToCart: this.addToCart,
       getSingleProduct: this.getSingleProduct,
       increment: this.increment,
       decrement: this.decrement,
       removeItem: this.removeItem,
       clearCart: this.clearCart,
       handleChange: this.handleChange
     }}
     >
      {this.props.children}
      </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider,ProductConsumer}

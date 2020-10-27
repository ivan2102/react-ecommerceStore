import React, { Component } from 'react';
import { linkData } from './linkData';
import { socialData } from './socialData';
//import  { items } from './productData';
import { client } from './contentful';

const ProductContext = React.createContext();

//Provider
//Consumer

export default class ProductProvider extends Component {

  state = {

    sidebarOpen: false,
    cartOpen: false,
    cartItems: 0,
    links: linkData,
    socialIcons: socialData,
    cart: [],
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    storeProducts: [],
    filteredProducts: [],
    featuredProducts: [],
    singleProduct: {},
    loading: true,
    search: '',
    price: 0,
    min: 0,
    max: 0,
    company: 'all',
    shipping: false
  }

  componentDidMount() {

    //this.setProducts(items);
  client.getEntries({
    content_type: 'ecommerceStore'
  })
.then((response) => this.setProducts(response.items))
.catch(console.error);
  }

  //set products
  setProducts = (items) => {

    let storeProducts = items.map(item => {

      const {id} = item.sys;
      const image = item.fields.image.fields.file.url;
      const product = {id, ...item.fields, image};
      return product;
    });

    //featured products
    let featuredProducts = storeProducts.filter(item => item.featured === true);

    //max price
    let max = Math.max(...storeProducts.map(item => item.price));

    this.setState({

      storeProducts,
      filteredProducts: storeProducts,
      featuredProducts,
      cart: this.getStorageCart(),
      singleProduct: this.getStorageProduct(),
      loading: false,
      price: max,
      max: max

    }, () => this.addTotals());
  }
//get cart from local storage
  getStorageCart = () => {
   
    let cart;
    if(localStorage.getItem("cart")) {

      cart = JSON.parse(localStorage.getItem("cart"));

    }else {

      cart = [];
    }
    
    return cart;
  }


  //get totals
  getTotals = () => {

    let subTotal = 0;
    let cartItems = 0;

    this.state.cart.forEach(item => {

      subTotal += item.total;
      cartItems += item.count;
    });

    subTotal = parseFloat(subTotal.toFixed(2));

    let tax = subTotal * 0.2;
    tax = parseFloat(tax.toFixed(2));

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
    })

  }

  //sync storage
  syncStorage = () => {

    localStorage.setItem("cart", JSON.stringify(this.state.cart));

  }

  //add to cart
  addToCart = id => {

    let tempCart = [...this.state.cart];
    let tempProducts = [...this.state.storeProducts];
    let tempItem = tempCart.find(item => item.id === id);

    if(!tempItem) {

      tempItem = tempProducts.find(item => item.id === id);
      let total = tempItem.price;
      let cartItem = {...tempItem,count:1,total};
      tempCart = [...tempCart,cartItem];
    }
    else {

      tempItem.count++;
      tempItem.total = tempItem.price * tempItem.count;
      tempItem.total = parseFloat(tempItem.total.toFixed(2));
    }

    this.setState(() => {

     return {cart: tempCart};
    }, () => {

      this.addTotals();
      this.syncStorage();
      this.openCart();
    })
  }

  //open single product page
  setSingleProduct = (id) => {

    let singleProduct = this.state.storeProducts.find(item => item.id === id);

    localStorage.setItem("singleProduct", JSON.stringify(singleProduct));

    this.setState({

      singleProduct: {...singleProduct},
      loading: false
    })
  }

  //get product from local storage
  getStorageProduct = () => {

    return localStorage.getItem("singleProduct") ? JSON.parse(localStorage.getItem("singleProduct")) : {};
  }

  //handle sidebar
  handleSidebar = () => {

    this.setState({

      sidebarOpen: !this.state.sidebarOpen
    })
  }

  //handle cart
  handleCart = () => {

    this.setState({

      cartOpen: !this.state.cartOpen
    })
  }

  //close cart
  closeCart = () => {

    this.setState({

      cartOpen: false
    })
  }

  //open cart
  openCart = () => {

    this.setState({

      cartOpen: true
    })
  }

  //cart functionality
  //increment
  increment = (id) => {

    let tempCart = [...this.state.cart];
   const cartItem = tempCart.find(item => item.id === id);

   cartItem.count++;
   cartItem.total = cartItem.count * cartItem.price;
   cartItem.total = parseFloat(cartItem.total.toFixed(2));

   this.setState(() => {

   return {
     cart: [...tempCart]
    }

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

    }else {

      cartItem.total = cartItem.count * cartItem.price;
      cartItem.total = parseFloat(cartItem.total.toFixed(2));

      this.setState({

        cart: [...tempCart]
  
      }, () => {
  
         this.addTotals();
         this.syncStorage();
      })
    }

  

  }

  //remove
  removeItem = (id) => {

    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id !== id);

    this.setState({

      cart: [...tempCart]

    }, () => {

      this.addTotals();
      this.syncStorage();
    })

  }

  //clear cart
  clearCart = () => {

    this.setState({

      cart: []

    }, () => {

       this.addTotals();
       this.syncStorage();
    })

  }

  handleChange = (event) => {

    const name = event.target.name;
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;

    this.setState({

      [name]: value

    }, this.sortData)
  }

  sortData = () => {

    const {storeProducts,search,company,price,shipping} = this.state;

    let tempPrice = parseInt(price);

    let tempProducts = [...storeProducts];
   //filtered company
    if(company !== "all") {

      tempProducts = tempProducts.filter(item => item.company === company);
    }

    //filtered by price
    tempProducts = tempProducts.filter(item => item.price <= tempPrice);

    //filtered by shipping
    if(shipping) {

      tempProducts = tempProducts.filter(item => item.freeShipping === true);
    }

    //filtered by search
    if(search.length > 0) {

      tempProducts = tempProducts.filter(item => {

        let tempSearch = search.toLowerCase();
        let tempTitle = item.title.toLowerCase().slice(0,search.length);

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
      return(
    <ProductContext.Provider 
    value={{
       
      ...this.state,
      handleSidebar: this.handleSidebar,
      handleCart: this.handleCart,
      closeCart: this.closeCart,
      openCart: this.openCart,
      addToCart: this.addToCart,
      setSingleProduct: this.setSingleProduct,
      increment: this.increment,
      decrement: this.decrement,
      removeItem: this.removeItem,
      clearCart: this.clearCart,
      handleChange: this.handleChange
    }}>
    {this.props.children}
    </ProductContext.Provider>
      );
  }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer}

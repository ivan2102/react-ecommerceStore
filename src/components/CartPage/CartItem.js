import React from 'react';
import { ProductConsumer } from '../../context';
import { FaChevronCircleUp,FaChevronCircleDown,FaTrash } from 'react-icons/fa';

export default function CartItem({cartItem,increment,decrement,removeItem}) {

  const {id,title,price,count,total,image} = cartItem;
  return (
    <div className="row text-center text-capitalize align-items-center mt-5 mt-lg-0">
      <div className="col-lg-2 pb-2">
      <img src={image} width="60" alt="product"/>
      </div>

      <div className="col-lg-2">
      <span className="d-lg-none">product : </span>{title}
      </div>

      <div className="col-lg-2">
      <span className="d-lg-none">price : </span>${price}
      </div>

      <div className="col-lg-2 my-2 my-lg-0">
      <div className="d-flex justify-content-center">
      <div>
      <FaChevronCircleDown onClick={() => decrement(id)} className="text-primary cart-icon"/>
      <span className="text-muted mx-2">{count}</span>
      <FaChevronCircleUp onClick={() => increment(id)} className="text-primary cart-icon"/>
      </div>
      </div>
      </div>

      <div className="col-lg-2">
      <FaTrash className="cart-icon text-danger" onClick={() => removeItem(id)}/>
      </div>

      <div className="col-lg-2">
      <strong className="text-muted">total : ${total}</strong>
      </div>
    </div>
  )
}

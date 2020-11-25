import React from 'react'

export default function CartColumns() {
  return (
    <div className="container-fluid text-center d-none d-lg-block my-5">
    <div className="row">
    <div className="col-lg-2">
    <h6 className="text-uppercase">product</h6>
    </div>

    <div className="col-lg-2">
    <h6 className="text-uppercase">product name</h6>
    </div>

    <div className="col-lg-2">
    <h6 className="text-uppercase">price</h6>
    </div>

    <div className="col-lg-2">
    <h6 className="text-uppercase">quantity</h6>
    </div>

    <div className="col-lg-2">
    <h6 className="text-uppercase">remove</h6>
    </div>

    <div className="col-lg-2">
    <h6 className="text-uppercase">total</h6>
    </div>
    </div>
    </div>
  )
}

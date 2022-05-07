import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const UpdateDetails = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { inventoryId } = useParams()
    const [inventory, setInventory] = useState({})
    const [sold, setSold] = useState("")

    useEffect(() => {
        const url = `http://localhost:5000/inventory/${inventoryId}`
        fetch(url)
            .then(res => res.json())
            .then(data => setInventory(data))
    }, [inventory])

    const updateBtn = () => {
        const decreaseQuantity = parseInt(inventory.quantity) - 1;
        const updateQuantity = { quantity: decreaseQuantity.toString() }
        console.log(updateQuantity)

        if (updateQuantity.quantity >= 0) {
            const url = `http://localhost:5000/inventory/${inventoryId}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updateQuantity)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
        }

    }

    const handleStock = e => {
        e.preventDefault()
        const stock = parseInt(e.target.stock.value)
        console.log(stock)
        const increaseQuantity = parseInt(inventory.quantity) + stock;
        const updateQuantity = { quantity: increaseQuantity.toString() }
        const url = `http://localhost:5000/inventory/${inventoryId}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateQuantity)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    return (
        <div className="container mt-5">
            <div className='shadow-sm p-2 mb-5 bg-bodyrounded d-flex justify-content-center '>
                <div style={{ width: '50%' }} className='py-3 px-5'>
                    <img src=
                        {inventory.img} alt=""
                        style={{ width: '100%' }} />
                </div>
                <div className='d-flex mt-2 '>
                    <div>
                        <h3 className='pb-2'>{inventory.name}</h3>
                        <h5 className='pb-2'>Quantity:{inventory.quantity}</h5>
                        <h5 className='pb-2'>Supplier: {inventory.supplier}</h5>
                        <h5 className='pb-2'>Price: {inventory.price}</h5>
                        <button className='btn btn-success me-2' onClick={updateBtn}>Delivered</button>
                        <Button variant="danger" onClick={handleShow}>
                            Restock
                        </Button>
                        {sold && <p className='text-danger'>{sold}</p>}


                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Restock</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className='w-50 mx-auto'>
                                    <Form onSubmit={handleStock}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control type="number" placeholder="Add the quantity"
                                                name='stock'
                                            />
                                            <div className='mt-2'>
                                                <Button className='mx-auto d-block btn btn-danger' variant="primary" type="submit">
                                                    Restock
                                                </Button>
                                            </div>

                                        </Form.Group>
                                    </Form>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>

                    </div>

                </div>

            </div>

            <div className='d-flex justify-content-center'>
                <Link to='/manage'>
                    <button className='btn btn-dark'>Manage Inventories</button>
                </Link>
            </div>
        </div>

    );
};

export default UpdateDetails;
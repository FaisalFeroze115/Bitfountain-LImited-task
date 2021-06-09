import React, {useEffect, useState} from 'react'
import './add_model.css'
import { Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const AddModel = () => {

    const [brandId, setBrandId] = useState('')
    const [name, setName] = useState('')
    const [typeId, setTypeId] = useState(0)
    const [comment, setComment] = useState('')
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    const access_token = userInfo.access_token;
    const [deviceTypes, setDeviceTypes] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [newModel, setNewModel] = useState([])

    const addModel = async (e) =>{
        e.preventDefault();
        const modelDataValue = {
            "BrandId": brandId,
            "Name": name,
            "TypeId": parseInt(typeId),
            "Comment": comment
        }

        const res = await fetch('http://163.47.115.230:30000/api/devicemodel',{
                method: "POST",
                body: JSON.stringify(modelDataValue),
                headers: {
                    'Content-Type':'Application/json',
                    'Accept': 'Application/json',
                    'authorization': access_token
                }
            });
        const result = await res.json();
        setNewModel(result);
        setShow(true);
        setBrandId('');
        setName('');
        setTypeId('');
        setComment('');

        // console.log(result)
    }

    useEffect( async ()=>{
        const res = await fetch('http://163.47.115.230:30000/api/devicetype',{
                method: "Get",
                headers: {
                    'Content-Type':'Application/json',
                    'Accept': 'Application/json',
                    'authorization': access_token
                }
            });
        const results = await res.json();
        //console.log(results[0]);
        setDeviceTypes(results[0]);
    },[])

    return (
        <div className="add_model">
            <div className="model_form_container">
            <Form onSubmit={addModel}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Brand Id</Form.Label>
                    <Form.Control type="text" placeholder="" value={brandId} onChange={e=>setBrandId(e.target.value)} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="" value={name} onChange={e=>setName(e.target.value)} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Type ID</Form.Label>
                    <Form.Control required  as="select" value={typeId} onChange={e=>setTypeId(e.target.value)}>
                        <option value=''>Select an option</option>
                        {
                            deviceTypes.map(type_id=>
                                <option key={type_id.Id} value={type_id.Id}>{type_id.Description}</option>
                            )
                        }
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control type="text" placeholder="" value={comment} onChange={e=>setComment(e.target.value)}/>
                </Form.Group>
               

                <Button type="submit" variant="primary">Submit</Button>
            </Form>

            </div>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>New Device</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                   <p>{newModel.BrandId} New Device Model is added...</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Add Another
                    </Button>
                    <Link to="/modeltype">
                        <Button variant="info">
                            View avaiable medical devices
                        </Button>
                    </Link>

                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default AddModel

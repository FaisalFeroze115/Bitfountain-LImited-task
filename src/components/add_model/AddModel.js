import React, {useEffect, useState} from 'react'
import './add_model.css'
import { Button, Form } from 'react-bootstrap';

const AddModel = () => {

    const [brandId, setBrandId] = useState('')
    const [name, setName] = useState('')
    const [typeId, setTypeId] = useState(0)
    const [comment, setComment] = useState('')
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    const access_token = userInfo.access_token;
    const [deviceTypes, setDeviceTypes] = useState([])

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

        console.log(result)
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
                    <Form.Control type="text" placeholder="" onChange={e=>setBrandId(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="" onChange={e=>setName(e.target.value)}/>
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Type ID</Form.Label>
                    <Form.Control type="number" placeholder="" onChange={e=>setTypeId(e.target.value)}/>
                </Form.Group> */}

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control as="select" onChange={e=>setTypeId(e.target.value)}>
                        <option>Type ID</option>
                        {
                            deviceTypes.map(type_id=>
                                <option key={type_id.Id} value={type_id.Id}>{type_id.Description}</option>
                            )
                        }
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control type="text" placeholder="" onChange={e=>setComment(e.target.value)}/>
                </Form.Group>
               

                <Button type="submit" variant="primary">Submit</Button>
            </Form>

            </div>
        </div>
    )
}

export default AddModel

import React, { useState, useEffect, useRef } from 'react'
import './model_type.css';
import Header from '../header/Header'
import { Button, Modal } from 'react-bootstrap';

const ModelTypes = () => {

    const [mediaTypes, setMediaTypes] = useState([]);
    const [modelData, setModelData] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    const access_token = userInfo.access_token;
    const brandIdRef = useRef([]);
    const brandNameRef = useRef([]);
    brandIdRef.current = [];
    brandNameRef.current = [];

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    useEffect( async ()=>{
        
        const res = await fetch('http://163.47.115.230:30000/api/overview/modeltype',{
                method: "Get",
                headers: {
                    'Content-Type':'Application/json',
                    'Accept': 'Application/json',
                    'authorization': access_token
                }
            });
        const results = await res.json();
        setMediaTypes(results);
        // console.log(mediaTypes);
        // console.log(results);
    },[])

    const addToBrandId = (el) =>{
        if(el && !brandIdRef.current.includes(el)){
            brandIdRef.current.push(el)
        }
    }

    const addToBrandName = (el) =>{
        if(el && !brandNameRef.current.includes(el)){
            brandNameRef.current.push(el)
        }
    }

    const getMediaData = async (index) => {
        let brand = brandIdRef.current[index].innerHTML;
        let model = brandNameRef.current[index].innerHTML;
        // console.log(brandIdRef.current[index].innerHTML);
        // console.log(brandNameRef.current[index].innerHTML);
        const res = await fetch(`http://163.47.115.230:30000/api/overview/modeldata/${brand}/${model}`,{
                method: "Get",
                headers: {
                    'Content-Type':'Application/json',
                    'Accept': 'Application/json',
                    'authorization': access_token
                }
            });
        const results = await res.json();
        //console.log(results);
        setModelData(results);
        setShow(true);
    }


    return (
        <div className="model_types">
            <Header/>
            <div className="model_types__container">
                {
                    mediaTypes.map((media, i) =>
                        <div className="model_types__card" key={media.Id} onClick={()=>{getMediaData(i)}}>
                            <p ref={addToBrandId}>{media.BrandId}</p>
                            <p ref={addToBrandName}>{media.Name}</p>
                            <p>{media.Description}</p>
                        </div>
                    )
                }
            </div>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>title</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {
                        modelData.length > 0 ?
                            modelData.map(data=>
                                <div key={data.Id}>
                                    {

                                        <p>{data.Name} {data.DisplayName} {data.Description}</p>

                                    }
                                </div>
                            )
                        : 
                           <div><p>No data found</p></div> 
                    }

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}

export default ModelTypes

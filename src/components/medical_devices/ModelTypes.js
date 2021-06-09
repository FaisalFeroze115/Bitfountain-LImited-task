import React, { useState, useEffect, useRef } from 'react'
import './model_type.css';
import { Button, Modal } from 'react-bootstrap';
import loader from '../../assets/loader.gif'

const ModelTypes = () => {

    const [mediaTypes, setMediaTypes] = useState([]);
    const [modelData, setModelData] = useState([]);
    const [mediaTitle, setMediaTitle] = useState('');
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    const access_token = userInfo.access_token;
    const brandIdRef = useRef([]);
    const brandNameRef = useRef([]);
    brandIdRef.current = [];
    brandNameRef.current = [];

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [visible, setVisible] = useState(false)



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
        //  console.log(brandIdRef.current[index].innerHTML);
        //  console.log(brandNameRef.current[index].innerHTML);
        const res = await fetch(`http://163.47.115.230:30000/api/overview/modeldata/${brand}/${model}`,{
                method: "Get",
                headers: {
                    'Content-Type':'Application/json',
                    'Accept': 'Application/json',
                    'authorization': access_token
                }
            });
        const results = await res.json();
        setMediaTitle(brand);
        setModelData(results);
        setShow(true);
    }



    return (
        <div className="model_types">
            { mediaTypes.length > 0 ? 
            <div className="model_types__container">
                {
                    mediaTypes.map((media, i) =>
                        <div className="model_types__card" key={media.Id} onClick={()=>{getMediaData(i)}}>
                            <p>
                                <span style={span_style}>BrandId: </span> 
                                <span ref={addToBrandId}>{media.BrandId}</span> 
                            </p>

                            <p>
                                <span style={span_style}>Name: </span> 
                                <span ref={addToBrandName}>{media.Name}</span> 
                            </p>
                        {
                            media.Description &&
                            <p>
                                <span style={span_style}>Description:</span> {media.Description}
                            </p>

                        }

                        {
                            media.Comment &&
                            <p>
                                <span style={span_style}>Comment:</span> {media.Comment}
                            </p>
                        }
                            
                           

                        </div>
                    )
                }
            </div> 
            :
            <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 80px)'}}>
                <img src={loader} />
            </div>
            
            }


            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{mediaTitle}</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {
                        modelData.length > 0 ?
                            modelData.map(data=>
                                <div key={data.Id} className="model_data_container">
                                    {
                                        <div>
                                            <p>Name: {data.Name}</p>
                                            <p>Display Name: {data.DisplayName}</p>
                                            <p>Description: {data.Description}</p>
                                        </div>

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

const span_style = {
    fontWeight: 600,
}

export default ModelTypes

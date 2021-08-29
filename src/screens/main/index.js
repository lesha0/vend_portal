
import { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button, ListGroup, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions, toastActions, vendActions } from "../../store/actions";
import './index.scss';
import { toast } from 'react-toastify';
function Main()
{
    const showLoading = useSelector(state => state.loadingReducer.loading_show);
    const showToast = useSelector(state => state.toastReducer.toast_show);
    const toastMsg = useSelector(state => state.toastReducer.toast_msg);
    const authToken = useSelector(state => state.authReducer.token);

    const dispatch = useDispatch();
    const [isFirst, setIsFirst] = useState(true);
    const [name, setName] = useState('');
    const [qr, setQR] = useState('');
    const [machine, setMachine] = useState('');

    if(!authToken && isFirst)
    {
        dispatch(authActions.getTokenFromServer());
        setIsFirst(false);
    }

    
    useEffect(()=>{
        if(showToast)
        {
            toast.error(toastMsg);
            dispatch(toastActions.hideToast());
        }
    }, [showToast,dispatch, toastMsg, authToken]);

    const checkBoxItems = [
        {title: "Availability to vend"}, 
        {title: "Queue Status"}, 
        {title: "Stock Levels"}, 
        {title: "Vend Machine Health"}, 
        {title: "Comms Status"}, 
        {title: "Pay Status"}
    ];

    const listBoxItems = [
        
    ]

    const onTextChange = (e) => {
        const {name, value} = e.target;
        if(name === 'name')
        {
            setName(value);
        }
        else if(name === 'qr')
        {
            setQR(value);
        }
        else if(name === 'machine')
        {
            setMachine(value);
        }
    }

    const onResetForm = () => {
        setName('');
        setQR('');
        setMachine('');
    }

    const onSubmitForm = () => {
        if(name.length === 0)
        {
            dispatch(toastActions.showToast('Name is Required'));
            return;
        }
        if(qr.length === 0)
        {
            dispatch(toastActions.showToast('QR Code ID is Required'));
            return;
        }
        if(machine.length === 0)
        {
            dispatch(toastActions.showToast('Machine is Required'));
            return;
        }

        console.log(authToken);
        if(!authToken)
        {
            dispatch(toastActions.showToast('Token is not generated for you. Press F5 to generate token.'));
            return;
        }
        dispatch(vendActions.doRemoteVend(name, qr, machine, authToken));
    }

    return (
        <Container>
            <Row className="justify-content-md-center margin-top-60 jumbotron">
                <Col sm="12" lg="6">
                    <Col className="center-items-box" sm={12} lg={12}>
                        <img className="logo" src="https://via.placeholder.com/306x200?text=Logo" alt="logo"/>
                    </Col>
                    <Alert variant="danger"> It is only for internal test purpose!</Alert>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                        Customer Name
                        </Form.Label>
                        <Col sm={9}>
                        <Form.Control type="text" name="name" value={name} onChange={(e) => onTextChange(e)}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                        Location
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Select aria-label="Default select example" disabled>
                                <option>Location</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                        QR Code ID
                        </Form.Label>
                        <Col sm={9}>
                        <Form.Control type="text" value={qr} name="qr" onChange={e => onTextChange(e)}/>
                        <Form.Text className="text-muted">
                        QR Code is Vend ID
                        </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                        Machine ID
                        </Form.Label>
                        <Col sm={9}>
                        <Form.Control type="text"  value={machine} name="machine" onChange={e => onTextChange(e)}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                        Vend Method
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Select aria-label="Default select example"  disabled>
                                <option>Next Aisle</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>
                        Status
                        </Form.Label>
                        
                        <Row className="align-items-center">
                            {
                            checkBoxItems.map((item, index) => 
                                <Col xs="auto" key = {index} className="my-1">
                                <Form.Check
                                    type="checkbox"
                                    label={item.title}
                                    disabled
                                />
                                </Col>
                            )}
                        </Row>
                        
                    </Form.Group>
                    <ListGroup className="mb-3"  disabled>
                        {listBoxItems.map((item, index) => 
                            <ListGroup.Item key={index}>Dapibus ac facilisis in</ListGroup.Item>
                        )}
                    </ListGroup>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={12} lg={4}>
                            <Button onClick={onResetForm} className="full-button" variant="warning">
                                Reset
                            </Button>
                        </Col>
                        <Col sm={12} lg={4}>
                            <Button onClick={onResetForm} className="full-button" variant="danger">
                                Clear
                            </Button>
                        </Col>
                        <Col sm={12} lg={4}>
                            <Button onClick={onSubmitForm} className="full-button" variant="primary">
                                Submit
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Main;
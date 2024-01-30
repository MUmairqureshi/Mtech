import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faQuestionCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import CustomButton from '../CustomButton';

import { check, question } from '../../Assets/images';

import './style.css'

const CustomModal = (props) => {
    return (
        <>
            <Modal show={props?.show} centered onHide={props?.close}>
                <button className='closeButton' onClick={props?.close}><FontAwesomeIcon icon={faTimes} /></button>
                <Modal.Body className={props.children ? '' : 'text-center'}>
                    {props?.children ? (
                        ''
                    ) : (
 
                        props?.status === true ? (
                            <FontAwesomeIcon icon={faCheckCircle} className='checkMark' />
                        ) : (
                            <FontAwesomeIcon icon={faTimes} className='corsserror' />
                        )
                    )}


                    <div className="modalContent">
                        <h2 className="modalHeading">{props?.heading}</h2>
                        {props?.children ? (
                            <p>
                                <form onSubmit={props?.handleSubmit} className='formDataStyle'>
                                    {props?.children}
                                </form>
                            </p>
                        ) : (
                            props?.success ? <CustomButton onClick={props?.close} variant='primaryButton' text={props?.btnTxt ? props?.btnTxt : 'Ok'} />
                                :
                                <>
                                    <CustomButton onClick={props?.action} variant='primaryButton' text="Yes" className="me-2" />
                                    <CustomButton onClick={props?.close} variant='secondaryButton' text="No" />
                                </>
                        )
                        }



                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CustomModal
import React, { useRef, useState, useEffect } from 'react';
import Modal from 'react-modal';
import { URLs } from './options';
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

const UrlSpoof = () => {

    const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
    onClickReset();
  }

  function closeModal() {
    setIsOpen(false);
  }

  const Ref = useRef(null);
 
    // The state for our timer
    const [timer, setTimer] = useState('00:00:00');
 
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
 
    const startTimer = (e) => {
        let { total, hours, minutes, seconds }
                    = getTimeRemaining(e);
        if (total >= 0) {
 
            // update the timer
            // check if less than 10 then we need to
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }
 
    const clearTimer = (e) => {
 
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next   
        setTimer('00:00:03');
 
        // If you try to remove this line the
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
 
    const getDeadTime = () => {
        let deadline = new Date();
 
        // This is where you need to adjust if
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 3);
        return deadline;
    }
 
    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible
 
    // We put empty array to act as componentDid
    // mount only
    useEffect(() => {
        clearTimer(getDeadTime());
    }, [])
    useEffect(() => {
        if(timer==='00:00:00') {
            closeModal(true);
        }
    }, [timer]);
 
    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button
    const onClickReset = () => {
        clearTimer(getDeadTime());
    }

    return (
        <div>
            <button onClick={openModal}>Spoof Modal</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <button onClick={closeModal} style={{all: 'unset', borderRadius: '5px', border: '1px solid black', padding: '0.2vmax 0.5vmax', float: 'right', cursor: 'pointer'}}>X</button>
                <div>Select the legitimate URL:</div>
                <div>Time Left: {timer}</div>
                <br/>
                {
                    URLs.map(({option1, option2, option3, val}, index) => {
                        return (
                        <div style={{display: 'flex', gap: '10px', paddingBottom: '10px'}}>
                            <button onClick={() => {closeModal(); alert("That's legitimate")}} style={{all: 'unset', borderRadius: '5px', border: '1px solid black', padding: '0.2vmax 0.5vmax', float: 'right', cursor: 'pointer'}}>https://www.amazon.in/</button>
                            <button onClick={() => {closeModal(); alert("No No NO NO")}} style={{all: 'unset', borderRadius: '5px', border: '1px solid black', padding: '0.2vmax 0.5vmax', float: 'right', cursor: 'pointer'}}>https://www.amazonx.in/</button>
                            <button onClick={() => {closeModal(); alert("No No NO NO")}} style={{all: 'unset', borderRadius: '5px', border: '1px solid black', padding: '0.2vmax 0.5vmax', float: 'right', cursor: 'pointer'}}>https://www.amazonn.in/</button>
                        </div>)
                    })
                }
            </Modal>
        </div>
    );
}

export default UrlSpoof;
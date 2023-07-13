import React, { useRef, useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Options } from './options';
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

const Malicious = ()=> {
    const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
    onClickReset();
    setCheckedState(
        new Array(Options.length).fill(false)
    );
  }

  function closeModal() {
    setIsOpen(false);
  }
  const ans = [true, true, true, true];
  function checkAns() {
    setIsOpen(false);
    if(ans.join()==checkedState.join()) {
        alert('Task cleared!!!!')
    }
    else {
        alert('Task failed :(')
    }
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
        setTimer('00:00:20');
 
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
        deadline.setSeconds(deadline.getSeconds() + 20);
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

    const [checkedState, setCheckedState] = useState(
        new Array(Options.length).fill(false)
    );
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
        console.log(updatedCheckedState);
        setCheckedState(updatedCheckedState);
    };
    

  return (
    <div>
      <button onClick={openModal}>Malicious Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button onClick={closeModal} style={{all: 'unset', borderRadius: '5px', border: '1px solid black', padding: '0.2vmax 0.5vmax', float: 'right', cursor: 'pointer'}}>X</button>
        <div>Select malicious queries within given time!!</div>
        <div>Time Left: {timer}</div>
        <ul style={{padding: 0}}>
        {Options.map(({name}, index) => {
          return (
            <li key={index} style={{listStyleType: 'none'}}>
              <div>
                <div>
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <button onClick={checkAns}>Check!</button>
      </Modal>

    </div>
  );
}

export default Malicious;
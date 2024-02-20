import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { Message } from 'rsuite';

export default function Popup() {
  const popupData = useSelector((state) => state.Elite.popupData)
  return (
    <div className="popup-container">
    <Message showIcon type={popupData.type}>
      {popupData.message}
    </Message>
    </div>
  );
}

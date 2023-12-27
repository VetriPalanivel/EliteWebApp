import React,{useState} from 'react';
import { Message } from 'rsuite';

export default function Popup() {
  return (
    <div>
    <Message showIcon type="info" header="Informational">
      Additional description and informations about copywriting.
    </Message>
    </div>
  );
}

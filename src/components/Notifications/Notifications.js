import React from 'react';
import {
  ToastNotification
} from '@carbon/react';
import { Overlay } from './Overlay';

const Notifications = props => {

  // Carbon ToastNotification's available kinds: 
  // 'error'
  // 'info'
  // 'info-square'
  // 'success'
  // 'warning'
  // 'warning-alt'
  return (
    <Overlay id={props.id}>
      {
        props.notifications.map((item, index) => {
          let n = { kind: item.kind };
          if (n.kind === 'error') {
            n.title = item.subject.phrase;
            n.subtitle = item.subject.message;
            n.timestamp = new Date(item.subject.timestamp).toLocaleString('en-US');
            n.timeout = 4000;
          } else {
            n.title = item.subject;
            n.timeout = 2000;
          }
          return (
            <ToastNotification
              key={`notification-${index}`}
              kind={n.kind}
              lowContrast={false}
              role="alert"
              title={n.title}
              subtitle={n.subtitle}
              caption={n.timestamp}
              timeout={n.timeout}
            />
          );
        })
      }
    </Overlay>
  );

};

export default Notifications;


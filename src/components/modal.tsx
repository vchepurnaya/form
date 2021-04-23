import React from 'react';
import './styles.css';
import { useObserver } from 'mobx-react';
import { StoreContext } from '../store';

type ModalProps = {
  closeModal: (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => void;
};

const Modal: React.FC<ModalProps> = ({ closeModal }) => {
  const store = React.useContext(StoreContext);
  return useObserver(() => (
    <div className="modal" onClick={e => closeModal(e)}>
      <div className="modal__content" onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <h2>Здравствуйте,</h2>
        <p>{`${store.firstName} ${store.lastName}!`}</p>
        <a href="#" className="modal__close" onClick={e => closeModal(e)}>
          &times;
        </a>
      </div>
    </div>
  ));
};

export default Modal;

import React, { useEffect, useState } from 'react';
import Modal from './modal';
import './styles.css';
import { StoreContext } from '../store';

const Form: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [isFirstNameDirty, setFirstNameDirty] = useState<boolean>(false);
  const [isLastNameDirty, setLastNameDirty] = useState<boolean>(false);
  const [firstNameError, setFirstNameError] = useState<string>('Поле не должно быть пустым!');
  const [lastNameError, setLastNameError] = useState<string>('Поле не должно быть пустым!');
  const [isFormValid, setFormValid] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);
  const store = React.useContext(StoreContext);

  useEffect(() => {
    if (firstNameError || lastNameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [firstNameError, lastNameError]);

  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    !e.target.value ? setFirstNameError('Поле не должно быть пустым!') : setFirstNameError('');
  };

  const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    !e.target.value ? setLastNameError('Поле не должно быть пустым!') : setLastNameError('');
  };

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'firstName':
        setFirstNameDirty(true);
        break;
      case 'lastName':
        setLastNameDirty(true);
        break;
    }
  };

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(true);
    store.addFirstName(firstName);
    store.addLastName(lastName);
  };

  const reset = () => {
    setLastName('');
    setFirstName('');
  };

  const closeModal = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <div className="container">
      {isOpen && <Modal closeModal={closeModal} />}
      <h1>Форма</h1>
      <form className="form">
        <input
          className="form__field"
          name="firstName"
          type="text"
          placeholder="Имя"
          value={firstName}
          onChange={handleFirstName}
          onBlur={blurHandler}
        />
        {isFirstNameDirty && firstNameError && <span className="form__field-error">{firstNameError}</span>}
        <input
          className="form__field"
          name="lastName"
          type="text"
          placeholder="Фамилия"
          value={lastName}
          onChange={handleLastName}
          onBlur={blurHandler}
        />
        {isLastNameDirty && lastNameError && <span className="form__field-error">{lastNameError}</span>}
        <div className="form__btn">
          <button className="form__btn-submit" disabled={!isFormValid} onClick={openModal}>
            Готово
          </button>
          <button className="form__btn-reset" onClick={reset}>
            Сброс
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

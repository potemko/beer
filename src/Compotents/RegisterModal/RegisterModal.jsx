import React, { useRef } from "react";
import css from "./RegisterModal.module.css";

const RegisterModal = ({closeModal}) => {

  const modalRef = useRef(null)

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };


  return (
    <div className={css.wrappen} onClick={handleOutsideClick}>
      
        <form className={css.content} ref={modalRef}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label" className={css.text}>Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text" className={css.text}>We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label" className={css.text}>Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1" className={css.text}>Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary" className={css.button}>Submit</button>
</form>
    </div>
  );
};

export default RegisterModal;

import React, { useRef, useState } from "react"; // Not Required
import "./ExpenseForm.css";
import ErrorModal from "../UI/ErrorModal";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  // Other Approch
  // const [userInput, setUserInput] = useState({
  //   enteredTitle: "",
  //   enteredAmount: "",
  //   enteredDate: "",
  // });

  // const titleChangeHandler = (event) => {
  //   setEnteredTitle(event.target.value);

  // OR TRY THIS NOT PROPER WAY TO USE THIS
  // setUserInput({
  //   ...userInput, // overwrite thay che value
  //   enteredTitle: event.target.value,
  // });

  // This is the best way if we update counter or in react scheduling this will return new state in efficient way
  // setUserInput((prevState) => {
  //   return { ...prevState, enteredTitle: event.target.value };
  // });
  // };

  // const amountChangeHandler = (event) => {
  //   setEnteredAmount(event.target.value);
  // setUserInput({
  //   ...userInput,
  //   enteredAmount: event.target.value,
  // });
  // };

  // const dateChangeHandler = (event) => {
  //   setEnteredDate(event.target.value);
  // setUserInput({
  //   ...userInput,
  //   enteredDate: event.target.value,
  // });
  // };
  const titleInputRef = useRef();
  const amountInputRef = useRef();
  const dateInputRef = useRef();

  const [error, setError] = useState();

  const submitHandler = (event) => {
    event.preventDefault();

    const titleRef = titleInputRef.current.value;
    const amountRef = amountInputRef.current.value;
    const dateRef = dateInputRef.current.value;

    if (titleRef.trim().length === 0 || amountRef.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message:
          "Please enter a valid Input !! Amount and Title Can not be Empty ",
      });
      return;
    }
    if (+amountRef < 1) {
      setError({
        title: "Invalid Amount",
        message: "Amount must be Grater than 0  (non-empty values).",
      });
      return;
    }
    console.log(titleInputRef);

    const date = new Date();
    const date2 = new Date(dateRef);
    if (date2 > date) {
      setError({
        title: "Invalid Date",
        message: "Date must be Previous or Today Date   (non-empty values).",
      });
      return;
    }

    const expenseDate = {
      title: titleRef,
      amount: +amountRef,
      date: new Date(dateRef),
    };
    setEnteredTitle(titleRef);
    setEnteredAmount(amountRef);
    setEnteredDate(dateRef);

    props.onSaveExpenseData(expenseDate);
    titleInputRef.current.value = "";
    amountInputRef.current.value = "";
    // setEnteredTitle("");
    // setEnteredDate("");
    // setEnteredAmount("");
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <form onSubmit={submitHandler}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              // value={enteredTitle}
              // onChange={titleChangeHandler}
              ref={titleInputRef}
            />
          </div>
          <div className="new-expense__control">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="text"
              min="0.01"
              step="0.01"
              // value={enteredAmount}
              // onChange={amountChangeHandler}
              ref={amountInputRef}
            />
          </div>
          <div className="new-expense__control">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              min="2022-01-01"
              max="2023-12-31"
              // value={enteredDate}
              // onChange={dateChangeHandler}
              ref={dateInputRef}
            />
          </div>
        </div>
        <div className="new-expense__actions">
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button type="submit">Add Expense</button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default ExpenseForm;

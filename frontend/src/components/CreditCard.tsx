import { Button, notification } from "antd";
import "./CreditCard.css";
import { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

interface cardProps {
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreditCard(props: cardProps) {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");

  const isCreditCardDataValid = () => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear() % 100;
    const [expiryMonth, expiryYear] = expiry.split("/").map((value) => parseInt(value));
  
    if (number.length !== 16) {
      notification.error({
        message: "Error",
        description: "Not valid Credit Card"
      })
      return;
    }
  
    if (cvc.length !== 3) {
      notification.error({
        message: "Error",
        description: "Not valid Credit Card"
      })
      return;
    }
  
    if (expiryMonth < 1 || expiryMonth > 12 || expiryYear < currentYear) {
      notification.error({
        message: "Error",
        description: "Not valid Credit Card"
      })
      return;
    }
  
    if (expiryYear === currentYear && expiryMonth < currentMonth) {
      notification.error({
        message: "Error",
        description: "Not valid Credit Card"
      })
      return;
    }
  
    props.setCheck(true);

  };

  return (
    <div className="App">
      <Cards
        number={number}
        name={name}
        expiry={expiry}
        cvc={cvc}
      />
      <form>
        <input
          className="cardInput"
          type="tel"
          name="number"
          placeholder="Card Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          className="cardInput"
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          className="cardInput"
          type="text"
          name="expiry"
          placeholder="MM/YY"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          className="cardInput"
          type="tel"
          name="cvc"
          placeholder="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
      </form>
      <Button type="primary" onClick={isCreditCardDataValid}>Validation Credit Card</Button>
    </div>
  );
}

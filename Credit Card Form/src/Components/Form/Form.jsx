import React from "react";
import InputBase from "../InputBase/InputBase";
import "./Form.css";
import { OTHERCARDS } from "../constants";
import { cardNumberValidation } from "../validations";

const INIT_CARD = {
  card: "",
  cardHolder: "",
  expiry: "",
  securityCode: "",
};

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      cardData: INIT_CARD,
      maxLength: OTHERCARDS.length,
      error: {},
      cardType: null,
    };
  }

  findDebitCardType = (cardNumber) => {
    const regexPattern = {
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
      VISA: /^4[0-9]{2,}$/,
      AMEX: /^3[47][0-9]{5,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    };
    for (const card in regexPattern) {
      if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card]))
        return card;
    }
    return "";
  };

  handleValidations = (type, value) => {
    let errorText;
    switch (type) {
      case "card":
        errorText = cardNumberValidation(value);
        this.setState((prevState) => ({
          cardType: this.findDebitCardType(value),
          error: {
            ...prevState.error,
            cardError: errorText,
          },
        }));
        // setState cardType and error
        break;
      case "cardHolder":
        //checks for spaces and numbers
        // setState error
        break;
      case "expiry":
        // check for date format
        //setState error
        break;
      case "securityCode":
        // check for min length
        //setState error
        break;
      default:
        break;
    }
  };

  handleBlur = (e) => this.handleValidations(e.target.name, e.target.value);

  handleInputData = (e) => {
    if (e.target.name === "card") {
      let mask = e.target.value.split(" ").join("");
      if (mask.length) {
        mask = mask.match(new RegExp(".{1,4}", "g")).join(" ");
        this.setState((prevState) => ({
          cardData: {
            ...prevState.cardData,
            [e.target.name]: mask,
          },
        }));
      } else {
        this.setState((prevState) => ({
          cardData: {
            ...prevState.cardData,
            [e.target.name]: "",
          },
        }));
      }
    } else {
      this.setState((prevState) => ({
        cardData: {
          ...prevState.cardData,
          [e.target.name]: e.target.value,
        },
      }));
    }
  };

  render() {
    const inputData = [
      { label: "Card Number", name: "card", type: "text" },
      { label: "Cardholder's Name", name: "cardHolder", type: "text" },
      { label: "Expiry Date (MM/YY)", name: "expiry", type: "text" },
      { label: "Security Code", name: "securityCode", type: "text" },
    ];

    return (
      <div>
        <h1>Add New Card</h1>
        <form>
          {inputData.length
            ? inputData.map((item) => (
                <InputBase
                  placeholder={item.label}
                  type={item.type}
                  value={this.state.cardData && this.state.cardData[item.name]}
                  onChange={this.handleInputData}
                  autoComplete="off"
                  maxLength={this.state.maxLength}
                  name={item.name}
                  onBlur={this.handleBlur}
                />
              ))
            : null}

          <div className="btn-wrapper">
            <InputBase type="submit" value="Add Card" />
          </div>
        </form>
      </div>
    );
  }
}

export default Form;

import React from "react";
import InputBase from "../InputBase/InputBase";
import "./Form.css";
import { OTHERCARDS } from "../constants";
import {
  cardExpireValidation,
  cardNumberValidation,
  onlyTextValidation,
  securityCodeValidation,
} from "../validations";

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
        break;
      case "cardHolder":
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            cardHolderError: errorText,
          },
        }));
        break;
      case "expiry":
        errorText = cardExpireValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            expiryError: errorText,
          },
        }));
        break;
      case "securityCode":
        errorText = securityCodeValidation(3, value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            securityCodeError: errorText,
          },
        }));
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
      { label: "Card Number", name: "card", type: "text", error: "cardError" },
      {
        label: "Cardholder's Name",
        name: "cardHolder",
        type: "text",
        error: "cardHolderError",
      },
      {
        label: "Expiry Date (MM/YY)",
        name: "expiry",
        type: "text",
        error: "expiryError",
      },
      {
        label: "Security Code",
        name: "securityCode",
        type: "text",
        error: "securityCodeError",
      },
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
                  error={this.state.error}
                  cardType={this.state.cardType}
                  isCard={item.name === "card"}
                  errorM={
                    this.state.error &&
                    this.state.error[item.error] &&
                    this.state.error[item.error].length > 1
                      ? this.state.error[item.error]
                      : null
                  }
                  // first we check for the object, then we check for the property, then if the length condition is true it will run
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

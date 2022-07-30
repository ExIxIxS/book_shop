import {createHeader,
        createCartSection,
        createFooter,
        createCompleteElement
} from '../../assets/js/create.js';

import {cartUserInteractive
} from '../../assets/js/userActions.js';

import {booksInCart
} from '../../assets/js/commonActions.js';

const makeInputInvalid = function(inputElement) {
    if (inputElement.className !== 'invalid') {
        const invalidMessageElement = createCompleteElement('span', 'invalid-message', '* The field is invalid');
        invalidMessageElement.title = 'Please check and enter valid data';
        inputElement.classList.add('invalid');
        inputElement.after(invalidMessageElement);
    }
}

const makeInputValid = function(inputElement) {
        if (inputElement.classList.contains('invalid')) {
            inputElement.classList.remove('invalid');
            inputElement.nextElementSibling.remove();
        }
    }

const checkNameField = function(inputElement) {
    const NAME = inputElement.value;
    //NAME (mandatory, the length not less than 4 symbols, strings only)
    const validString = (NAME.match(/\p{Letter}{4,}/gu) ?? []).join('')
    if (validString.length === NAME.length && NAME.length !== 0) {
        makeInputValid(inputElement);
        //checkFormForValidData();
    } else {
        makeInputInvalid(inputElement);
    }
}

const checkSurnameField = function(inputElement) {
    const SURNAME = inputElement.value;
    //SURNAME (mandatory, the length not less than 5 symbols, strings only)
    const validString = (SURNAME.match(/\p{Letter}{5,}/u) ?? []).join('')
        if (validString.length === SURNAME.length && SURNAME.length !== 0) {
            makeInputValid(inputElement);
            //checkFormForValidData();
        } else {
            makeInputInvalid(inputElement);
        }
}

const checkStreetField = function(inputElement) {
    const STREET = inputElement.value;
    //STREET mandatory, the length not less than 5 symbols, the numbers are allowed
    //spaces also allowed, if not, delete '\s*'
    const validString = (STREET.match(/(\p{N}*\s*\p{Letter}+\s*\p{N}*)+/u) ?? [[]])
        if (validString[0].length === STREET.length && validString[0].length >= 5) {
            makeInputValid(inputElement);
            //checkFormForValidData();
        } else {
            makeInputInvalid(inputElement);
        }
}

const checkHouseNumField = function(inputElement) {
    const HOUSENUMBER = inputElement.value;
    //HOUSENUMBER (mandatory, numbers only, positive numbers only)
    const validString = (HOUSENUMBER.match(/\d+/) ?? [[]])
        if (validString[0].length === HOUSENUMBER.length  && HOUSENUMBER.length !== 0) {
            makeInputValid(inputElement);
            //checkFormForValidData();
        } else {
            makeInputInvalid(inputElement);
        }
}

const checkFlatNumField = function(inputElement) {
    const FLATNUMBER = inputElement.value;
    /*
        FLATNUMBER Flat number(mandatory, numbers only, positive numbers only, the dash symbol is allowed.
        Means, the flat number shouldn't start with minus/dash symbol.
        For example: -37 is invalid, but 1-37 is valid)
    */
    const validString = (FLATNUMBER.match(/\d(-?\d+)*/) ?? [[]])
        if (validString[0].length === FLATNUMBER.length  && FLATNUMBER.length !== 0) {
            makeInputValid(inputElement);
            //checkFormForValidData();
        } else {
            makeInputInvalid(inputElement);
        }
}
/*
const getNextDayString = function() {

}

const setMinDateInput = function() {
    const todayObj = new Date();
    const months = String(TODAY.getMonth() + 1);

    const nextDayString = `${TODAY.getFullYear()}-${TODAY.getMonth() + 1}-${TODAY.getDate()}`)
}
*/
const formUserInteractive = function() {
    const formNameInput = document.querySelector('#name');
    formNameInput.addEventListener('blur', event => checkNameField(formNameInput));
    const formSurnameInput = document.querySelector('#surname');
    formSurnameInput.addEventListener('blur', event => checkSurnameField(formSurnameInput));
    const formStreetInput = document.querySelector('#street');
    formStreetInput.addEventListener('blur', event => checkStreetField(formStreetInput));
    const formHouseNumInput = document.querySelector('#house-number');
    formHouseNumInput.addEventListener('blur', event => checkHouseNumField(formHouseNumInput));
    const formFlatNumInput = document.querySelector('#flat-number');
    formFlatNumInput.addEventListener('blur', event => checkFlatNumField(formFlatNumInput));
    setMinDateInput();
}

//Creating and adding of header, cart and footer
document.querySelector('.container_centered').prepend(createHeader());
document.querySelector('main').prepend(createCartSection(booksInCart()));
document.querySelector('.container_centered').append(createFooter());

document.querySelector('.cart').addEventListener('click', event => cartUserInteractive(event));
document.addEventListener('DOMContentLoaded', formUserInteractive);
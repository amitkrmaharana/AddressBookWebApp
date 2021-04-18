window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new Contact()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error')
    address.addEventListener('input', function() {
        if (address.value.length == 0) {
            addressError.textContent = "";
            return;
        }
        try {
            (new Contact()).address = address.value;
            addressError.textContent = "";
        } catch (e) {
            addressError.textContent = e;
        }
    });

    const phone = document.querySelector('#phoneNumber');
    const phoneError = document.querySelector('.phone-error')
    phone.addEventListener('input', function() {
        if (phone.value.length == 0) {
            phoneError.textContent = "";
            return;
        }
        try {
            (new Contact()).phoneNumber = phone.value;
            phoneError.textContent = "";
        } catch (e) {
            phoneError.textContent = e;
        }
    });

});

const save = () => {
    let addressBookData = createAddressBook();
    createAndUpdateStorage(addressBookData);
};

const createAddressBook = () => {
    let addressBookData = new Contact();
    addressBookData.id = localStorage.getItem("AddressBookList").length;
    addressBookData.name = getInputValueById("#name");
    addressBookData.address = getInputValueById("#address");
    addressBookData.city = getInputValueById("#city");
    addressBookData.state = getInputValueById("#state");
    addressBookData.zip = getInputValueById("#zip");
    addressBookData.phoneNumber = getInputValueById("#phoneNumber");
    alert(addressBookData.toString());
    return addressBookData;
};

function createAndUpdateStorage(addressBookData) {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if (addressBookList != undefined) {
        addressBookList.push(addressBookData);
    } else {
        addressBookList = [addressBookData]
    }
    alert(addressBookList.toString());
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList))
}


const getInputValueById = (id) => {
    let values = document.querySelector(id).value;
    return values;
};
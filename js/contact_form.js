let isUpdate = false;
let addressBookObj = {};

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

    checkForUpdate();

});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setAddressBookObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (e) {
        return;
    }
};

const setAddressBookObject = () => {
    addressBookObj._name = getInputValueById('#name');
    addressBookObj._address = getInputValueById("#address");
    addressBookObj._city = getInputValueById("#city");
    addressBookObj._state = getInputValueById("#state");
    addressBookObj._zip = getInputValueById("#zip");
    addressBookObj._phoneNumber = getInputValueById("#phoneNumber");
}

const createAndUpdateStorage = () => {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if (addressBookList) {
        let addressBookData = addressBookList.find(contactData => contactData._id == addressBookObj._id);
        if (!addressBookData) {
            addressBookList.push(createAddressBookData());
        } else {
            const index = addressBookList.map(contactData => contactData._id)
                .indexOf(addressBookData._id);
            addressBookList.splice(index, 1, createAddressBookData(addressBookData._id));
        }
    } else {
        addressBookList = [createAddressBookData()];
    }
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
};

const createAddressBookData = (id) => {
    let addressBookData = new Contact();
    if (!id) addressBookData.id = localStorage.getItem("AddressBookList").length;
    else addressBookData.id = id;
    setAddressBookData(addressBookData);
    return addressBookData;
}

const setAddressBookData = (addressBookData) => {
    addressBookData.name = addressBookObj._name;
    addressBookData.address = addressBookObj._address;
    addressBookData.city = addressBookObj._city;
    addressBookData.state = addressBookObj._state;
    addressBookData.zip = addressBookObj._zip
    addressBookData.phoneNumber = addressBookObj._phoneNumber;
    alert(addressBookData.toString());
}

const checkForUpdate = () => {
    const addressBookJson = localStorage.getItem("editBook");
    isUpdate = addressBookJson ? true : false;
    if (!isUpdate) return;
    addressBookObj = JSON.parse(addressBookJson);
    setForm();
};

const setForm = () => {
    setValue("#name", addressBookObj._name);
    setValue("#address", addressBookObj._address);
    setValue("#city", addressBookObj._city);
    setValue("#state", addressBookObj._state);
    setValue("#zip", addressBookObj._zip);
    setValue("#phoneNumber", addressBookObj._phoneNumber);
};

const resetForm = () => {
    setValue("#name", "");
    setValue("#address", "");
    setValue("#city", "");
    setValue("#state", "");
    setValue("#zip", "");
    setValue("#phoneNumber", "");
}

const getInputValueById = (id) => {
    let values = document.querySelector(id).value;
    return values;
};

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
};
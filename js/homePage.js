let addressBookList;
window.addEventListener('DOMContentLoaded', (event) => {
    addressBookList = localStorage.getItem('AddressBookList') ?
        JSON.parse(localStorage.getItem('AddressBookList')) : [];
    document.querySelector(".contact-count").textContent = addressBookList.length;
    createInnerHtml();
});

const createInnerHtml = () => {
    if (addressBookList.length == 0) return;
    const headerHtml = "<th>Fullname</th><th>Address</th><th>City</th><th>State</th>" +
        "<th>Zip Code</th><th>Phone Number</th><th></th>";
    let innerHtml = `$(headerHtml)`;
    for (const addressBookData of addressBookList) {
        innerHtml = `${innerHtml}
            <tr>
                <td>${addressBookData._name}</td>
                <td>${addressBookData._address}</td>
                <td>${addressBookData._city}</td>
                <td>${addressBookData._state}</td>
                <td>${addressBookData._zip}</td>
                <td>${addressBookData.phoneNumber}</td>
                <td>
                    <img id="${addressBookData._id}" alt="delete" onclick="remove(this)" src="../assets/icon/delete-black-18dp.svg">
                    <img id="${addressBookData._id}" alt="edit" onclick="update(this)" src="../assets/icon/create-black-18dp.svg">                    
                </td>
            </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}
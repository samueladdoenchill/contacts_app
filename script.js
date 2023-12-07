let contacts = [];
let selectedContactIndex = null;

function renderContacts() {
    const contactsContainer = document.getElementById('contacts-container');
    contactsContainer.innerHTML = '';

    contacts.forEach((contact, index) => {
        const contactDiv = document.createElement('div');
        contactDiv.classList.add('contact');

        // Click event to display contact information when the name is clicked
        contactDiv.addEventListener('click', () => showContactForm(index));

        const nameParagraph = document.createElement('p');
        nameParagraph.textContent = `${contact.firstName} ${contact.lastName}`;

        // Add a data attribute to store the phone number
        nameParagraph.setAttribute('data-phone', contact.phone);
        nameParagraph.setAttribute('data-email', contact.email);

        contactDiv.appendChild(nameParagraph);

        contactsContainer.appendChild(contactDiv);
    });
}


function showAddContactForm() {
    // Reset selectedContactIndex to null to indicate a new contact
    selectedContactIndex = null;
    showFormContainer();
}

function showContactForm(index) {
    // Set selectedContactIndex and display contact information
    selectedContactIndex = index;
    const selectedContact = contacts[index];
    document.getElementById('firstName').value = selectedContact.firstName;
    document.getElementById('lastName').value = selectedContact.lastName;
    document.getElementById('phone').value = selectedContact.phone;
    document.getElementById('email').value = selectedContact.email;
    showFormContainer();
}

function showFormContainer() {
    // Display the form container and hide the contacts container
    document.getElementById('contacts-container').style.display = 'none';
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('saveButton').textContent = selectedContactIndex !== null ? 'Save' : 'Edit';
    document.getElementById('deleteButton').style.display = selectedContactIndex !== null ? 'inline-block' : 'none';
    document.getElementById('AddButton').style.display = 'none';
}

function cancelEdit() {
    // Clear the form and show the contacts container
    clearForm();
    showContactsContainer();
}


function clearForm() {
    // Clear the form fields
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
}


function saveContact() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const phone = phoneInput.value;
    const email = emailInput.value;

    if (firstName && lastName && phone && email) {
        const newContact = { firstName, lastName, phone, email };

        if (selectedContactIndex !== null) {
            // Update existing contact
            contacts[selectedContactIndex] = newContact;
        } else {
            // Add new contact
            contacts.push(newContact);
        }

        // Reset the form and display the contacts
        firstNameInput.value = '';
        lastNameInput.value = '';
        phoneInput.value = '';
        emailInput.value = '';
        renderContacts();
        showContactsContainer();
    }
}

function deleteContact() {
    if (selectedContactIndex !== null) {
        // Delete the selected contact
        contacts.splice(selectedContactIndex, 1);
        renderContacts();
        showContactsContainer();
    }
}

function showContactsContainer() {
    // Display the contacts container and hide the form container
    document.getElementById('contacts-container').style.display = 'block';
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('AddButton').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    renderContacts();
    showContactsContainer();
});
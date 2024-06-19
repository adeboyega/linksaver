const button = document.querySelector("#input-btn");
const ulel = document.getElementById('list');
let myLeads = [];
let inputEl = document.querySelector("#input-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const deleteBut = document.querySelector("#deletebut");
let tabBtn = document.querySelector("#tabbut");

// Function to handle the tab button click
tabBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});

// Function to handle the input button click
button.addEventListener("click", function() {
    if (inputEl.value.trim() !== "") { // Ensure input is not empty
        myLeads.push(inputEl.value);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        inputEl.value = ""; // Clear input field
        render(myLeads);
    }
});

// Function to delete a lead by index
function deleteLead(index) {
    myLeads.splice(index, 1); // Remove the item from the array
    localStorage.setItem("myLeads", JSON.stringify(myLeads)); // Update localStorage
    render(myLeads); // Re-render the list
}

// Function to render the list of leads
let render = (leads) => {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `<li><a target='_blank' href="${leads[i]}">${leads[i]}</a> <button onclick="deleteLead(${i})">Delete</button></li>`;
    }
    ulel.innerHTML = listItems;
};

// Initialize with leads from localStorage if available
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

// Functionality for the delete button to clear all leads
deleteBut.addEventListener("click", function() {
    localStorage.removeItem("myLeads");
    ulel.innerHTML = ""; // Clear the list visually
    myLeads = [];
});

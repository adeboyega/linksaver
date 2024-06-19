const button = document.querySelector("#input-btn")
const ulel = document.getElementById('list')
let myLeads = []
let inputEl = document.querySelector("#input-el") 
const leadsformlocalstoage = JSON.parse(localStorage.getItem("myLeads"))
const deletebut = document.querySelector("#deletebut")
let tabBtn = document.querySelector("#tabbut")

//the tab button and its function
tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)

   
    })
    
    /*myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)*/
})

console.log(leadsformlocalstoage)

//the inputbutton and its function
button.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    inputEl.value = " "
    
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))

})
function deleteLead(index) {
    myLeads.splice(index, 1); // Remove the item from the array
    localStorage.setItem("myLeads", JSON.stringify(myLeads)); // Update localStorage
    render(myLeads); // Re-render the list
}

//the loop and dom of or strings and links
let render = (leads) => {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `<li><a target='_blank' href="${leads[i]}">${leads[i]}</a> <button onclick="deleteLead(${i})">Delete</button></li>`;
    }
    ulel.innerHTML = listItems;
};

if (leadsformlocalstoage){
    myLeads = leadsformlocalstoage
    render(myLeads)
}

//the delete button and its function 
deletebut.addEventListener("click",function(){
    localStorage.clear("myLeads")
    ulel.innerHTML = " "
    myLeads = [ ]
    console.log("clicked")
})




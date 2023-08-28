const loadPhone = async (searchText='iphone', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones,isShowAll)
}
//display the all phones dynamically
const displayPhones = (phones, isShowAll) => {
    console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    //clear phone container cards before adding new cards
    phoneContainer.innerHTML = '';
    //display show all button of there are more than 12 photos
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length >12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    //display only first 6 phones
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
    phoneCard.classList =   `card bg-base-100 border-2`;
    phoneCard.innerHTML = `
    <figure class="p-10 m-4 bg-sky-100">
    <img class="" src="${phone.image}" alt="Shoes" />
    </figure>
    <div class="card-body  text-center">
      <h2 class="text-2xl font-bold">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <p class="font-bold text-xl">$999</p>
      <div class="card-actions justify-center">
        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
      </div>
    </div>
    
    `
    phoneContainer.appendChild(phoneCard);
    });
    //hide loading spinner
    toggleLoadingSpinner(false)
}

const handleShowDetails = async (id) => {
    const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    console.log(data)
    const phone = data;
    
    showPhoneDetails(phone)
}   

const showPhoneDetails = (phone) => {
    const detailsPhoneContainer = document.getElementById('details-container');
    detailsPhoneContainer.innerHTML =`
    <figure class="p-10 flex justify-center   bg-sky-100">
    <img class="" src="${phone.data.image}" alt="Shoes" />
    </figure>
    <div class=" pt-3">
    <h3 class="font-bold text-lg">Name: ${phone.data.name}</h3>
    <h3 class="font-bold text-lg">Brand: ${phone.data.brand}</h3>
    <h3 class="font-bold text-lg">Bluetooth: ${phone.data.others.Bluetooth}</h3>
    <h3 class="font-bold text-lg">mainFeatures: ${phone.data.mainFeatures.displaySize}</h3>
    </div>
    `
    
    show_details_modal.showModal()
}

//handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    console.log(searchText)
    loadPhone(searchText, isShowAll)
    // searchField.value = ''
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');

    }else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true)
}

loadPhone()


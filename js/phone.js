const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones)
}
//display the all phones dynamically
const displayPhones = phones => {
    console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    //clear phone container cards before adding new cards
    phoneContainer.innerHTML = '';
    //display show all button of there are more than 12 photos
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length >22){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    //display only first 6 phones
    phones = phones.slice(0,6);
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
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
    
    `
    phoneContainer.appendChild(phoneCard);
    });
    //hide loading spinner
    toggleLoadingSpinner(false)
}


//handle search button
const handleSearch = () =>{
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    console.log(searchText)
    loadPhone(searchText)
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

// loadPhone()


const loadPhone = async (serachText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${serachText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}
const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 5){
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden');
    }


    phones =phones.slice(0,5);


    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-white p-4 shadow-md rounded-md cursor-pointer`;
        phoneCard.innerHTML = `
        <figure class="h-72 bg-gray-100">
            <img src="${phone.image}" alt="${phone.title}" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="text-2xl font-semibold text-red-500 "> ${phone.phone_name} </h2>
            <p> If a dog chews shoes whose shoes does he choose?</p>
            <button id="purchaseButton" class="bg-pink bg-teal-600 text-white rounded-md w-full  py-2 hover:bg-teal-800" onclick="
                    my_modal_1.showModal()" > Buy Now </button>
                    
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    })
    //hidden toggleloading spring
    toggleLoadingSpinner(false);
}
//handle seach button
const serachButton = () =>{
    toggleLoadingSpinner(true);
    const serachField = document.getElementById('search-field');
    const serachText = serachField.value;
    console.log(serachText);
    loadPhone(serachText);
}
 

const toggleLoadingSpinner = (isLoadding) => {
    const LoadingSpinner = document.getElementById('loading-spinner');
    if(isLoadding){
        LoadingSpinner.classList.remove('hidden');
    }else{
        LoadingSpinner.classList.add('hidden');
    }
}
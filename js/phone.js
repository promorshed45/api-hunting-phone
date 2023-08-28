const loadPhone = async (serachText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${serachText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones,isShowAll);
}
const displayPhones = (phones,isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden');
    }

    console.log('is show all', isShowAll);
    if(!isShowAll){
        phones =phones.slice(0,12);
    }

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
            <button onclick="handleShowDetails(${phone.slug})" class="bg-pink bg-teal-600 text-white rounded-md w-full  py-2 hover:bg-teal-800" onclick="
                    showDetailsModal" > Show Details </button>
                    
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    })
    //hidden toggleloading spring
    toggleLoadingSpinner(false);
}





//handle seach button
const serachButton = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const serachField = document.getElementById('search-field');
    const serachText = serachField.value;
    console.log(serachText);
    loadPhone(serachText,isShowAll);
}
 

const toggleLoadingSpinner = (isLoadding) => {
    const LoadingSpinner = document.getElementById('loading-spinner');
    if(isLoadding){
        LoadingSpinner.classList.remove('hidden');
    }else{
        LoadingSpinner.classList.add('hidden');
    }
}

//show all button 
const handleShowAll = () => {
    serachButton(true);
}

const handleShowDetails = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data);
}
let ais = [];
const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    console.log(data.data.tools);
    ais = data.data.tools;
    showDataOnPage();
}

loadData();
const seeMoreContainer = document.getElementById('see-more-container');
const cardsContainer = document.getElementById('cards-container');
const showDataOnPage = () => {
    
    let shownPart;
    // console.log(ais);
    if(ais.length > 6){
        shownPart = ais.slice(0, 6);
        ais = ais.slice(6);
        seeMoreContainer.classList.remove('hidden');
    }else{
        shownPart = ais;
        seeMoreContainer.classList.add('hidden');
    }
    

    for(ai of shownPart){
        const card = document.createElement('div');
        card.innerHTML = `
            <div onclick="handleModal('${ai.id}')" class="p-[25px] border-[1px] rounded-2xl w-[487px] h-[617px] flex flex-col justify-between">
            <img src="${ai.image}" onerror="this.src='noimg.png'" alt="" class="w-[437px] h-[240px] rounded-2xl">

            
                <div class="flex flex-col justify-between ">
                    <div>
                        <h3 class="text-2xl font-extrabold my-5">Features</h3>
                        <ol type="1" class="ms-2 mb-5 flex flex-col gap-3 text-xl font-semibold ">
                            <li>${ai.features ? ai.features[0] ? '1. ' + ai.features[0] : '' : '' }</li>
                            <li>${ai.features ? ai.features[1] ? '2. ' + ai.features[1] : '' : '' }</li>
                            <li>${ai.features ? ai.features[2] ? '3. ' + ai.features[2] : '' : '' }</li>
                        </ol>

                    </div>

                        <div>
                                <hr class="mb-5">
                                <h4 class="text-2xl font-extrabold mb-3">${ai.name ? ai.name : ''}</h4>
                                <p class="text-xl font-medium">${ai.published_in ? ai.published_in : ''}</p>
                        </div>

                </div>
            </div>
        `
        cardsContainer.appendChild(card);
    }

}

const seeMoreHandler = () => {
    showDataOnPage();
}


const handleModal = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    console.log(id, data);

    let info = data.data;

    console.log();
    my_modal_4.showModal();
    document.getElementById('my_modal_4').innerHTML = `
            <div class="modal-box  flex justify-center  py-20 max-w-[1190px] h-[700px]">
            <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-red-400">✕</button>
            </form>
            <div class="  max-w-[460px] h-full bg-red-100 border-red-500 border-[1px] rounded-2xl p-7 me-10">
                <h4 class="text-xl font-extrabold">
                    ${info.description ? info.description : ''}
                </h4>

                <div class="flex justify-between my-7">
                    <div class=" w-[115px] text-center h-[105px] bg-white rounded-2xl p-4 text-green-700 font-extrabold">
                        $10/ month Basic
                    </div>
                    <div class=" w-[115px] text-center h-[105px] bg-white rounded-2xl p-4 text-orange-700 font-extrabold">
                        $50/ month Pro
                    </div>
                    <div class=" w-[115px] text-center h-[105px] bg-white rounded-2xl p-4 text-red-700 font-extrabold flex items-center">
                        Contact us Enterprise
                    </div>
                </div>

                <div class="flex justify-between">
                    <div class="w-3/5">
                        <h4 class="text-2xl font-extrabold">Features</h4>
                        <ol class="list-disc ms-8 flex flex-col gap-2 mt-4 font-medium">
                            <li>${info.features ? info.features[1] ? info.features[1].feature_name ? info.features[1].feature_name : '' :'' :''}</li>
                            <li>${info.features ? info.features[2] ? info.features[2].feature_name ? info.features[2].feature_name : '' :'' :''}</li>
                            <li>${info.features ? info.features[3] ? info.features[3].feature_name ? info.features[3].feature_name : '' :'' :''}</li>
                        </ol>
                    </div>

                    <div class="w-2/5">
                        <h4 class="text-2xl font-extrabold">Integrations</h4>
                        <ol class="list-disc ms-8 flex flex-col gap-2 mt-4 font-medium">
                            <li>${info.integrations ? info.integrations[0] ? info.integrations[0] : '' : '' }</li>
                            <li>${info.integrations ? info.integrations[1] ? info.integrations[1] : '' : '' }</li>
                            <li>${info.integrations ? info.integrations[2] ? info.integrations[2] : '' : '' }</li>
                        </ol>
                    </div>
                </div>
            </div>

            <div class="max-w-[460px] h-full bg-white border-black border-[1px] rounded-2xl p-7 flex flex-col justify-between">
            <img src="${info.image_link[0] }" alt="" onerror="this.src='noimg.png'" class="w-full rounded-xl">

            <div>
                 <h4 class="text-center text-2xl font-extrabold mt-6 mb-4">${info.input_output_examples ? info.input_output_examples[0] ?  info.input_output_examples[0].input ? info.input_output_examples[0].input : '' : '' : ''}</h4>
                <p class="text-xl text-bold text-center mb-10">${info.input_output_examples ? info.input_output_examples[0] ?  info.input_output_examples[0].output ? info.input_output_examples[0].output : '' : '' : ''}</p>
            </div>

            </div>
            
        </div>
    `
}


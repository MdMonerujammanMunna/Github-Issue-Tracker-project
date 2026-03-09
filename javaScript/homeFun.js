// button selection
const buttonfun = (button) => {
    let all = document.getElementById('All-button')
    let open = document.getElementById("Open-button")
    let close = document.getElementById("Closed-button")
    if (button === "All-button") {
        all.classList.remove("btn-outline")
        open.classList.add("btn-outline")
        close.classList.add("btn-outline")

    }
    else if (button === "Open-button") {
        open.classList.remove("btn-outline")
        all.classList.add("btn-outline")
        close.classList.add("btn-outline")
    }
    else {
        close.classList.remove("btn-outline")
        open.classList.add("btn-outline")
        all.classList.add("btn-outline")

    }
}
buttonfun("All-button")

// search section
function search() {
    const Enter = document.getElementById("Btn-search")
    const value = document.getElementById("Btn-input")
    Enter.addEventListener("click", () => {
        let getInput = value.value.toLowerCase().trim()
        fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${getInput}`)
            .then(res => res.json())
            .then(value => {
                let mainword = value.data
                const filterWord = mainword.filter(ti => ti.title.toLowerCase().includes(getInput))
                CardDisplay(filterWord)
            })
    })
}
search()



// Loading function for all card
const Loadingall = (statues) => {
    if (statues == true) {
        document.getElementById("Loading-section").classList.remove("hidden")
        document.getElementById("Card-Container").classList.add("hidden")
    }
    else {
        document.getElementById("Card-Container").classList.remove("hidden")
        document.getElementById("Loading-section").classList.add("hidden")
    }
}
// card mani design
// let allArray = []
const CardDesign = () => {
    Loadingall(true)
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(value => {
            CardDisplay(value.data)
        })
}
CardDesign()


const CardDisplay = (array) => {
    let values = document.getElementById("count").innerText = array.length;
    let card = document.getElementById("Card-Container")
    card.innerHTML = ""
    array.forEach(element => {
        const div = document.createElement("div")
        div.innerHTML = `
     <div class="flex-1 bg-white  rounded-lg border-t-4 ${element.status == 'open' ? 'border-green-500' : 'border-[#A855F7]'} mb-[12px]">
                <div class="p-4 space-y-3">
                    <div class="flex items-center justify-between">
                        <img src="${element.status == 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="Not Found">
    

                        <div id="priority-container" onclick="modalFun(${element.id})" class="btn outline-none px-[25px] py-[6px] rounded-full border-none shadow-none ${priorityFAN(element.priority)}">${(element.priority.toUpperCase())}</div>
                        
                    </div>


                    <div class="space-y-1">
                        <h1 class="text-sm font-semibold">${element.title}</h1>
                        <p class="text-xs text-[var(--second-color)]">${element.description}</p>
                    </div>

                  
                     <div class=" space-y-1">${labelsADD(element.labels)}</div>
      

                <hr class="border-[#E4E4E7]">


                <div class="p-4 space-y-2 text-[#64748B] text-xs ">
                    <p class="font-semibold">#${element.id}  ${element.author.toUpperCase()}</p>
                    <p>${element.createdAt.slice(0, 10)}</p>
                </div>
            </div>`
        card.appendChild(div)

    });
    Loadingall(false)
}

// labels add function 
const labelsADD = (array) => {
    const buttonColor = {
        bug: " text-error border-error ",
        "help wanted": " text-warning border-warning",
        enhancement: " border-success text-success",
        documentation: " border-success text-success",
        "good first issue": " border-[#8663ff] text-[#6367FF]"
    }
    const icons = {
        bug: "<i class='fa-solid fa-bug'></i>",
        "help wanted": "<i class='fa-solid fa-life-ring'></i>",
        enhancement: "<i class='fa-solid fa-meteor rotate-180'></i>",
        documentation: "<i class='fa-solid fa-file'></i>",
        "good first issue": "<i class='fa-solid fa-clover'></i> "
    }
    const labelsAdder = array.map(el =>
        ` <span class="btn rounded-full border-2 py-[6px] px-[10px]${buttonColor[el]}">${icons[el]} ${el.toUpperCase()}</span>`
    )
    return (labelsAdder.join(" "))
}

// priority function for card
const priorityFAN = (value) => {
    value.priority === 'low' ? 'btn-error' : 'btn-base-300'
    if (value === "high") {
        return ('text-error bg-secondary-content')
    }
    else if (value === 'low') {
        return ('text-[#9CA3AF] bg-[#EEEFF2]')
    }
    else {
        return ('text-warning bg-[#FFF6D1]')
    }
}

const modalFun = (id) => {
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then(res => res.json())
        .then(value => modalDisplay(value.data))
}
const modalDisplay = (object) => {
    document.getElementById("modal").showModal()
    let modal = document.getElementById("modal-container")
    modal.innerHTML = ` <section class="space-y-6">
        <!-- text -->
        <div class="space-y-2">
            <h2 class="text-2xl font-bold">${object.title}</h2>
            <ul class="flex list-disc gap-3 items-center text-xs text-[#64748B]">
                <li
                    class="list-none mr-5 btn px-2 py-[6px] ${object.status == 'open' ? 'bg-green-500' : 'bg-[#A855F7]'} rounded-full text-white shadow-none outline-none font-medium">
                    ${object.status}</li>
                <li class="mr-5">Opened by ${object.author}</li>
                <li>${object.updatedAt.slice(0, 10)}</li>
            </ul>
        </div>
        <!-- bug  -->
       <div class=" space-y-1">${labelsADD(object.labels)}</div>
        <!-- para -->
        <div class="">
            <p class="text-[#64748B]">The navigation menu doesn't collapse properly on mobile devices. Need to fix the
                responsive behavior.</p>
        </div>
        <!-- some -->
        <div class="p-4 flex items-center bg-[#F8FAFC] gap-20">
            <div class="">
                <p class="text-[#64748B]">Assignee:</p>
                <h3 class="font-semibold">${object.author.toUpperCase()}</h3>
            </div>
            <div class="">
                <p class="text-[#64748B]">Priority:</p>
                <h3 class=" font-semibold px-[16px] py-[6px] rounded-full shadow-none outline-none border-none ${ObjectPriority(object.priority)}">${object.priority.toUpperCase()}</h3>
            </div>
        </div>
    </section>`
    modal.appendChild(div)

}
// priority function for modal
const ObjectPriority = (value) => {
    value.priority === 'low' ? 'btn-error' : 'btn-base-300'
    if (value === "high") {
        return ('text-white bg-[#EF4444]')
    }
    else if (value === 'low') {
        return ('text-white bg-info')
    }
    else {
        return ('text-white bg-warning')
    }
}


// Open card
let openArray = []
const OpenDesign = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(value => {
            Opencontainer(value.data)
        })
}
OpenDesign()
const Opencontainer = (array) => {
    // let values = document.getElementById("count").innerText = array.length;
    let card = document.getElementById("Open-container")
    array.forEach(element => {
        if (element.status === 'open') {

            const div = document.createElement("div")
            div.innerHTML = `
     <div class="flex-1 bg-white  rounded-lg border-t-4 ${element.status == 'open' ? 'border-green-500' : 'border-[#A855F7]'} mb-[12px]">
                <div class="p-4 space-y-3">
                    <div class="flex items-center justify-between">
                        <img src="${element.status == 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="Not Found">
    

                        <div id="priority-container" onclick="modalFun(${element.id})" class="btn outline-none px-[25px] py-[6px] rounded-full border-none shadow-none ${priorityFAN(element.priority)}">${(element.priority.toUpperCase())}</div>
                        
                    </div>


                    <div class="space-y-1">
                        <h1 class="text-sm font-semibold">${element.title}</h1>
                        <p class="text-xs text-[var(--second-color)]">${element.description}</p>
                    </div>

                  
                     <div class=" space-y-1">${labelsADD(element.labels)}</div>
      

                <hr class="border-[#E4E4E7]">


                <div class="p-4 space-y-2 text-[#64748B] text-xs ">
                    <p class="font-semibold">#${element.id}  ${element.author.toUpperCase()}</p>
                    <p>${element.createdAt.slice(0, 10)}</p>
                </div>
            </div>`
            card.appendChild(div)
            openArray.push(div)
        }
        // arrayaddfun(element.status)
    });

}

// close card
let closeArray = []
const CloseDesign = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(value => {
            closecontainer(value.data)
        })
}
CloseDesign()
const closecontainer = (array) => {
    let card = document.getElementById("Close-container")
    array.forEach(element => {
        if (element.status === 'closed') {
            const div = document.createElement("div")
            div.innerHTML = `
     <div class="flex-1 bg-white  rounded-lg border-t-4 ${element.status == 'open' ? 'border-green-500' : 'border-[#A855F7]'} mb-[12px]">
                <div class="p-4 space-y-3">
                    <div class="flex items-center justify-between">
                        <img src="${element.status == 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="Not Found">
    

                        <div id="priority-container" onclick="modalFun(${element.id})" class="btn outline-none px-[25px] py-[6px] rounded-full border-none shadow-none ${priorityFAN(element.priority)}">${(element.priority.toUpperCase())}</div>
                        
                    </div>


                    <div class="space-y-1">
                        <h1 class="text-sm font-semibold">${element.title}</h1>
                        <p class="text-xs text-[var(--second-color)]">${element.description}</p>
                    </div>

                  
                     <div class=" space-y-1">${labelsADD(element.labels)}</div>
      

                <hr class="border-[#E4E4E7]">


                <div class="p-4 space-y-2 text-[#64748B] text-xs ">
                    <p class="font-semibold">#${element.id}  ${element.author.toUpperCase()}</p>
                    <p>${element.createdAt.slice(0, 10)}</p>
                </div>
            </div>`
            card.appendChild(div)
            closeArray.push(div)
        }
    });

}
// for card toggling
function called() {
    let all = document.getElementById('All-button')
    let open = document.getElementById("Open-button")
    let close = document.getElementById("Closed-button")

    let allcard = document.getElementById("Card-Container");
    let opencard = document.getElementById("Open-container");
    let closecard = document.getElementById("Close-container");

    let span = document.getElementById("count")
    all.addEventListener("click", () => {
        span.innerText = allcard.childNodes.length;
        allcard.classList.remove("hidden")
        opencard.classList.add("hidden")
        closecard.classList.add("hidden")
    })
    open.addEventListener("click", () => {
        span.innerText = openArray.length
        opencard.classList.remove("hidden")
        allcard.classList.add("hidden")
        closecard.classList.add("hidden")
    })
    close.addEventListener("click", () => {
        span.innerText = closeArray.length
        closecard.classList.remove("hidden")
        allcard.classList.add("hidden")
        opencard.classList.add("hidden")
    })
}
called()
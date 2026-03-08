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


// card mani design
const CardDesign = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(value => CardDisplay(value.data))
}
CardDesign()


const CardDisplay = (array) => {
    let values = document.getElementById("count").innerText = array.length;
    let card = document.getElementById("Card-Container")
    array.forEach(element => {
        const div = document.createElement("div")
        div.innerHTML = `
     <div class="flex-1 bg-white  rounded-lg border-t-4 ${element.status == 'open' ? 'border-green-500' : 'border-[#A855F7]'} mb-[12px]">
                <div class="p-4 space-y-3">
                    <div class="flex items-center justify-between">
                        <img src="${element.status == 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="Not Found">
                     
                        <div id="priority-container">${priorityFAN(element.priority)}</div>
                        
                    </div>


                    <div class="space-y-1">
                        <h1 class="text-sm font-semibold">${element.title}</h1>
                        <p class="text-xs text-[var(--second-color)]">${element.description}</p>
                    </div>

                  
                     <div class=" space-y-1">${labelsADD(element.labels)}</div>
      

                <hr class="border-[#E4E4E7]">


                <div class="p-4 space-y-2 text-[#64748B] text-xs ">
                    <p class="font-semibold">#${element.id}  ${element.author.toUpperCase()}</p>
                    <p>${element.createdAt}</p>
                </div>
            </div>`
        card.appendChild(div)
    });
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

// priority function
const priorityFAN = (value) => {
    return value

}
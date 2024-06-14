function clearDOM() {
    const htmlContent = document.querySelector("#memories");
    htmlContent.removeChild(container);
}

function updateDOM() {
    if(localStorage.getItem("entries") !== null) {
        clearDOM();
        let entries = JSON.parse(localStorage.getItem('entries'));
        const htmlContent = document.querySelector("#memories");
        
        const container = document.createElement("div");
        container.setAttribute("id", "container");

        for(let i = entries.length-1; i > -1; i--) {
            // console.log(i)
            const timestamp = document.createElement("p");
            timestamp.textContent = entries[i][1];

            const hr = document.createElement("hr");

            const content = document.createElement("p");
            content.textContent = entries[i][2];

            const div = document.createElement("div", );
            div.setAttribute("id", entries[i][0]); 

            div.appendChild(timestamp);
            div.appendChild(hr);
            div.appendChild(content);
            container.appendChild(div);
        }
        htmlContent.appendChild(container);
    }
}

updateDOM();

const saveBtn = document.querySelector("#saveBtn");
saveBtn.addEventListener("click", () => {
    if(userInput.value !== '') {
        if(localStorage.getItem("entries") !== null) {
            let entries = JSON.parse(localStorage.getItem('entries'));
            let d = new Date();
            entries.push([
                entries.length,
                d.getHours()+
                ":"+
                d.getMinutes()+
                " - "+
                d.getDate()+
                "."+
                d.toLocaleString('default', {month: 'short'})+
                "."+
                d.getFullYear(),
                userInput.value
            ])
            localStorage.setItem("entries", JSON.stringify(entries));
        } else {
            let d = new Date();
            let entries = [];
            entries.push([
                entries.length,
                d.getHours()+
                ":"+
                d.getMinutes()+
                " - "+
                d.getDate()+
                "."+
                d.toLocaleString('default', {month: 'short'})+
                "."+
                d.getFullYear(),
                userInput.value
            ])
            localStorage.setItem("entries", JSON.stringify(entries));
        }
    }
    updateDOM();
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    localStorage.clear();
    clearDOM();
    const container = document.createElement("div");
    container.setAttribute("id", "container");
    const htmlContent = document.querySelector("#memories");
    htmlContent.appendChild(container);
});

//event listener for delete button
//remove item from localStorage
//call update DOM function
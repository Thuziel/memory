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

            const deleteBtn = document.createElement("button");
            const delImg = document.createElement("img");
            delImg.setAttribute("class", "delImg");
            delImg.setAttribute("src", "media/delete.png");
            deleteBtn.setAttribute("class", "delBtn");
            deleteBtn.appendChild(delImg);

            const hr = document.createElement("hr");

            const content = document.createElement("p");
            content.setAttribute("class", "content")
            content.textContent = entries[i][2];

            const div = document.createElement("div", );
            div.setAttribute("id", entries[i][0]); 
            div.setAttribute("class", "post");

            const headerDiv = document.createElement("div");
            headerDiv.setAttribute("class", "postHeader");

            headerDiv.appendChild(timestamp);
            headerDiv.appendChild(deleteBtn);
            div.appendChild(headerDiv);
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
                (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()+
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
                (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()+
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
    userInput.value = '';
    userInput.focus();
});


//event listener for delete button
//remove item from localStorage
//call update DOM function
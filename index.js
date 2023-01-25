const inputBtn = document.getElementById("input-btn")
const removeBtn = document.getElementById("remove-el")
const inputEl = document.getElementById("input-el")
const outputEl = document.getElementById("output-el")

class LocalStorage {
    static setLocalStorage(){
        let stringedTodos = JSON.stringify(todoArr);
        localStorage.setItem("todos", stringedTodos)
    }

    static getLocalStorage(){

        let storage = localStorage.getItem("todos") === null ?
        [] : JSON.parse(localStorage.getItem("todos"))

        return storage
        
    }
}

let todoArr = LocalStorage.getLocalStorage()
inputBtn.addEventListener("click", ()=>{
        // e.preventDefault()
    if (inputEl.value !== '' && !todoArr.includes(inputEl.value)) {
        
            let id = Math.random() * 1000000
            const todo = new Todo(id, inputEl.value)
            todoArr = [...todoArr, todo]
            UpdateDOM.outputData()
            UpdateDOM.clearInput()
            UpdateDOM.removeFromDOM()
            LocalStorage.setLocalStorage()
            console.log(todoArr)     
    
        console.log("test")
    }
    
 console.log("clicked")
})

// Array that collects the todos
todoArr = LocalStorage.getLocalStorage()

class Todo{
    constructor(id, todo){
        this.id = id
        this.todo = todo
    }

}

// output todo to the DOM

class UpdateDOM{
    static outputData(){
        let outputDataFromArr = todoArr.map((item) => {
            return`            
            <div id="todo">
                <ol>
                    <p>➖ ${item.todo}
                        <span data-id= ${item.id} class="removeEl" id="removeEl" title="Remove Todo">🗑</span> 
                    </p>
                </ol>
            </div>`
        })
        outputEl.innerHTML = (outputDataFromArr).join(" ")
        // console.log(outputDataFromArr)
    }

    static clearInput(){
        inputEl.value = " "
    }

    static removeFromDOM(){

        outputEl.addEventListener("click", (e)=>{
            if(e.target.classList.contains("removeEl")){
                e.target.parentElement.remove()
                console.log("clicked")
            } 

            let rmvEl = e.target.dataset.id;
            UpdateDOM.removeTodoFromArr(rmvEl)
            console.log(todoArr)
        });
 
    }

    static removeTodoFromArr(id){
        todoArr = todoArr.filter((item) => item.id !== +id)
        LocalStorage.setLocalStorage()
    }
}

window.addEventListener("DOMContentLoaded", () =>{
    UpdateDOM.outputData()
    UpdateDOM.removeFromDOM()
})

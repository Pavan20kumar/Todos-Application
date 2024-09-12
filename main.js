let bgcontainer = document.getElementById('bg-container');
let buttonelement = document.getElementById('addbutton')
let btnelement = document.getElementById('btnsave')

let todoList=getTodoListFromLocalStorage();
    

function getTodoListFromLocalStorage(){
    let stringifyTodolist = localStorage.getItem('todoList');
    let parseTodolist = JSON.parse(stringifyTodolist);
    if(parseTodolist===null){
        return[]
    }
    else{
        return parseTodolist;
    }
}

btnelement.onclick = function(){
    localStorage.setItem('todoList', JSON.stringify(todoList))

   
}



buttonelement.onclick=function(){
    onAddtodo()
}

function onTodostateChange(CheckboxId, labelId,TodoId){
    let checkboxelement = document.getElementById(CheckboxId)
    let labelelement2 = document.getElementById(labelId)
    labelelement2.classList.toggle('checked')
    let todoObjectIndex = todoList.findIndex(function(eachtodo){
        let eachtodoId = 'todo' + eachtodo.uniqueNo;
        if(eachtodoId===TodoId){
            return true
        }
        else{
            return false
        }

    })
   let todoObject = todoList[todoObjectIndex]
   if(todoObject.isChecked===true){
    todoObject.isChecked= false
   }
   else{
    todoObject.isChecked = true     
   }
}

function onDeleteTodo(TodoId){
    let TodoElement = document.getElementById(TodoId);
    bgcontainer.removeChild(TodoElement)
    let deleteIndex = todoList.findIndex(function(eachtodo){
        let eachtodoId = 'todo'+ eachtodo.uniqueNo;
        if(eachtodoId===TodoId){
            return true
        }
        else{
            return false
        }
    })

   todoList.splice(deleteIndex,1)
}




function CreateAppendlist(todo){
    let CheckboxId = 'checkbox' + todo.uniqueNo;
    let labelId = 'label'+ todo.uniqueNo;
    let TodoId = 'todo' + todo.uniqueNo;

    
    
    
        
    let lielement = document.createElement('li')
    lielement.classList.add('todo-list-items','d-flex','flex-row')
    lielement.id=TodoId
    bgcontainer.appendChild(lielement)
    
    let inputelement = document.createElement('input')
    inputelement.type="checkbox"
    inputelement.id=CheckboxId
    inputelement.checked=todo.isChecked
    inputelement.onclick=function(){
        onTodostateChange(CheckboxId,labelId)
    }
    inputelement.classList.add('checkbox-input')
    lielement.appendChild(inputelement)
    
    let div1element = document.createElement('div')
    div1element.classList.add('d-flex','flex-row','label-container')
    lielement.appendChild(div1element)
    
    let labelelement = document.createElement('label')
    labelelement.setAttribute('for',CheckboxId)
    labelelement.classList.add('checkbox-label')
    labelelement.id=labelId
    labelelement.textContent=todo.Text
    div1element.appendChild(labelelement)
    
    let div2element = document.createElement('div')
    div2element.classList.add('delete-btn')
    div1element.appendChild(div2element)
    
    let ielement =document.createElement('i')
    ielement.classList.add('bi','bi-trash3')
    ielement.onclick = function () {
        onDeleteTodo(TodoId)
       
    }
    div2element.appendChild(ielement)

}




function  onAddtodo() {
    let todosCount = todoList.length
    todosCount = todosCount+1;

  let userinputelement = document.getElementById('userInput')
  let userinputvalue = userinputelement.value;

  if(userinputvalue === ''){
    alert('enter valid input');
    return;
  }

  

  let newtodo = {
    Text: userinputvalue,
    uniqueNo: todosCount,
    isChecked: false
  };
  todoList.push(newtodo);

  CreateAppendlist(newtodo)
  userinputelement.value ='';
  
   

}



for(let todo of todoList){
    CreateAppendlist(todo)
}












    
    












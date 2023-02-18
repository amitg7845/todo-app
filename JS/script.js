let listOfToDoArr = localStorage.getItem('todolist') ? JSON.parse(localStorage.getItem('todolist')) : []
var ids = listOfToDoArr ? listOfToDoArr.length : 0;
let showNotes = '';

document.addEventListener('DOMContentLoaded', (event) => {
    displayNotes()
    $('ul').on('click', '.delete--evt', function () {
        let todoId = $(this).parents('.todo--deco')[0].id
        console.log(todoId);
        let filterdTodos = listOfToDoArr.filter(function (todo) {
            return todo.id != todoId;
        })
        localStorage.setItem('todolist', JSON.stringify(filterdTodos));
        window.location.reload();
    })

    $('ul').on('click', '.edit--evt', function () {
        $(this).addClass('dsp-none')
        $(this).siblings('.delete--evt').addClass('dsp-none')
        $(this).siblings('.check--evt').removeClass('dsp-none')
        $(this).siblings('.inputToDo').removeAttr('disabled')
    });

    $('ul').on('click', '.check--evt', function () {
        $(this).addClass('dsp-none')
        $(this).siblings('.delete--evt').removeClass('dsp-none')
        $(this).siblings('.edit--evt').removeClass('dsp-none')
        $(this).siblings('.inputToDo').attr("disabled", true);
        let updatedToDoVal = $(this).siblings('.inputToDo').val()
        let todoId = $(this).parents('.todo--deco')[0].id
        listOfToDoArr.forEach((element, index) => {
            if (todoId == element.id) {
                let insertNewDataObj = {
                    id: element.id,
                    text: updatedToDoVal
                }
                listOfToDoArr[index] = insertNewDataObj;
            }
        })
        localStorage.setItem('todolist', JSON.stringify(listOfToDoArr))
    })
});

$('#toDoValues').on('keypress', function (e) {
    if (e.keyCode == 13) {
        addNewTodo()
    }
})

$('#add__todo').click(function () {
    addNewTodo()
})

function addNewTodo() {
    let addToDoVal = $('#toDoValues').val()
    if (addToDoVal != "") {
        let newTodoList = `<li id="${ids}" class="todo--deco">
        <div class="edit--delete">
          <input type="text" name="" id="" class="inputToDo" value="${addToDoVal}" disabled> 
          <i class="fa fa-edit edit--evt"></i>
          <i class="fa fa-trash delete--evt" aria-hidden="true"></i>
          <i class="fa fa-check check--evt dsp-none"></i>
        </div>
      </li>`;
        $('.todos__ul').append(newTodoList);
        let todoObj = {
            id: ids,
            text: addToDoVal
        }
        listOfToDoArr.push(todoObj)
        localStorage.setItem('todolist', JSON.stringify(listOfToDoArr))
        ids++
        $('#toDoValues').val('')
    }
}

function displayNotes() {
    listOfToDoArr.forEach(element => {
        showNotes += `<li id="${element.id}" class="todo--deco">
        <div class="edit--delete">
          <input type="text" name="" id="" class="inputToDo" value="${element.text}" disabled>
          <i class="fa fa-edit edit--evt"></i>
          <i class="fa fa-trash delete--evt" aria-hidden="true"></i>
          <i class="fa fa-check check--evt dsp-none"></i>
        </div>
      </li>`;
    });
    $('.todos__ul').append(showNotes);
}


var todos = [
  {
		text: 'Buy Cigarettes',
    isCompleted : false
  },
  {
		text: 'Buy Chocolate Milk',
    isCompleted : true
  }
];

//Create
function addTodo(newTodoText){
	if(newTodoText != ''){
      todos.push({
      text: newTodoText,
      isCompleted: false
    });
  }
  else{
    alert('You must enter a todo');
  }
  
}
//Check TODO
function checkTodo(index){
	todos[index].isCompleted = !todos[index].isCompleted;
}
//Check as completed
function checkAsCompleted(index){
  todos[index].isCompleted = true;
}
//EDIT TODO
function editTodo(index, updatedTodoText){
	todos[index].text = updatedTodoText;
}
//Delete TODO
function deleteTodo(index){
	todos.splice(index, 1);
}





function renderTodos(){
	var mustacheTemplate = `{{#todos}}<div class="todo-item" data-item="{{@index}}">
    <label class="todo-item-label">
      <input type="checkbox" class="todo-item-checkbox" {{#isCompleted}}checked="checked"{{/isCompleted}}/>
      {{text}}
    </label>
    <button class="todo-item-edit">Edit</button>
    <button class="todo-item-delete">Delete</button>
  </div>{{/todos}}`;
  
	//return Mustache.render(mustacheTemplate, { todos: todos } );
  var templateScript = Handlebars.compile(mustacheTemplate);
  return templateScript({todos: todos});
}

function render(){
	$('#todos').html( renderTodos() );
  $('#todo-total').html( todos.length );
}


$(document).ready(function(){
	render();
  
  //Add Todo
  $('#todo-add').on('click', function(){
  	var newTodoText = $('#todo-input').val();
    addTodo( newTodoText );
    render();
  });
  
  //Check Todo
  $('#todos').on('click', '.todo-item-edit', function(event){
    var index = $(event.target).parents('.todo-item').data('item');
    $(event.target).parents('.todo-item').html( '<input type="text" id="todo-input'+index+'"><button class="todo-item-update'+index+' btn">Update todo</button>' );
    //Edit Todo
  
    $('.todo-item-update'+index).on('click', function(event){
      var updatedText = $('#todo-input'+index).val();
      if( updatedText != ''){
        editTodo(index, updatedText);
        render();
      }
      else{
        alert('You must enter a todo');
      }
      
    });
    //Edit Todo
  });

  //Check Todo
  $('#todos').on('click', '.todo-item-checkbox', function(event){
  	event.preventDefault();
    var index = $(event.target).parents('.todo-item').data('item');
    checkTodo(index);
    render();
  });

  //Check All Todos
  $('#todo-checkall').on('click', function(){
    for(var i = 0; i < todos.length; i++){
      checkAsCompleted(i);
    }
    render();
  });

  //Delete Todo
  $('#todos').on('click', '.todo-item-delete', function(event){
    event.preventDefault();
    var index = $(event.target).parents('.todo-item').data('item');
    deleteTodo(index);
    render();
  });

  //Delete All
  $('#todo-deleteall').on('click', function(){
    //Pretty sure this is not how I should be doing it
    todos = [];
    render();
  });


});

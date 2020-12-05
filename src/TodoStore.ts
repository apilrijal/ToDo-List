import { observable, computed } from 'mobx';

class Todo {
    @observable value;
    @observable id;
    @observable complete;

    constructor(value){
        this.value = value;
        this.id = Date.now();
        this.complete = false;
    }
}

class TodoStore {
    @observable todos: any = [];
    @observable filter: any = "";
    
    @computed get filterTodos(){
        let matchesFilter = new RegExp(this.filter, 'i');
        return this.todos.filter(todo => {
            return !this.filter || matchesFilter.test(todo.value);
        });
    }

    createTodo(value){
        this.todos.push(new Todo(value));
    }

    clearComplete = () => {
        const incompleteTodos = this.todos.filter(todo => !todo.complete);
        this.todos.replace(incompleteTodos);
    }
}

export const store = new TodoStore();
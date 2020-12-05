import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { store } from './TodoStore';
import DevTools from 'mobx-react-devtools';


interface Props {
    store?:any;
}
interface State {}

@observer
class TodoList extends React.Component<Props, State> {
    handleCreate = (e) => {
        if(e.which === 13){
            this.props.store.createTodo(e.target.value);
            e.target.value = '';
        }
    }
    handleChange = (e) => {
        this.props.store.filter = e.target.value;
    }
    toogleComplete(todo) {
        todo.complete = !todo.complete;
    }
    render(){
        const { todos, filter, filterTodos, clearComplete } = this.props.store;
        const list = filterTodos.map(todo => (
            <li key={todo.id}>
                <input 
                    type="checkbox"
                    onChange={this.toogleComplete.bind(this, todo)}
                    value={todo.complete}
                    checked={todo.complete} />
                {todo.value}
            </li>
        ))
        return(
            <div>
                <DevTools />
                <input onKeyPress={this.handleCreate}/>
                <input value={filter} onChange={this.handleChange}/>
                {list}
                <div>
                    <button onClick={clearComplete}>clear complete</button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <TodoList store={store} />,
    document.getElementById('root')
)
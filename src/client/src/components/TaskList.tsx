import { useSelector } from 'react-redux';
import {type TaskItem} from '../features/task/taskSlice';
import TaskListItem from './TaskListItem';
import {type RootState} from '../store';

interface TaskListProps {
    data: TaskItem[]
}

const TaskList: React.FunctionComponent<TaskListProps> = ({data}) => {
    const {totalTasks} = useSelector((store: RootState) => store.task);
    return (
        <section>
            {totalTasks === 0 ? (
                <h1 style={{margin: '1rem 0', textAlign: 'center'}}>Create a task to get started!</h1>
            ) : (
                <h1 style={{margin: '1rem 0'}}>{totalTasks} Task{totalTasks! > 1 && 's'} Found...</h1>
            )}
            {data.map(item => {
                return (
                    <TaskListItem key={item._id} data={item}/>
                );
            })}
        </section>
    );
}

export default TaskList;
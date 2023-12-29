import { useEffect, useState } from 'react';
import Ring from './Ring';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setTasks } from '../../store/tasksSlice';
import toast from 'react-hot-toast';
import { ITask } from '../../utils';

function Task({ id, name, type, completed }: ITask) {
  const [squareClicked, setSquareClicked] = useState(completed ? true : false);
  const [color, setColor] = useState<string>('');

  const lists = useAppSelector((state) => state.list);
  const tasks = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  const handleSquareClick = () => {
    if (completed) {
      setSquareClicked(false);
      setTimeout(() => {
        const taskIndex = tasks.findIndex((task) => task.id === id);
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = {
          ...updatedTasks[taskIndex],
          completed: false,
        };
        toast.success('Successfully uncompleted task');
        dispatch(setTasks(updatedTasks));
      }, 500);
    } else {
      setSquareClicked(true);
      setTimeout(() => {
        const taskIndex = tasks.findIndex((task) => task.id === id);
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = {
          ...updatedTasks[taskIndex],
          completed: true,
        };
        toast.success('Successfully completed task');
        dispatch(setTasks(updatedTasks));
      }, 500);
    }
  };

  const renderIcon = (color: string) => {
    switch (color) {
      case 'Home':
        return;
      case 'Completed':
        return;
      default:
        return <Ring color={color} isTitle={false} />;
    }
  };

  useEffect(() => {
    const selectedList = lists.find((item) => item.name === type);
    if (selectedList?.color) {
      setColor(selectedList?.color);
    }
  }, []);

  return (
    <div>
      <div className="relative flex items-center justify-center w-full h-full">
        <div
          className={`${
            squareClicked ? 'bg-opacity task ' : 'bg-white'
          }  shadow-xl rounded-xl mt-5  w-[70%] px-8 py-4 flex flex-row items-center justify-between relative`}
        >
          <div>
            <div className="flex flex-row space-x-3 items-center">
              <div
                className={`${
                  squareClicked
                    ? 'bg-green-300 hover:bg-gray-300'
                    : 'bg-gray-300 hover:bg-green-300'
                } rounded-sm cursor-pointer h-5 w-5`}
                onClick={handleSquareClick}
              />
              <div className="">{name}</div>
            </div>
          </div>
          {renderIcon(color)}
        </div>
      </div>
    </div>
  );
}

export default Task;

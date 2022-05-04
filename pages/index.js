import { useContext } from "react";
import AppContext from "../context/auth";
import { withAuth } from "../hoc/withAuth";

const TODOS = [
  { id: "1", task: "Do this", completed: true },
  { id: "2", task: "Do that", completed: false },
];

const fetchData = () => {
  return { data: TODOS, isLoading: true };
};



const Home = () => {
  const { data, isLoading } = fetchData();
  return <TodoList data={data} isLoading={isLoading} />;
};

const TodoList = ({ data }) => {
  return (
    <ul>
      {data.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

//const TodoList = withAuth(BaseTodoList);

const TodoItem = ({ item }) => {
  return (
    <li>
      {item.task} {item.completed.toString()}
    </li>
  );
};

export default withAuth(Home);

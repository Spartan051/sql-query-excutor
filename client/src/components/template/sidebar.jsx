import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
      <>
    <div className=" w-[10%] h-screen fixed bg-blue-500 " >
      <ul className="flex flex-col items-center justify-around h-[50%] ">
        <li>
          <Link to="/connections"> Connections </Link>
        </li>
        <li >
          <Link to="/queries">Queries</Link>
        </li>
        <li >
          <Link to="/forms">Forms</Link>
        </li>
        <li >
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </div>
    </>
  );
};

export default Sidebar;

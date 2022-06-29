import { useRef } from "react";

const EditConnection = ({ handleEditConnection, handleEditpop, pervConnection }) => {
  const name = useRef(null);
  const host = useRef(null);
  const database = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const data = pervConnection[0];

  function setData() {
    const editedData = {
      connection_id: data.connection_id,
      connection_name: name.current.value,
      host: host.current.value,
      database_name: database.current.value,
      username: username.current.value,
      password: password.current.value,
    };
    
    handleEditConnection(editedData);
  }

  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className=" overflow-y-auto overflow-x-hidden fixed z-50 w-full flex justify-center items-center md:inset-0 h-modal md:h-full"
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* header */}

          <div className="flex py-4 justify-between ml-[35%] mr-[2%] rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl items-center font-semibold  text-gray-900 dark:text-white">
              Edit Connection
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:bg-red-500 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
              onClick={() => handleEditpop()}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          {/* main */}

          <div className="flex flex-col items-end mr-[50%] ">
            <div className="mt-3">
              <label htmlFor="name">name :</label>
              <input
                type="text"
                id="name"
                className="bg-gray-600 ml-2 rounded-xl text-white px-3"
                ref={name}
                defaultValue={data.connection_name}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="host">host :</label>
              <input
                type="text"
                id="host"
                className="bg-gray-600 ml-2 rounded-xl text-white px-3"
                ref={host}
                defaultValue={data.host}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="database">database :</label>
              <input
                type="text"
                id="database"
                className="bg-gray-600 ml-2 rounded-xl text-white px-3"
                ref={database}
                defaultValue={data.database_name}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="username">username :</label>
              <input
                type="text"
                id="username"
                className="bg-gray-600 ml-2 rounded-xl text-white px-3"
                ref={username}
                defaultValue={data.username}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="password">password :</label>
              <input
                type="password"
                id="password"
                className="bg-gray-600 ml-2 rounded-xl text-white px-3"
                ref={password}
                defaultValue={data.password}
              />
            </div>
          </div>

          {/* footer */}

          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button
              data-modal-toggle="defaultModal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={setData}
            >
              edit
            </button>
            <button
              data-modal-toggle="defaultModal"
              type="button"
              className="text-gray-500 bg-white hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={() => handleEditpop()}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditConnection;

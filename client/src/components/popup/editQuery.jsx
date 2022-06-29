import { useRef , useState } from "react";

const EditQuery = ({ handleEditConnection, handleEditpop, pervQuery }) => {
  const [result, setResult] = useState();

  const queryName = useRef(null);
  const query = useRef(null);
  const connectionName = useRef(null);
  const fields = useRef(null);
  const data = pervQuery[0];

  function setData() {
    const editedQuery = {
      query_id: data.query_id,
      connection_name: connectionName.current.value,
      query_name: queryName.current.value,
      query: query.current.value,
      fields: fields.current.value,
      show_type: result,
    };
    
    handleEditConnection(editedQuery);
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
              Edit Query
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

          <div className="flex flex-col items-end mr-[45%] ">
            <div className="mt-3">
              <label htmlFor="connectionName">connection name :</label>
              <input
                type="text"
                id="connectionName"
                className="bg-gray-600 ml-2 rounded-xl text-white px-3"
                ref={connectionName}
                defaultValue={data.connection_name}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="queyName">query name :</label>
              <input
                type="text"
                id="queyName"
                className="bg-gray-600 ml-2 rounded-xl text-white px-3"
                ref={queryName}
                defaultValue={data.query_name}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="query">query :</label>
              <input
                type="text"
                id="query"
                className="bg-gray-600 ml-2 rounded-xl text-white px-3"
                ref={query}
                defaultValue={data.query}
              />
            </div>

            <div className="mt-3">
              <label htmlFor="connectionName">fields :</label>
              <input
                type="text"
                id="fields"
                className="bg-gray-600 ml-2 rounded-xl text-white px-3"
                ref={fields}
                defaultValue={data.fields}
              />
            </div>
            <div className=" mt-3 mr-[-20%]">
              <span>output : </span>
              <label htmlFor="output1" className="ml-5">
                table
              </label>
              <input
                type="radio"
                id="output1"
                className="bg-gray-600 ml-2 rounded-xl text-white px-3"
                name="output"
                value="table"
                onChange={(e) => setResult(e.target.value)}
              />

              <label htmlFor="output2" className="ml-9">
                number
              </label>
              <input
                type="radio"
                id="output2"
                className="bg-gray-600 ml-2 rounded-xl text-white px-3"
                name="output"
                value="number"
                onChange={(e) => setResult(e.target.value)}
              />

              <label htmlFor="outpu3" className="ml-9">
                chart
              </label>
              <input
                type="radio"
                id="outpu3"
                className="bg-gray-600 ml-2 rounded-xl text-white px-3"
                name="output"
                value="chart"
                onChange={(e) => setResult(e.target.value)}
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

export default EditQuery;

import { useRef } from "react";

const AddForms = ({ handleClose, handleAddForm }) => {
  const formName = useRef(null);
  const queryNmaes = useRef(null);

  function setData() {
    const data = {
      form_name: formName.current.value,
      query_names: queryNmaes.current.value,
    };
    handleAddForm(data);
  }

  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className=" overflow-y-auto overflow-x-hidden fixed z-50 w-full flex justify-center items-center h-modal
      md:inset-0  md:h-full"
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* header */}

          <div className="flex py-4 justify-between ml-[35%] rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl items-center font-semibold  text-gray-900 dark:text-white">
              Add Form
            </h3>
            <button
              type="button"
              className="text-gray-400 rounded-lg text-sm p-1.5
              hover:bg-red-500 hover:text-gray-900  
              dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
              onClick={() => handleClose()}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 
                  01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          {/* main */}

          <div className="flex flex-col items-end mr-[50%]">
            <div className="mt-3">
              <label htmlFor="formName">form name :</label>
              <input
                type="text"
                id="formName"
                className="bg-gray-600 ml-2 rounded-xl text-white px-3"
                ref={formName}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="queryNmaes">query names :</label>
              <input
                type="text"
                id="queryNmaes"
                className="bg-gray-600 ml-2 rounded-xl text-white px-3"
                ref={queryNmaes}
              />
            </div>
          </div>

          {/* footer */}

          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button
              data-modal-toggle="defaultModal"
              type="submit"
              className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center
              hover:bg-blue-800 
              focus:ring-4 focus:outline-none focus:ring-blue-300  
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={setData}
            >
              Add
            </button>
            <button
              data-modal-toggle="defaultModal"
              type="button"
              className="text-gray-500 bg-white rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5
              hover:bg-red-500 focus:ring-4 
              focus:outline-none focus:ring-blue-300  hover:text-gray-900 focus:z-10 
              dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 
              dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddForms;

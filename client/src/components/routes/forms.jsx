import { useEffect, useState } from "react";
import AddForms from "../popup/addForms";
import {
  getFormsList,
  createNewForm,
  createExecuteQuery,
} from "../services/formsApi";
import Loading from "../template/loading";
import NotFound from "../template/notFound";

const Forms = () => {
  const [forms, setForms] = useState([]);
  const [dataExecute, setDataExecute] = useState({});
  const [addpop, setAddpop] = useState(false);
  const [loading, setLoading] = useState(true);
  const [result] = useState("result");

  useEffect(() => {
    setTimeout(() => {
      getForms();
    }, 1000);
  }, []);

  async function getForms() {
    try {
      const response = await getFormsList();

      if (response.data.message === "forms has been send") {
        setForms(response.data.data);
        setLoading(false);
        console.log("forms are received");
      } else {
        console.log(`error : ${response.data.message}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function newForm(value) {
    try {
      const response = await createNewForm(value);

      if (response.data.message === "form is created") {
        getForms();
        setAddpop(false);
        console.log(response.data.message);
      } else {
        console.log(`error : ${response.data.message}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function newExecute(value) {
    try {
      const response = await createExecuteQuery(value);

      if (response.data.message === "query is executed") {
        console.log(response.data.message);
        console.log(response.data.data);
      } else {
        console.log(`error : ${response.data.message}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleAddpop() {
    setAddpop(false);
  }

  function handleAddForm(value) {
    newForm(value);
  }

  function handleInput(e) {
    let id = e.target.id;
    let name = e.target.name;
    let value = e.target.value;

    setDataExecute((prevState) => {
      return {
        ...prevState,
        [id]: value,
        name: name,
      };
    });
  }

  function handleData() {
    newExecute(dataExecute);
  }

  return (
    <>
      {addpop === true && (
        <AddForms handleAddpop={handleAddpop} handleAddForm={handleAddForm} />
      )}

      <div className="w-[90%] ml-[10%]">
        <h1 className="text-center mt-14 text-5xl font-bold">Forms</h1>
        <button
          className="block ml-[93%] text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center
          hover:bg-blue-800 
          focus:ring-4 focus:outline-none focus:ring-blue-300  
          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          data-modal-toggle="defaultModal"
          onClick={() => setAddpop(true)}
        >
          new
        </button>
        <hr className="border-black w-[80%] mx-auto border-2 mt-4" />

        {forms.length === 0 && loading === false && <NotFound />}

        {loading === true && <Loading />}

        <div className="flex justify-around flex-wrap mx-auto w-[80%]">
          {loading === false &&
            forms.map((item, index) => (
              <div
                className="w-[45%] bg-gray-500 h-fit mt-20 rounded-lg"
                key={index}
              >
                <h1 className="text-center mt-5">{item.form_name} </h1>
                {JSON.parse(item.queries).map((item, index) => (
                  <div
                    className="flex flex-col justify-center items-center"
                    key={index}
                  >
                    <h1 className="text-center mt-5">{item.query_name} </h1>

                    {item.fields.split(",").map((value, index) => (
                      <div className="mt-5 self-start" key={index}>
                        <label htmlFor={index} className="ml-3">
                          {value} :
                        </label>
                        <input
                          type="text"
                          name={item.query_name}
                          id={index}
                          className="bg-gray-600 ml-2 rounded-xl text-white px-3"
                          onChange={handleInput}
                        />
                      </div>
                    ))}

                    <button
                      onClick={handleData}
                      className="my-5 bg-blue-500 w-10% px-3 py-1 rounded-md"
                    >
                      Run
                    </button>
                    <div className="w-[80%] h-60 bg-green-700 mx-auto flex justify-center items-center mb-5">
                      {result}
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Forms;

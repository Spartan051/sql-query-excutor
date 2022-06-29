import { useState, useEffect } from "react";
import AddQuery from "../popup/addQuery";
import EditQuery from "../popup/editQuery";
import Loading from "../template/loading";
import NotFound from "../template/notFound";
import {
  getAllQueries,
  createNewQuery,
  getOneQuery,
  deleteOneQuery,
  updateOneQuery,
} from "../services/queriesApi";

const Queries = () => {
  const [addpop, setAddpop] = useState(false);
  const [editpop, setEditpop] = useState(false);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pervQuery, setPervQuery] = useState({});

  useEffect(() => {
    setTimeout(() => {
      getQueries();
    }, 1000);
  }, []);

  async function getQueries() {
    try {
      const response = await getAllQueries();
      if (response.data.message === "queries has been send") {
        setQueries(response.data.data);
        setLoading(false);
        console.log("queries are recieved");
      } else {
        console.log(`error : ${response.data.message}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getQuery(value) {
    try {
      const response = await getOneQuery(value);
      if (response.data.message === "query has been send") {
        setPervQuery(response.data.data);
        setEditpop(true);
        console.log(`query ${pervQuery[0].query_name} is received`);
      } else {
        console.log(`error : ${response.data.data}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function newQuery(value) {
    try {
      const response = await createNewQuery(value);
      if (response.data.message === "query is created") {
        setAddpop(false);
        console.log(response.data.message);
      } else {
        console.log(`error : ${response.data.message}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteQuery(value) {
    try {
      const response = await deleteOneQuery(value);
      if (response.data.message === "query is deleted") {
        getQueries();
        console.log(response.data.message);
      } else {
        console.log(`error : ${response.data.message}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function updateQuery(value) {
    try {
      const response = await updateOneQuery(value);
      if (response.data.message === "query is updated") {
        getQueries();
        setEditpop(false);
        console.log(response.data.message);
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

  function handleAddQuery(value) {
    newQuery(value);
    getQueries();
  }

  function handleEditpop() {
    setEditpop(false);
  }

  function handleEditConnection(value) {
    updateQuery(value);
  }

  function onDelete(e) {
    deleteQuery(e.target.id);
  }

  function onEdit(e) {
    getQuery(e.target.id);
  }

  return (
    <>
      {addpop === true && (
        <AddQuery handleAddpop={handleAddpop} handleAddQuery={handleAddQuery} />
      )}
      {editpop === true && (
        <EditQuery
          handleEditpop={handleEditpop}
          handleEditConnection={handleEditConnection}
          pervQuery={pervQuery}
        />
      )}

      <div className="w-[90%] ml-[10%]">
        <h1 className="text-center mt-14 text-5xl font-bold">Queries</h1>
        <button
          className="block ml-[93%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          data-modal-toggle="defaultModal"
          onClick={() => setAddpop(true)}
        >
          new
        </button>
        <hr className="border-black w-[80%] mx-auto border-2 mt-4" />

        {queries.length === 0 && loading === false && <NotFound />}

        {loading === true && <Loading />}

        <div className="flex justify-around flex-wrap mx-auto w-[80%]">
          {loading === false &&
            queries.map((item, index) => (
              <div
                className="w-[26%] bg-gray-500 h-72 mt-16 rounded-lg"
                key={index}
              >
                <ul className="ml-4">
                  <li className=" mt-5">
                    connection name :{" "}
                    <span className="text-red-800">{item.connection_name}</span>
                  </li>
                  <li className=" mt-5">
                    query name :{" "}
                    <span className="text-red-800">{item.query_name}</span>
                  </li>
                  <li className=" mt-5">
                    query : <span className="text-red-800">{item.query}</span>
                  </li>
                  <li className=" mt-5">
                    fields : <span className="text-red-800">{item.fields}</span>
                  </li>
                  <li className=" mt-5">
                    show type :{" "}
                    <span className="text-red-800">{item.show_type}</span>
                  </li>
                </ul>
                <div className="flex justify-between mx-20 mt-6">
                  <button
                    className="bg-blue-500 py-1 px-3 rounded-md"
                    id={item.query_id}
                    onClick={onEdit}
                  >
                    edit
                  </button>
                  <button
                    className="bg-red-500 py-1 px-3 rounded-md"
                    id={item.query_id}
                    onClick={onDelete}
                  >
                    delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Queries;

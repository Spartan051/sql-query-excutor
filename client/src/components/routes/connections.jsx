import { useEffect, useState } from "react";
import AddConnection from "../popup/addConnection";
import EditConnection from "../popup/editConnection";
import NotFound from "../template/notFound";
import Loading from "../template/loading";
import ReactPaginate from "react-paginate";
import "./conecction.css";
import {
  getAllConnections,
  createNewConnection,
  deleteOneConnection,
  getOneConnection,
  updateOneConnection,
} from "../services/connectionsApi";
// import axios from "axios";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [addpop, setAddpop] = useState(false);
  const [editpop, setEditpop] = useState(false);
  const [showLoading, setLoading] = useState(true);
  const [pervConnection, setPervConnection] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const connectionPerPage = 6;
  const pagesVisited = pageNumber * connectionPerPage;
  const pageCount = Math.ceil(connections.length / connectionPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await getAllConnections();
      console.log(response.data.data);
      setConnections(response.data.data);
      setLoading(false);
      console.log(connections);
    } catch (error) {
      console.log(error);
    }
  };

  async function getConnections() {
    try {
      let response = await getAllConnections();
      console.log(response);
      if (response.data.message === "connections has been send") {
        setConnections(response.data.data);
        setLoading(false);
        console.log("connections are received");
      } else {
        console.log(`error : ${response.data.message}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function newConnection(value) {
    try {
      const response = await createNewConnection(value);
      if (response.data.message === "connection is created") {
        setAddpop(false);
        getConnections();

        console.log(response.data.message);
      } else {
        console.log(`error : ${response.data.message}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getConnection(value) {
    try {
      const response = await getOneConnection(value);
      if (response.data.message === "connection has been send") {
        setPervConnection(response.data.data);
        setEditpop(true);
        console.log(
          `connection ${pervConnection[0].connection_name} is received`
        );
      } else {
        console.log(`error : ${response.data.message}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteConnection(value) {
    try {
      const response = await deleteOneConnection(value);
      if (response.data.message === "connection is deleted") {
        getConnections();
        console.log(response.data.message);
      } else {
        console.log(`error : ${response.data.message}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function updateConnection(value) {
    try {
      const response = await updateOneConnection(value);
      if (response.data.message === "connection is updated") {
        getConnections();
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

  function handleAddConnection(value) {
    newConnection(value);
  }

  function handleEditpop() {
    setEditpop(false);
  }

  function handleEditConnection(value) {
    updateConnection(value);
  }

  function onDelete(e) {
    deleteConnection(e.target.id);
    getConnections();
  }

  function onEdit(e) {
    getConnection(e.target.id);
  }

  return (
    <>
      {addpop === true && (
        <AddConnection
          handleAddpop={handleAddpop}
          handleAddConnection={handleAddConnection}
        />
      )}
      {editpop === true && (
        <EditConnection
          handleEditpop={handleEditpop}
          handleEditConnection={handleEditConnection}
          pervConnection={pervConnection}
        />
      )}
      <div className="w-full">
        <div className="flex justify-between items-center mt-6 mb-2">
          <h1 className="text-center ml-20 text-[#112A46] text-3xl font-bold">
            Connections
          </h1>
          <div>
            <button
              onClick={() => setAddpop(true)}
              type="button"
              class="text-white mr-20 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
            >
              New Connection
            </button>
          </div>
        </div>
        <hr className="border-gray-500 w-[80%] mx-auto border my-0.5" />

        {connections.length === 0 && showLoading === false && <NotFound />}

        {showLoading === true && <Loading />}

        <div className="flex justify-around mb-8 flex-wrap mx-auto w-[80%]">
          {showLoading === false &&
            connections
              .slice(pagesVisited, pagesVisited + connectionPerPage)
              .map((item, index) => {
                return (
                  <div
                    className="w-[26%] bg-[#f3f1f1] shadow-xl h-64 mt-20 rounded-lg"
                    key={index}
                  >
                    <ul className="ml-4">
                      <li className="mt-6 border-b-2  border-gray-200 border-solid w-[80%] text-[#112A46]">
                        Connection Name :
                        <span className="text-[#323436] font-semibold ml-1 ">
                          {item.connection_name}
                        </span>
                      </li>
                      <li className=" mt-4 border-b-2 border-gray-200 border-solid w-[80%] text-[#112A46]">
                        Host :
                        <span className="text-[#323436] font-semibold  ml-1">
                          {item.host}
                        </span>
                      </li>
                      <li className=" mt-4 border-b-2 border-gray-200 border-solid w-[80%] text-[#112A46]">
                        Database Name :
                        <span className="text-[#323436] font-semibold  ml-1">
                          {item.database_name}
                        </span>
                      </li>
                      <li className=" mb-4 mt-4 border-b-2 border-gray-200 border-solid w-[80%] text-[#112A46]">
                        Username :
                        <span className="text-[#323436] font-semibold  ml-1">
                          {item.username}
                        </span>
                      </li>
                    </ul>

                    <div className="flex justify-between mx-2 mt-2">
                      <div className="w-full mr-2">
                        <span className="block w-full rounded-md shadow-sm">
                          <button
                            id={item.id}
                            onClick={onEdit}
                            type="button"
                            className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                          >
                            Edit
                          </button>
                        </span>
                      </div>{" "}
                      <div className="w-full">
                        <span className="block w-full rounded-md shadow-sm">
                          <button
                            id={item.id}
                            onClick={onDelete}
                            type="button"
                            className="text-white bg-gradient-to-r w-full from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          >
                            Delete
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        <div id="page" className="flex items-center ">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            breakLabel="..."
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </div>{" "}
    </>
  );
};

export default Connections;

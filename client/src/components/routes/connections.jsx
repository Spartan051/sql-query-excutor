import { useEffect, useState } from "react";
import AddConnection from "../popup/addConnection";
import EditConnection from "../popup/editConnection";
import NotFound from "../template/notFound";
import Loading from "../template/loading";
import {
  getAllConnections,
  createNewConnection,
  deleteOneConnection,
  getOneConnection,
  updateOneConnection,
} from "../services/connectionsApi";
// import axios from "axios";

const Connections = () => {
  let [connections, setConnections] = useState([]);
  const [addpop, setAddpop] = useState(false);
  const [editpop, setEditpop] = useState(false);
  const [showLoading, setLoading] = useState(true);
  const [pervConnection, setPervConnection] = useState({});

  // useEffect(() => {
  //   setTimeout(() => {
  //     getConnections();
  //   }, 1000);
  // }, []);

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get("http://172.16.1.63:8080/api/connections");
  //       console.log(res.data.data);
  //       connections = res.data.data;
  //       setConnections(res.data.data);
  //       console.log(connections);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  // getConnections();
  // fetchData();
  // console.log(connections);
  // const mamad = await axios
  //   .get("http://172.16.1.63:8080/api/connections")
  //   .then((res) => {
  //     console.log(res.data.data);
  //     setConnections(res.data.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }, []);

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
    getConnections();
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

        <div className="flex justify-around flex-wrap mx-auto w-[80%]">
          {showLoading === false &&
            connections.map((item, index) => {
              return (
                <div
                  className="w-[26%] bg-gray-500 h-64 mt-20 rounded-lg"
                  key={index}
                >
                  <ul className="ml-4">
                    <li className=" mt-6">
                      connection_name :{" "}
                      <span className="text-red-800">
                        {item.connection_name}
                      </span>
                    </li>
                    <li className=" mt-6">
                      host : <span className="text-red-800">{item.host}</span>
                    </li>
                    <li className=" mt-6">
                      database_name :{" "}
                      <span className="text-red-800">{item.database_name}</span>
                    </li>
                    <li className=" mt-6">
                      username :{" "}
                      <span className="text-red-800">{item.username}</span>
                    </li>
                  </ul>
                  <div className="flex justify-between mx-20 mt-6">
                    <button
                      id={item.connection_id}
                      className="bg-blue-500 py-1 px-3 rounded-md"
                      onClick={onEdit}
                    >
                      edit
                    </button>
                    <button
                      id={item.connection_id}
                      className="bg-red-500 py-1 px-3 rounded-md"
                      onClick={onDelete}
                    >
                      delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>{" "}
    </>
  );
};

export default Connections;

import { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";

type Props = {
  userNo: any;
  socket: any;
  setUsers: any;
  setUserNo: any;
};

const Room = ({ userNo, socket, setUsers, setUserNo }: Props) => {
  const canvasRef: any = useRef(null);
  const contextRef: any = useRef(null);
  const [color, setColor] = useState("#000000");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [tool, setTool] = useState("pencil");

  useEffect(() => {
    socket.on("users", (data: any) => {
      setUsers(data);
      setUserNo(data.length);
    });
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    setElements([]);
  };

  const handleUndo = () => {
    setHistory((prevHistory) => [
      ...prevHistory,
      elements[elements.length - 1],
    ]);
    setElements((prevElements) =>
      prevElements.filter((element, index) => index !== elements.length - 1)
    );
  };

  const handleRedo = () => {
    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1],
    ]);
    setHistory((prevHistory) =>
      prevHistory.filter((element, index) => index !== history.length - 1)
    );
  };

  return (
    <div className="container-fluid">
      {/* <div className="row">
        <h1 className="display-5 pt-4 pb-3 text-center">
          React Drawing App - users online:{userNo}
        </h1>
      </div> */}
      {/* <div className="row justify-content-center align-items-center text-center py-2">
        <div className="col-md-2">
          <button
            type="button"
            className="btn btn-outline-primary"
            disabled={elements.length === 0}
            onClick={handleUndo}
          >
            Undo
          </button>
          <button
            type="button"
            className="btn btn-outline-primary ml-1"
            disabled={history.length < 1}
            onClick={handleRedo}
          >
            Redo
          </button>
        </div>
        <div className="col-md-1">
          <div className="color-picker d-flex align-items-center justify-content-center">
            <input
              type="button"
              className="btn btn-danger"
              value="clear canvas"
              onClick={clearCanvas}
            />
          </div>
        </div>
      </div> */}
      <div className="row">
        <Canvas
          canvasRef={canvasRef}
          contextRef={contextRef}
          color={color}
          setElements={setElements}
          elements={elements}
          tool={tool}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default Room;

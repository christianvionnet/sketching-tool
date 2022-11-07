import { useRef, useState, useEffect } from "react";
import io from "socket.io-client";

const server = "http://localhost:5000";
const connectionOptions = {
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io(server, connectionOptions);

const Board = () => {
  const canvasRef: any = useRef(null);
  const contextRef: any = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  socket.on("canvas-data", (data) => {
    // let interval = setInterval(() => {
    if (isDrawing) return;
    setIsDrawing(true);
    // clearInterval(interval);
    const image = new Image();
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    image.onload = () => {
      context?.drawImage(image, 0, 0);
      setIsDrawing(false);
    };
    image.src = data;
    // }, 100);
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px `;

    const context = canvas?.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "#000000";
    context.lineWidth = "1";
    contextRef.current = context;
  }, []);

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas?.getContext("2d");
  //   context.strokeStyle = color;
  //   context.lineWidth = size;
  // }, [color, size]);

  const startDrawing = ({ nativeEvent }: { nativeEvent: any }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    console.log("startDrawing");
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    console.log("finishDrawing");
  };

  const draw = ({ nativeEvent }: { nativeEvent: any }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    const canvas = canvasRef.current;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    if (offsetX > canvas.style.width) {
      contextRef.current.closePath();
      setIsDrawing(false);
      console.log("holis");
    }
    const canvasImage = canvas.toDataURL("image/png");
    // socket.dispatchEvent(canvasEvent);
    // socket.emit("canvas-data", canvasImage);
    console.log("draw");
  };

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
};

export default Board;

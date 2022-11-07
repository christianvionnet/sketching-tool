import React, { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm.js";

type Props = {
  canvasRef: any;
  contextRef: any;
  color: any;
  setElements: any;
  elements: any;
  tool: any;
  socket: any;
};

// const generator = rough.generator();
const Canvas = ({
  canvasRef,
  contextRef,
  color,
  setElements,
  elements,
  tool,
  socket,
}: Props) => {
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const context = canvas.getContext("2d");

    context.strokeWidth = 5;
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    contextRef.current.strokeStyle = color;
  }, [color]);

  const handleMouseDown = (e: any) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pencil") {
      setElements((prevElements: any) => [
        ...prevElements,
        {
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
          element: tool,
        },
      ]);
    }
    // else {
    //   setElements((prevElements: any) => [
    //     ...prevElements,
    //     { offsetX, offsetY, stroke: color, element: tool },
    //   ]);
    // }

    setIsDrawing(true);
  };

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);
    if (elements.length > 0) {
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
    elements.forEach((ele: any, i: any) => {
      // if (ele.element === "rect") {
      //   roughCanvas.draw(
      //     generator.rectangle(ele.offsetX, ele.offsetY, ele.width, ele.height, {
      //       stroke: ele.stroke,
      //       roughness: 0,
      //       strokeWidth: 5,
      //     })
      //   );
      // } else if (ele.element === "line") {
      //   roughCanvas.draw(
      //     generator.line(ele.offsetX, ele.offsetY, ele.width, ele.height, {
      //       stroke: ele.stroke,
      //       roughness: 0,
      //       strokeWidth: 5,
      //     })
      //   );
      // }
      if (ele.element === "pencil") {
        roughCanvas.linearPath(ele.path, {
          stroke: ele.stroke,
          roughness: 0,
          strokeWidth: 5,
        });
      }
    });
    const canvasImage = canvasRef.current.toDataURL();
    socket.emit("drawing", canvasImage);
  }, [elements]);

  const handleMouseMove = (e: any) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = e.nativeEvent;

    // if (tool === "rect") {
    //   setElements((prevElements: any) =>
    //     prevElements.map((ele: any, index: any) =>
    //       index === elements.length - 1
    //         ? {
    //             offsetX: ele.offsetX,
    //             offsetY: ele.offsetY,
    //             width: offsetX - ele.offsetX,
    //             height: offsetY - ele.offsetY,
    //             stroke: ele.stroke,
    //             element: ele.element,
    //           }
    //         : ele
    //     )
    //   );
    // } else if (tool === "line") {
    //   setElements((prevElements: any) =>
    //     prevElements.map((ele: any, index: any) =>
    //       index === elements.length - 1
    //         ? {
    //             offsetX: ele.offsetX,
    //             offsetY: ele.offsetY,
    //             width: offsetX,
    //             height: offsetY,
    //             stroke: ele.stroke,
    //             element: ele.element,
    //           }
    //         : ele
    //     )
    //   );
    // } else if (tool === "pencil") {
    if (tool === "pencil") {
      setElements((prevElements: any) =>
        prevElements.map((ele: any, index: any) =>
          index === elements.length - 1
            ? {
                offsetX: ele.offsetX,
                offsetY: ele.offsetY,
                path: [...ele.path, [offsetX, offsetY]],
                stroke: ele.stroke,
                element: ele.element,
              }
            : ele
        )
      );
    }
  };
  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div
      className="canvas-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;

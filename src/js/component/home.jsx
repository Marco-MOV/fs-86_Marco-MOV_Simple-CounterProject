import React, { useState, useEffect } from "react";

const Home = () => {
    const [showTitle, setShowTitle] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [count, setCount] = useState("");
    const [squares, setSquares] = useState([]);
    const [counter, setCounter] = useState(0);
    const [timer, setTimer] = useState(null);

    const generateSquares = (total) => {
        if (timer) return;

        const interval = setInterval(() => {
            setCounter((stateCounter) => {
                if (stateCounter < total) {
                    setSquares((stateSquares) => [
                        ...stateSquares,
                        {
                            id: stateCounter,
                            top: Math.random() * 90 + "%",
                            left: Math.random() * 90 + "%",
                        },
                    ]);
                    return stateCounter + 1;
                };
                if (stateCounter >= total){
                    clearInterval(interval);
                    setTimer(null);
                    return stateCounter;
                }
            });
        }, 700);
        setTimer(interval);
    };

    useEffect(() => {
        const time = setTimeout(() => {
            setShowTitle(true);
        }, 1000);
        return () => clearTimeout(time);
    }, []);

    return (
        <div className="squareWorld">
            <div className="header">
                <h3>CARLOS! Welcome to..</h3>
                <h1 className={`squareWorld-title ${showTitle ? "visible" : ""}`}>
                    THE SQUARE WORLD!!
                </h1>
            </div>
            <div className="body">
                <h4>
                    Sabías que.... Un cuadrado es el único polígono regular
                    <br/>
                    con un ángulo interior perfecto de 90 grados en cada esquina,
                    <br/>
                    lo que lo hace increíblemente simétrico. Además, si divides
                    un cuadrado por sus diagonales,
                    <br/>
                    obtendrás cuatro triángulos rectángulos isósceles
                    idénticos.
                </h4>
                <button onClick={() => setShowInput(true)}>Generar Cuadrados</button>
                {showInput && (
                    <div className="input-container">
                        <input
                            type="number"
                            placeholder="Introduce la cantidad"
                            value={count}
                            onChange={(e) => {
                                console.log("Nuevo valor:", e.target.value);
                                setCount(e.target.value);
                            }}
                            className="input-bar"
                        />
                        <button
                            onClick={() => generateSquares(parseInt(count))}
                            className="btn-confirm"
                        >
                            Confirmar
                        </button>
                    </div>
                )}
                <div className="counter">
                    <h4>Cuadrados generados: {counter}</h4>
                </div>
                <div className="square-container">
                    {squares.map((square) => (
                        <div
                            key={square.id}
                            className="square"
                            style={{
                                top: square.top,
                                left: square.left,
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
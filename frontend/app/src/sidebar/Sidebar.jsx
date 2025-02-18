



import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Sidebar.css';

import logo from '../assets/code.png';
import termi from '../assets/terminal.png';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router-dom";

// Import images corresponding to time complexities


import defaultImage from '../assets/default.png';

function SimpleSidebar() {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const codeRef = useRef(null);
    const terminalRef = useRef(null);
    const [isResizing, setIsResizing] = useState(false);
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [timeComplexity, setTimeComplexity] = useState('');  // NEW STATE VARIABLE
    const [timeComplexityImage, setTimeComplexityImage] = useState(defaultImage); // NEW IMAGE STATE
    const [explanation, setExplanation] = useState('');  // NEW STATE VARIABLE FOR EXPLANATION
    const [graphData, setGraphData] = useState([]);


    const handleMouseMove = (e) => {
        if (isResizing) {
            const newHeight = e.clientY - codeRef.current.getBoundingClientRect().top;
            codeRef.current.style.height = `${newHeight}px`;
            terminalRef.current.style.height = `${810 - newHeight}px`; // Adjust based on the total height you want
        }
    };

    const handleMouseDown = () => {
        setIsResizing(true);
    };

    const handleMouseUp = () => {
        setIsResizing(false);
    };

    const handleKeyDown = (e) => {
        // Handle Tab key press to insert spaces (4 spaces)
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = codeRef.current.selectionStart;
            const end = codeRef.current.selectionEnd;
            const value = codeRef.current.value;
            codeRef.current.value = value.substring(0, start) + '    ' + value.substring(end);
            codeRef.current.selectionStart = codeRef.current.selectionEnd = start + 4;
        }
    };

    const handleSubmitCode = async () => {
    const code = codeRef.current.value;
    try {
        const response = await axios.post('http://localhost:8000/execute_code/', { code }, { headers: { 'Content-Type': 'application/json' } });
        setOutput(response.data.result);
        setTimeComplexity(response.data.time_complexity);
        setExplanation(response.data.explanation);
        setError('');
        generateGraph(response.data.time_complexity);
    } catch (err) {
        setError(err.response?.data?.error || 'Error executing code');
        setOutput('');
        setTimeComplexity('');
        setExplanation('');
        setGraphData([]);
    }
};
        const generateGraph = (complexity) => {
            const nValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            let data = [];
            
            switch (complexity) {
                case 'O(1)':
                    data = nValues.map(n => ({ n, time: 1 }));
                    break;
                case 'O(n)':
                    data = nValues.map(n => ({ n, time: n }));
                    break;
                case 'O(n^2)':
                    data = nValues.map(n => ({ n, time: n * n }));
                    break;
                case 'O(n^3)':
                    data = nValues.map(n => ({ n, time: n * n * n }));
                    break;
                case 'O(log n)':
                    data = nValues.map(n => ({ n, time: Math.log2(n) }));
                    break;
                case 'O(n log n)':
                    data = nValues.map(n => ({ n, time: n * Math.log2(n) }));
                    break;
                case 'O(2^n)':
                    data = nValues.map(n => ({ n, time: Math.pow(2, n) }));
                    break;
                case 'O(n!)':
                    data = nValues.map(n => ({ n, time: factorial(n) }));
                    break;
                default:
                    data = [];
                    break;
            }
            setGraphData(data);
        };

    const handleClear = () => {
        if (codeRef.current) {
            codeRef.current.value = ''; // Clear the text in the "write-here" textarea
        }
        setError('');
        setOutput('');
        setTimeComplexity('');
        setExplanation('');
        setGraphData('');
        setTimeComplexityImage(defaultImage); // Reset to default image on clear
    };

    return (
        <div className='main-frame' onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <button className={`click-here ${isCollapsed ? 'collapsed' : ''}`} onClick={() => setIsCollapsed(!isCollapsed)}>
                    {isCollapsed ? '☰' : 'x'}
                </button>
                {!isCollapsed && (
                    <ul className='elements'>
                        <button className='routes' onClick={() => navigate("..")}>Home</button>
                        <br />
                        <br />
                        <button className='routes'>Explore</button>
                    </ul>
                )}
            </div>

            <div className="content">
                <div className='code-header'>
                    <img src={logo} alt="Logo" className="code-logo" />
                </div>
                <textarea
                    className="write-here"
                    ref={codeRef}
                    placeholder="Write your Python code here..."
                    onKeyDown={handleKeyDown} // Handle Tab key press
                    rows={15} // Adjust the number of rows to change the height
                />
                <div className='execute'>
                    <button className='click-run' onClick={handleSubmitCode}>Run</button>
                    <button className='click-run'  onClick={handleClear}>Clear</button>
                </div>
                <div className='terminal-whole'>
                    <div className='terminal-title'>
                        <img src={termi} alt="Logo" className="termi-logo" />
                    </div>
                    <div
                        className="terminal"
                        ref={terminalRef}
                        onMouseDown={handleMouseDown}
                    >
                        {/* Display output or error here */}
                        <div className='output'>
                            {output && <pre>{output}</pre>}
                            {error && <pre style={{ color: 'red' }}>{error}</pre>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="time-area">
                <div className='time-header'>
                    Time Complexity
                </div>
                <div className='time-content'>
                    <div className='graph-header'>
                        Graph
                    </div>
                    <div className='graph-image'>
                        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingLeft: "20px" }}>
                            {/* Time Complexity Label */}
                            <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px", color: "#9d64ed" }}>
                                Time Complexity: {timeComplexity}
                            </div>

                            {/* Graph Container */}
                            <ResponsiveContainer width="90%" height={300}>
                                <LineChart data={graphData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="n" label={{ value: 'Input Size (n)', position: 'insideBottom', offset: -5 }} />
                                    <YAxis label={{ value: 'Time', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="time" stroke="#8884d8" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className='time-exp'>
                    <div className='reason-header'>
                        Reasoning
                    </div>
                    <pre>{explanation}</pre> {/* Display explanation */}
                </div>
            </div>
        </div>
    );
}

export default SimpleSidebar;



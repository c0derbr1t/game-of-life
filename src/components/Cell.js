import React from 'react';
import './Board.css';

const CELL_SIZE = 25;

const Cell = props => {
    const { x, y } = props;

    return (
        <div 
            className="Cell" 
            style={{        
                left: `${CELL_SIZE * x + 1}px`,        
                top: `${CELL_SIZE * y + 1}px`,        
                width: `${CELL_SIZE - 1}px`,        
                height: `${CELL_SIZE - 1}px`,      
            }}
        />
    );
}

export default Cell;
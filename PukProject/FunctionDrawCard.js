/************************************************************draw function******************************************************************/

// Card dimensions
const CARD_WIDTH = 80;
const CARD_HEIGHT = 120;

// Shapes 
const SHAPES = {
    Circle: drawCircle,
    Diamond: drawDiamond,
    Triangle: drawTriangle,
};

// Draw cards
function drawDeck() {
    let x = 10, y = 20; 
    const padding = 40;

    // Loop through numbers and shapes
    for (let number = 1; number <= 8; number++) {
        for (const shapeName in SHAPES) {
            drawCard(x, y, CARD_WIDTH, CARD_HEIGHT, number, shapeName);
            x += CARD_WIDTH + padding;

            // Move to the next row if the row is full
            if (x + CARD_WIDTH + padding > canvas.width) {
                x = 10;
                y += CARD_HEIGHT + padding;
            }
        }
    }
}
/********************************************* */
///draw back 
function drawBack(x,y,width,height){
    ctx.fillStyle = 'orange';
    ctx.fillRect(x, y, width, height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
}

function drawDeck(x,y,width,height){
    for(let i=2;i>-1;i--){
        drawBack(x+5*i,y,width,height);
    }
}
/*********************************************** */
// Draw a card
function drawCard(x, y, width, height, number, shapeName) {
    // Background
    ctx.fillStyle = 'beige';
    ctx.fillRect(x, y, width, height);

    // Border
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);

    // Draw number at the top left
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(number, x + 10, y + 8);

    // Draw in the center
    const shapeFunc = SHAPES[shapeName];
    shapeFunc(x + width / 2, y + height / 2, number);
}

// Different shape count and positions
function drawShapes(centerX, centerY, count, drawShape) {
    const colSpacing = 25; 
    const rowSpacing = 25; 

    let positions = [];
    switch (count) {
        case 1:
            positions = [{ x: centerX, y: centerY }];
            break;
        case 2:
            positions = [
                { x: centerX, y: centerY - rowSpacing / 2 },
                { x: centerX, y: centerY + rowSpacing / 2 }
            ];
            break;
        case 3:
            positions = [
                { x: centerX, y: centerY - rowSpacing },
                { x: centerX, y: centerY },
                { x: centerX, y: centerY + rowSpacing }
            ];
            break;
        case 4:
            positions = [
                { x: centerX - colSpacing / 2, y: centerY - rowSpacing / 2 },
                { x: centerX + colSpacing / 2, y: centerY - rowSpacing / 2 },
                { x: centerX - colSpacing / 2, y: centerY + rowSpacing / 2 },
                { x: centerX + colSpacing / 2, y: centerY + rowSpacing / 2 }
            ];
            break;
        case 5:
            positions = [
                { x: centerX - colSpacing / 2, y: centerY - rowSpacing / 1.3 },
                { x: centerX + colSpacing / 2, y: centerY - rowSpacing / 1.3 },
                { x: centerX, y: centerY },
                { x: centerX - colSpacing / 2, y: centerY + rowSpacing / 1.3 },
                { x: centerX + colSpacing / 2, y: centerY + rowSpacing / 1.3 }
            ];
            break;
        case 6:
            positions = [
                { x: centerX - colSpacing / 2, y: centerY - rowSpacing },
                { x: centerX + colSpacing / 2, y: centerY - rowSpacing },
                { x: centerX - colSpacing / 2, y: centerY },
                { x: centerX + colSpacing / 2, y: centerY },
                { x: centerX - colSpacing / 2, y: centerY + rowSpacing },
                { x: centerX + colSpacing / 2, y: centerY + rowSpacing }
            ];
            break;
        case 7:
            positions = [
                { x: centerX - colSpacing / 2.5, y: centerY - rowSpacing * 1 }, 
                { x: centerX + colSpacing / 1.6, y: centerY - rowSpacing * 1 }, 
                { x: centerX + colSpacing / 10, y: centerY - rowSpacing * 0.3 }, 
                { x: centerX - colSpacing / 2.5, y: centerY + rowSpacing * 0.5 }, 
                { x: centerX + colSpacing / 1.6, y: centerY + rowSpacing * 0.5 }, 
                { x: centerX - colSpacing / 2.4, y: centerY + rowSpacing * 1.5 }, 
                { x: centerX + colSpacing / 1.6, y: centerY + rowSpacing * 1.5 } 
            ];
            break;
        case 8:
            const tighterColSpacing = colSpacing / 2.3; 
            const tighterRowSpacing = rowSpacing / 1.65; 
            const yOffset = 6;
            positions = [
                { x: centerX - tighterColSpacing, y: centerY - tighterRowSpacing * 2 + yOffset }, 
                { x: centerX + tighterColSpacing, y: centerY - tighterRowSpacing * 2 + yOffset }, 
                { x: centerX, y: centerY - tighterRowSpacing + yOffset },                       
                { x: centerX - tighterColSpacing, y: centerY + yOffset },                     
                { x: centerX + tighterColSpacing, y: centerY + yOffset },                     
                { x: centerX, y: centerY + tighterRowSpacing + yOffset },                     
                { x: centerX - tighterColSpacing, y: centerY + tighterRowSpacing * 2 + yOffset }, 
                { x: centerX + tighterColSpacing, y: centerY + tighterRowSpacing * 2 + yOffset }  
            ];
            break;
        }
    // Draw shapes based on calculated positions
    positions.forEach(({ x, y }) => drawShape(x, y));
}

// Shape drawing functions 
function drawCircle(centerX, centerY, count) {
    drawShapes(centerX, centerY, count, (x, y) => {
        ctx.beginPath();
        ctx.arc(x, y, 7.5, 0, Math.PI * 2); 
        ctx.fillStyle = 'blue';
        ctx.fill();
    });
}

function drawDiamond(centerX, centerY, count) {
    drawShapes(centerX, centerY, count, (x, y) => {
        const size = 15;
        ctx.beginPath();
        ctx.moveTo(x, y - size / 2); 
        ctx.lineTo(x - size / 2, y); 
        ctx.lineTo(x, y + size / 2); 
        ctx.lineTo(x + size / 2, y); 
        ctx.closePath();
        ctx.fillStyle = 'red';
        ctx.fill();
    });
}

function drawTriangle(centerX, centerY, count) {
    drawShapes(centerX, centerY, count, (x, y) => {
        const size = 15;
        ctx.beginPath();
        ctx.moveTo(x, y - size / 2); 
        ctx.lineTo(x - size / 2, y + size / 2); 
        ctx.lineTo(x + size / 2, y + size / 2); 
        ctx.closePath();
        ctx.fillStyle = 'green';
        ctx.fill();
    });
}
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
///draw back 
function drawBack(x, y, width, height) {
    // White background
    const borderRadius = Math.min(width, height) * 0.05;
    drawRoundedRect(x, y, width, height, borderRadius, 'white');
    drawRadialPattern(x + width / 2, y + height / 2, width, height);
    drawCentralCircleWithStar(x + width / 2, y + height / 2, Math.min(width, height) / 6);
    drawRoundedRect(x, y, width, height, borderRadius, null, 'gold', 4);
}
// Radial pattern
function drawRadialPattern(centerX, centerY, width, height) {
    const rayCount = 20;
    const radius = Math.min(width, height) / 2;
    const angleStep = (2 * Math.PI) / rayCount;

    for (let i = 0; i < rayCount; i++) {
        const angleStart = i * angleStep;
        const angleEnd = angleStart + angleStep;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY); 
        ctx.arc(centerX, centerY, radius, angleStart, angleEnd);
        ctx.closePath();

        ctx.fillStyle = i % 2 === 0 ? 'gold' : 'darkgreen';
        ctx.fill();
    }
}
// Central circle with a star
function drawCentralCircleWithStar(centerX, centerY, radius) {
    // Blue circle
    ctx.fillStyle = 'navy';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    // White star
    drawStar(centerX, centerY, radius * 0.6, radius * 0.3, 5, 'white');
}
// Draw star
function drawStar(centerX, centerY, outerRadius, innerRadius, points, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
        const angle = (i * Math.PI) / points;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
}
// Draw rounded rectangle
function drawRoundedRect(x, y, width, height, radius, fillColor = null, strokeColor = null, lineWidth = 1) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }

    if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }
} 

function drawDeck(x,y,width,height){
    for(let i=2;i>-1;i--){
        drawBack(x+5*i,y,width,height);
    }
}
/*********************************************** */
// Draw a card
function drawCard(x, y, width, height, number, shapeName) {
    let size = width/80*15;

    // Background
    ctx.fillStyle = 'beige';
    ctx.fillRect(x, y, width, height);

    // Border
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);

    // Draw number at the top left
    let fontsize = width/80*20;
    ctx.font = 'bold '+ fontsize +'px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(number, x + fontsize/2, y + fontsize/2);

    // Draw in the center
    const shapeFunc = SHAPES[shapeName];
    shapeFunc(size, x + width / 2, y + height / 2, number);
}

// Different shape count and positions
function drawShapes(size, centerX, centerY, count, drawShape) {
    const colSpacing = size/15*25; 
    const rowSpacing = size/15*25; 

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
function drawCircle(size, centerX, centerY, count) {
    drawShapes(size, centerX, centerY, count, (x, y) => {
        ctx.beginPath();
        ctx.arc(x, y, size/2, 0, Math.PI * 2); 
        ctx.fillStyle = 'blue';
        ctx.fill();
    });
}

function drawDiamond(size, centerX, centerY, count) {
    drawShapes(size, centerX, centerY, count, (x, y) => {
        
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

function drawTriangle(size, centerX, centerY, count) {
    drawShapes(size, centerX, centerY, count, (x, y) => {
        
        ctx.beginPath();
        ctx.moveTo(x, y - size / 2); 
        ctx.lineTo(x - size / 2, y + size / 2); 
        ctx.lineTo(x + size / 2, y + size / 2); 
        ctx.closePath();
        ctx.fillStyle = 'green';
        ctx.fill();
    });
}
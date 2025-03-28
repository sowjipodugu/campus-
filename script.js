const locations = {
    "a-block": { x: 150, y: 350 },
    "b-block": { x: 350, y: 350 },
    "c-block": { x: 250, y: 150 },
    "canteen": { x: 300, y: 200 },
    "auditorium": { x: 500, y: 150 },
    "boys-hostel": { x: 600, y: 350 },
    "admin-block": { x: 100, y: 300 },
    "stationary": { x: 280, y: 180 },
    "cricket-ground": { x: 550, y: 120 },
    "main-gate": { x: 50, y: 450 }
};

const paths = {
    "a-block:b-block": [{ x: 380, y: 320 }, { x: 670, y: 320}],
    "b-block:a-block": [{ x: 380, y: 320 }, { x: 670, y: 320}],
    "b-block:c-block": [{ x: 560, y: 320 }, { x: 670, y: 320 }],
    "c-block:b-block": [{ x: 250, y: 150 }, { x: 350, y: 350 }],
    "c-block:auditorium": [{ x: 250, y: 150 }, { x: 500, y: 150 }],
    "auditorium:c-block": [{ x: 500, y: 150 }, { x: 250, y: 150 }],
    "canteen:auditorium": [{ x: 300, y: 200 }, { x: 500, y: 150 }],
    "auditorium:canteen": [{ x: 500, y: 150 }, { x: 300, y: 200 }],
    "main-gate:a-block": [{ x: 50, y: 450 }, { x: 150, y: 350 }],
    "a-block:main-gate": [{ x: 150, y: 350 }, { x: 50, y: 450 }]
};

function findRoute() {
    const start = document.getElementById("start").value;
    const destination = document.getElementById("destination").value;

    if (!start || !destination) {
        alert("Please select both start and destination!");
        return;
    }

    drawRoute(start, destination);
}

function drawRoute(start, destination) {
    const canvas = document.getElementById("route-canvas");
    const ctx = canvas.getContext("2d");
    const map = document.getElementById("campus-map");

    canvas.width = map.clientWidth;
    canvas.height = map.clientHeight;

    const scaleX = canvas.width / 1000;
    const scaleY = canvas.height / 500;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;

    const pathKey = `${start}:${destination}`;
    const reversePathKey = `${destination}:${start}`;

    const path = paths[pathKey] || paths[reversePathKey];

    if (path) {
        ctx.beginPath();
        ctx.moveTo(path[0].x * scaleX, path[0].y * scaleY);
        for (let i = 1; i < path.length; i++) {
            ctx.lineTo(path[i].x * scaleX, path[i].y * scaleY);
        }
        ctx.stroke();
    } else {
        alert("Path not found!");
    }
}

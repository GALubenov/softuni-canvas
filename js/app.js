export function config() {
    return {
        img: [
            // List all file names from the folder ./assets/ that you want to use
            'cat.png',
            'dog.png',
            'mouse.png',
        ]
    };
}

export function app(draw) {
    const catPosition = {
        x: 300,
        y: 300
    };
    const mice = [];

    function drawScene() {
        // Clear previous frame and draw grid
        draw.clear();
        draw.grid();

        // Get cat coordinates and draw on scene at 25% scale
        draw.image('cat.png', catPosition.x, catPosition.y, 0.25);
        draw.rect(100, 50, 200, 30, 'blue');
        draw.circle(400, 500, 20, 'green');
        draw.text('Hello, Canvas!', 120, 70, '#ff9900');
        draw.rect(100, 100, 100, 100, 'red');
        draw.text('House!', 120, 150, 'green');
        // Iterate mice array and draw each mouse at 10% scale
        for (let mouse of mice) {
            draw.image('mouse.png', mouse.x, mouse.y, 0.1);
            //  console.log(`${mouse.x}, ${mouse.y}`);

            if (mouse.x >= 100 && mouse.x <= 200 && mouse.y >= 100 && mouse.y <= 200) {
                // console.log('Mouse in a house');
                draw.text(`We have mouse in a house!`, 100, 20, 'black');
            } else {

                let a = mouse.x - catPosition.x;
                let b = mouse.y - catPosition.y;

                let c = Math.sqrt(a * a + b * b); // c is the distance

                draw.text(`${Math.trunc(c)}!`, mouse.x - 5, mouse.y + 30, 'green');

                if (c <= 80) {
                    let index = mice.indexOf(mouse);
                    mice.splice(index, 1);
                }
            }
        }
    }

    // This function is executed when the application starts
    function start() {
        drawScene();
    }

    // This function is executed when you click on the page
    function onClick(x, y) {
        console.log(x, y);

        mice.push({ x: x, y: y });
        drawScene();
    }

    // This function is executed when you press a key on the keyboard
    function onKey(key, pressed) {
        console.log(key, pressed);

        if (key == 'ArrowUp' && pressed) {
            catPosition.y -= 5;
        } else if (key == 'ArrowDown' && pressed) {
            catPosition.y += 5;
        }

        if (key == 'ArrowLeft' && pressed) {
            catPosition.x -= 5;
        } else if (key == 'ArrowRight' && pressed) {
            catPosition.x += 5;
        }

        drawScene();
    }

    return {
        start,
        onClick,
        onKey
    };
}
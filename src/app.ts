import * as ps from './pointset.js';

// Global utility function   
// getRandomColor creates a random web color
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// an interface that describes what our Rectangle object looks like
interface Rectangle {
    p1: ps.MousePosition;
    p2: ps.MousePosition;
    color: string;
}

// A class for our application state and functionality
class Drawing {
    // the public paramater "canv" is automatically created by "public" constructor parameter

    // last known mouse position
    mousePosition: ps.MousePosition | null = null;

    // mouse position when we clicked
    clickStart: ps.MousePosition | null = null;

    // rendering context for the canvas
    ctx: CanvasRenderingContext2D | null;

    // our current rectangle set.  Grows as we add more rectangles
    rects: Array <Rectangle>;

    // the set of points trailing after the mouse
    points: ps.PointSet;
    
    // a simple wrapper to reliably get the offset within an element  
    // see: http://www.jacklmoore.com/notes/mouse-position/
    static offset(e: MouseEvent): ps.MousePosition {
        e = e || <MouseEvent> window.event;

        var target = <Element> (e.target || e.srcElement),
            rect = target.getBoundingClientRect(),
            offsetX = e.clientX - rect.left,
            offsetY = e.clientY - rect.top;

        return {x: offsetX, y: offsetY};
    }

    // suggested utility method to compute the midpoint between two points
    midPoint(p1: ps.MousePosition, p2: ps.MousePosition): ps.MousePosition {

    }

    // suggested method to draw a rectangle as specified in the assignment
    drawRect(p1: ps.MousePosition, p2: ps.MousePosition, p3: ps.MousePosition, p4: ps.MousePosition, color: string) {
        // The CanvasRenderingContext2D object has a whole host of commands for drawing
        // into a canvas.  See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

    }

    // use the animationFrame to do continuous rendering
    render() {
        // Typescript will not let us dereference this.ctx below unless we guarantee
        // it is not null (notice the declaration allows it to be null because canv.getContext("2d") 
        // below might fail.  So we need to only try to render if this.ctx is non-null
        if (!this.ctx) {
            return
        }

        // Store the current transformation matrix (and other state)
        this.ctx.save();
        
        // Use the identity matrix while clearing the canvas (just in case you change it someday!)
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.fillStyle = "lightgrey";
        this.ctx.clearRect(0, 0, this.canv.width, this.canv.height);
        
        // Restore the transform
        this.ctx.restore();        
        
        // add a point to the points object for the current mouse position (if the mouse position
        // is over the canvas and we've received it from onmousemove below).  
        // If the mouse isn't over the canvas, drop the oldest point instead.
        if (this.mousePosition) {

        } else {

        }

        // draw rectangles we have so far at the back, perhaps leveraging the suggested
        // utility methods midPoint() and drawRect() above
        const rectCount = this.rects.length;



        // draw blue points with the oldest ones more transparent, 3x3 in size
        // hint: use the point number to create an rgba color
        // https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgba()
        const pointCount = this.points.length;


        

        // if we've clicked, draw the rubber band.  use a strokeStyle of gray
        if (this.clickStart) {


        }

        // do it again!  and again!  AND AGAIN!  AND ...       
        requestAnimationFrame(() => this.render());
    }
    
    constructor (public canv: HTMLCanvasElement) {
        this.ctx = canv.getContext("2d");
        this.rects = new Array(0);
        this.points = new ps.PointSet();
 
        canv.onmousedown = (ev: MouseEvent) => {
             this.clickStart = Drawing.offset(ev);        
             this.mousePosition = this.clickStart;
        }
        
        canv.onmouseup = (ev: MouseEvent) => {
            if (this.clickStart != undefined) {
                const clickEnd = Drawing.offset(ev);
                this.mousePosition = clickEnd;
                var rect: Rectangle = {
                    p1: this.clickStart,
                    p2: clickEnd,
                    color: getRandomColor()
                };      
                this.rects.push(rect);          
                this.clickStart = null; 
            }
        }
        
        canv.onmousemove = (ev: MouseEvent) => {
            const m = Drawing.offset(ev);
            this.mousePosition = m;
        }
        
        canv.onmouseout = (ev: MouseEvent) => {
            this.mousePosition = null;
            this.clickStart = null;
        }
    }
}

// a global variable for our state
var myDrawing: Drawing;


// main function, to keep things together and keep the variables created self contained
function exec() {
    // find our container
    var div = document.getElementById("drawing");

    if (div) {
        // let's create a canvas and to draw in
        var canv = document.createElement("canvas");
        div.appendChild(canv);

        canv.id = "main";
        canv.style.width = "100%";
        canv.style.height = "100%";
        canv.width  = canv.offsetWidth;
        canv.height = canv.offsetHeight;

        window.addEventListener('resize', (event) => {
            canv.width  = canv.offsetWidth;
            canv.height = canv.offsetHeight;
        });
        

        // create a Drawing object
        myDrawing = new Drawing(canv);
        
        // kick off the rendering!
        myDrawing.render(); 
    }
}

exec()
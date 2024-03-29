
class CanvasConnection {
    setConnection(connection: CanvasConnection) {
        throw new Error("Method not implemented.");
    }
    x: number;
    y: number;
    z: number;
    size: number;
    screen: any = {};
    isEnd: boolean;
    glowSpeed: number;
    links: any[];
    speed: number;
    constructor(x: number, y: number,z: number, size: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = size;
        this.isEnd = false;
        this.glowSpeed = opts.baseGlowSpeed + opts.addedGlowSpeed * Math.random();
        this.links = [];
        this.speed = 0;
    }

    rootStep () {
        this.setScreen();
        this.screen.color = opts.rootColor.replace('light', (30 + ((tick * this.glowSpeed) % 30).toString())).replace('alp', ((1 - this.screen.z / mostDistant) * .8).toString());
    
        for (var i = 0; i < this.links.length; ++i) {
            ctx.moveTo(this.screen.x, this.screen.y);
            ctx.lineTo(this.links[i].screen.x, this.links[i].screen.y);
        }
    }

    step() {

        this.setScreen();
        this.screen.color = (this.isEnd ? opts.endColor : opts.connectionColor).replace('light', (30 + ((tick * this.glowSpeed) % 30)).toString()).replace('alp', (.2 + (1 - this.screen.z / mostDistant) * .8).toString());
    
        for (var i = 0; i < this.links.length; ++i) {
            ctx.moveTo(this.screen.x, this.screen.y);
            ctx.lineTo(this.links[i].screen.x, this.links[i].screen.y);
        }
    }
    
    link () {
        
        if (this.size < opts.minSize)
            return this.isEnd = true;
    
        var links = [],
            connectionsNum = opts.baseConnections + Math.random() * opts.addedConnections | 0,
            attempt = opts.connectionAttempts,
    
            alpha, beta, len,
            cosA, sinA, cosB, sinB,
            pos: any = {},
            passedExisting, passedBuffered;
    
        while (links.length < connectionsNum && --attempt > 0) {
    
            alpha = Math.random() * Math.PI;
            beta = Math.random() * Tau;
            len = opts.baseDist + opts.addedDist * Math.random();
    
            cosA = Math.cos(alpha);
            sinA = Math.sin(alpha);
            cosB = Math.cos(beta);
            sinB = Math.sin(beta);
    
            pos.x = this.x + len * cosA * sinB;
            pos.y = this.y + len * sinA * sinB;
            pos.z = this.z + len * cosB;
    
            if (pos.x * pos.x + pos.y * pos.y + pos.z * pos.z < squareRange) {
    
                passedExisting = true;
                passedBuffered = true;
                for (var i = 0; i < connections.length; ++i)
                    if (squareDist(pos, connections[i]) < squareAllowed)
                        passedExisting = false;
    
                if (passedExisting)
                    for (var i = 0; i < links.length; ++i)
                        if (squareDist(pos, links[i]) < squareAllowed)
                            passedBuffered = false;
    
                if (passedExisting && passedBuffered)
                    links.push({ x: pos.x, y: pos.y, z: pos.z });
            }
        }
    
        if (links.length === 0)
            this.isEnd = true;
        else {
            for (var i = 0; i < links.length; ++i) {
    
                var pos: any = links[i],
                    connection = new CanvasConnection(pos.x, pos.y, pos.z, this.size * opts.sizeMultiplier);
    
                this.links[i] = connection;
                all.push(connection);
                connections.push(connection);
            }
            for (var i = 0; i < this.links.length; ++i)
                toDevelop.push(this.links[i]);
        }
    }

    setScreen () {
        var x = this.x,
            y = this.y,
            z = this.z;
    
        // apply rotation on X axis
        var Y = y;
        y = y * cosX - z * sinX;
        z = z * cosX + Y * sinX;
    
        // rot on Y
        var Z = z;
        z = z * cosY - x * sinY;
        x = x * cosY + Z * sinY;
    
        this.screen.z = z;
    
        // translate on Z
        z += opts.depth;
    
        this.screen.scale = opts.focalLength / z;
        this.screen.x = opts.vanishPoint.x + x * this.screen.scale;
        this.screen.y = opts.vanishPoint.y + y * this.screen.scale;
    
    }

    draw () {
        ctx.fillStyle = this.screen.color;
        ctx.beginPath();
        ctx.arc(this.screen.x, this.screen.y, this.screen.scale * this.size, 0, Tau);
        ctx.fill();
    }

}

    class Data {
        x: number = 0;
        y: number = 0;
        z: number = 0;
        size: number = 0;
        screen: any = {};
        isEnd: boolean = false;
        glowSpeed: number = 0;
        links: any[] = [];
        speed: number = 0;
        connection: CanvasConnection | null = null;
        nextConnection: CanvasConnection | null = null;
        ended: number = 0;
        ox: number = 0;
        oy: number = 0;
        oz: number = 0;
        os: number = 0;
        nx: number = 0;
        ny: number = 0;
        nz: number = 0;
        ns: number = 0;
        dx: number = 0;
        dy: number = 0;
        dz: number = 0;
        ds: number = 0;
        proportion: number = 0;
        
        constructor(connection: CanvasConnection) {

            this.glowSpeed = opts.baseGlowSpeed + opts.addedGlowSpeed * Math.random();
            this.speed = opts.baseSpeed + opts.addedSpeed * Math.random();
            
            this.screen = {};
            
            this.setConnection(connection);
        }

        setScreen() {
            var x = this.x,
            y = this.y,
            z = this.z;
        
            // apply rotation on X axis
            var Y = y;
            y = y * cosX - z * sinX;
            z = z * cosX + Y * sinX;
        
            // rot on Y
            var Z = z;
            z = z * cosY - x * sinY;
            x = x * cosY + Z * sinY;
        
            this.screen.z = z;
        
            // translate on Z
            z += opts.depth;
        
            this.screen.scale = opts.focalLength / z;
            this.screen.x = opts.vanishPoint.x + x * this.screen.scale;
            this.screen.y = opts.vanishPoint.y + y * this.screen.scale;
        }
        
        setConnection(connection: CanvasConnection) {
            
            if (connection.isEnd)
            this.reset();
        
            else {
        
                this.connection = connection;
                this.nextConnection = connection.links[connection.links.length * Math.random() | 0];
        
                this.ox = connection.x; // original coordinates
                this.oy = connection.y;
                this.oz = connection.z;
                this.os = connection.size; // base size
        
                this.nx = this.nextConnection!.x; // new
                this.ny = this.nextConnection!.y;
                this.nz = this.nextConnection!.z;
                this.ns = this.nextConnection!.size;
        
                this.dx = this.nx - this.ox; // delta
                this.dy = this.ny - this.oy;
                this.dz = this.nz - this.oz;
                this.ds = this.ns - this.os;
        
                this.proportion = 0;
            }
        }

        reset() {

            this.setConnection(connections[0]);
            this.ended = 2;
        }

        step() {

            this.proportion += this.speed;
        
            if (this.proportion < 1) {
                this.x = this.ox + this.dx * this.proportion;
                this.y = this.oy + this.dy * this.proportion;
                this.z = this.oz + this.dz * this.proportion;
                this.size = (this.os + this.ds * this.proportion) * opts.dataToConnectionSize;
            } else
                this.setConnection(this.nextConnection!);
        
            this.screen.lastX = this.screen.x;
            this.screen.lastY = this.screen.y;
            this.setScreen();
            this.screen.color = opts.dataColor.replace('light', (40 + ((tick * this.glowSpeed) % 50)).toString()).replace('alp', (.2 + (1 - this.screen.z / mostDistant) * .6).toString());
        
        }

        draw() {

            if (this.ended)
                return --this.ended; // not sre why the thing lasts 2 frames, but it does
        
            ctx.beginPath();
            ctx.strokeStyle = this.screen.color;
            ctx.lineWidth = this.size * this.screen.scale;
            ctx.moveTo(this.screen.lastX, this.screen.lastY);
            ctx.lineTo(this.screen.x, this.screen.y);
            ctx.stroke();
        }
}


var c: any = {}

// Neural Connections Background

let w: number,
	h: number,
	ctx: any,

	opts: any, 

	squareRange: number,
	squareAllowed: number,
	mostDistant: number,
	sinX: number,
    sinY: number,
	cosX: number,
    cosY: number,

	connections: any[],
	toDevelop: any[],
	data: any[],
	all: any[],
	tick: number,
	totalProb: number,

	animating: boolean,
    
	Tau: number;
    
function init(canvasElem: HTMLCanvasElement) {

    c = canvasElem;
    w = c.width = window.innerWidth,
	h = c.height = window.innerHeight,
	ctx = c.getContext('2d'),

	opts = {

		range: 250,
		baseConnections: 50,
		addedConnections: 60,
		baseSize: 5,
		minSize: 1,
		dataToConnectionSize: .3,
		sizeMultiplier: .7,
		allowedDist: 60,
		baseDist: 60,
		addedDist: 50,
		connectionAttempts: 150,

		dataToConnections: 3,
		baseSpeed: .0001,
		addedSpeed: .012,
		baseGlowSpeed: .01,
		addedGlowSpeed: .01,

		rotVelX: .0022,
		rotVelY: .0011,

		repaintColor: '#00005b',
		connectionColor: '#883576',
		rootColor: '#00005b',
		endColor: 'FFDE00',
		dataColor: 'FFDE00',

		wireframeWidth: .2,
		wireframeColor: '#88f',

		depth: 250,
		focalLength: 250,
		vanishPoint: {
			x: w / 2,
			y: h / 2
		}
	},

	squareRange = opts.range * opts.range,
	squareAllowed = opts.allowedDist * opts.allowedDist,
	mostDistant = opts.depth + opts.range,
	sinX = 0,
    sinY = 0,
	cosX = 0,
    cosY = 0,

	connections = [],
	toDevelop = [],
	data = [],
	all = [],
	tick = 0,
	totalProb = 0,

	animating = false,

	Tau = Math.PI * 2;

ctx.fillStyle = '#222';
ctx.fillRect(0, 0, w, h);
ctx.fillStyle = '#ccc';
ctx.font = '50px Verdana';
ctx.fillText('Calculating Nodes', w / 2 - ctx.measureText('Calculating Nodes').width / 2, h / 2 - 15);

	connections.length = 0;
	data.length = 0;
	all.length = 0;
	toDevelop.length = 0;
	var connection = new CanvasConnection(0, 0, 0, opts.baseSize);
	connection.step = connection.rootStep;
	connections.push(connection);
	all.push(connection);
	connection.link();

	while (toDevelop.length > 0) {

		toDevelop[0].link();
		toDevelop.shift();
	}

	if (!animating) {
		animating = true;
		anim();
	}
}

//Connection.prototype.link =
//CanvasConnection.prototype.step = 
//Connection.rootStep = 
//Connection.prototype.draw = 

//Data.prototype.reset 
//Data.prototype.draw = 
//Data.prototype.setConnection 
//Connection.prototype.setScreen = Data.prototype.setScreen = 


function squareDist(a: any, b: any) {

	var x = b.x - a.x,
		y = b.y - a.y,
		z = b.z - a.z;

	return x * x + y * y + z * z;
}

function anim() {

	window.requestAnimationFrame(anim);

	ctx.globalCompositeOperation = 'source-over';
	ctx.fillStyle = opts.repaintColor;
	ctx.fillRect(0, 0, w, h);

	++tick;

	var rotX = tick * opts.rotVelX,
		rotY = tick * opts.rotVelY;

	cosX = Math.cos(rotX);
	sinX = Math.sin(rotX);
	cosY = Math.cos(rotY);
	sinY = Math.sin(rotY);

	if (data.length < connections.length * opts.dataToConnections) {
		var datum = new Data(connections[0]);
		data.push(datum);
		all.push(datum);
	}

	ctx.globalCompositeOperation = 'lighter';
	ctx.beginPath();
	ctx.lineWidth = opts.wireframeWidth;
	ctx.strokeStyle = opts.wireframeColor;
	all.map(function (item) { item.step(); });
	ctx.stroke();
	ctx.globalCompositeOperation = 'source-over';
	all.sort(function (a, b) { return b.screen.z - a.screen.z });
	all.map(function (item) { item.draw(); });

	/*ctx.beginPath();
	ctx.strokeStyle = 'red';
	ctx.arc( opts.vanishPoint.x, opts.vanishPoint.y, opts.range * opts.focalLength / opts.depth, 0, Tau );
	ctx.stroke();*/
}


// Cookies


export default init;

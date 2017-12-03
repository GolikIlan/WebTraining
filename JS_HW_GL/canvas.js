const _pulsar = Symbol('pulsar');
const _gun = Symbol('gun');
class Patterns {
    constructor() {

    }

    init()
    {
        this[_gun] = [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
            [0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ];
        this[_pulsar] = [
            [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
            [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
            [0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [1,1,1,0,0,1,1,0,1,1,0,0,1,1,1],
            [0,0,1,0,1,0,1,0,1,0,1,0,1,0,0],
            [0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
            [0,0,1,0,1,0,1,0,1,0,1,0,1,0,0],
            [1,1,1,0,0,1,1,0,1,1,0,0,1,1,1],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
            [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
            [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0]
        ];
    }

    getPulsarPattern()
    {
        return this[_pulsar];
    }

    getGunPattern()
    {
        return this[_gun];
    }
  
  };

  const getMatrixByDim = Symbol('getMatrixByDim');
  class Shape{
      constructor(pattern, x, y)
      {
          this._pattern = pattern;
          this._x = x;
          this._y = y;
          this._content = this._pattern;
      }

      rotateContent90(times){
          let output = [];
          let input = this._content;
          for(let t = 0; t< times; t++)
          {
            let n =input.length;
            let m = input[0].length;
            output = this[getMatrixByDim](m, n);
            for (let i=0; i<n; i++)
                for (let j=0;j<m; j++)
                    output [j][n-1-i] = input[i][j];
            input = output;
          }
          if(output.length == 0) return;
          this._content = output;
       }

       [getMatrixByDim](rows, cols)
       {
           var mat = [];
           for(let rowIndex = 0; rowIndex < rows; rowIndex ++)
           {
               mat[rowIndex] = [];
               for(let columnIndex= 0; columnIndex < cols; columnIndex ++)
               {
                   mat[rowIndex].push(0);
               }
           }
           return mat;
       } 
      move(x, y, mat)
      {
        this._x = x;
        this._y = y;
      }

      get content()
      {
          return this._content;
      }
  };

  class NamedShape extends Shape
  {
      constructor(pattern, x, y, name)
      {
          super(pattern, x, y);
          this._name = name;
      }

      get name(){
          return this._name;
      }
  }

  const _patternsProvider = Symbol('patternsProvider');
  const getTimes90 = Symbol('getTimes90');
  const _managerLog = Symbol('managerLog');
  const parse = Symbol('parse');
  const _shapes = Symbol('shapes');
  const findShape = Symbol('findShape');
  class Manager{
      constructor(log, patterns)
      {
          this[_shapes] = [];
          this[_managerLog] = log;
          this[_patternsProvider] = patterns;
          this[_patternsProvider].init();
      }

      [getTimes90](angle)
      {
          if(angle == 0 || angle == "")
          {
              return 0;
          }
          if(angle < 90){
                return 1;
            }
            else{
                let res = Math.round(angle / 90)
                this[_managerLog]("angle : " + res);
                return res;
            }

      }

      [findShape](name)
      {
          for(let shapeIndex = 0; shapeIndex < this[_shapes].length; shapeIndex ++)
          {
              if(this[_shapes][shapeIndex]._name == name)
              {
                  return this[_shapes][shapeIndex];
              }
          }
          return null;
      }

      [parse](params)
      {
        var key = params[0];
        switch(key) { 
            case "create pulsar": {  
               let name = params[1].trim();
               let x = parseInt(params[2].trim()) ;
               let y = parseInt(params[3].trim());
               let angle = parseInt(params[4].trim());
               let pulsar = this[_patternsProvider].getPulsarPattern();
               let shape = new NamedShape(pulsar, x, y, name);
               shape.rotateContent90(this[getTimes90](angle))
               add(shape);
               this[_shapes].push(shape);
               break; 
            } 
            case "rotate pulsar": { 
                let name = params[1].trim();
                let angle = parseInt(params[2].trim());
                var shape = this[findShape](name);
                clear(shape);
                shape.rotateContent90(this[getTimes90](angle));
                add(shape);
               break; 
            }
            case "move pulsar": { 
                let name = params[1].trim();
                let x = params[2].trim();
                let y = params[3].trim();
                var shape = this[findShape](name);
                clear(shape);
                shape.move(x,y);
                add(shape);
               break;    
            } 
            case "create gun": { 
                let name = params[1].trim();
                let x = parseInt(params[2].trim()) ;
                let y = parseInt(params[3].trim());
                let angle = parseInt(params[4].trim());
                let gun = this[_patternsProvider].getGunPattern();
                let shape = new NamedShape(gun, x, y, name);
                shape.rotateContent90(this[getTimes90](angle))
                add(shape);
                this[_shapes].push(shape);
               break; 
            } 
            case "rotate gun": { 
                let name = params[1].trim();
                let angle = parseInt(params[2].trim());
                var shape = this[findShape](name);
                clearArea(shape._x, shape._y, 42, 42);
                shape.rotateContent90(this[getTimes90](angle));
                add(shape);
               break; 
            }
            case "move gun": { 
                let name = params[1].trim();
                let x = params[2].trim();
                let y = params[3].trim();
                var shape = this[findShape](name);
                clearArea(shape._x, shape._y, 42, 42);
                shape.move(x,y);
                add(shape);
               break;    
            } 
            case "step": { 
                step();
               break; 
            }
            case "play": { 
                play();
               break;    
            } 
            default: { 
                this[_managerLog]("Invalid command"); 
               break;              
            } 
         } 
      }

      onCommand(params)
      {
        this[_managerLog](params);
        this[parse](params);
      }
  }

let manager = new Manager(log, new Patterns());


$(".cmdInput").on('keyup', function (e) {
    if (e.keyCode == 13) {
        let cmd = $(".cmdInput").val();
        $(".cmdInput").val("");
        $(".result").append("<li><span>" + cmd + "</span></a></li>");
        onCommand(cmd);
        log(cmd);
    }
});

function onCommand(cmd)
{
    if(cmd == "clear")
    {
        $(".result").empty();
    }
    else{
        if(cmd == "menu")
        {
            $(".result").append("<li><span>" + "- these are allowed commands:" + "</span></a></li>");
            $(".result").append("<li><span>" + "- menu- displays allowed commands" + "</span></a></li>");
            $(".result").append("<li><span>" + "- create pulsar, name, x, y, angle  - creates a named pulsar in [x,y] coordinates with rotation angle" + "</span></a></li>");
            $(".result").append("<li><span>" + "- rotate pulsar, name, angle  - rotates specific pulsar with angle" + "</span></a></li>");
            $(".result").append("<li><span>" + "- move pulsar, name, x, y  - moves specific pulsar to [x,y]" + "</span></a></li>");
            $(".result").append("<li><span>" + "- create gun, name, x, y, angle  - creates a named gun in [x,y] coordinates with rotation angle" + "</span></a></li>");
            $(".result").append("<li><span>" + "- rotate gun, name, angle  - rotates specific gun with angle" + "</span></a></li>");
            $(".result").append("<li><span>" + "- move gun, name, x, y  - moves specific gun to [x,y]" + "</span></a></li>");
            $(".result").append("<li><span>" + "- step - performs a single step" + "</span></a></li>");
            $(".result").append("<li><span>" + "- play - starts the game" + "</span></a></li>");
            $(".result").append("<li><span>" + "- clear - clears the cmd console" + "</span></a></li>");
        }
        else{
            let splitCmd = cmd.split(",")
            manager.onCommand(splitCmd);
        }
    }
}

function log(msg)
{
    console.log(msg);
}



/*let mainCanvas = document.querySelector("canvas");
log(mainCanvas);
let height = window.innerHeight;
let width = window.innerWidth;
mainCanvas.width = width;
mainCanvas.height = height;*/

let innerCanvas = document.getElementsByClassName("innerCanvas")[0];
log(innerCanvas);
var length = 600;
innerCanvas.width = length;
innerCanvas.height = length;
let i = 0;
let lim = 2;
let ctx = innerCanvas.getContext("2d");

let patterns = new Patterns();
patterns.init();
let mainMattrix = getFullMatrix();
log(mainMattrix.length);
init();
draw();
play();

function step()
{
    draw();
    applyRules();
}


function play()
{
    step();
    requestAnimationFrame(play);
}


function applyRules(){
    if(i < lim)
    {
        i ++;
        return;
    }
    i = 0;
    var resultMat = getFullMatrix();
    for(let rowIndex = 1; rowIndex < length - 1; rowIndex ++)
    {
        var resultRowArray = resultMat[rowIndex]
        var rowArray = mainMattrix[rowIndex];
        for(let columnIndex= 1; columnIndex < length - 1; columnIndex ++)
        {
            var nearBy = getNearByIndex(rowIndex, columnIndex);
            if(rowArray[columnIndex] == 1)
            {
                applyForAFullByNearBy(nearBy, columnIndex, resultRowArray);
            }
            else
            {
                applyForAnEmptyByNearBy(nearBy, columnIndex, resultRowArray);
            }
        }
    }
    mainMattrix = resultMat;
}

function applyForAnEmptyByNearBy(nearBy, columnIndex, resultRowArray)
{
    if(nearBy == 3)
    {
        resultRowArray[columnIndex] = 1;
    }
}

function applyForAFullByNearBy(nearBy, columnIndex, resultRowArray)
{
    if(nearBy < 2)
    {
        resultRowArray[columnIndex] = 0;
    }
    if(nearBy > 3)
    {
        resultRowArray[columnIndex] = 0;
    }
    if(nearBy == 2)
    {
        resultRowArray[columnIndex] = 1;
    }
    if(nearBy == 3)
    {
        resultRowArray[columnIndex] = 1;
    }

}

function getNearByIndex(rowIndex, columnIndex)
{
    var count = 0;
    if(mainMattrix[rowIndex - 1][columnIndex - 1] == 1)
    {
        count += 1;
    }
    if(mainMattrix[rowIndex - 1][columnIndex] == 1)
    {
        count += 1;
    }
    if(mainMattrix[rowIndex][columnIndex - 1] == 1)
    {
        count += 1;
    }
    if(mainMattrix[rowIndex - 1][columnIndex + 1] == 1)
    {
        count += 1;
    }
    if(mainMattrix[rowIndex + 1][columnIndex - 1] == 1)
    {
        count += 1;
    }
    if(mainMattrix[rowIndex + 1][columnIndex + 1] == 1)
    {
        count += 1;
    }
    if(mainMattrix[rowIndex][columnIndex + 1]== 1)
    {
        count += 1;
    }
    if(mainMattrix[rowIndex + 1][columnIndex]== 1)
    {
        count += 1; 
    }
    return count;
}

function draw()
{
    ctx.clearRect(0,0,length,length);
    for(let rowIndex = 0; rowIndex < length; rowIndex ++)
    {
        for(let columnIndex= 0; columnIndex < length; columnIndex ++)
        {
            if(mainMattrix[rowIndex][columnIndex] == 1)
            {
                ctx.fillStyle = "rgba(10, 241, 106, 0.7)";
                ctx.fillRect(rowIndex, columnIndex, 1, 1);
            }
        }
    }
}

function init()
{
    let a = patterns.getPulsarPattern();
    var pulsarA = new NamedShape(a, 10, 10, "A");
    add(pulsarA);

    let b = patterns.getPulsarPattern();
    var pulsarB = new NamedShape(b, 575, 575, "B");
    add(pulsarB);

    let c = patterns.getPulsarPattern();
    var pulsarC = new NamedShape(c, 575, 10, "C");
    add(pulsarC);

    let d = patterns.getPulsarPattern();
    var pulsarD = new NamedShape(d, 10, 575, "D");
    add(pulsarD);
 
    let o = patterns.getPulsarPattern();
    var pulsarO = new NamedShape(patterns.getPulsarPattern(), 293, 293, "O");
    add(pulsarO);

    let gA = patterns.getGunPattern();
    var gunA = new NamedShape(gA, 150, 145, "A");
    add(gunA);

    let gB = patterns.getGunPattern();
    var gunB = new NamedShape(gB, 405, 150, "B");
    gunB.rotateContent90(3);
    add(gunB);

    let gc = patterns.getGunPattern();
    var gunC = new NamedShape(gc, 400, 400, "C");
    gunC.rotateContent90(2);
    add(gunC);

    let gd = patterns.getGunPattern();
    var gunD = new NamedShape(gd, 165, 400, "D");
    gunD.rotateContent90(1);
    add(gunD);
}

function add(namedShape)
{
    lim = 1000;
    var offsetR = namedShape._x;
    var offsetC = namedShape._y;
    var limR = namedShape.content.length + offsetR;
    var limC = namedShape.content[0].length + offsetC;
    for(let rowIndex = offsetR; rowIndex < limR; rowIndex ++)
    {
        var rowArray = mainMattrix[rowIndex]
        for(let columnIndex= offsetC; columnIndex < limC; columnIndex ++)
        {
            let row = rowIndex - offsetR;
            let col = columnIndex - offsetC;
            if(namedShape.content[row][col] == 1)
            {
                rowArray[columnIndex] = 1;
            }
        }
    }
    lim = 0;
}

function clearArea(x, y, rows, cols)
{
    lim = 1000;
    var offsetR = x;
    var offsetC = y;
    var limR = rows + offsetR;
    var limC = cols + offsetC;
    for(let rowIndex = offsetR; rowIndex < limR; rowIndex ++)
    {
        var rowArray = mainMattrix[rowIndex]
        for(let columnIndex= offsetC; columnIndex < limC; columnIndex ++)
        {
            rowArray[columnIndex] = 0;
        }
    }
    lim = 0;
}

function clear(namedShape)
{
    lim = 1000;
    var offsetR = namedShape._x;
    var offsetC = namedShape._y;
    var limR = namedShape.content.length + offsetR;
    var limC = namedShape.content[0].length + offsetC;
    for(let rowIndex = offsetR; rowIndex < limR; rowIndex ++)
    {
        var rowArray = mainMattrix[rowIndex]
        for(let columnIndex= offsetC; columnIndex < limC; columnIndex ++)
        {
            let row = rowIndex - offsetR;
            let col = columnIndex - offsetC;
            if(namedShape.content[row][col] == 1)
            {
                rowArray[columnIndex] = 0;
            }
        }
    }
    lim = 0;
}

function getFullMatrix()
{
    var mat = [];
    for(let rowIndex = 0; rowIndex < length; rowIndex ++)
    {
        mat[rowIndex] = [];
        for(let columnIndex= 0; columnIndex < length; columnIndex ++)
        {
            mat[rowIndex].push(0);
        }
    }
    return mat;
}

function log(msg)
{
    console.log(msg);
}
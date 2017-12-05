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

  const _stepIndex = Symbol('stepIndex');
  const _stepIndexLim = Symbol('stepIndexLim');
  class GameMatrixManager{
      constructor(patterns)
      {
          this._patterns = patterns;
          this[_stepIndex] = 0;
          this[_stepIndexLim] = 0;
          this._mainMattrix = this.getFullMatrix();
          this.init();
      }
  
      applyRules(){
          if(this[_stepIndex] < this[_stepIndexLim])
          {
              this[_stepIndex]  ++;
              return;
          }
          this[_stepIndex]  = 0;
          var resultMat = this.getFullMatrix();
          for(let rowIndex = 1; rowIndex < length - 1; rowIndex ++)
          {
              var resultRowArray = resultMat[rowIndex]
              var rowArray = this._mainMattrix[rowIndex];
              for(let columnIndex= 1; columnIndex < length - 1; columnIndex ++)
              {
                  var nearBy = this.getNearByIndex(rowIndex, columnIndex);
                  if(rowArray[columnIndex] == 1)
                  {
                    this.applyForAFullByNearBy(nearBy, columnIndex, resultRowArray);
                  }
                  else
                  {
                    this.applyForAnEmptyByNearBy(nearBy, columnIndex, resultRowArray);
                  }
              }
          }
          this._mainMattrix = resultMat;
      }
  
      applyForAnEmptyByNearBy(nearBy, columnIndex, resultRowArray)
      {
          if(nearBy == 3)
          {
              resultRowArray[columnIndex] = 1;
          }
      }
  
      applyForAFullByNearBy(nearBy, columnIndex, resultRowArray)
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
  
      getNearByIndex(rowIndex, columnIndex)
      {
          var count = 0;
          if(this._mainMattrix[rowIndex - 1][columnIndex - 1] == 1)
          {
              count += 1;
          }
          if(this._mainMattrix[rowIndex - 1][columnIndex] == 1)
          {
              count += 1;
          }
          if(this._mainMattrix[rowIndex][columnIndex - 1] == 1)
          {
              count += 1;
          }
          if(this._mainMattrix[rowIndex - 1][columnIndex + 1] == 1)
          {
              count += 1;
          }
          if(this._mainMattrix[rowIndex + 1][columnIndex - 1] == 1)
          {
              count += 1;
          }
          if(this._mainMattrix[rowIndex + 1][columnIndex + 1] == 1)
          {
              count += 1;
          }
          if(this._mainMattrix[rowIndex][columnIndex + 1]== 1)
          {
              count += 1;
          }
          if(this._mainMattrix[rowIndex + 1][columnIndex]== 1)
          {
              count += 1; 
          }
          return count;
      }
  
      init()
      {
          let a = this._patterns.getPulsarPattern();
          var pulsarA = new NamedShape(a, 10, 10, "A");
          this.add(pulsarA);
      
          let b = this._patterns.getPulsarPattern();
          var pulsarB = new NamedShape(b, 575, 575, "B");
          this.add(pulsarB);
      
          let c = this._patterns.getPulsarPattern();
          var pulsarC = new NamedShape(c, 575, 10, "C");
          this.add(pulsarC);
      
          let d = this._patterns.getPulsarPattern();
          var pulsarD = new NamedShape(d, 10, 575, "D");
          this.add(pulsarD);
       
          let o = this._patterns.getPulsarPattern();
          var pulsarO = new NamedShape(patterns.getPulsarPattern(), 293, 293, "O");
          this.add(pulsarO);
      
          let gA = this._patterns.getGunPattern();
          var gunA = new NamedShape(gA, 150, 145, "A");
          this.add(gunA);
      
          let gB = this._patterns.getGunPattern();
          var gunB = new NamedShape(gB, 405, 150, "B");
          gunB.rotateContent90(3);
          this.add(gunB);
      
          let gc = this._patterns.getGunPattern();
          var gunC = new NamedShape(gc, 400, 400, "C");
          gunC.rotateContent90(2);
          this.add(gunC);
      
          let gd = patterns.getGunPattern();
          var gunD = new NamedShape(gd, 165, 400, "D");
          gunD.rotateContent90(1);
          this.add(gunD);
      }
  
      add(namedShape)
      {
          this[_stepIndexLim] = 1000;
          var offsetR = namedShape._x;
          var offsetC = namedShape._y;
          var limR = namedShape.content.length + offsetR;
          var limC = namedShape.content[0].length + offsetC;
          for(let rowIndex = offsetR; rowIndex < limR; rowIndex ++)
          {
              var rowArray = this._mainMattrix[rowIndex]
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
          this[_stepIndexLim] = 0;
      }
  
      clearArea(x, y, rows, cols)
      {
          this[_stepIndexLim] = 1000;
          var offsetR = x;
          var offsetC = y;
          var limR = rows + offsetR;
          var limC = cols + offsetC;
          for(let rowIndex = offsetR; rowIndex < limR; rowIndex ++)
          {
              var rowArray = this._mainMattrix[rowIndex]
              for(let columnIndex= offsetC; columnIndex < limC; columnIndex ++)
              {
                  rowArray[columnIndex] = 0;
              }
          }
          this[_stepIndexLim] = 0;
      }
      
      clear(namedShape)
      {
          this[_stepIndexLim] = 1000;
          var offsetR = namedShape._x;
          var offsetC = namedShape._y;
          var limR = namedShape.content.length + offsetR;
          var limC = namedShape.content[0].length + offsetC;
          for(let rowIndex = offsetR; rowIndex < limR; rowIndex ++)
          {
              var rowArray = this._mainMattrix[rowIndex]
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
          this[_stepIndexLim] = 0;
      }
      
      getFullMatrix()
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
  }

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
  const applyCmd = Symbol('applyCmd');
  const _shapes = Symbol('shapes');
  const findShape = Symbol('findShape');
  const draw = Symbol('draw');
  const _canvasWrapper = Symbol('canvasWrapper');
  const _playAction = Symbol('_playAction');
  const _gameMatrixManager = Symbol('gameMatrixManager')
  class Manager{
      constructor(log, patterns, canvasWrapper, playAction, matrixManager)
      {
          this[_shapes] = [];
          this[_managerLog] = log;
          this[_patternsProvider] = patterns;
          this[_canvasWrapper] = canvasWrapper;
          this[_playAction] = playAction;
          this[_gameMatrixManager] = matrixManager;
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

      [applyCmd](params)
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
               this[_gameMatrixManager].add(shape);
               this[_shapes].push(shape);
               break; 
            } 
            case "rotate pulsar": { 
                let name = params[1].trim();
                let angle = parseInt(params[2].trim());
                var shape = this[findShape](name);
                this[_gameMatrixManager].clear(shape);
                shape.rotateContent90(this[getTimes90](angle));
                this[_gameMatrixManager].add(shape);
               break; 
            }
            case "move pulsar": { 
                let name = params[1].trim();
                let x = parseInt(params[2].trim()) ;
                let y = parseInt(params[3].trim());
                var shape = this[findShape](name);
                this[_gameMatrixManager].clear(shape);
                shape.move(x,y);
                this[_gameMatrixManager].add(shape);
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
                this[_gameMatrixManager].add(shape);
                this[_shapes].push(shape);
               break; 
            } 
            case "rotate gun": { 
                let name = params[1].trim();
                let angle = parseInt(params[2].trim());
                var shape = this[findShape](name);
                this[_gameMatrixManager].clearArea(shape._x, shape._y, 42, 42);
                shape.rotateContent90(this[getTimes90](angle));
                this[_gameMatrixManager].add(shape);
               break; 
            }
            case "move gun": { 
                let name = params[1].trim();
                let x = parseInt(params[2].trim()) ;
                let y = parseInt(params[3].trim());
                var shape = this[findShape](name);
                this[_gameMatrixManager].clearArea(shape._x, shape._y, 42, 42);
                shape.move(x,y);
                this[_gameMatrixManager].add(shape);
               break;    
            } 
            case "step": { 
                this.step();
               break; 
            }
            case "play": { 
                this[_playAction]();
               break;    
            } 
            case "clear area": { 
                let x = parseInt(params[1].trim()) ;
                let y = parseInt(params[2].trim());
                let rows = parseInt(params[3].trim()) ;
                let cols = parseInt(params[4].trim());
                this[_gameMatrixManager].clearArea(x, y, rows, cols);
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
        this[applyCmd](params);
      }

      step()
      {
          this[draw]();
          this[_gameMatrixManager].applyRules();
      }
      
      [draw]()
      {
          this[_canvasWrapper].drawMattrix(this[_gameMatrixManager]._mainMattrix);
      }
  }

  const _canvas = Symbol('cancas');
  const _canvasContext = Symbol('canvasContext');
  class CanvasWrapper{
      constructor(canvas)
      {
          this[_canvas] = canvas;
          this[_canvasContext] = this[_canvas].getContext("2d");
      }

      drawMattrix(mat)
      {
        let rows = mat.length;
        let cols = mat[0].length;
        this[_canvasContext].clearRect(0,0,rows,cols);
        for(let rowIndex = 0; rowIndex < rows; rowIndex ++)
        {
            for(let columnIndex= 0; columnIndex < cols; columnIndex ++)
            {
                if(mat[rowIndex][columnIndex] == 1)
                {
                    this[_canvasContext].fillStyle = "rgba(10, 241, 106, 0.7)";
                    this[_canvasContext].fillRect(rowIndex, columnIndex, 1, 1);
                }
            }
        }
      }
  }

function play()
{
    manager.step();
    requestAnimationFrame(play);
}

let innerCanvas = document.getElementsByClassName("innerCanvas")[0];
var length = 600;
innerCanvas.width = length;
innerCanvas.height = length;
let patterns = new Patterns();
patterns.init();
let matrixManager = new GameMatrixManager(patterns)
let manager = new Manager(log, patterns, new CanvasWrapper(innerCanvas), play, matrixManager);

$(".cmdInput").on('keyup', function (e) {
    if (e.keyCode == 13) {
        let cmd = $(".cmdInput").val();
        $(".cmdInput").val("");
        $(".result").prepend("<li><span>" + cmd + "</span></a></li>");
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
            $(".result").prepend("<li><span>" + "- clear - clears the cmd console" + "</span></a></li>");
            $(".result").prepend("<li><span>" + "- rotate pulsar, name, angle  - rotates specific pulsar with angle" + "</span></a></li>");
            $(".result").prepend("<li><span>" + "- move pulsar, name, x, y  - moves specific pulsar to [x,y]" + "</span></a></li>");
            $(".result").prepend("<li><span>" + "- rotate gun, name, angle  - rotates specific gun with angle" + "</span></a></li>");
            $(".result").prepend("<li><span>" + "- create pulsar, name, x, y, angle  - creates a named pulsar in [x,y] coordinates with rotation angle" + "</span></a></li>");
            $(".result").prepend("<li><span>" + "- create gun, name, x, y, angle  - creates a named gun in [x,y] coordinates with rotation angle" + "</span></a></li>");
            $(".result").prepend("<li><span>" + "- clear area, x, y, rows, cols  - clears specific area of the game canvas" + "</span></a></li>");
            $(".result").prepend("<li><span>" + "- step - performs a single step" + "</span></a></li>");
            $(".result").prepend("<li><span>" + "- play - starts the game" + "</span></a></li>");
            $(".result").prepend("<li><span>" + "- these are allowed commands:" + "</span></a></li>");
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
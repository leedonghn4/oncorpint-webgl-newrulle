
var gl;
var matrixs;
var vertexpositionandcolorbuffers;
     var glValue = function(canvas){
        
        try 
        {
            gl =  canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;

            matrixs = {
				mvMatrix: mat4.create(),
				pMatrix: mat4.create(),
				mvMatrixStack: []
			}; 

			 vertexpositionandcolorbuffers = {
				rectangleVertexPositionBuffer: gl.createBuffer(),
				rectangleVertexColorBuffer: gl.createBuffer()
			}; 
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise Web gl, sorry :-(");
        }
    };


		    var  bascisparameters = {
		    		colNum:50,
		    		rowNum:100,
    			    marginX: 5.0,
				    marginY: 5.0,
				    recWidth: 7.0,
				    recHeight: 20.0,
				    squareHeigth: 7.0,
				    depth: 0.01,
				    mouseshiftX: 100,
				    mouseshiftY: 50,
				    scalepercentage: 0.185, //scale percentage
				    incresortstatus: true,
			        showmutation: false,
			    	zoomValue: 1.0
	    	};

		    var initBuffers = function() 
			{
				var rectanglevertices = [];
				var rectanglecolors = [];				

				//rectangle.gle vertex and color
		         gl.bindBuffer( gl.ARRAY_BUFFER,  vertexpositionandcolorbuffers.rectangleVertexPositionBuffer);
		         	
		    	for(var j = 0; j <  bascisparameters.colNum; j++)
		        {

		            var low  = ( bascisparameters.marginY+ bascisparameters.recHeight)*j +  bascisparameters.marginY;
		            var high = ( bascisparameters.marginY+ bascisparameters.recHeight)*j +  bascisparameters.marginY +  bascisparameters.recHeight;      

		            if(j === 47 )
		            {
		                for(var i = 0;i< bascisparameters.rowNum; i++)
		                {
		                    var increment = i*1.0/ bascisparameters.rowNum ;
		                    var low  = ( bascisparameters.marginY+ bascisparameters.recHeight)*j +  bascisparameters.marginY;
		                    var high = ( bascisparameters.marginY+ bascisparameters.recHeight)*j +  bascisparameters.marginY +  bascisparameters.recHeight * increment;  

		                    var left  = ( bascisparameters.marginX+ bascisparameters.recWidth)*i +  bascisparameters.marginX;
		                    var right = ( bascisparameters.marginX+ bascisparameters.recWidth)*i +  bascisparameters.recWidth +  bascisparameters.marginX;

		                    rectanglevertices.push(right, high,  bascisparameters.depth);
		                    rectanglevertices.push(left,  high,  bascisparameters.depth);
		                    rectanglevertices.push(right,  low,  bascisparameters.depth);

		                    rectanglevertices.push(left, high,  bascisparameters.depth);
		                    rectanglevertices.push(right, low,  bascisparameters.depth);
		                    rectanglevertices.push(left,  low,  bascisparameters.depth);
		                }
		            }
		            else
		            {
		                for(var i = 0;i< bascisparameters.rowNum; i++)
		                {
		                        var left  = ( bascisparameters.marginX+ bascisparameters.recWidth)*i +  bascisparameters.marginX;
		                        var right = ( bascisparameters.marginX+ bascisparameters.recWidth)*i +  bascisparameters.recWidth +  bascisparameters.marginX;

		                        rectanglevertices.push(right, high,  bascisparameters.depth);
		                        rectanglevertices.push(left,  high,  bascisparameters.depth);
		                        rectanglevertices.push(right,  low,  bascisparameters.depth);

		                        rectanglevertices.push(left, high,  bascisparameters.depth);
		                        rectanglevertices.push(right, low,  bascisparameters.depth);
		                        rectanglevertices.push(left,  low,  bascisparameters.depth);
		                }
		            }
		        }
		        
		        // if(Xindex !== undefined)
		        // {
		        // 	for(var i = 0; i <  bascisparameters.colNum; i++)
		        // 	{
		        //             var left  = ( bascisparameters.marginX+ bascisparameters.recWidth)*Xindex +  bascisparameters.marginX -  bascisparameters.scalepercentage* bascisparameters.recWidth;
		        //             var right = ( bascisparameters.marginX+ bascisparameters.recWidth)*Xindex +  bascisparameters.recWidth +  bascisparameters.marginX +  bascisparameters.scalepercentage* bascisparameters.recWidth;
		        //             var low   = ( bascisparameters.marginY+ bascisparameters.recHeight)*i +  bascisparameters.marginY -  bascisparameters.scalepercentage* bascisparameters.recWidth;
		        //             var high  = ( bascisparameters.marginY+ bascisparameters.recHeight)*i +  bascisparameters.marginY +  bascisparameters.recHeight +  bascisparameters.scalepercentage* bascisparameters.recWidth;        	

		        //             rectangvertices[(Xindex+i* bascisparameters.rowNum)* 6 * 3]     = right; rectangle.glevertices[(Xindex+j* bascisparameters.rowNum)* 6 * 3 + 1] = high;
		        //             rectanglevertices[(Xindex+i* bascisparameters.rowNum)* 6 * 3 + 3] = left;  rectangle.glevertices[(Xindex+j* bascisparameters.rowNum)* 6 * 3 + 4] = high;
		        //             rectanglevertices[(Xindex+i* bascisparameters.rowNum)* 6 * 3 + 6] = right; rectangle.glevertices[(Xindex+j* bascisparameters.rowNum)* 6 * 3 + 7] = low;

		        //             rectanglevertices[(Xindex+i* bascisparameters.rowNum)* 6 * 3 + 9] = left;  rectangle.glevertices[(Xindex+j* bascisparameters.rowNum)* 6 * 3 + 10] = high;
		        //             rectanglevertices[(Xindex+i* bascisparameters.rowNum)* 6 * 3 + 12] = right;rectangle.glevertices[(Xindex+j* bascisparameters.rowNum)* 6 * 3 + 13] = low;
		        //             rectanglevertices[(Xindex+i* bascisparameters.rowNum)* 6 * 3 + 15] = left; rectangle.glevertices[(Xindex+j* bascisparameters.rowNum)* 6 * 3 + 16] = low; 
		        // 	}
		        	
		        // 	// line vertex and color
		        // 	frameLeft  = ( bascisparameters.marginX+ bascisparameters.recWidth)*Xindex +  bascisparameters.marginX -  bascisparameters.scalepercentage* bascisparameters.recWidth;
		        // 	frameRight = ( bascisparameters.marginX+ bascisparameters.recWidth)*Xindex +  bascisparameters.recWidth +  bascisparameters.marginX +  bascisparameters.scalepercentage* bascisparameters.recWidth;
		        // 	frameLow   = ( bascisparameters.marginY+ bascisparameters.recHeight)*Yindex +  bascisparameters.marginY -  bascisparameters.scalepercentage* bascisparameters.recWidth;
		        //  	frameHigh  = ( bascisparameters.marginY+ bascisparameters.recHeight)*Yindex +  bascisparameters.marginY +  bascisparameters.recHeight +  bascisparameters.scalepercentage* bascisparameters.recWidth; 
		        // }
		        
		         gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(rectanglevertices),  gl.STATIC_DRAW);
		         vertexpositionandcolorbuffers.rectangleVertexPositionBuffer.itemSize = 3;
		         vertexpositionandcolorbuffers.rectangleVertexPositionBuffer.numItems = 6 *  bascisparameters.rowNum *  bascisparameters.colNum;
				
		         vertexpositionandcolorbuffers.rectangleVertexColorBuffer =  gl.createBuffer();
		         gl.bindBuffer( gl.ARRAY_BUFFER,  vertexpositionandcolorbuffers.rectangleVertexColorBuffer);

		        for(var i = 0;i< bascisparameters.rowNum; i++)
		        {           
		            for(var j = 0; j <  bascisparameters.colNum; j++)
		            {
	                    rectanglecolors.push(1.0, 0.0, 0.0, 1.0);
	                    rectanglecolors.push(1.0, 0.0, 0.0, 1.0);
	                    rectanglecolors.push(1.0, 0.0, 0.0, 1.0);

	                    rectanglecolors.push(1.0, 0.0, 0.0, 1.0);
	                    rectanglecolors.push(1.0, 0.0, 0.0, 1.0);
	                    rectanglecolors.push(1.0, 0.0, 0.0, 1.0);
		            }
		        }
		         gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(rectanglecolors),  gl.STATIC_DRAW);
		         vertexpositionandcolorbuffers.rectangleVertexColorBuffer.itemSize = 4;
		         vertexpositionandcolorbuffers.rectangleVertexColorBuffer.numItems = 6 *  bascisparameters.rowNum  *  bascisparameters.colNum;
		    };

		    var shaderparameter = {
		    	types:{vertex: 'VERTEX_SHADER', fragment: 'FRAGMENT_SHADER'},
		    	vertex:[
						        'attribute vec3 aVertexPosition;',
						        'attribute vec4 aVertexColor;',
						        '',
						        'uniform mat4 uMVMatrix;',
						        'uniform mat4 uPMatrix;',
						        'varying vec4 vColor;',
						        'void main(void) {',
						        '    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);',
						        '    vColor = aVertexColor;',
						        '}'
						       ].join('\n'),
		        fragment:[
					        'precision mediump float;',
					        'varying vec4 vColor;',
					        '',
					        'void main(void)',
					        '{',
					        '  gl_FragColor = vColor;',
					        '}'
					      ].join('\n')
		    };

		    var createshaders=function(shaders) {
	        	var program, linked, error;
		        program =  gl.createProgram();
		        // _.each(shaders, function(s) {
		        //    gl.attachShader(program, s);
		        // });

		        for(var i = 0; i <shaders.length ; i++)
		        {
		        	 gl.attachShader(program, shaders[i])
		        }

		         gl.linkProgram(program);
		        linked =  gl.getProgramParameter(program,  gl.LINK_STATUS);
		        if (!linked) {
		          error =  gl.getProgramInfoLog(program);
		           gl.deleteProgram(program);
		          throw ('unable to link program: ' + error);
		        }

		        return program;
		    };

		    var getShader = function(source, type) {
		        var shader, compiled, error;
		        shader =  gl.createShader( gl[type]);
		         gl.shaderSource(shader, source);
		         gl.compileShader(shader);

		        compiled =  gl.getShaderParameter(shader,  gl.COMPILE_STATUS);
		        if (!compiled) {
		          error =  gl.getShaderInfoLog(shader);
		           gl.deleteShader(shader);
		          throw ('unable to compile shader ' + shader + ': ' + error);
		        }

		        return shader;
		    };

    	    var initShaders = function() 
		    {
		        //shader 0
		        var shaderProgram;
				vs =  getShader( shaderparameter.vertex,  shaderparameter.types.vertex);
				fs =  getShader( shaderparameter.fragment,  shaderparameter.types.fragment);

		        shaderProgram =  createshaders([vs, fs]);

    			shaderProgram.vertexPositionAttribute =  gl.getAttribLocation(shaderProgram, "aVertexPosition");
		         gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
		        shaderProgram.vertexColorAttribute =  gl.getAttribLocation(shaderProgram, "aVertexColor");
		         gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
		        
		        shaderProgram.pMatrixUniform =  gl.getUniformLocation(shaderProgram, "uPMatrix");
		        shaderProgram.mvMatrixUniform =  gl.getUniformLocation(shaderProgram, "uMVMatrix");  

    			return shaderProgram;
		    };

		    var shaderprogram;

		   	var setMatrixUniforms = function() 
			{
		         gl.uniformMatrix4fv( shaderprogram.pMatrixUniform, false,  matrixs.pMatrix);
		         gl.uniformMatrix4fv( shaderprogram.mvMatrixUniform, false,  matrixs.mvMatrix);
		    };

		    var drawScene = function()
		   {
		   		var zPos = 0;

		         gl.viewport(0, 0,  gl.viewportWidth,  gl.viewportHeight);
		         gl.clear( gl.COLOR_BUFFER_BIT |  gl.DEPTH_BUFFER_BIT);
		      
				mat4.identity( matrixs.pMatrix);
		        mat4.ortho(0,  gl.viewportWidth, 0,  gl.viewportHeight, -10.0, 10.0,  matrixs.pMatrix);
				mat4.identity( matrixs.mvMatrix);	
				 matrixs.mvMatrix = mat4.lookAt([0,0,zPos], [0, 0, -100], [0, 1, 0]);//this is the same as glulookat in Opengl
				 gl.useProgram( shaderprogram);//use shaderprograme
				
				//setup translate matrix
		        mat4.translate( matrixs.mvMatrix, [-1.5, 0.0, -7.0]);

				//draw rectangle.gle
		         gl.bindBuffer( gl.ARRAY_BUFFER,  vertexpositionandcolorbuffers.rectangleVertexPositionBuffer);
		         gl.vertexAttribPointer( shaderprogram.vertexPositionAttribute,  vertexpositionandcolorbuffers.rectangleVertexPositionBuffer.itemSize,  gl.FLOAT, false, 0, 0);
				 gl.bindBuffer( gl.ARRAY_BUFFER,  vertexpositionandcolorbuffers.rectangleVertexColorBuffer);
		         gl.vertexAttribPointer( shaderprogram.vertexColorAttribute,  vertexpositionandcolorbuffers.rectangleVertexColorBuffer.itemSize,  gl.FLOAT, false, 0, 0);
		        
		         setMatrixUniforms();

				 gl.drawArrays( gl.TRIANGLES, 0,  vertexpositionandcolorbuffers.rectangleVertexPositionBuffer.numItems);	
			};

			var drawElements = function(canvas)
			{
				 glValue(canvas);
				 gl.clearColor(0.7, 0.7, 0.7, 1.0);
        		 gl.enable(gl.DEPTH_TEST);


		         shaderprogram =  initShaders();

        		 initBuffers();
        		 drawScene();
			};

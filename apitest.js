function webglFunction(gl,canvaselement,bascisparameters){
			var self = this;
			this.contentvalue = "what is this?";
			this.mouserpositionX= 0;
			this.mouserpositionY= 0;
			this.matrixs = {
				mvMatrix: mat4.create(),
				pMatrix: mat4.create(),
				mvMatrixStack: []
			}; 

			this.gl = gl;
			this.canvaselement = canvaselement;
			this.showtooltip = false;
			this.datas = {};
			this.origindatas = {};

			this.vertexpositionandcolorbuffers = {
				rectangleVertexPositionBuffer:this.gl.createBuffer(),
				rectangleVertexColorBuffer:this.gl.createBuffer(),
				squareVertexPositionBuffer:this.gl.createBuffer(),
				squareVertexColorBuffer:this.gl.createBuffer(),
				triangleVertexPositionBuffer:this.gl.createBuffer(),
				triangleVertexColorBuffer:this.gl.createBuffer(),
				wireVertexPositionBuffer:this.gl.createBuffer(),
				wireVertexColorBuffer:this.gl.createBuffer(),
				ellipseVertexPositionBuffer:this.gl.createBuffer(),
				ellipseVertexColorBuffer:this.gl.createBuffer(),
				lineVertexPositionBuffer:this.gl.createBuffer(),
				lineeVertexColorBuffer:this.gl.createBuffer(),
			}; 

			this.bascisparameters = bascisparameters;

		    this.initBuffers = function(datas) 
			{			
				//rectangle vertex and color
				if(datas.rectanglevertexdata && datas.rectanglecolordata)
				{
			        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.rectangleVertexPositionBuffer);				        
			        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(datas.rectanglevertexdata), this.gl.STATIC_DRAW);
			        this.vertexpositionandcolorbuffers.rectangleVertexPositionBuffer.itemSize = 3;
			        this.vertexpositionandcolorbuffers.rectangleVertexPositionBuffer.numItems = datas.rectanglevertexdata.length/3;

			        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.rectangleVertexColorBuffer);
			        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(datas.rectanglecolordata), this.gl.STATIC_DRAW);
			        this.vertexpositionandcolorbuffers.rectangleVertexColorBuffer.itemSize = 4;
			        this.vertexpositionandcolorbuffers.rectangleVertexColorBuffer.numItems = datas.rectanglecolordata.length/4;
		    	}

		    	//square vertex and color
				if(datas.squarevertexdata && datas.squarecolordata)
				{
			        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.squareVertexPositionBuffer);				        
			        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(datas.squarevertexdata), this.gl.STATIC_DRAW);
			        this.vertexpositionandcolorbuffers.squareVertexPositionBuffer.itemSize = 3;
			        this.vertexpositionandcolorbuffers.squareVertexPositionBuffer.numItems = datas.squarevertexdata.length/3;

			        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.squareVertexColorBuffer);
			        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(datas.squarecolordata), this.gl.STATIC_DRAW);
			        this.vertexpositionandcolorbuffers.squareVertexColorBuffer.itemSize = 4;
			        this.vertexpositionandcolorbuffers.squareVertexColorBuffer.numItems = datas.squarecolordata.length/4;
				}

				//triangle vertex and color
				if(datas.trianglevertexdata && datas.trianglecolordata)
				{
			        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.triangleVertexPositionBuffer);				        
			        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(datas.trianglevertexdata), this.gl.STATIC_DRAW);
			        this.vertexpositionandcolorbuffers.triangleVertexPositionBuffer.itemSize = 3;
			        this.vertexpositionandcolorbuffers.triangleVertexPositionBuffer.numItems = datas.trianglevertexdata.length/3;

			        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.triangleVertexColorBuffer);
			        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(datas.trianglecolordata), this.gl.STATIC_DRAW);
			        this.vertexpositionandcolorbuffers.triangleVertexColorBuffer.itemSize = 4;
			        this.vertexpositionandcolorbuffers.triangleVertexColorBuffer.numItems = datas.trianglecolordata.length/4;
				}

				//ellipse vertex and color
				if(datas.ellipsevertexdata && datas.ellipsecolordata)
				{
			        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.ellipseVertexPositionBuffer);				        
			        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(datas.ellipsevertexdata), this.gl.STATIC_DRAW);
			        this.vertexpositionandcolorbuffers.ellipseVertexPositionBuffer.itemSize = 3;
			        this.vertexpositionandcolorbuffers.ellipseVertexPositionBuffer.numItems = datas.ellipsevertexdata.length/3;

			        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.ellipseVertexColorBuffer);
			        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(datas.ellipsecolordata), this.gl.STATIC_DRAW);
			        this.vertexpositionandcolorbuffers.ellipseVertexColorBuffer.itemSize = 4;
			        this.vertexpositionandcolorbuffers.ellipseVertexColorBuffer.numItems = datas.ellipsecolordata.length/4;
				}
		    };

		    this.shaderparameter = {
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

		    this.createshaders=function(shaders) {
	        	var program, linked, error;
		        program = this.gl.createProgram();

		        for(var i = 0; i <shaders.length ; i++)
		        {
		        	this.gl.attachShader(program, shaders[i])
		        }

		        this.gl.linkProgram(program);
		        linked = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
		        if (!linked) {
		          error = this.gl.getProgramInfoLog(program);
		          this.gl.deleteProgram(program);
		          throw ('unable to link program: ' + error);
		        }

		        return program;
		    };

		    this.getShader = function(source, type) {
		        var shader, compiled, error;
		        shader = this.gl.createShader(this.gl[type]);
		        this.gl.shaderSource(shader, source);
		        this.gl.compileShader(shader);

		        compiled = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
		        if (!compiled) {
		          error = this.gl.getShaderInfoLog(shader);
		          this.gl.deleteShader(shader);
		          throw ('unable to compile shader ' + shader + ': ' + error);
		        }

		        return shader;
		    };

		    this.findGeneClinicData = function ()
		    {
		    }

    	    this.initShaders = function() 
		    {
		        //shader 0
		        var shaderProgram;
				vs = this.getShader(this.shaderparameter.vertex, this.shaderparameter.types.vertex);
				fs = this.getShader(this.shaderparameter.fragment, this.shaderparameter.types.fragment);

		        shaderProgram = this.createshaders([vs, fs]);

    			shaderProgram.vertexPositionAttribute = this.gl.getAttribLocation(shaderProgram, "aVertexPosition");
		        this.gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
		        shaderProgram.vertexColorAttribute = this.gl.getAttribLocation(shaderProgram, "aVertexColor");
		        this.gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
		        
		        shaderProgram.pMatrixUniform = this.gl.getUniformLocation(shaderProgram, "uPMatrix");
		        shaderProgram.mvMatrixUniform = this.gl.getUniformLocation(shaderProgram, "uMVMatrix");  

    			return shaderProgram;
		    };

		    this.shaderprogram = this.initShaders();

		   	this.setMatrixUniforms = function() 
			{
		        this.gl.uniformMatrix4fv(this.shaderprogram.pMatrixUniform, false, this.matrixs.pMatrix);
		        this.gl.uniformMatrix4fv(this.shaderprogram.mvMatrixUniform, false, this.matrixs.mvMatrix);
		    };

		    this.drawScene = function()
		    {
		   		var zPos = 1;

		        this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
		        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		      
				mat4.identity(this.matrixs.pMatrix);
		        mat4.ortho(0, this.gl.viewportWidth, 0, this.gl.viewportHeight, -1.0, 10.0, this.matrixs.pMatrix);
				mat4.identity(this.matrixs.mvMatrix);	
				this.matrixs.mvMatrix = mat4.lookAt([0,0,zPos], [0, 0, 0], [0, 1, 0]);//this is the same as glulookat in Opengl
				
				this.gl.useProgram(this.shaderprogram);//use shaderprograme

				//draw rectangle
				if(this.vertexpositionandcolorbuffers.rectangleVertexPositionBuffer)
				{
			        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.rectangleVertexPositionBuffer);
			        this.gl.vertexAttribPointer(this.shaderprogram.vertexPositionAttribute, this.vertexpositionandcolorbuffers.rectangleVertexPositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
					this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.rectangleVertexColorBuffer);
			        this.gl.vertexAttribPointer(this.shaderprogram.vertexColorAttribute, this.vertexpositionandcolorbuffers.rectangleVertexColorBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
			        this.setMatrixUniforms();
					this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexpositionandcolorbuffers.rectangleVertexPositionBuffer.numItems);
				}	

				//draw square
				if(this.vertexpositionandcolorbuffers.squareVertexPositionBuffer)
				{
					this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.squareVertexPositionBuffer);
			        this.gl.vertexAttribPointer(this.shaderprogram.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);
					this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.squareVertexColorBuffer);
			        this.gl.vertexAttribPointer(this.shaderprogram.vertexColorAttribute, 4, this.gl.FLOAT, false, 0, 0);
			        this.setMatrixUniforms();
					this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexpositionandcolorbuffers.squareVertexPositionBuffer.numItems);	
				}

				//draw triangle
				if(this.vertexpositionandcolorbuffers.triangleVertexPositionBuffer)
				{
					this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.triangleVertexPositionBuffer);
			        this.gl.vertexAttribPointer(this.shaderprogram.vertexPositionAttribute, this.vertexpositionandcolorbuffers.triangleVertexPositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
					this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.triangleVertexColorBuffer);
			        this.gl.vertexAttribPointer(this.shaderprogram.vertexColorAttribute, this.vertexpositionandcolorbuffers.triangleVertexColorBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
			        this.setMatrixUniforms();
					this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexpositionandcolorbuffers.triangleVertexPositionBuffer.numItems);
				}

				//draw ellipse
				if(this.vertexpositionandcolorbuffers.ellipseVertexPositionBuffer)
				{
					this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.ellipseVertexPositionBuffer);
			        this.gl.vertexAttribPointer(this.shaderprogram.vertexPositionAttribute, this.vertexpositionandcolorbuffers.ellipseVertexPositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
					this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.ellipseVertexColorBuffer);
			        this.gl.vertexAttribPointer(this.shaderprogram.vertexColorAttribute, this.vertexpositionandcolorbuffers.ellipseVertexColorBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
			        this.setMatrixUniforms();
					this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexpositionandcolorbuffers.ellipseVertexPositionBuffer.numItems);
				}

				//draw rectangle wire
				if(this.datas.wirevertexdata !== undefined)
				{
	                var lineVertexColorBuffer = this.gl.createBuffer();
		            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, lineVertexColorBuffer);
		            var colors = [
		                0.0, 0.0, 0.0, 1.0,
		                0.0, 0.0, 0.0, 1.0,
		                0.0, 0.0, 0.0, 1.0,
		                0.0, 0.0, 0.0, 1.0,
		                0.0, 0.0, 0.0, 1.0,
		                0.0, 0.0, 0.0, 1.0,
		                0.0, 0.0, 0.0, 1.0,
		                0.0, 0.0, 0.0, 1.0
		            ];
		            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colors), this.gl.STATIC_DRAW);
		            lineVertexColorBuffer.itemSize = 4;
		            lineVertexColorBuffer.numItems = 2*4;

		    		var vbuf = this.gl.createBuffer();
		    		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbuf);
		    		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.datas.wirevertexdata, this.gl.STATIC_DRAW);

		            var idx = new Uint16Array([0, 1, 2, 3, 4, 5, 6, 7]);
		    		var ibuf = this.gl.createBuffer();
		    		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, ibuf);
		    		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW);
		    		this.gl.vertexAttribPointer(this.shaderprogram.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);
		    		
		    		this.gl.lineWidth(2.0);
		    		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, lineVertexColorBuffer);
		    		this.gl.vertexAttribPointer(this.shaderprogram.vertexColorAttribute, 4, this.gl.FLOAT, false, 0, 0);
		    		this.setMatrixUniforms();
		    		this.gl.drawElements(this.gl.LINES, 8, this.gl.UNSIGNED_SHORT, 0);
	    		}


				//draw lines
				if(this.datas.linevertexdata.length > 0)
				{
	                var linesVertexColorBuffer = this.gl.createBuffer();
		            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, linesVertexColorBuffer);
		            var colors = this.datas.linecolordata;
		            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colors), this.gl.STATIC_DRAW);
		            linesVertexColorBuffer.itemSize = 4;
		            linesVertexColorBuffer.numItems = this.datas.linecolordata.length/4;
		            
		    		var vtx = new Float32Array(this.datas.linevertexdata);
		    		var vbuf = this.gl.createBuffer();
		    		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbuf);
		    		this.gl.bufferData(this.gl.ARRAY_BUFFER, vtx, this.gl.STATIC_DRAW);

		            var idx = new Uint16Array(this.datas.lineindexdata);
		    		var ibuf = this.gl.createBuffer();
		    		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, ibuf);
		    		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW);
		    		this.gl.vertexAttribPointer(this.shaderprogram.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);
		    		
		    		this.gl.lineWidth(2.0);
		    		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, linesVertexColorBuffer);
		    		this.gl.vertexAttribPointer(this.shaderprogram.vertexColorAttribute, 4, this.gl.FLOAT, false, 0, 0);
		    		this.setMatrixUniforms();
		    		this.gl.drawElements(this.gl.LINES, this.datas.linecolordata.length/4, this.gl.UNSIGNED_SHORT, 0);
				}
			};


			this.getPosition = function(winX, winY)
			{
				var viewportArray = [ 0, 0, self.gl.viewportWidth, self.gl.viewportHeight ];

				// The results of the operation will be stored in this array.
				var modelPointArrayResults = [0.0, 0.0, 0.0];
				var success = GLU.unProject(
					winX, winY, 0.9865,
					self.matrixs.mvMatrix, self.matrixs.pMatrix,
					viewportArray, modelPointArrayResults);   //GLU.unProject is from GLU.js library
				var posXY;	
				if(success)
				{
					posXY = [modelPointArrayResults[0], modelPointArrayResults[1], modelPointArrayResults[2]];
					// document.getElementById("x").innerHTML=modelPointArrayResults[0];
					// document.getElementById("y").innerHTML=modelPointArrayResults[1];
					// document.getElementById("x1").innerHTML=posXY[0];
					// document.getElementById("y1").innerHTML=posXY[1];
				}
				return posXY;
			};

		    this.updateVerticesAndColor = function(XindexMouse,YindexMouse)
		    {
		    	if(this.vertexpositionandcolorbuffers.rectangleVertexPositionBuffer)
		    	{
			        for(var i = 0; i < self.bascisparameters.colNum; i++)
			        {
			            var left  = (self.bascisparameters.marginX + self.bascisparameters.recWidth) * XindexMouse + self.bascisparameters.marginX - self.bascisparameters.scalepercentage * self.bascisparameters.recWidth;
			            var right = (self.bascisparameters.marginX + self.bascisparameters.recWidth) * XindexMouse + self.bascisparameters.recWidth + self.bascisparameters.marginX + self.bascisparameters.scalepercentage * self.bascisparameters.recWidth;
			            var low   = (self.bascisparameters.marginY + self.bascisparameters.recHeight) * i + self.bascisparameters.marginY - self.bascisparameters.scalepercentage * self.bascisparameters.recWidth;
			            var high  = (self.bascisparameters.marginY + self.bascisparameters.recHeight) * i + self.bascisparameters.marginY + self.bascisparameters.recHeight + self.bascisparameters.scalepercentage * self.bascisparameters.recWidth;  

			            var j = self.bascisparameters.colNum;       	

			            self.datas.rectanglevertexdata[(XindexMouse+i*self.bascisparameters.rowNum)* 6 * 3]     = right;
			            self.datas.rectanglevertexdata[(XindexMouse+i*self.bascisparameters.rowNum)* 6 * 3 + 3] = left;  
			            self.datas.rectanglevertexdata[(XindexMouse+i*self.bascisparameters.rowNum)* 6 * 3 + 6] = right; 

			            self.datas.rectanglevertexdata[(XindexMouse+i*self.bascisparameters.rowNum)* 6 * 3 + 9] = left;  
			            self.datas.rectanglevertexdata[(XindexMouse+i*self.bascisparameters.rowNum)* 6 * 3 + 12] = right;
			            self.datas.rectanglevertexdata[(XindexMouse+i*self.bascisparameters.rowNum)* 6 * 3 + 15] = left;  
			        }

			        var left = (self.bascisparameters.marginX + self.bascisparameters.recWidth) * XindexMouse + self.bascisparameters.marginX - self.bascisparameters.scalepercentage * self.bascisparameters.recWidth;
			        var right = (self.bascisparameters.marginX + self.bascisparameters.recWidth) * XindexMouse + self.bascisparameters.recWidth + self.bascisparameters.marginX + self.bascisparameters.scalepercentage * self.bascisparameters.recWidth;
			        var low = (self.bascisparameters.marginY + self.bascisparameters.recHeight) * YindexMouse + self.bascisparameters.marginY;
			        var high = (self.bascisparameters.marginY + self.bascisparameters.recHeight) * YindexMouse + self.bascisparameters.marginY + self.bascisparameters.recHeight;

		            self.datas.wirevertexdata = new Float32Array([right, high, self.bascisparameters.depth+0.01,
		            											  left,  high, self.bascisparameters.depth+0.01,
	            											      right, low ,  self.bascisparameters.depth+0.01,
		            											  left,  low ,  self.bascisparameters.depth+0.01,
		            											  right, high, self.bascisparameters.depth+0.01,
		            											  right, low ,  self.bascisparameters.depth+0.01,
		            											  left,  high, self.bascisparameters.depth+0.01,
		            											  left,  low ,  self.bascisparameters.depth+0.01]);

			        self.vertexpositionandcolorbuffers.rectangleVertexPositionBuffer = self.gl.createBuffer();
			        self.gl.bindBuffer(self.gl.ARRAY_BUFFER, self.vertexpositionandcolorbuffers.rectangleVertexPositionBuffer);
			        self.gl.bufferData(self.gl.ARRAY_BUFFER, new Float32Array(self.datas.rectanglevertexdata), self.gl.STATIC_DRAW);
			        self.vertexpositionandcolorbuffers.rectangleVertexPositionBuffer.itemSize = 3;
			        self.vertexpositionandcolorbuffers.rectangleVertexPositionBuffer.numItems = 6 * self.bascisparameters.rowNum * self.bascisparameters.colNum;
		    	}
		        
		     //    if(this.vertexpositionandcolorbuffers.squareVertexPositionBuffer)
		    	// {
			    //     for(var i = 0; i < squarecolNum; i++)
			    //     {
			    //         var left  = (self.marginX + self.recWidth)*XindexMouse + self.marginX - self.scalepercentage * self.recWidth;
			    //         var right = (self.marginX + self.recWidth)*XindexMouse + self.recWidth + self.marginX + self.scalepercentage * self.recWidth;
			    //         var low   = (self.marginY + self.recHeight)*i + self.marginY - self.scalepercentage * self.recWidth;
			    //         var high  = (self.marginY + self.recHeight)*i + self.marginY + self.recHeight + self.scalepercentage * self.recWidth;  

			    //         var j = squarecolNum;      	

			    //         squarevertices[(XindexMouse + i * self.rowNum)* 6 * 3]     = right; squarevertices[(XindexMouse + j * self.rowNum)* 6 * 3 + 1] = high;
			    //         squarevertices[(XindexMouse + i * self.rowNum)* 6 * 3 + 3] = left;  squarevertices[(XindexMouse + j * self.rowNum)* 6 * 3 + 4] = high;
			    //         squarevertices[(XindexMouse + i * self.rowNum)* 6 * 3 + 6] = right; squarevertices[(XindexMouse + j * self.rowNum)* 6 * 3 + 7] = low;

			    //         squarevertices[(XindexMouse + i * self.rowNum)* 6 * 3 + 9] = left;  squarevertices[(XindexMouse + j * self.rowNum)* 6 * 3 + 10] = high;
			    //         squarevertices[(XindexMouse + i * self.rowNum)* 6 * 3 + 12] = right;squarevertices[(XindexMouse + j * self.rowNum)* 6 * 3 + 13] = low;
			    //         squarevertices[(XindexMouse + i * self.rowNum)* 6 * 3 + 15] = left; squarevertices[(XindexMouse + j * self.rowNum)* 6 * 3 + 16] = low; 
			    //     }

			    //     // line vertex and color
			    //     frameLeft  = (self.marginX + self.recWidth) * XindexMouse + self.marginX - self.scalepercentage * self.recWidth;
			    //     frameRight = (self.marginX + self.recWidth) * XindexMouse + self.recWidth + self.marginX + self.scalepercentage * self.recWidth;
			    //     frameLow   = (self.marginY + self.recHeight) * YindexMouse + self.marginY - self.scalepercentage * self.recWidth;
			    //     frameHigh  = (self.marginY + self.recHeight) * YindexMouse + self.marginY + self.recHeight + self.scalepercentage * self.recWidth;   
			        
			    //     squareVertexPositionBuffer = self.gl.createBuffer();
			    //     self.gl.bindBuffer(self.gl.ARRAY_BUFFER, squareVertexPositionBuffer);
			    //     self.gl.bufferData(self.gl.ARRAY_BUFFER, new Float32Array(squarevertices), gl.STATIC_DRAW);
			    //     self.vertexpositionandcolorbuffers.squareVertexPositionBuffer.itemSize = 3;
			    //     self.vertexpositionandcolorbuffers.squareVertexPositionBuffer.numItems = 6 * self.rowNum * self.squarecolNum;
		    	// }
		    }

	        this.restoreVerticesAndColor = function()
		    {
		    	self.datas = jQuery.extend(true, {}, self.origindatas);
		    	if(this.vertexpositionandcolorbuffers.rectangleVertexPositionBuffer)
		    	{
		    		self.vertexpositionandcolorbuffers.rectangleVertexPositionBuffer = self.gl.createBuffer();
			        self.gl.bindBuffer(self.gl.ARRAY_BUFFER, self.vertexpositionandcolorbuffers.rectangleVertexPositionBuffer);
			        self.gl.bufferData(self.gl.ARRAY_BUFFER, new Float32Array(self.datas.rectanglevertexdata), self.gl.STATIC_DRAW);
			        self.vertexpositionandcolorbuffers.rectangleVertexPositionBuffer.itemSize = 3;
			        self.vertexpositionandcolorbuffers.rectangleVertexPositionBuffer.numItems = 6 * self.bascisparameters.rowNum * self.bascisparameters.colNum;
		    	}
		    };

			(function() {
				mouseMoveinto  = function (){
					if(self.showtooltip)
					{
						var tooltipValue = self.canvaselement.qtip;
						var api = self.canvaselement.qtip('api');
						api.options.content.text = "what is that?";
						api.options.position.adjust.x = self.mouserpositionX - self.gl.viewportWidth;
						api.options.position.adjust.y = - self.mouserpositionY;
						api.options.hide.delay = 100;
						api.options.hide.fixed = true;
						api.toggle(true);
					}
					else
					{
						var api = self.canvaselement.qtip('api');
						api.toggle(false);
					}
				}

				$(self.canvaselement)[0].addEventListener('mousemove', mouseMoveinto);
			})();

		   	this.handleMouseMove = function(event) 
		    {   
				var bascisparameters = self.bascisparameters;

			 	var newX = event.clientX;
				var newY = event.clientY;

				var lastMouseX = newX - bascisparameters.mouseshiftX;
				var lastMouseY = newY - bascisparameters.mouseshiftY;
					
				var pXY = self.getPosition(lastMouseX, self.gl.viewportHeight - lastMouseY);		
					
				//calculation rectangle index where mouse over
				var xMouse = pXY[0];
				var yMouse = pXY[1];
					
				var outX = false;
				var outY = false;
				var	difX = (xMouse - bascisparameters.marginX)%(bascisparameters.marginX + bascisparameters.recWidth);

				if(difX > self.bascisparameters.recWidth || xMouse > self.gl.viewportWidth || yMouse > self.gl.viewportHeight || xMouse < 0 || yMouse < 0)
				{
					outX = true;
				}


		        var difY = (yMouse - bascisparameters.marginY)%(bascisparameters.marginY + bascisparameters.recWidth);

		        if(difY > bascisparameters.recHeight)
		        {
		                outY = true;
		        }

    			self.mouserpositionX = xMouse;
				self.mouserpositionY = yMouse;

		        if(!outX)
		        {
	                var indXMouse = Math.floor((xMouse - bascisparameters.marginX)/(bascisparameters.marginX + bascisparameters.recWidth)); // X index of rectangle mouse on
	                var indYMouse = Math.floor((yMouse - bascisparameters.marginY)/(bascisparameters.marginY + bascisparameters.recHeight));// Y index of rectangle mouse on

	                // document.getElementById("mriX").innerHTML = indXMouse;
	                // document.getElementById("mriY").innerHTML = indYMouse;

	                if(indXMouse >= 0)
	                {
	                	self.updateVerticesAndColor(indXMouse,indYMouse);
	            	}

	                self.bascisparameters.Xindex = indXMouse;
	                self.bascisparameters.Yindex = indYMouse;

	                if(outY)
	                {
	                	self.showtooltip = false;
	                	$(self.canvaselement).trigger("mouseoversample");
	                }

	                self.showtooltip = true;
	            	
	                $(self.canvaselement).trigger("mouseoversample");
		        }
		        else
		        {
		        	self.showtooltip = false;
		        	
		            if(self.bascisparameters.Xindex !== undefined)
		            {
		                self.restoreVerticesAndColor();
		            }
		            
		            self.bascisparameters.Xindex = undefined;
		            self.bascisparameters.Yindex = undefined;
		            self.datas.wirevertexdata = new Float32Array();
		                
		        }

		        self.drawScene();
		    };



			this.drawElements = function(datas)
			{
				this.gl.clearColor(0.7, 0.7, 0.7, 1.0);
        		this.gl.enable(gl.DEPTH_TEST);

        		this.initBuffers(datas);
        		this.datas = datas;

        		this.origindatas = jQuery.extend(true, {}, datas); //make copy of the data without change the original data    jQuery.extend() function is very slow need change a faster method
        		document.onmousemove = this.handleMouseMove;
        		this.drawScene();
			};

	    };

	    module.exports = webglFunction;
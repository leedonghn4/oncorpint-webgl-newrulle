(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
			        this.vertexpositionandcolorbuffers.squareVertexPositionBuffer.numItems = 6 * this.bascisparameters.rowNum * this.bascisparameters.squarecolNum;

			        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.squareVertexColorBuffer);
			        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(datas.squarecolordata), this.gl.STATIC_DRAW);
			        this.vertexpositionandcolorbuffers.squareVertexColorBuffer.itemSize = 4;
			        this.vertexpositionandcolorbuffers.squareVertexColorBuffer.numItems = 6 * this.bascisparameters.rowNum  * this.bascisparameters.squarecolNum;
				}

				//triangle vertex and color
				if(datas.trianglevertexdata && datas.trianglecolordata)
				{
			        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.triangleVertexPositionBuffer);				        
			        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(datas.trianglevertexdata), this.gl.STATIC_DRAW);
			        this.vertexpositionandcolorbuffers.triangleVertexPositionBuffer.itemSize = 3;
			        this.vertexpositionandcolorbuffers.triangleVertexPositionBuffer.numItems = 6 * this.bascisparameters.rowNum * 4;

			        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.triangleVertexColorBuffer);
			        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(datas.trianglecolordata), this.gl.STATIC_DRAW);
			        this.vertexpositionandcolorbuffers.triangleVertexColorBuffer.itemSize = 4;
			        this.vertexpositionandcolorbuffers.triangleVertexColorBuffer.numItems = 6 * this.bascisparameters.rowNum  * 4;
				}

				//ellipse vertex and color
				if(datas.ellipsevertexdata && datas.ellipsecolordata)
				{
			        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.ellipseVertexPositionBuffer);				        
			        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(datas.ellipsevertexdata), this.gl.STATIC_DRAW);
			        this.vertexpositionandcolorbuffers.ellipseVertexPositionBuffer.itemSize = 3;
			        this.vertexpositionandcolorbuffers.ellipseVertexPositionBuffer.numItems = 6 * this.bascisparameters.rowNum * 2;

			        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexpositionandcolorbuffers.ellipseVertexColorBuffer);
			        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(datas.ellipsecolordata), this.gl.STATIC_DRAW);
			        this.vertexpositionandcolorbuffers.ellipseVertexColorBuffer.itemSize = 4;
			        this.vertexpositionandcolorbuffers.ellipseVertexColorBuffer.numItems = 6 * this.bascisparameters.rowNum  * 2;
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
				var viewportArray = [
				0, 0, self.gl.viewportWidth, self.gl.viewportHeight
				];

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

			        var left= (self.bascisparameters.marginX + self.bascisparameters.recWidth) * XindexMouse + self.bascisparameters.marginX - self.bascisparameters.scalepercentage * self.bascisparameters.recWidth;
			        var right = (self.bascisparameters.marginX + self.bascisparameters.recWidth) * XindexMouse + self.bascisparameters.recWidth + self.bascisparameters.marginX + self.bascisparameters.scalepercentage * self.bascisparameters.recWidth;
			        var low = (self.bascisparameters.marginY + self.bascisparameters.recHeight) * YindexMouse + self.bascisparameters.marginY;
			        var high = (self.bascisparameters.marginY + self.bascisparameters.recHeight) * YindexMouse + self.bascisparameters.marginY + self.bascisparameters.recHeight;

		            self.datas.wirevertexdata = new Float32Array([right, high, self.bascisparameters.depth+0.01,
		            											  left,  high, self.bascisparameters.depth+0.01,
	            											      right, low,  self.bascisparameters.depth+0.01,
		            											  left,  low,  self.bascisparameters.depth+0.01,
		            											  right, high, self.bascisparameters.depth+0.01,
		            											  right, low,  self.bascisparameters.depth+0.01,
		            											  left,  high, self.bascisparameters.depth+0.01,
		            											  left,  low,  self.bascisparameters.depth+0.01]);

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

        		this.origindatas = jQuery.extend(true, {}, datas);
        		document.onmousemove = this.handleMouseMove;
        		this.drawScene();
			};

	    };

	    module.exports = webglFunction;
},{}],2:[function(require,module,exports){
function initialize(canvas){

	this.canvas = canvas;
    this.glValue=function(){
        var gl;
        try 
        {
        	gl = null;
            gl = this.canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise Webthis.gl, sorry :-(");
        }
        return gl;
    };
};

module.exports = initialize;
},{}],3:[function(require,module,exports){
var OncoprintModel = require('./oncoprintmodel.js');
var OncoprintSVGCellView = require('./oncoprintsvgcellview.js');
//var OncoprintWebGLCellView = require('oncoprintwebglcellview.js');
var OncoprintLabelView = require('./oncoprintlabelview.js');
var OncoprintRuleSet = require('./oncoprintruleset.js');

var Oncoprint = (function() {
	// this is the controller
	var nextTrackId = (function() {
		var ctr = 0;
		return function() {
			ctr += 1;
			return ctr;
		}
	})();
	function Oncoprint($svg_dev, $canvas_dev) {
		this.model = new OncoprintModel();
		
		// Precisely one of the following should be uncommented
		this.cell_view = new OncoprintSVGCellView($svg_dev);
		// this.cell_view = new OncoprintWebGLCellView($canvas_dev)
		
		this.label_view = new OncoprintLabelView();
	}
	
	Oncoprint.prototype.addTrack = function(params) {
		// Update model
		var track_id = nextTrackId();
		this.model.addTrack(track_id, params.target_group,
				params.track_height, params.track_padding,
				params.data_id_key, params.tooltipFn,
				params.removable, params.label,
				params.sortCmpFn, params.sort_direction_changeable,
				params.data, OncoprintRuleSet(params.rule_set_params));
		// Update views
		this.cell_view.addTrack(this.model, track_id);
		this.label_view.addTrack(this.model, track_id);
				
		return track_id;
	}
	
	Oncoprint.prototype.removeTrack = function(track_id) {
		// Update model
		this.model.removeTrack(track_id);
		// Update views
		this.cell_view.removeTrack(this.model, track_id);
		this.label_view.removeTrack(this.model, track_id);
	}
	
	Oncoprint.prototype.getZoom = function() {
		return this.model.getZoom();
	}
	
	Oncoprint.prototype.setZoom = function(z) {
		// Update model
		this.model.setZoom(z);
		// Update views
		this.cell_view.setZoom(this.model, z);
	}
	
	Oncoprint.prototype.setTrackData = function(track_id, data) {
		this.model.setTrackData(track_id, data);
		this.cell_view.setTrackData(this.model, track_id);
	}
	
	Oncoprint.prototype.setRuleSet = function(track_id, rule_set_params) {
		this.model.setRuleSet(track_id, OncoprintRuleSet(rule_set_params));
		this.cell_view.setTrackData(this.model, track_id);
	}
	
	
	return Oncoprint;
})();
module.exports = Oncoprint;
},{"./oncoprintlabelview.js":4,"./oncoprintmodel.js":5,"./oncoprintruleset.js":6,"./oncoprintsvgcellview.js":7}],4:[function(require,module,exports){
// FIRST PASS: no optimization
var OncoprintLabelView = (function() {
	function OncoprintLabelView() {
		//TODO: what parameters
		// TODO: implementation
	}
	OncoprintLabelView.prototype.removeTrack = function(model, track_id) {
		// TODO: what parameters
		// TODO: implementation
	}
	OncoprintLabelView.prototype.moveTrack = function() {
		// TODO: what parameters
		// TODO: implementation
	}
	OncoprintLabelView.prototype.addTrack = function(model, track_id) {
		// TODO: what parameters
		// TODO: implementation
	}
	OncoprintLabelView.prototype.setTrackData = function() {
		// TODO: what parameters
		// TODO: implementation
	}
	OncoprintLabelView.prototype.setCellPadding = function() {
		// TODO: what parameters
		// TODO: implementation
	}
	OncoprintLabelView.prototype.setZoom = function() {
		// TODO: what parameters
		// TODO: implementation
	}
	OncoprintLabelView.prototype.setOrder = function() {
		// TODO: what parameters
		// TODO: implementation
	}
	
	return OncoprintLabelView;
})();

module.exports = OncoprintLabelView;
},{}],5:[function(require,module,exports){
function ifndef(x, val) {
	return (typeof x === "undefined" ? val : x);
}

var OncoprintModel = (function() {
	function OncoprintModel(init_cell_padding, init_cell_padding_on, 
				init_zoom, init_cell_width,
				init_track_group_padding) {
		this.ids = [];
		this.visible_ids = {};
		this.track_groups = [];
		this.zoom = ifndef(init_zoom, 1);
		
		this.cell_padding = ifndef(init_cell_padding, 10);
		this.cell_padding_on = ifndef(init_cell_padding_on, true);
		this.cell_width = ifndef(init_cell_width, 10);
		this.track_group_padding = ifndef(init_track_group_padding, 10);
		
		this.track_data = {};
		this.track_rule_set = {};
		this.track_label = {};
		this.track_height = {};
		this.track_padding = {};
		this.track_data_id_key = {};
		this.track_tooltip_fn = {};
		this.track_removable = {};
		this.track_sort_cmp_fn = {};
		this.track_sort_direction_changeable = {};
	}
	
	OncoprintModel.prototype.toggleCellPadding = function() {
		this.cell_padding_on = !this.cell_padding_on;
		return this.cell_padding_on;
	}
	
	OncoprintModel.prototype.getCellPadding = function() {
		return (this.cell_padding*this.zoom)*(+this.cell_padding_on);
	}
	
	OncoprintModel.prototype.getZoom = function() {
		return this.zoom;
	}
	
	OncoprintModel.prototype.setZoom = function(z) {
		if (z <= 1 && z >= 0) {
			this.zoom = z;
		}
		return this.zoom;
	}
	
	OncoprintModel.prototype.getCellWidth = function() {
		return this.cell_width * this.zoom;
	}
	
	OncoprintModel.prototype.getTrackHeight = function(track_id) {
		return this.track_height[track_id];
	}
	
	OncoprintModel.prototype.getTrackPadding = function(track_id) {
		return this.track_padding[track_id];
	}
	
	OncoprintModel.prototype.getIds = function() {
		return this.ids;
	}
	
	OncoprintModel.prototype.getVisibleIds = function() {
		var visible_ids = this.visible_ids;
		return this.ids.filter(function(id) {
			return !!visible_ids[id];
		});
	}
	
	OncoprintModel.prototype.setIds = function(ids) {
		this.ids = ids.slice();
	}
	
	OncoprintModel.prototype.hideIds = function(to_hide, show_others) {
		var ids = this.ids;
		if (show_others) {
			for (var i=0, len=ids.length; i<len; i++) {
				this.visible_ids[ids[i]] = true;
			}
		}
		for (var j=0, len=to_hide.length; j<len; j++) {
			this.visible_ids[to_hide[j]] = false;
		}
	}
	
	OncoprintModel.prototype.moveTrackGroup = function(from_index, to_index) {
		var new_groups = [];
		var group_to_move = this.track_groups[from_index];
		for (var i=0; i<this.track_groups.length; i++) {
			if (i !== from_index && i !== to_index) {
				new_groups.push(this.track_groups[i]);
			}
			if (i === to_index) {
				new_groups.push(group_to_move);
			}
		}
		this.track_groups = new_groups;
		return this.track_groups;
	}
	
	OncoprintModel.prototype.addTrack = function(track_id, target_group,
						track_height, track_padding,
						data_id_key, tooltipFn,
						removable, label,
						sortCmpFn, sort_direction_changeable,
						data, rule_set) {
		this.track_label[track_id] = ifndef(label, "Label");
		this.track_height[track_id] = ifndef(track_height, 20);
		this.track_padding[track_id] = ifndef(track_padding, 5);
		this.track_data_id_key[track_id] = ifndef(data_id_key, 'id');
		this.track_tooltip_fn[track_id] = ifndef(tooltipFn, function(d) { return d+''; });
		this.track_removable[track_id] = ifndef(removable, false);
		this.track_sort_cmp_fn[track_id] = ifndef(sortCmpFn, function(a,b) { return 0; });
		this.track_sort_direction_changeable[track_id] = ifndef(sort_direction_changeable, false);
		this.track_data[track_id] = ifndef(data, []);
		this.track_rule_set[track_id] = ifndef(rule_set, undefined);
		
		target_group = ifndef(target_group, 0);
		while (target_group >= this.track_groups.length) {
			this.track_groups.push([]);
		}
		this.track_groups[target_group].push(track_id);
	}
	
	var _getContainingTrackGroup = function(oncoprint_model, track_id, return_reference) {
		var group;
		for (var i=0; i<oncoprint_model.track_groups.length; i++) {
			if (oncoprint_model.track_groups[i].indexOf(track_id) > -1) {
				group = oncoprint_model.track_groups[i];
				break;
			}
		}
		if (group) {
			return (return_reference ? group : group.slice());
		} else {
			return undefined;
		}
	}
	
	OncoprintModel.prototype.removeTrack = function(track_id) {
		delete this.track_data[track_id];
		delete this.track_rule_set[track_id];
		delete this.track_label[track_id];
		delete this.track_height[track_id];
		delete this.track_padding[track_id];
		delete this.track_data_id_key[track_id];
		delete this.track_tooltip_fn[track_id];
		delete this.track_removable[track_id];
		delete this.track_sort_cmp_fn[track_id];
		delete this.track_sort_direction_changeable[track_id];
		
		var containing_track_group = _getContainingTrackGroup(this, track_id, true);
		if (containing_track_group) {
			containing_track_group.splice(
				containing_track_group.indexOf(track_id), 1);
		}
	}
	
	OncoprintModel.prototype.getContainingTrackGroup = function(track_id) {
		return _getContainingTrackGroup(this, track_id, false);
	}
	
	OncoprintModel.prototype.getTrackGroups = function() {
		// TODO: make read-only
		return this.track_groups;
	}
	
	OncoprintModel.prototype.getTracks = function() {
		var ret = [];
		for (var i=0; i<this.track_groups.length; i++) {
			for (var j=0; j<this.track_groups[i].length; j++) {
				ret.push(this.track_groups[i][j]);
			}
		}
		return ret;
	}
	
	OncoprintModel.prototype.moveTrack = function(track_id, new_position) {
		var track_group = _getContainingTrackGroup(this, track_id, true);
		if (track_group) {
			track_group.splice(track_group.indexOf(track_id), 1);
			track_group.splice(new_position, 0, track_id);
		}
	}
	
	OncoprintModel.prototype.getTrackLabel = function(track_id) {
		return this.track_label[track_id];
	}
	
	OncoprintModel.prototype.getTrackTooltipFn = function(track_id) {
		return this.track_tooltip_fn[track_id];
	}
	
	OncoprintModel.prototype.getTrackDataIdKey = function(track_id) {
		return this.track_data_id_key[track_id];
	}
	
	OncoprintModel.prototype.getTrackGroupPadding = function() {
		return this.track_group_padding;
	}
	
	OncoprintModel.prototype.isTrackRemovable = function(track_id) {
		return this.track_removable[track_id];
	}
	
	OncoprintModel.prototype.getRuleSet = function(track_id) {
		return this.track_rule_set[track_id];
	}
	
	OncoprintModel.prototype.setRuleSet = function(track_id, rule_set) {
		this.track_rule_set[track_id] = rule_set;
	}
	
	OncoprintModel.prototype.getTrackData = function(track_id) {
		return this.track_data[track_id];
	}
	
	OncoprintModel.prototype.setTrackData = function(track_id, data) {
		this.track_data[track_id] = data;
	}

	return OncoprintModel;
})();

module.exports = OncoprintModel;
},{}],6:[function(require,module,exports){
/* SHAPE SPEC
{
	'type':..,
	'x':..,
	'y':..,
	...
}
*/
// type: attrs
// rectangle: x, y, width, height, stroke, stroke-width, fill
// triangle: x1, y1, x2, y2, x3, y3, stroke, stroke-width, fill
// ellipse: x, y, width, height, stroke, stroke-width, fill
// line: x1, y1, x2, y2, stroke, stroke-width

/* Rule Params
 condition
 shapes - a list of Shape params
 legend_label
 exclude_from_legend
 
 Shape Params
 type (name of shape)
 ... then parameters from above ...
 */

function makeIdCounter() {
	var id = 0;
	return function () {
		id += 1;
		return id;
	};
}

function shallowExtend(target, source) {
	var ret = {};
	for (var key in target) {
		if (target.hasOwnProperty(key)) {
			ret[key] = target[key];
		}
	}
	for (var key in source) {
		if (source.hasOwnProperty(key)) {
			ret[key] = source[key];
		}
	}
	return ret;
}


var NA_SHAPES = [
	{
		'type': 'rectangle',
		'fill': 'rgba(238, 238, 238, 1)',
		'z': '0',
	},
	{
		'type': 'line',
		'x1': '0%',
		'y1': '0%',
		'x2': '100%',
		'y2': '100%',
		'stroke': 'rgba(85, 85, 85, 1)',
		'stroke-width': '1',
	},
];
var NA_STRING = "na";
var NA_LABEL = "N/A";

var DEFAULT_GENETIC_ALTERATION_PARAMS = {
	'*': {
		shapes: [{
			'type': 'rectangle',
			'fill': 'rgba(211, 211, 211, 1)',
			}],
		exclude_from_legend: true,
		z: -1
	},
	'cna': {
		'AMPLIFIED': {
			shapes: [{
					'type': 'rectangle',
					'fill': 'rgba(255,0,0,1)',
					'x': '0%',
					'y': '0%',
					'width': '100%',
					'height': '100%',
				}],
			legend_label: 'Amplification',
			z: 0
		},
		'GAINED': {
			shapes: [{
					'type': 'rectangle',
					'fill': 'rgba(255,182,193,1)',
					'x': '0%',
					'y': '0%',
					'width': '100%',
					'height': '100%',
				}],
			legend_label: 'Gain',
			z: 0
		},
		'HOMODELETED': {
			shapes: [{
					'type': 'rectangle',
					'fill': 'rgba(0,0,255,1)',
					'x': '0%',
					'y': '0%',
					'width': '100%',
					'height': '100%',
				}],
			legend_label: 'Deep Deletion', 
			z: 0
		},
		'HEMIZYGOUSLYDELETED': {
			shapes: [{
					'type': 'rectangle',
					'fill': 'rgba(143, 216, 216,1)',
					'x': '0%',
					'y': '0%',
					'width': '100%',
					'height': '100%',
				}],
			legend_label: 'Shallow Deletion',
			z: 0
		}
	},
	'mrna': {
		'UPREGULATED': {
			shapes: [{
					'type': 'rectangle',
					'fill': 'rgba(0, 0, 0, 0)',
					'stroke': 'rgba(255, 153, 153, 1)',
					'x': '0%',
					'y': '0%',
					'width': '100%',
					'height': '100%',
				}],
			legend_label: 'mRNA Upregulation',
			z: 1
		},
		'DOWNREGULATED': {
			shapes: [{
					'type': 'rectangle',
					'fill': 'rgba(0, 0, 0, 0)',
					'stroke': 'rgba(102, 153, 204, 1)',
					'x': '0%',
					'y': '0%',
					'width': '100%',
					'height': '100%',
				}],
			legend_label: 'mRNA Downregulation',
			z: 1
		},
	},
	'rppa': {
		'UPREGULATED': {
			shapes: [{
					'type': 'triangle',
					'x1': '50%',
					'y1': '0%',
					'x2': '100%',
					'y2': '33.33%',
					'x3': '0%',
					'y3': '33.33%',
					'fill': 'rgba(0,0,0,1)'
				}],
			legend_label: 'Protein Upregulation',
			z: 2
		},
		'DOWNREGULATED': {
			shapes: [{
					'type': 'triangle',
					'x1': '50%',
					'y1': '100%',
					'x2': '100%',
					'y2': '66.66%',
					'x3': '0%',
					'y3': '66.66%',
					'fill': 'rgba(0,0,0,1)'
				}],
			legend_label: 'Protein Downregulation',
			z: 2
		}
	},
	'mut': {
		'MISSENSE': {
			shapes: [{
					'type': 'rectangle',
					'fill': 'rgba(0, 255, 0, 1)',
					'x': '0%',
					'y': '33.33%',
					'width': '100%',
					'height': '33.33%',
				}],
			legend_label: 'Missense Mutation',
			z: 3
		},
		'INFRAME': {
			shapes: [{
					'type': 'rectangle',
					'fill': 'rgba(159, 129, 112, 1)',
					'x': '0%',
					'y': '33.33%',
					'width': '100%',
					'height': '33.33%',
				}],
			legend_label: 'Inframe Mutation',
			z: 3
		},
		'TRUNC': {
			shapes: [{
					'type': 'rectangle',
					'fill': 'rgba(0, 0, 0, 1)',
					'x': '0%',
					'y': '33.33%',
					'width': '100%',
					'height': '33.33%',
				}],
			legend_label: 'Truncating Mutation',
			z: 3
		},
		'FUSION': {
			shapes: [{
					'type': 'triangle',
					'fill': 'rgba(0, 0, 0, 1)',
					'x1': '0%',
					'y1': '0%',
					'x2': '100%',
					'y2': '50%',
					'x3': '0%',
					'y3': '100%',
				}],
			legend_label: 'Fusion',
			z: 3
		}
	}
};

var RuleSet = (function () {
	var getRuleSetId = makeIdCounter();
	var getRuleId = makeIdCounter();

	function RuleSet(params) {
		/* params:
		 * - legend_label
		 * - exclude_from_legend
		 */
		this.rule_map = {};
		this.rule_set_id = getRuleSetId();
		this.z_map = {};
		this.legend_label = params.legend_label;
		this.exclude_from_legend = params.exclude_from_legend;
		this.recently_used_rule_ids = {};
	}

	RuleSet.prototype.getLegendLabel = function () {
		return this.legend_label;
	}

	RuleSet.prototype.getRuleSetId = function () {
		return this.rule_set_id;
	}
	
	RuleSet.prototype.addRules = function (list_of_params) {
		var self = this;
		return list_of_params.map(function(params) {
			return self.addRule(params);
		});
	}
	
	RuleSet.prototype.addRule = function (params) {
		var rule_id = getRuleId();
		var z = (typeof params.z === "undefined" ? rule_id : params.z);
		this.rule_map[rule_id] = new Rule(params);
		this.z_map[rule_id] = parseFloat(z);
		return rule_id;
	}

	RuleSet.prototype.removeRule = function (rule_id) {
		delete this.rule_map[rule_id];
	}

	RuleSet.prototype.getRule = function (rule_id) {
		return this.rule_map[rule_id];
	}

	RuleSet.prototype.getRulesInRenderOrder = function () {
		var self = this;
		return Object.keys(this.rule_map).sort(function (rule_id1, rule_id2) {
			if (self.z_map[rule_id1] < self.z_map[rule_id2]) {
				return -1;
			} else if (self.z_map[rule_id1] > self.z_map[rule_id2]) {
				return 1;
			} else {
				return 0;
			}
		}).map(function (rule_id) {
			return {id: rule_id, rule: self.getRule(rule_id)};
		});
	}

	RuleSet.prototype.isExcludedFromLegend = function () {
		return this.exclude_from_legend;
	}

	RuleSet.prototype.clearRecentlyUsedRules = function() {
		this.recently_used_rule_ids = {};
	}
	
	RuleSet.prototype.markRecentlyUsedRule = function(rule_id) {
		this.recently_used_rule_ids[rule_id] = true;
	}
	
	RuleSet.prototype.getRecentlyUsedRules = function() {
		var self = this;
		return Object.keys(this.recently_used_rule_ids).map(
			function(rule_id) {
				return self.getRule(rule_id);
			});
	}
	
	RuleSet.prototype.apply = function (data, cell_width, cell_height) {
		// Returns a list of lists of concrete shapes, in the same order as data
		this.clearRecentlyUsedRules();
		
		var rules = this.getRulesInRenderOrder();
		var rules_len = rules.length;
		var self = this;
		
		return data.map(function (d) {
			var concrete_shapes = [];
			for (var j = 0; j < rules_len; j++) {
				var rule_concrete_shapes = 
					rules[j].rule.getConcreteShapesInRenderOrder(
					d, cell_width, cell_height);
				if (rule_concrete_shapes.length > 0) {
					self.markRecentlyUsedRule(rules[j].id);
				}
				concrete_shapes = concrete_shapes.concat(
					rule_concrete_shapes);
			}
			return concrete_shapes;
		});
	}
	return RuleSet;
})();

var CategoricalRuleSet = (function () {
	var colors = ["#3366cc", "#dc3912", "#ff9900", "#109618",
		"#990099", "#0099c6", "#dd4477", "#66aa00",
		"#b82e2e", "#316395", "#994499", "#22aa99",
		"#aaaa11", "#6633cc", "#e67300", "#8b0707",
		"#651067", "#329262", "#5574a6", "#3b3eac",
		"#b77322", "#16d620", "#b91383", "#f4359e",
		"#9c5935", "#a9c413", "#2a778d", "#668d1c",
		"#bea413", "#0c5922", "#743411"]; // Source: D3
	
	function CategoricalRuleSet(params) {
		/* params
		 * - category_key
		 * - categoryToColor
		 */
		RuleSet.call(this, params);
		this.category_key = params.category_key;
		this.category_to_color = params.category_to_color;
		for (var category in this.category_to_color) {
			if (this.category_to_color.hasOwnProperty(category)) {
				addCategoryRule(this, category, this.category_to_color[category]);
			}
		}
		this.addRule({
			condition: function(d) {
				return d[params.category_key] === NA_STRING;
			},
			shapes: NA_SHAPES,
			legend_label: NA_LABEL,
			exclude_from_legend: false
		});
	}
	CategoricalRuleSet.prototype = Object.create(RuleSet.prototype);

	var addCategoryRule = function (ruleset, category, color) {
		var rule_params = {
			condition: function (d) {
				return d[ruleset.category_key] === category;
			},
			shapes: [{
					type: 'rectangle',
					fill: color,
				}],
			legend_label: category,
			exclude_from_legend: false
		};
		ruleset.addRule(rule_params);
	};
	
	CategoricalRuleSet.prototype.apply = function(data, cell_width, cell_height) {
		// First ensure there is a color for all categories
		for (var i = 0, data_len = data.length; i<data_len; i++) {
			var category = data[i][this.category_key];
			if (!this.category_to_color.hasOwnProperty(category)) {
				var color = colors.pop();
				this.category_to_color[category] = color;
				addCategoryRule(this, category, color);
			}
		}
		// Then propagate the call up
		return RuleSet.prototype.apply.call(this, data, cell_width, cell_height);
	};
	
	return CategoricalRuleSet;
})();

var LinearInterpRuleSet = (function() {
	function LinearInterpRuleSet(params) {
		/* params
		 * - value_key
		 * - value_range
		 */
		RuleSet.call(this, params);
		this.value_key = params.value_key;
		this.value_range = params.value_range;
		this.inferred_value_range;
		
		this.addRule({
			condition: function(d) {
				return isNaN(d[params.value_key]);
			},
			shapes: NA_SHAPES,
			legend_label: NA_LABEL,
			exclude_from_legend: false
		});
		
		this.makeInterpFn = function() {
			var range = getEffectiveValueRange(this);
			if (range[0] === range[1]) {
				// Make sure non-zero denominator
				range[0] -= range[0]/2;
				range[1] += range[1]/2;
			}
			var range_spread = range[1] - range[0];
			var range_lower = range[0];
			return function(val) {
				return (val - range_lower) / range_spread;
			};
		};
	}
	LinearInterpRuleSet.prototype = Object.create(RuleSet.prototype);
	
	var getEffectiveValueRange = function(ruleset) {
		var ret = [ruleset.value_range[0], ruleset.value_range[1]];
		if (typeof ret[0] === "undefined") {
			ret[0] = ruleset.inferred_value_range[0];
		}
		if (typeof ret[1] === "undefined") {
			ret[1] = ruleset.inferred_value_range[1];
		}
		return ret;
	};
	
	LinearInterpRuleSet.prototype.apply = function(data, cell_width, cell_height) {
		// First find value range
		var value_min = Number.POSITIVE_INFINITY;
		var value_max = Number.NEGATIVE_INFINITY;
		for (var i = 0, datalen = data.length; i < datalen; i++) {
			var d = data[i];
			value_min = Math.min(value_min, d[this.value_key]);
			value_max = Math.max(value_max, d[this.value_key]);
		}
		this.inferred_value_range = [value_min, value_max];
		this.updateLinearRules();
		
		// Then propagate the call up
		return RuleSet.prototype.apply.call(this, data, cell_width, cell_height);
	};
	
	LinearInterpRuleSet.prototype.updateLinearRules = function() {
		throw "Not implemented in abstract class";
	};
	
	return LinearInterpRuleSet;
})();

var GradientRuleSet = (function() {
	function GradientRuleSet(params) {
		/* params
		 * - color_range
		 */
		LinearInterpRuleSet.call(this, params);
		this.color_range;
		(function setUpColorRange(self) {
			var color_start;
			var color_end;
			try {
				color_start = params.color_range[0]
					.match(/rgba\(([\d.,]+)\)/)
					.split(',')
					.map(parseFloat);
				color_end = params.color_range[1]
					.match(/rgba\(([\d.,]+)\)/)
					.split(',')
					.map(parseFloat);
				if (color_start.length !== 4 || color_end.length !== 4) {
					throw "wrong number of color components";
				}
			} catch (err) {
				color_start = [0,0,0,1];
				color_end = [255,0,0,1];
			}
			self.color_range = color_start.map(function(c, i) {
				return [c, color_end[i]];
			});
		})(this);
		console.log(this.color_range);
		this.gradient_rule;
		this.updateLinearRules();
			
	}
	GradientRuleSet.prototype = Object.create(LinearInterpRuleSet.prototype);
	
	GradientRuleSet.prototype.updateLinearRules = function() {
		if (typeof this.gradient_rule !== "undefined") {
			this.removeRule(this.gradient_rule);
		}
		var interpFn = this.makeInterpFn();
		var value_key = this.value_key;
		var color_range = this.color_range;
		this.gradient_rule = this.addRule({
			condition: function(d) {
				return !isNaN(d[value_key]);
			},
			shapes: [{
					type: 'rectangle',
					fill: function(d) {
						var t = interpFn(d[value_key]);
						return "rgba("+color_range.map(
							function(arr) {
								return (1-t)*arr[0] 
								+ t*arr[1];
						}).join(",")+")";
					}
				}],
			exclude_from_legend: false
		});
	};
	
	return GradientRuleSet;
})();

var BarRuleSet = (function() {
	function BarRuleSet(params) {
		LinearInterpRuleSet.call(this, params);
		this.bar_rule;
		this.fill = params.fill || 'rgba(0,0,255,1)';
		this.updateLinearRules();
	}
	BarRuleSet.prototype = Object.create(LinearInterpRuleSet.prototype);
	
	BarRuleSet.prototype.updateLinearRules = function() {
		if (typeof this.bar_rule !== "undefined") {
			this.removeRule(this.bar_rule);
		}
		var interpFn = this.makeInterpFn();
		var value_key = this.value_key;
		this.bar_rule = this.addRule({
			condition: function(d) {
				return !isNaN(d[value_key]);
			},
			shapes: [{
					type: 'rectangle',
					y: function(d) {
						var t = interpFn(d[value_key]);
						return (1-t)*100 + "%";
					},
					height: function(d) {
						var t = interpFn(d[value_key]);
						return t*100 + "%";
					},
					fill: this.fill
				}],
			exclude_from_legend: false
		});
	};
	
	return BarRuleSet;
})();

var GeneticAlterationRuleSet = (function() {
	function GeneticAlterationRuleSet(params) {
		/* params:
		 * - rule_params
		 */
		RuleSet.call(this, params);
		this.addRule({
			condition: function(d) {
				return d.hasOwnProperty(NA_STRING);
			},
			shapes: NA_SHAPES,
			legend_label: NA_LABEL,
			exclude_from_legend: false
		});
		(function addRules() {
			var rule_params = params.rule_params;
			for (var key in rule_params) {
				if (rule_params.hasOwnProperty(key)) {
					var key_rule_params = rule_params[key];
					if (key === '*') {
						this.addRule(rule_params['*']);
					} else {
						for (var value in key_rule_params) {
							if (key_rule_params.hasOwnProperty(value)) {
								var condition = (value === '*' ?
										function(d) { return d.hasOwnProperty(key); } :
										function(d) { return d[key] === value; });
								this.addRule(
									shallowExtend(key_rule_params[value], 
									{'condition': condition}));
							}
						}
					}
				}
			}
		})();
	}
	GeneticAlterationRuleSet.prototype = Object.create(RuleSet.prototype);
	
	return GeneticAlterationRuleSet;
})();

var Rule = (function () {
	function Rule(params) {
		this.condition = params.condition || function (d) {
			return true;
		};
		this.shapes = params.shapes.map(addDefaultAbstractShapeParams);
		this.legend_label = params.legend_label || "";
		this.exclude_from_legend = params.exclude_from_legend;
	}
	var addDefaultAbstractShapeParams = function (shape_params) {
		var default_values = {'width': '100%', 'height': '100%', 'x': '0%', 'y': '0%', 'z': 0,
			'x1': '0%', 'x2': '0%', 'x3': '0%', 'y1': '0%', 'y2': '0%', 'y3': '0%',
			'stroke': 'rgba(0,0,0,0)', 'fill': 'rgba(23,23,23,1)', 'stroke-width': '0'};
		var required_parameters_by_type = {
			'rectangle': ['width', 'height', 'x', 'y', 'stroke', 'fill', 'stroke-width'],
			'triangle': ['x1', 'x2', 'x3', 'y1', 'y2', 'y3', 'stroke', 'fill', 'stroke-width'],
			'ellipse': ['width', 'height', 'x', 'y', 'stroke', 'fill', 'stroke-width'],
			'line': ['x1', 'x2', 'y1', 'y2', 'stroke', 'stroke-width']
		};
		var complete_shape_params = {};
		var required_parameters = required_parameters_by_type[shape_params.type];
		for (var i = 0; i < required_parameters.length; i++) {
			var required_param = required_parameters[i];
			if (shape_params.hasOwnProperty(required_param)) {
				complete_shape_params[required_param] = shape_params[required_param];
			} else {
				complete_shape_params[required_param] = default_values[required_param];
			}
		}
		complete_shape_params.type = shape_params.type;
		return complete_shape_params;
	};
	Rule.prototype.getConcreteShapesInRenderOrder = function (d, cell_width, cell_height) {
		// Turns abstract shapes into concrete shapes (i.e. computes
		// real values from percentages), and returns them in z-order; 
		// or returns empty list if the rule condition is not met.
		if (!this.condition(d)) {
			return [];
		}
		var concrete_shapes = [];
		var width_axis_attrs = {"x": true, "x1": true, "x2": true, "x3": true, "width": true};
		var height_axis_attrs = {"y": true, "y1": true, "y2": true, "y3": true, "height": true};
		for (var i = 0, shapes_len = this.shapes.length; i < shapes_len; i++) {
			var shape_spec = this.shapes[i];
			var attrs = Object.keys(shape_spec);
			var concrete_shape = {};
			for (var j = 0, attrs_len = attrs.length; j < attrs_len; j++) {
				var attr_name = attrs[j];
				var attr_val = shape_spec[attr_name];
				if (typeof attr_val === 'function') {
					attr_val = attr_val(d);
				}
				var percent = (typeof attr_val === 'string') && attr_val.match(/([\d.]+)%/);
				percent = percent && percent.length > 1 && percent[1];
				if (percent) {
					var multiplier = parseFloat(percent) / 100.0;
					if (width_axis_attrs.hasOwnProperty(attr_name)) {
						attr_val = multiplier * cell_width;
					} else if (height_axis_attrs.hasOwnProperty(attr_name)) {
						attr_val = multiplier * cell_height;
					}
				}
				concrete_shape[attr_name] = attr_val + '';
			}
			concrete_shapes.push(concrete_shape);
		}
		return concrete_shapes.sort(function (shape1, shape2) {
			if (shape1.z < shape2.z) {
				return -1;
			} else if (shape1.z > shape2.z) {
				return 1;
			} else {
				return 0;
			}
		});
	}

	Rule.prototype.isExcludedFromLegend = function () {
		return this.exclude_from_legend;
	}
	
	return Rule;
})();

module.exports = function(params) {
	if (params.type === 'categorical') {
		return new CategoricalRuleSet(params);
	} else if (params.type === 'gradient') {
		return new GradientRuleSet(params);
	} else if (params.type === 'bar') {
		return new BarRuleSet(params);
	} else if (params.type === 'gene') {
		return new GeneticAlterationRuleSet(params);
	}
}
},{}],7:[function(require,module,exports){
// FIRST PASS: no optimization
var initialize = require('./initialize.js');
var webglFunction = require('./apitest.js');
var OncoprintSVGCellView = (function() {
	function OncoprintSVGCellView($svg) {
		this.$svg = $svg;
		this.track_shapes = {};
	}
	OncoprintSVGCellView.prototype.removeTrack = function(model, track_id) {
		// TODO: what parameters
		// TODO: implementation
	}
	OncoprintSVGCellView.prototype.moveTrack = function() {
		// TODO: what parameters
		// TODO: implementation
	}
	
	var renderTrack = function(cell_view, model, track_id) {
		cell_view.track_shapes[track_id] = cell_view.track_shapes[track_id] || [];
		var track_shapes = cell_view.track_shapes[track_id];
		while (track_shapes.length > 0) {
			var elt = track_shapes.pop();
			elt.parentNode.removeChild(elt);
		}
		
		var y = cell_view.getTrackTop(model, track_id) + model.getTrackPadding(track_id);
		// Now y is the top of the cells
		var cell_width = model.getCellWidth();
		var cell_padding = model.getCellPadding();
		var cell_height = model.getTrackHeight(track_id);
		
		var shape_list_list = model.getRuleSet(track_id).apply(
						model.getTrackData(track_id),
						cell_width,
						cell_height);
		var shapelistnumber = shape_list_list.length;


		var datas;
		var rectanglevertices = [];
		var rectanglecolors = [];
		var squarevertices = [];
		var squarecolors = [];
		var trianglevertices = [];
		var trianglecolors = [];
		var ellipsevertices = [];
		var ellipsecolors = [];
		var linecolors = [];
		var linevertices = [];
		var lineindices = [];

		var	bascisparameters = {
		    		colNum:1,
		    		squarecolNum:40,
		    		rowNum:1,
    			    marginX: 5.0,
				    marginY: 5.0,
				    recWidth: 10.0,
				    recHeight: 20.0,
				    squareHeigth: 7.0,
				    marginRecSquare: 6.0,
				    depth: 0.01,
				    mouseshiftX: 10,
				    mouseshiftY: 310,
				    scalepercentage: 0.185, //scale percentage
				    incresortstatus: true,
			        showmutation: false,
			    	zoomValue: 1.0
	    };

    	for (var i=0; i<shape_list_list.length; i++) 
    	{
    		if(shape_list_list[i][0].type === "rectangle" )
    		{
    			var depth = 0.01;
    			var canvasHeight = document.getElementById("canvas").height;
    			var colorvalue = ((shape_list_list[i][0].fill.split("(")[1]).split(")")[0]).split(",");
    			var left = (Number(shape_list_list[i][0].width) + cell_padding) * i;
    			var right = (Number(shape_list_list[i][0].width)+ cell_padding) * i + Number(shape_list_list[i][0].width);
    			var low = canvasHeight - (0 + Number(shape_list_list[i][0].y)); // on canvas the Y cooridate is from up to down 
    			var high = canvasHeight - (0 + Number(shape_list_list[i][0].y) + Number(shape_list_list[i][0].height));

    			rectanglevertices.push(left,  low,  depth);
    			rectanglevertices.push(right, low,  depth);
    			rectanglevertices.push(left,  high, depth);

    			rectanglevertices.push(right, low,  depth);
    			rectanglevertices.push(right, high, depth);
    			rectanglevertices.push(left,  high, depth);

    			rectanglecolors.push(colorvalue[0],colorvalue[1],colorvalue[2],colorvalue[3]);
    			rectanglecolors.push(colorvalue[0],colorvalue[1],colorvalue[2],colorvalue[3]);
    			rectanglecolors.push(colorvalue[0],colorvalue[1],colorvalue[2],colorvalue[3]);

    			rectanglecolors.push(colorvalue[0],colorvalue[1],colorvalue[2],colorvalue[3]);
    			rectanglecolors.push(colorvalue[0],colorvalue[1],colorvalue[2],colorvalue[3]);
    			rectanglecolors.push(colorvalue[0],colorvalue[1],colorvalue[2],colorvalue[3]);
    		}
    	}

        var datas = {	
    		rectanglevertexdata: rectanglevertices,
    		rectanglecolordata: rectanglecolors,
    		squarevertexdata: squarevertices,
    		squarecolordata: squarecolors,
    		trianglevertexdata: trianglevertices,
    		trianglecolordata: trianglecolors,
    		ellipsevertexdata: ellipsevertices,
    		ellipsecolordata: ellipsecolors,
    		linevertexdata: linevertices,
    		linecolordata: linecolors,
    		lineindexdata: lineindices
    	};

		var initialwebgl = function()
		{
			var data = datas;
			var canvas = document.getElementById("canvas");
			var canvaselement = $('#canvas');
			var init = new initialize(canvas);
			var gl = init.glValue();
			var wf = new webglFunction(gl,canvaselement,bascisparameters);
			wf.drawElements(data);

			$('#canvas').qtip({
				content: {
	        				text: "tooltip"
	    				 },
	    		position: {
			        corner: {
						        target: 'topMiddle',
						        tooltip: 'bottomMiddle'
				            },
				    adjust: {
						        x: -1000,
						        y: -1000
				        	}
		    	},
		    	style: { classes: 'qtip-light qtip-rounded qtip-shadow qtip-lightwhite' }
	    	});
		}

		initialwebgl();

		for (var i=0; i<shape_list_list.length; i++) {
			var x = i*(cell_width + cell_padding);
			var shape_list = shape_list_list[i];
			for (var j=0; j<shape_list.length; j++) {
				track_shapes.push(cell_view.renderShape(shape_list[j], x, y)); 
			}
		}
	}
	
	var renderTracks = function(cell_view, model) {
		var tracks = model.getTracks();
		for (var i=0; i<tracks.length; i++) {
			renderTrack(cell_view, model, tracks[i]);
		}
	}
	
	OncoprintSVGCellView.prototype.addTrack = function(model, track_id) {
		renderTrack(this, model, track_id);
	}
	
	OncoprintSVGCellView.prototype.renderShape = function(shape, x, y) {
		var tag;
		if (shape.type === 'rectangle') {
			tag = this.renderRectangle(shape, x, y);
		} else if (shape.type === 'triangle') {
			tag = this.renderTriangle(shape, x, y);
		} else if (shape.type === 'ellipse') {
			tag = this.renderEllipse(shape, x, y);
		} else if (shape.type === 'line') {
			tag = this.renderLine(shape, x, y);
		}
		return tag;
	}
	
	var makeSVGTag = function(tag, attrs) {
		var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
		for (var k in attrs) {
			if (attrs.hasOwnProperty(k)) {
				el.setAttribute(k, attrs[k]);
			}
		}
		return el;
	}
	OncoprintSVGCellView.prototype.renderRectangle = function(rectangle, x, y) {
		var new_rect = makeSVGTag('rect', {
			'x': x+parseFloat(rectangle.x),
			'y': y+parseFloat(rectangle.y),
			'width': rectangle.width,
			'height': rectangle.height,
			'stroke': rectangle.stroke,
			'stroke-width': rectangle['stroke-width'],
			'fill': rectangle.fill
		});
		this.$svg[0].appendChild(new_rect);
		return new_rect;
	}
	
	OncoprintSVGCellView.prototype.renderTriangle = function(rectangle, x, y,
							cell_width, cell_height) {
		// TODO: implement
	}
	
	OncoprintSVGCellView.prototype.renderEllipse = function(rectangle, x, y,
							cell_width, cell_height) {
		// TODO: implement
	}
	
	OncoprintSVGCellView.prototype.renderLine = function(rectangle, x, y,
							cell_width, cell_height) {
		// TODO: implement
	}
	
	OncoprintSVGCellView.prototype.getTrackTop = function(model, track_id) {
		var groups = model.getTrackGroups();
		var y = 0;
		for (var i=0; i<groups.length; i++) {
			var group = groups[i];
			var found = false;
			for (var j=0; j<group.length; j++) {
				if (group[j] === track_id) {
					found = true;
					break;
				}
				y += 2*model.getTrackPadding(group[j]);
				y += model.getTrackHeight(group[j]);
			}
			y += model.getTrackGroupPadding();
			if (found) {
				break;
			}
		}
		return y;
	}
	OncoprintSVGCellView.prototype.setCellPadding = function() {
		// TODO: what parameters
		// TODO: implementation
	}
	
	
	OncoprintSVGCellView.prototype.setZoom = function(model, z) {
		renderTracks(this, model);
	}
	OncoprintSVGCellView.prototype.setOrder = function() {
		// TODO: what parameters
		// TODO: implementation
	}
	
	OncoprintSVGCellView.prototype.setTrackData = function(model, track_id) {
		renderTrack(this, model, track_id);
	}
	
	OncoprintSVGCellView.prototype.setRuleSet = function(model, track_id) {
		renderTrack(this, model, track_id);
	}
	
	return OncoprintSVGCellView;
})();

module.exports = OncoprintSVGCellView;
},{"./apitest.js":1,"./initialize.js":2}],8:[function(require,module,exports){
$(document).ready(function() {
	var Oncoprint = require('./oncoprint.js');
	var setRules = require('./oncoprintruleset.js');
	console.log($('#svg'));
	var o = new Oncoprint($('#svg'), $('#canvas'));
	var data = [{sample:'a', data:5}, {sample:'b', data:10}];
	while (data.length < 1000) {
		data = data.concat(data);
	}
	var rule_set_params = {
		type: 'bar',
		value_key: 'data',
		value_range:[0,10]
	};
	o.addTrack({'data':data, 'rule_set_params': rule_set_params});
	o.addTrack({'data':data, 'rule_set_params': rule_set_params});
	o.addTrack({'data':data, 'rule_set_params': rule_set_params});
	o.addTrack({'data':data, 'rule_set_params': rule_set_params, 'target_group':1});
	window.o = o;
});
},{"./oncoprint.js":3,"./oncoprintruleset.js":6}]},{},[8])
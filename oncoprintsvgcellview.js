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
		
		var y = cell_view.getTrackTop(model, track_id);
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
		    		rowNum:shape_list_list.length,
    			    marginX: cell_padding,
				    marginY: 0.0,
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
    			var left = bascisparameters.marginX + (Number(shape_list_list[i][0].width) + cell_padding) * i;
    			var right = bascisparameters.marginX + (Number(shape_list_list[i][0].width)+ cell_padding) * i + Number(shape_list_list[i][0].width);
    			var low = canvasHeight - (y + Number(shape_list_list[i][0].y)); // on canvas the Y cooridate is from up to down 
    			var high = canvasHeight - (y + Number(shape_list_list[i][0].y) + Number(shape_list_list[i][0].height));

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
		// for (var i=0; i<tracks.length; i++) {
		// 	renderTrack(cell_view, model, tracks[i]);
		// }
		
		renderTrack(cell_view, model, tracks[1]);
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
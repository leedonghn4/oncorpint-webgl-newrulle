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
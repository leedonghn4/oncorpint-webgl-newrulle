function library(){
    var name = "Timmy";

   
    this.getnumber = function()
    {
    	var n = 100;
    	return n;
    }

    this.number = this.getnumber();
    this.greet = function(){
        alert("Hello from the " + this.number + " library.");
    } 
}
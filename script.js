class Stopwatch extends React.Component {
    constructor() {
    	super();
    	this.state = {
        	running: false,
        	watch: 0,
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        }
           
    }

    reset() {
        this.setState ({
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        });
	    
    }

	format(times) {
	        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	start() {
	    if (!this.state.running) {
	    	this.setState({
	        	running: true,
	        	watch: setInterval(() => this.step(), 10)
	        		
	    	});
	    }	
	}

	step() {
	    if (!this.state.running) return;
	    this.calculate();
	    
	}

	calculate() {
		let {
	      miliseconds,
	      seconds,
	      minutes
	    } = this.state;

	    miliseconds += 1;
	    if (miliseconds >= 100) {
	        seconds += 1;
	        miliseconds = 0;
	    }
	    if (seconds >= 60) {
	        minutes += 1;
	        seconds = 0;
	    }
	    this.setState ({
	      miliseconds: miliseconds,
	      seconds: seconds,
	      minutes: minutes
	    });
	}
	
	stop() {
		clearInterval(this.state.watch);
	    this.setState({running:false});
	    
	}

	
    
	
	render(){
	    return (
	        <div>
		        {this.format()}
			    <button onClick={()=> this.start() }>  Start </button>
			    <button onClick={()=> this.stop() }>   Stop  </button>
		        <button onClick={()=> this.reset() }>  Reset </button>
      		</div>
			
	    );
  	}

}



function pad0(value) {
	    let result = value.toString();
	    if (result.length < 2) {
	        result = '0' + result;
	    }
	    return result;
}



ReactDOM.render(
	<Stopwatch/>,
	document.getElementById('app');
);



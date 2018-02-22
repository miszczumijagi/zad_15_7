class Stopwatch extends React.Component {
    constructor(props) {
    	super(props)
    	this.state = {
        	running: false,
        	watch: 0,
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        }
           
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

	reset() {
        this.setState ({
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        });
    }

    split() {
        if(this.state.running) {
            addSplitTimeToList(this.state.format(this.state.times), resultList);
            clearInterval(this.state.displayTime);
            
        }
        else return;
    }

	
	render(){
	    return (
	        <div>
		       <p>{this.format()} </p>
			    <button onClick={()=> this.start()}>Start</button>
			    <button onClick={()=> this.stop()}>Stop </button>
		        <button onClick={()=> this.reset()}>Reset</button>
			</div>
	    );
  	} 
  	format(times) {
	        return `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(Math.floor(this.state.miliseconds))}`;
	}

}


function pad0(value) {
	    let result = value.toString();
	    if (result.length < 2) {
	        result = '0' + result;
	    }
	    return result;
}


const app = document.getElementById('app');
ReactDOM.render(<Stopwatch/>, app); 



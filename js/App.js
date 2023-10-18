const audioBank = [
    {
        keyTrigger:'Q',
        url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
        id: 'Heater-1'
    },
    {
        keyTrigger:'W',
        url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
        id: 'Heater-2'
    },
    {
        keyTrigger:'E',
        url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
        id: 'Heater-3'
    },
    {
        keyTrigger:'A',
        url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
        id: 'Heater-4'
    },
    {
        keyTrigger:'S',
        url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
        id: 'Clap'
    },
    {
        keyTrigger:'D',
        url:'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
        id: 'Open-HH'
    },
    {
        keyTrigger:'Z',
        url:'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
        id: 'Kick-n-hat'
    },
    {
        keyTrigger:'X',
        url:'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
        id: 'Kick'
    },
    {
        keyTrigger:'C',
        url:'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
        id: 'Closed-HH'
    }
];
class App extends React.Component{
    state = {
        display:'',
    };
    
    playSound=(id)=>{
        const audio = document.getElementById(id);
        if(audio === null) return;
        audio.currentTime=0;
        audio.play();
        let soundPlayed='';
        audioBank.map(function (sound){
            if(sound.keyTrigger === id){
                soundPlayed = sound.id;
            }
        });
        this.setState({
            display: soundPlayed
        })
    }
    handleClick=(event)=>{
        const key = event.target;
        const id = key.querySelector('audio').id;
        this.playSound(id);
    }
    handleKeyDown=(event)=>{
        const id = event.key.toUpperCase();
        this.playSound(id);
    }
    componentDidMount(){
        document.addEventListener('keydown',this.handleKeyDown)
    }
    render(){
        return(
            <div id="drum-machine">
                <DrumPad onClick={this.handleClick}/>
                <Display id={this.state.display}/>
            </div>
        );
    }
}

class Display extends React.Component{
    render(){
        return(
            <div id="display">
                {this.props.id}
            </div>
        );
    }
}

class DrumPad extends React.Component{
    render(){
        const drumPads = audioBank.map((audio,i)=>(
            <Pad 
                key={i} 
                className='drum-pad' 
                id={audio.keyTrigger} 
                src={audio.url} 
                description={audio.id}
                play={this.props.onClick}
            />
        ));
        return(
            <div className="pad-bank">
                {drumPads}
            </div>
        );
    }
}

class Pad extends React.Component{
    render(){
        return(
            <div className={this.props.className} id={this.props.description} onClick={this.props.play}>
                {this.props.id}
                <audio className='clip' src={this.props.src} id={this.props.id}></audio>
            </div>
        );
    }
}

ReactDOM.render(<App/>,document.getElementById('root'));
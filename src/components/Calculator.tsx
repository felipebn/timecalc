import * as React from "react";

export interface CalculatorState{
    start ?: string;
    break ?: string;
    end ?: string;
    result : string;
}

export class Calculator extends React.Component<undefined, CalculatorState> {
    constructor(props:undefined){
        super(props);
        this.state = {
            result : "--:--",
        }
        this.handleTimeInputChange = this.handleTimeInputChange.bind(this);
    }

    render() {
        return <div className="columns is-multiline">
            {this.createInputColumn("start", "Start", this.state.start)}
            {this.createInputColumn("break", "Break", this.state.break)}
            {this.createInputColumn("end", "End", this.state.end)}
            <div className="column is-size-1 has-text-centered is-half is-offset-one-quarter">
                {this.state.result}
            </div>
        </div>            
    }

    createInputColumn(name : string, label : string, value : string){
        return <div className="column is-one-third">
            <div className="field">
            <label className="label has-text-centered">{label}</label>
            <div className="control">
                <input 
                    className="input" 
                    type="text" 
                    placeholder="00:00" 
                    name={name} 
                    value={value} 
                    maxLength={5}
                    
                    onChange={this.handleTimeInputChange}/>
            </div>
            </div>
        </div>;
    }

    handleTimeInputChange(event : React.FormEvent<HTMLInputElement>){
        console.log(event.currentTarget.value);

        if( this.isTimeInputValid(event.currentTarget.value) ){
            this.updateStateWithNewValue(event);
        }

        this.updateStateWithResult();
    }

    updateStateWithResult(){
        this.setState((prevState) => {
            console.log("prev state:")
            console.log(prevState);
            if( this.canCalculate(prevState) ){
                var startDate = new Date(`2017-06-06 ${prevState.start}`) ;
                var endDate = new Date(`2017-06-06 ${prevState.end}`) ;
                startDate.
                return {
                    result: '99:99'
                };
            }
            return {};
        })
    }

    canCalculate(state : CalculatorState){
        return state.start && state.end;
    }

    isTimeInputValid(value : string){
        var hoursValid = Number(this.getHours(value)) < 24;
        var minutesValid = value.length < 3 || Number(this.getMinutes(value)) <= 60;
        console.log("Hours:" + hoursValid)
        console.log("Minutes:" + minutesValid)
        return hoursValid && minutesValid;
    }

    getHours(value : string){
        return value.replace(":","").substring(0,2);
    }

    getMinutes(value : string){
        return value.replace(":","").substring(2);
    }

    updateStateWithNewValue(event : React.FormEvent<HTMLInputElement>){
        var newState : any = {};
        var val = event.currentTarget.value;
        if( val.length == 3 && val.indexOf(":") < 0 ){
            val = val.substring(0,2) + ":" + val.substring(2);
        }
        newState[event.currentTarget.name] = val;
        console.log(newState);
        this.setState(newState);
    }
}

import React from 'react';
import classname from 'classnames';

import cloud from '../../assets/img/cloud.png';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currHour: null
        }
    }

    componentDidMount() {
        this.setState({
            currHour: new Date().getHours()
        })
    }

    render() {
        const { currHour } = this.state;
      
        let landing = classname('container-fluid h-100',
            { 'nightBG': currHour > 18 && currHour < 7 }
        )

        return (
            <section id="landing-section" className={ landing }>
                <img id="cloud1" src={cloud} className="cloud img-fluid" alt="Waffle Clouds!" />
                <img id="cloud2" src={cloud} className="cloud img-fluid" alt="Waffle Clouds!" />
                <img id="cloud3" src={cloud} className="cloud img-fluid" alt="Waffle Clouds!" />
                <img id="cloud4" src={cloud} className="cloud img-fluid" alt="Waffle Clouds!" />
                <div className="row text-light main">
                    <div className="col-md-12 col-12">
                        <p
                            id="title"
                            className="display-4 font-weight-bold mb-2"
                        >
                            Waffle Time Group of Companies
                      </p>
                        <p
                            id="subtitle"
                            className="h5 font-weight-light"
                        >
                            A company-wide web portal for all things
                       </p>
                    </div>
                </div>
            </section>
        )
    }

}



export default LandingPage;
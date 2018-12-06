import React from 'react';

const LandingPage = () =>
    <section id="landingpage" className="container-fluid">
        <div className="row text-light full-section align-items-center text-center">
            <div className="col-md-12 col-12">
                <p
                    id="title"
                    className="h1 font-weight-normal mb-2"
                >
                    Content Management System
                  </p>
                <p
                    d="subtitle"
                    className="h6 font-weight-light"
                >
                    A cross-platform solution for Website Management
                   </p>
            </div>
        </div>
        <div className="row text-light py-5 align-items-center text-center bg-secondary">
                <div className="col-md-4 col-12">
                    <p className="display-2">5233+</p>
                    <p className="h2">Curabitur est est, iaculis et</p>
                    <p className="h6 font-weight-normal">
                        Donec in elit non enim lacinia feugiat pulvinar sed quam.
                        Cras ac sagittis libero.
                    </p>
                </div>
                <div className="col-md-4 col-12">
                    <p className="display-2">50%</p>
                    <p className="h2">Sed pretium massa turpis</p>
                    <p className="h6 font-weight-normal">
                        Fusce lobortis bibendum nisl, eget ornare mauris volutpat eu.
                        Cras ut lectus ac est sodales condimentum
                    </p>
                </div>
                <div className="col-md-4 col-12">
                    <p className="display-2">#1</p>
                    <p className="h2">Duis id libero vitae justo</p>
                    <p className="h6 font-weight-normal">
                        Vivamus fermentum sagittis massa, a malesuada lectus congue a.
                        Orci varius natoque penatibus et magnis dis parturient montes
                    </p>
                </div>
        </div>
        <div className="row text-light full-section align-items-center text-center">
            <div className="col-md-12 col-12">
                <a href = "https://github.com/crrmacarse/cmsx" title = "Contribute now!" target ="_blank" rel="noopener noreferrer" className = "btn text-secondary">
                  An open source project.
                </a>
            </div>
        </div>

    </section>


export default LandingPage;
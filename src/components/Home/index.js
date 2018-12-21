import React from 'react';
import axios from 'axios';

import { withAuthorization } from '../Session';

import { Loading } from '../Include';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const HomePage = () => (
    <section className="container-fluid">
        <div className="row">
            <div className="col-md-4 col-12 order-2 order-md-1">
                <p className="h4 font-weight-bold m-3">Home Feed</p>
                <HomeFeed />
            </div>
            {/* TODO: Fix. esp on mobile. probably can be done using flex */}
            <div className="col-md-8 col-12 order-1 order-md-2">
                <Loading />

                {/* TODO: Figures / number here*/}
                <div className="d-md-flex my-3">
                    <div className="d-md-inline-flex">
                        <div className="p-5 bg-success text-white text-center m-1">
                            <p className="h4">+50%</p>
                            <p className="h6">Voluptatem elig</p>
                        </div>
                    </div>
                    <div className="d-md-inline-flex">
                        <div className="p-5 bg-success text-white text-center m-1">
                            <p className="h4">+32676.00</p>
                            <p className="h6">Magnam facilis</p>
                        </div>
                    </div>
                    <div className="d-md-inline-flex">
                        <div className="p-5 bg-warning text-white text-center m-1">
                            <p className="h4">-</p>
                            <p className="h6">Doloreum eum Magni</p>
                        </div>
                    </div>
                    <div className="d-md-inline-flex">
                        <div className="p-5 bg-danger text-white text-center m-1">
                            <p className="h4">-20%</p>
                            <p className="h6">Eum et est occaecati</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
);

class HomeFeed extends React.Component {
    state = {
        posts: [],
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                const posts = res.data;
                this.setState({ posts, loading: false });
            })
    }

    render() {
        const { posts, loading } = this.state;
        return (
            <div className="p-2 flex-fill" style={{ overflowY: 'scroll', height: '80vh' }}>
                {loading && <Loading />}
                {posts.map(post =>
                    <div className="m-2" key={post.id}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <div className="">
                                    <p className="h6">{post.title}</p>
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div className="">
                                    <p className="small">
                                        {post.body}
                                    </p>
                                    <div className="text-right">
                                        <p className="text-secondary small">
                                            05/29/2015 5:50 AM, @crrmacarse
                                           </p>
                                    </div>
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                )
                }
            </div>
        )

    }


}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
import React, { Component } from 'react'
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

export default class App extends Component {
    state = {
        videos: [],
        selectedVideo: null
    };

    componentDidMount() {
        this.onTermSubmit('minecraft')
    }

    onVideoSelect = (selectedVideo) => {
        this.setState({selectedVideo});
    };

    onTermSubmit = async (term) => {
        const response = await youtube.get('/search', {
            params: {
                q: 'minecraft' + term
            }
        });
        this.setState({ 
            videos: response.data.items, 
            selectedVideo: response.data.items[0]
        });
    };

    render() {
        return (
            <div className="ui container">
                <SearchBar onFormSubmit={this.onTermSubmit} />
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoList videos={this.state.videos} 
                                onVideoSelect={this.onVideoSelect}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
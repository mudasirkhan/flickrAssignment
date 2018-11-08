import React from 'react';
import {View, Image, FlatList, Dimensions, RefreshControl, TouchableOpacity, ActivityIndicator, Platform, ViewPagerAndroid, BackHandler, Keyboard} from 'react-native';
import {connect}  from 'react-redux';
import {fetchData} from '../actions/data';
import styles from "../styles/styles";
import Header from "../components/Header";
import * as _ from "lodash";
import Post from '../components/Post';

const {height, width} = Dimensions.get('window');

class Home extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Welcome',
    };
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            search: '',
            loading: false,
            refreshing: false,
            zoom: false,
            columnCount: 3,
            index: 0
        };
        this.data= [];
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.search();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
       this.onPress();
        return true;
    };

    search = () => {
        this.props.fetchData(this.state.search,this.state.page);
        Keyboard.dismiss();
    };

    searchFresh= () => {
        this.setState({page: 0}, ()=>{
            this.search();
            Keyboard.dismiss();
        });
    };

    loadMore = () => {
        if (!this.props.isFetching) {
            this.props.fetchData(_.lowerCase(this.state.search), this.state.page + 1);
            this.setState({page: this.state.page + 1});
        }
    };

    updateValue = (value) => {
        this.setState({search: value}, ()=>{this.search()})
    };

    renderItem = () => {
        return _.map(this.props.photos, (item,index) => {
            return <View key={item.id}>
                <TouchableOpacity
                    onPress={this.onPress.bind(this,index)}>
                    <Image
                        defaultSource={require('../../assets/splash.png') }
                        source={{uri:`http://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}.jpg`,}}
                        style={this.state.zoom ? styles.listItemLarge : styles.listItemSmall}
                        resizeMode={"cover"}/>
                </TouchableOpacity>
            </View>
        })
    };

    onPress = (index= 0) => {
        this.setState({zoom: !this.state.zoom, columnCount : this.state.columnCount === 1 ? 3 : 1, index: index});
    }

    render() {
        const {isFetching, data} = this.props.data;
        return(
            <View style={styles.container}>
                <Header
                    value={this.state.search}
                    updateValue={this.updateValue.bind(this)}
                    search={this.search}
                    onPress={this.onPress}
                    activeOpacity={1}
                />
                {
                    isFetching ?
                    <ActivityIndicator
                        style={styles.activityIndicator}
                    />
                    :
                    null
                }
                {
                    (Platform.OS!=="ios" && this.state.zoom) ?
                    <ViewPagerAndroid
                        style={[styles.container,styles.listItemLarge]}
                        initialPage={this.state.index}>
                        {this.renderItem()}
                    </ViewPagerAndroid>
                    :
                    <FlatList
                        contentContainerStyle={styles.listStyles}
                        style={{}}
                        data={this.props.photos}
                        numColumns={this.state.columnCount}
                        key={this.state.zoom}
                        onContentSizeChange={(contentWidth, contentHeight) => {
                            if (this.state.zoom) {
                                this.refs._scrollView.scrollToIndex({ animated: false, index:this.state.index});
                            }}
                        }
                        pagingEnabled={this.state.zoom}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                colors={["#f7c937", "#8629cc"]}
                                tintColor="#8629cc"
                                onRefresh={this.searchFresh}
                            />
                        }
                        onEndReachedThreshold={.2}
                        horizontal={this.state.zoom}
                        onEndReached={this.loadMore.bind(this)}
                        getItemLayout={(data, index) => (
                            {length: width , offset: width  * index, index}
                        )}
                        ref={'_scrollView'}
                        initialNumToRender={0}
                        onKeyPress={(event) => {

                        }}
                        keyExtractor={(item, index) => item.id }
                        onScrollToIndexFailed={()=>{}}
                        renderItem={({item, index}) =>
                           <Post
                               item={item}
                               zoom={this.state.zoom}
                               onPress={this.onPress}
                               index={index}
                           />
                        }
                    />}
            </View>)
    }
}

function mapStateToProps (state) {
    return {
        data: state.data,
        photos: state.photos
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchData: (term,page) => dispatch(fetchData(term,page))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
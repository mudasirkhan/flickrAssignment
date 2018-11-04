import React from 'react';
import {View, Image, FlatList, Dimensions, RefreshControl, TouchableOpacity, ActivityIndicator, Platform, ViewPagerAndroid} from 'react-native';
import {connect}  from 'react-redux';
import {fetchData, getPhotos} from '../actions';
import styles from "../styles/styles";
import Header from "../components/Header";
import * as _ from "lodash";

const {height, width} = Dimensions.get('window');

class Home extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Welcome',
    };
    constructor(props) {
        super(props);
        this.state = {
            sources: [],
            page: 0,
            photo: '',
            search: '',
            loading: false,
            photos: [],
            photoList: [],
            refreshing: false,
            offset: 10,
            zoom: false,
            columnCount: 3

        };
        console.log(this.props);
        this.data= [];
    }

    search = () => {
        //this.setState({loading: true});
        let keys = Object.keys(this.props.data.data);
        console.log(this.state.search);
        if (keys.includes(_.lowerCase(this.state.search))) {
            if (this.props.data.data && this.props.data.data.length!==0 && (!this.props.data.data[0] || (this.props.data.data[0].id !== this.props.data.data[0].id))) {
                this.setState({photoList: this.props.data.data[this.state.search]},()=>{
                    console.log( keys, this.props)
                })
            }
        } else {
            this.props.fetchData(this.state.search,this.state.page)
        }
        this.data=this.getData(this.props.data.data);
        this.props.getPhotos(this.data);


    };

    loadMore = () => {
        console.log('Loading more images');
        this.props.fetchData(_.lowerCase(this.state.search),this.state.page +1);
        this.setState({page: this.state.page + 1});
        this.data=this.getData(this.props.data.data);
        this.props.getPhotos(this.data);
    };

    // componentWillReceiveProps (nextProps) {
    //     console.log("cwrp", nextProps.data);
    //     if (nextProps.data.data[this.state.search] && nextProps.data.data[this.state.search].length!==0 && (!this.props.data.data[this.state.search] ) && this.state.page < 1 ) {
    //         let data = Object.assign([],this.state.photoList);
    //         //data = data.push(...nextProps.data[this.state.search]);
    //         data = [...nextProps.data.data[this.state.search]];
    //         this.setState({photoList: data, loading: false},()=>{
    //             console.log(this.state.photoList)
    //         })
    //     }
    //     else if (this.state.search !== ""){
    //         let data = Object.assign([],this.state.photoList);
    //         //data = data.push(...nextProps.data[this.state.search]);
    //         console.log("ainsxjas", data);
    //         data = [...data,nextProps.data.data[this.state.search]];
    //         this.setState({photoList: data, loading: false},()=>{
    //             console.log(this.state.photoList)
    //         })
    //     }
    //     nextProps.data.data[this.state.search] && console.log(nextProps.data.data[this.state.search]);
    // };

    updateValue = (value) => {
        this.setState({search: value}, ()=>{this.search()})
    };

    renderItem = () => {
       return _.map(this.state.photoList, (item,index) => {
            return <View>
                <TouchableOpacity
                onPress={()=>{
                    this.setState({zoom: !this.state.zoom, columnCount : this.state.columnCount === 1 ? 3 : 1, index: index},()=>{
                    });
                }}>
                <Image
                    defaultSource={require('../../assets/splash.png') }
                    source={{uri:`http://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}.jpg`,}}
                    style={this.state.zoom ? styles.listItemLarge :styles.listItemSmall}
                    resizeMode={"cover"}/>
            </TouchableOpacity>
            </View>
        })
    };

    getData = (data) => {
        if (this.state.search) {
            let page = this.state.page;
            let newData = [];
            let key = '';
            for (let i = 0; i <= page; i++) {
                key = _.lowerCase(this.state.search) + "_" + i;
                if (data[key] && data[key].length) {
                    newData = [...newData, data[key]];
                }
            }
            console.log("data coming is",newData, this.state.page, key);
            return newData;
        }
    };

    render() {
        const {isFetching, data} = this.props.data;
        return(<View style={{flex: 1}}>
            <Header value={this.state.search} updateValue={this.updateValue.bind(this)} search={this.search}/>
            {isFetching? <ActivityIndicator style={{top: 50}}/> : null}
            {   (Platform.OS!=="ios" && this.state.zoom) ?
                <ViewPagerAndroid
                    style={styles.flex}
                    initialPage={0}>
                    {this.renderItem()}
                </ViewPagerAndroid>
                    :
                <FlatList
                    contentContainerStyle={{justifyContent: 'center',top:10, alignItems: 'center'}}
                    style={{}}
                    data={this.props.photos}
                    numColumns={this.state.columnCount}
                    key={this.state.zoom}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        if (this.state.zoom) {
                            this.refs._scrollView.scrollToIndex({ animated: false, index:this.state.index});
                        } else {
                            //this.setState({ onRefresh: false });
                        }
                    }}
                    pagingEnabled={this.state.zoom}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            colors={["#f7c937", "#8629cc"]}
                            tintColor="#8629cc"
                            onRefresh={this.loadMore.bind(this)}
                        />
                    }
                    onEndReachedThreshold={.1}
                    horizontal={this.state.zoom}
                    onEndReached={this.loadMore}
                    getItemLayout={(data, index) => (
                        {length: width, offset: width * index, index}
                    )}
                    ref={'_scrollView'}
                    initialNumToRender={0}
                    keyExtractor={(item, index) => item.id }
                    renderItem={({item, index}) =>
                        <TouchableOpacity
                            onPress={()=>{
                                this.setState({zoom: !this.state.zoom, columnCount : this.state.columnCount === 1 ? 3 : 1, index: index},()=>{
                                });
                                // this.props.navigation.navigate('Image',{uri:`http://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}.jpg`})
                            }}>
                            <Image
                                defaultSource={require('../../assets/splash.png') }
                                source={{uri:`http://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}.jpg`,}}
                                style={this.state.zoom ? styles.listItemLarge :styles.listItemSmall}
                                resizeMode={"cover"}/>
                        </TouchableOpacity> }
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
        fetchData: (term,page) => dispatch(fetchData(term,page)),
        getPhotos: (data) => dispatch(getPhotos(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
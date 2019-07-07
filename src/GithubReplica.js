import React,{Component} from 'react'
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,FlatList,TextInput} from 'react-native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';
import {getItems} from './actions/gitData'
// const myIcon = <Icon name="rocket" size={30} color="#900" />;
 const tmpArray=["OverView","Repositories","Stars","Following"]
class GithubReplica extends Component{
    constructor(props){
        super(props)
        this.state={searchbarOpened:false,searchText:"",props,gitData:[]}
    }
    componentDidMount(){
        // console.log(this.props)
            this.props.getItems()
    }

    static getDerivedStateFromProps(nextProps, prevState){
        let newState=prevState
        if(prevState.searchText=="" && nextProps.gitData.length>0 && nextProps.gitData!=prevState.gitData){
            newState.gitData=nextProps.gitData
        }
       
            return newState
    }

    searchUsed(text){
        if(text.trim()!="")
       { 
        let re = new RegExp(text.toUpperCase() + ".*");
        let arr=this.state.gitData.map((repo)=>{
            if( repo.name.toUpperCase().match(re)!=null){
                    return repo
                }
                else return null
        })
        let realArr=[],j=0
        for(let i=0;i<arr.length;i++){
            if(arr[i]!=null)
                realArr[j++]=arr[i]
        }
        this.setState({searchText:text,gitData:realArr})
     }else{
        this.setState({searchText:text})
     }
      
    }

    renderItem(item){
        let repo=item.item
        if(item.item!=null)
        return (<View style={{backgroundColor:'white',height:150,width:'100%',justifyContent:'center',flexDirection:'row'}}>
        <View style={{height:'100%',flex:2,alignItems:'center',justifyContent:'center'}}>
        <Icon name="ios-git-network" size={30} color="#555" />

        </View>
        <View style={{height:'100%',flex:8,justifyContent:'center'}}>
        
                    <Text style={{color:'#0366d6',fontSize:20}}>{repo.owner.login}/<Text style={{fontWeight:'bold'}}>{repo.name}</Text></Text>
                   
                    <Text style={{color:'#858a91',marginTop:10,fontSize:18}} numberOfLines={2}>{repo.description}</Text>
                    
                    <View style={{flexDirection:'row',marginTop:10}}>
                    <Icon name="ios-star" size={20} color="#555" />
                    <Text style={{fontSize:18,marginLeft:5,color:'#555',marginRight:10}}>{repo.stargazers_count}</Text>
                    <View style={{height:20,width:20,borderRadius:10,backgroundColor:repo.language=="JavaScript"?"#f1df5b":repo.language=="Swift"?"#ffac45":"green"}}/>
                    <Text style={{fontSize:18,marginLeft:5,color:'#555',marginRight:10}}>{repo.language}</Text>

                    </View>
                    
           </View>
            </View>)
            return <View/>
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.topArea}>
                <View style={styles.logoView}>
                <Icon name="ios-menu" size={40} color="#c8c9ca" />
                <Icon name="logo-github" size={40} color="#fff" />
                <Icon name="ios-notifications" size={40} color="#c8c9ca" />
                    </View>
                <View style={styles.horizontalMenu}>
                        <ScrollView horizontal={true} style={styles.horizontalMenuScrollContainer} scrollEnabled={true}>
                            {
                                tmpArray.map((item,index)=>{
                                   return <TouchableOpacity style={{height:'80%',width:115,alignItems:'center',justifyContent:'center',alignSelf:'center'}} key={item}>
                                        <Text style={{color:'white',fontSize:20}}>{item}</Text>
                                        </TouchableOpacity>
                                })
                            }
                            </ScrollView>
                    </View>
                </View>
                <View style={styles.scrollViewContainer}>
                            <FlatList
                                data={this.state.gitData}
                                renderItem={(item)=>this.renderItem(item)}
                                extraData={this.state}
                                ItemSeparatorComponent={()=>(<View style={{height:2,width:'100%',backgroundColor:'#eaecef'}}/>)}
                                // keyExtractor={(item)=>(item.name)}
                            />
                    </View>
                    <View style={{position:'absolute',bottom:30,right:30,flexDirection:'row'}}>
                   <TouchableOpacity style={styles.searchButton} onPress={()=>this.setState({searchbarOpened:!this.state.searchbarOpened,searchText:""})}>
                    <Icon name="ios-search" size={30} color="#fff" />
                        </TouchableOpacity>
                        {
                             this.state.searchbarOpened && <TextInput
                             style={styles.searchInput}
                             onChangeText={(text)=>this.searchUsed(text)}
                             value={this.state.searchText}
                             />
                        }
                        </View>
            </View>

        )
    }
}

const styles=StyleSheet.create({
    container:{
        height:'100%',
        width:'100%',
        backgroundColor:'red'
    },
    topArea:{
        flex:2,
        width:'100%',
        backgroundColor:'#24292d',
        alignItems:'center',
        justifyContent:'center'
    },
    scrollViewContainer:{
        flex:8,
        width:'100%',
        backgroundColor:'white'
    },
    logoView:{
        flexDirection:'row',
        flex:5,
        justifyContent:'space-between',
        alignItems:'center',
        // backgroundColor:'red',
        width:'100%',
        paddingHorizontal:10
    },
    horizontalMenu:{
        flex:5,
        flexDirection:'row',
        // alignItems:'center',
        // justifyContent:'space-evenly'
    },
    horizontalMenuScrollContainer:{
        height:'100%',
        // width:'100%',
        // backgroundColor:'red',
    },
    searchButton:{
       
        height:40,
        width:40,
        borderRadius:20,
       
        backgroundColor:'#89cff0',
        alignItems:'center',
        justifyContent:'center'
    },
    searchInput:{
        height:40,
        width:'80%',
        backgroundColor:'white',
        borderWidth:1
    }
})
function mapStateToProps(state) {
    //whatever is returned wil show up as props
    return {
        gitData:state.gitData
    }
}
function mapDispatchToProps(dispatch) {
    console.log("mapDispatchToProps" + dispatch);
    return {
        getItems: function (params) {
            dispatch(getItems(params));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GithubReplica);
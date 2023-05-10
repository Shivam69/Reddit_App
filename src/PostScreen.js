import { FlatList, Image, RefreshControl,StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {width} from './dyamicScreenSize';

const TabNames = ['New', 'Top', 'Popular', 'Hot'];

const PostScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('1');
  const [posts, setPosts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [sortOption, setSortOption] = useState('new');
//   const [selectedUrl, setSelectedUrl] = useState(null);

  const TapBar = () => {
    return (
      <View>
        <FlatList
          data={TabNames}
          renderItem={({item, index}) => (
            <View
              style={[
                styles.topBarContainer,
                {backgroundColor: activeTab == index + 1 ? '#68BBE3' : 'white'},
              ]}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center', padding: 3}}
                onPress={() => {
                  setActiveTab(index + 1);
                  setSortOption(
                    item == 'Popular' ? 'controversial' : item?.toLowerCase(),
                  );
                }}>
                <Text
                  style={[
                    styles.topBarItemText,
                    {color: activeTab == index + 1 ? 'white' : '#68BBE3'},
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          horizontal={true}
        />
      </View>
    );
  };

  useEffect(() => {
    fetchPost();
  }, [sortOption]);

  const fetchPost = () => {
    fetch(`https://api.reddit.com/r/pics/${sortOption}.json`)
      .then(response => response.json())
      .then(data => setPosts(data?.data?.children.map(child => child?.data)))
      .catch(error => console.error(error));
    setisLoading(false);
  };

  const formatTimeSince = createdUtc => {
    const timeSince = Date.now() / 1000 - createdUtc;
    const minutesSince = Math.floor(timeSince / 60);
    const hoursSince = Math.floor(minutesSince / 60);
    const daysSince = Math.floor(hoursSince / 24);

    if (daysSince > 0) {
      return `${daysSince} day${daysSince > 1 ? 's' : ''} ago`;
    } else if (hoursSince > 0) {
      return `${hoursSince} hour${hoursSince > 1 ? 's' : ''} ago`;
    } else if (minutesSince > 0) {
      return `${minutesSince} minute${minutesSince > 1 ? 's' : ''} ago`;
    } else {
      return `just now`;
    }
  };

  const handleNavigation = (url) => {
    navigation.navigate('Webview',{
        url:url
    });
  };
  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleNavigation(item.url)}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical:10
        }}>
        {item.thumbnail && item.thumbnail !== 'self' && (
          <Image
            resizeMode="contain"
            source={{uri: item.thumbnail}}
            style={styles.img}
          />
        )}
        <View style={{marginLeft: 10,flex:1}}>
          <Text style={styles.time}>{formatTimeSince(item.created_utc)}</Text>
          <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.bottomCardTxt}>
          <Text style={styles.author}>{item.author}  </Text>
          <Text style={styles.author}>Score: {item.score}</Text>
          <Text style={styles.author}>Comments: {item.num_comments}</Text>
        </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reddit/r/programming</Text>
      <TapBar dataSoucrce={TabNames} />
      {activeTab == '1' && (
        <>
          <FlatList
            data={posts}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => fetchPost()}
              />
            }
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </>
      )}
      {activeTab == '2' && (
        <>
          <FlatList
            data={posts}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => fetchPost()}
              />
            }
          />
        </>
      )}
      {activeTab == '3' && (
        <>
          <FlatList
            data={posts}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => fetchPost()}
              />
            }
          />
        </>
      )}
      {activeTab == '4' && (
        <>
          <FlatList
            data={posts}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => fetchPost()}
              />
            }
          />
        </>
      )}
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
  },
  topBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    minWidth: width / 4,
    maxWidth: width / 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 7,
    elevation: 4,
    justifyContent: 'center',
  },
  topBarItemText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
  topBarItemContainer: {
    flexDirection: 'column',
    paddingHorizontal: 25,
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    maxWidth: '95%',
    marginTop:3
  },
  time: {
   alignSelf:'flex-end',
   marginRight:10,
   fontSize:12,
   fontWeight:'600'
  },
  img: {
    width: 70, 
    height: 70, 
    backgroundColor: 'black',
    marginLeft:10
  },
  author:{
    fontSize:12,
    fontWeight:'800',
  },
  bottomCardTxt:{
    flexDirection:'row',
    flex:1,
    alignItems:'center',
    justifyContent:'space-between',
    width:width/1.35,
    marginTop:7,
  }
});

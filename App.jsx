import React, { useEffect, useState } from 'react'
import { DeviceEventEmitter, Dimensions, FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import SoundPlayer from 'react-native-sound-player'
import RNFS from 'react-native-fs';
import LinearGradient from 'react-native-linear-gradient';

const App = () => {
  const [showData , setShowData] = useState(false)
  const [data , setData] = useState([])
  const assetFilePath = 'FileContainer/Data/Home.js';
  const readFileFromAssets = async () => {
    const dataFilePath = RNFS.DocumentDirectoryPath + '/Data.js';
    console.log("🚀 ~ file: App.jsx:21 ~ readFileFromAssets ~ dataFilePath:", dataFilePath)
    const assetFilePath = 'FileContainer/Data/Home.js'; // Relative to android/app/src/main/assets

// Define the destination path on the device's file system
const destinationPath = `${RNFS.DocumentDirectoryPath}/Data.js`;

// Copy the asset file to the device's file system
// RNFS.copyFileAssets(assetFilePath, destinationPath)
//   .then(() => {
//     console.log('Asset file copied to:', destinationPath);

//     // Now, you can access the file from destinationPath.
//     // You can read it, parse it, or use it as needed.
//   })
//   .catch(error => {
//     console.error('Error copying asset file:', error);
//   });
    try {
      const fileContent = await RNFS.readFile(destinationPath, 'utf8');
      console.log('File content:', fileContent);
      setData(fileContent)
      setShowData(true)
    } catch (error) {
      console.log('Error reading file:', error);
    }
  };

  function updateAssetsArray(newAssetPath) {
    const assetsArray = ["/android/app/src/main/assets/data.js",`${RNFS.DocumentDirectoryPath}/Data.js`];
    DeviceEventEmitter.emit('updateAssets', assetsArray);
    console.log(assetsArray)
  }
// }
  // const playSound = ()=>{
  //   const dataFilePath = RNFS.DocumentDirectoryPath + '/Data.js';
  // RNFS.appendFile('assets/FileContainer/Data/Home.js', {
  //   id: 3,
  //   attributes: {
  //       order: null,
  //       createdAt: "2022-12-24T16:32:07.669Z",
  //       updatedAt: "2022-12-24T16:32:07.669Z",
  //       publishedAt: "2022-11-22T09:08:57.875Z",
  //       rawURL: "/gallery/audio/interview/int-satgurunathan/tam-int-satguru-thirumurai-isai-01.mp3",
  //       title: "திருமுறை இசை",
  //       isAbleToDownload: null,
  //       Artist: null
  //   }}
  //   ,'utf8').then((res)=>{
  //     console.log('successfull')
  //   }).catch(()=>{
  //     console.log('failed')
  //   })
  // }

  const downloadAndSaveFile = () => {
    const customDirectoryPath = RNFS.ExternalDirectoryPath + '/myCustomDirectory';
    RNFS.mkdir(customDirectoryPath)
  .then(success => {
    // console.log('Custom directory created:', customDirectoryPath);

    // Define the file path inside your custom directory
    const filePath = customDirectoryPath + '/data.json';

    // Save the data to the file
    RNFS.writeFile('FileContainer/Data/home.js', JSON.stringify(data), 'utf8')
      .then(success => {
        console.log('Data saved to file:', filePath);
      })
      .catch(error => {
        console.error('Error saving data to file:', error);
      });
  })
  .catch(error => {
    console.error('Error creating custom directory:', error);
  });
  };
 const fetchDataFromURL =async ()=>{
  const apiurl = 'https://qa-admin.shaivam.in/api/audio-song-lists?Pagination[pageSize]=10'
  const data =await fetch(apiurl)
  const responce = data.json()
  return responce
 }

  const updateData = async () => {
    // const newDataURL = 'https://qa-admin.shaivam.in/api/audio-song-lists?Pagination[pageSize]=10';
    const writableDataPath =  RNFS.DocumentDirectoryPath + '/Data.js';
    try {
      const newData = await fetchDataFromURL();
      let data =JSON.stringify(newData?.data) 
      await RNFS.writeFile(writableDataPath, data, 'utf8');
      console.log('Data updated successfully.');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
 
  // },[])
  return (
    // <SafeAreaView>
    <ScrollView>
      <TouchableOpacity onPress={()=>readFileFromAssets()} style={{justifyContent:'center' ,alignItems:'center' , height:40 ,paddingHorizontal:10 , backgroundColor:'#9DCEFF' , borderRadius:10}}>
      <Text >GET</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={updateData} style={{justifyContent:'center' ,alignItems:'center' , height:40 ,paddingHorizontal:10 , backgroundColor:'#9DCEFF' , borderRadius:10}}>
      <Text >updateData</Text>
      </TouchableOpacity> 
      <Text style={{color:'black' , fontWeight:'600'}}>{data}</Text>
        <TouchableOpacity onPress={downloadAndSaveFile} style={{justifyContent:'center' ,alignItems:'center' , height:40 ,paddingHorizontal:10 , backgroundColor:'#9DCEFF' , borderRadius:10}}>
      <Text >Donwload file</Text>
      </TouchableOpacity> 
    {/* </View> */}
    </ScrollView>
  )
}

export default App
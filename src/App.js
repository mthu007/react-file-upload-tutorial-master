import React, { useState } from "react";
import FileUpload from "./components/file-upload/file-upload.component";
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7CA1B4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function App() {
  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: []
  });
  const updateUploadedFiles = (files) =>
      setNewUserInfo({ ...newUserInfo, profileImages: files });
//       let File = newUserInfo.profileImages[0] 
// console.log(File.filename)
  const handleSubmit = (event) => {
    event.preventDefault();
    //var theUrl ="http://localhost:3002/PDFCompare/?actualPdfFile=NotSame&baselinePdfFile=baseline";
     var theUrl ="http://localhost:3002/PDFCompare/?actualPdfFile=Same&baselinePdfFile=baseline";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );

    console.log(xmlHttp.responseText);

    if (xmlHttp.responseText =="passed")
    {
      alert("files match");
    }
    else
    {
      alert("Files don't match. Will show files with differences...");
         );
    }
    return xmlHttp.responseText;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FileUpload
          accept=".pdf"
          label="Reference Report"
          multiple
          updateFilesCb={updateUploadedFiles}
        />
        <FileUpload
          accept=".pdf"
          label="New Report"
          multiple
          updateFilesCb={updateUploadedFiles}
        />
        <button type="submit">Compare Files</button>
       
      </form>
      
    </div>
    
  );
}

export default App;

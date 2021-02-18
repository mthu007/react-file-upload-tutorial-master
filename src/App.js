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
     
  const updateUploadedReferenceFiles = (files) =>
      setNewUserInfo({ ...newUserInfo, profileImages: files });

const handleSubmit = (event) => {
    event.preventDefault();

  var Rlist = document.getElementsByClassName("sc-iBPRYJ gExiUo")[0].innerText;
  var Nlist = document.getElementsByClassName("sc-iBPRYJ gExiUo")[1].innerText;

  var RefFile = Rlist.split("\n");
  var NewFile = Nlist.split("\n");
   
     var theUrl ="http://localhost:3002/PDFCompare/?actualPdfFile="+NewFile[0]+"&baselinePdfFile="+RefFile[0];
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
     var Rform = document.getElementById("Results");
     Rform.style.display = "block";
     var form = document.getElementById("Upload");
     form.style.display = "none";
    }

  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="Upload" >
        <FileUpload
          accept=".pdf"
          label="Reference Report"
          multiple
          updateFilesCb={updateUploadedReferenceFiles}
        />
        <FileUpload
          accept=".pdf"
          label="New Report"
          multiple
          updateFilesCb={updateUploadedFiles}
        />
        <button type="submit">Compare Files</button>
        
      </form>
      <form >
        <table id="Results" width="100%" style={{float : 'left', paddingRight : '5px',display:"none"}}   ><tr><td> <h1>Compare Results:</h1></td></tr><tr><td><img src="notSame_diff-0.png" /></td></tr></table>
      </form>
    </div>    
  );
}

export default App;

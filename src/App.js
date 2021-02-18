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
  divClass: {
    padding: 10,
    height: 10,
  }
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

    var trButton = document.getElementById("trCompareButton");
    trButton.style.display = "none";

    var trProccessing = document.getElementById("trProccessing");
    trProccessing.style.display = "block";


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
      // alert("files match");
      var form = document.getElementById("ResultsTDYes");
     form.style.display = "block";
    }
    else
    {
      var formCR = document.getElementById("ResultsTDNo");
      formCR.style.display = "block";
      // alert("Files don't match. Will show files with differences...");
    //  var Rform = document.getElementById("Results");
    //  Rform.style.display = "block";
    //  var form = document.getElementById("Upload");
    //  form.style.display = "none";
    }

    trButton.style.display = "block";
    trProccessing.style.display = "none";


  };

  return (
    <div style={{ backgroundImage: `url(Background.png)`}}>
      <form onSubmit={handleSubmit} id="Upload" ><table width="100%" height="900" border="0">
          <tr><td><img src="X3 Logo.png" /></td></tr>
        <tr><td align="center">
        <table border ="0" width="80%">
        <tr>
            <td><FileUpload
          accept=".pdf"
          //label="Reference Report"
          multiple
          updateFilesCb={updateUploadedReferenceFiles}
        /></td><td> <FileUpload
        accept=".pdf"
        //label="New Report"
        multiple
        updateFilesCb={updateUploadedFiles}
      /></td>
          </tr>

          <tr><td height = "10px"></td></tr>
          <tr id="trCompareButton"><td colspan="2" align ="center"><button type="submit">Compare Files... </button></td></tr>
          <tr id="trProccessing" style={{display: 'none'}}><td colspan="2" ><img src="Proccessing.gif" />&nbsp;&nbsp;&nbsp;&nbsp;<b>Comparing Files</b></td></tr>
          <tr><td></td></tr>
        <tr id="ResultsTDYes" style={{display: 'none'}}><td height="150px"align="center"><img src="Passed.png" /><img src="Identical tick.png" /><b>    Your files are identical</b></td></tr>
        <tr id="ResultsTDNo" style={{display: 'none'}}><td height="150px" align="center"><img src="Failed.png" /><img src="Not identical warning.svg.png" /><b>    Your files are not identical</b></td></tr>
        </table>    
        </td></tr>
        <tr><td height="150px" align="center"></td></tr>
        <tr><td height="150px" align="center"></td></tr>
      </table>
      </form>
      <form >
        <table id="Results" width="100%" style={{float : 'left', paddingRight : '5px',display:"none"}}   ><tr><td> <h1>Compare Results:</h1></td></tr><tr><td><img src="notSame_diff-0.png" /></td></tr></table>
      </form>
    </div>    
  );
}

export default App;
